/**
 * User: Safin Alexey
 * Date: 25.09.14
 * Time: 14:25
 */

    // Common questions: why are we so dependable on only 2 code blocks to test?
    // Why more?

function Controller(view) {

    var processor = 0;
    var stopped = false;
    var isFirstTest = true;

    /**
     *
     */
    this.compareButtonHandler = function () {
        if (!isFirstTest) view.clear();

        var inputsOk = view.validateInputs();

        if (inputsOk) {
            var codes = view.getSnippetValues();

            if (codes.code1 = codes.code2) {
                view.showSimilarityWarning();
            } else {
                view.hideSimilarityWarning();
            }

            var testRun = this.testRun(codes.code1, codes.code2);
            if (testRun == 'ok') {
                view.removeError();
                this.testCodeEvalTime(codes.code1, codes.code2);
                isFirstTest = false;
            } else if (testRun != true) {
                view.showError(testRun)
            }
        }
    };


    /**
     * Test codes one time for any errors
     * @param code1
     * @param code2
     * @returns {string}
     */

    this.testRun = function (code1, code2) {
        try {
            eval(code1);
        } catch (e) {
            return "First snippet error: " + e.name;
        }
        try {
            eval(code2);
        } catch (e) {
            return "Second snippet error: " + e.name;
        }
        return 'ok';
    }

    /**
     *
     * @param code
     * @param code2
     */
    this.testCodeEvalTime = function (code, code2) {
        view.disableUI();
        stopped = false;
        var i,
            j = 0,
            limit = view.getNumberOfIterations(),
            time = {firstCodeRunTime: 0, secondCodeRunTime: 0},
            incPercent = limit / 100;

        for (i = 0; i < limit; i++) {
            processor = setTimeout(function () {
                if (stopped) return;
                time.firstCodeRunTime += tryEval(code);
                time.secondCodeRunTime += tryEval(code2);
                if (j == limit-1) {
                    var ratio = (time.firstCodeRunTime / time.secondCodeRunTime).toFixed(3);
                    view.showResults(time, ratio);
                }

                if (j % incPercent == 0 && j < limit) {
                    view.progressInc();
                }
                j++;
            }, 100);
        }
    };

    /**
     * Runs only after this.testRun so there's no need in try-catch
     * @param code
     * @returns {number}
     */
    function tryEval(code) {
        var begin = Date.now();
        eval(code);
        var end = Date.now();
        return end - begin;
    }

    /**
     *
     */
    this.stopTest = function () {
        view.enableUI();
        stopped = true;
        clearTimeout(processor);
    }
}
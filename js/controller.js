/**
 * User: Safin Alexey
 * Date: 25.09.14
 * Time: 14:25
 */

 // Common questions: why are we so dependable on only 2 code blocks to test?
 
function Controller(view) {

    var processor = 0;
    var stopped = false;
    var isFirstTest = true;

    /**
     *
     */
    this.compareButtonHandler = function(){
        if(!isFirstTest) view.clear()

        var inputsOk = view.validateInputs()

        if (inputsOk){
            var codes = view.getSnippetValues();

            view.checkSimilarity(codes.code1, codes.code2)

            var testRun = this.testRun(codes.code1, codes.code2)
            if (testRun == 'ok') {
                view.removeError()
                this.testCodeEvalTime(codes.code1, codes.code2)
                isFirstTest = false;
            } else if (testRun != true){
                view.showError(testRun)
            }
        }
    }

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
        var i = 0, limit = view.getNumberOfIterations(), time = [0, 0];

		//Not good, use setTimeout instead
        processor = setInterval(function () {
            if (stopped) return;
            time.firstCodeRunTime += tryEval(code);
            time.secondCodeRunTime += tryEval(code2);

            if (++i == limit) {
                clearInterval(processor);

                view.showResults(time);
                return;
            }
            if (i % 10 == 0) view.progressInc();
        }, 10)
    }

    /**
     * Runs only after this.testRun
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
        view.enableUI()
        stopped = true;
    }
}
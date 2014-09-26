/**
 * User: Safin Alexey
 * Date: 25.09.14
 * Time: 14:25
 */

function Controller() {

    var view = new View();
    var processor = 0;
    var stopped = false;

    this.testCode = function (code1, code2) {
        try {
            eval(code1);
        } catch (e) {
            return "First snippet error: " + e.name;
        }
        try {
            eval(code2);
        } catch (e) {
            console.log(11)
            return "Second snippet error: " + e.name;
        }
        return true
    }

    this.test = function (code, code2, numberOfIterations) {
        view.disableUI();
        stopped = false;
        var i = 0, limit = numberOfIterations, time = [0, 0];

        processor = setInterval(function () {
            if (stopped) return;
            time[0] += tryEval(code);
            time[1] += tryEval(code2);

            if (++i == limit) {
                clearInterval(processor);

                view.showResults(time[0], time[1]);
                return;
            }
            if (i % 10 == 0) view.progressInc();
        }, 10)
    }

    function tryEval(code) {
        var begin = Date.now();
        eval(code);
        var end = Date.now();
        return end - begin;
    }

    this.stopTest = function () {
        stopped = true;
    }
}
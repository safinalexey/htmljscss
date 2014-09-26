/**
 * User: Safin Alexey
 * Date: 25.09.14
 * Time: 14:25
 */

 // Common questions: why are we so dependable on only 2 code blocks to test?
 
function Controller() {

    var view = new View();
    var processor = 0;
    var stopped = false;

	// What we are testing? Cannot tell this from the method name and the method doesn't have any comments.
    this.testCode = function (code1, code2) {
        try {
            eval(code1);
        } catch (e) {
			//Not good, method may return true or string.
            return "First snippet error: " + e.name;
        }
        try {
            eval(code2);
        } catch (e) {
			//Debug input
            console.log(11)
			//Not good, method may return true or string.
            return "Second snippet error: " + e.name;
        }
        return true
    }

    this.test = function (code, code2, numberOfIterations) {
        view.disableUI();
        stopped = false;
        var i = 0, limit = numberOfIterations, time = [0, 0];

		//Not good, use setTimeout instead
        processor = setInterval(function () {
            if (stopped) return;
			//TODO: Why array??? It's better to have an object here.
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
		//Eval without try/catch block.
        eval(code);
        var end = Date.now();
        return end - begin;
    }

    this.stopTest = function () {
        stopped = true;
    }
}
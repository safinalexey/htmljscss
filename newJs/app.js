/**
 * User: Safin Alexey
 * Date: 23.09.14
 * Time: 19:53
 */

$(document).ready(function () {
    var isFirstTest = true;
	//We either create view here and initialize controller with this view or allow controller to create a view.
    var view = new View();
    var controller = new Controller();

    $('.btn').on('click', function (e) {
		//TODO: Why this code is here, should it be in some MVC related class?
        e.preventDefault();
        if(!isFirstTest) view.clear()
        var code = $('#snippet1').val();
        var code2 = $('#snippet2').val();
        var numberOfIterations = $('#numberOfIterations').val();

        view.checkSimilarity(code, code2)

        var inputsOk = view.checkInputs()
        var testRun = controller.testCode(code, code2)
        if (inputsOk && testRun == true) {
            view.removeError()
            controller.test(code, code2, numberOfIterations)
            isFirstTest = false;
        } else if (testRun != true){
            view.showError(testRun)
        }
    })

    $('.btn-danger').on('click', function(){
        view.enableUI()
        controller.stopTest();
    })
})
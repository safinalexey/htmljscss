/**
 * User: Safin Alexey
 * Date: 23.09.14
 * Time: 19:53
 */

$(document).ready(function () {

    var controller = new Controller(new View());

    $('.btn').on('click', function (e) {
        e.preventDefault();
        controller.compareButtonHandler();
    })

    $('.btn-danger').on('click', function(){
        controller.stopTest();
    })
})
/**
 * User: Safin Alexey
 * Date: 25.09.14
 * Time: 14:32
 */

    //TODO: templating
function View() {
    var percent = 1;
    var snippet1 = $('#snippet1');
    var snippet2 = $('#snippet2');
    var progressBar = $('.progress-bar');
    var ui = $('.ui');
    var alert = $('.alert');
    var numberOfIterations = $('#numberOfIterations');
    var labelWarning = $('.label-warning');

    this.getSnippetValues = function () {
        return {code1: snippet1.val(), code2: snippet2.val()};
    };

    this.getNumberOfIterations = function () {
        return numberOfIterations.val();
    };

    this.validateInputs = function () {
        snippet1.parent().removeClass('has-error');
        snippet2.parent().removeClass('has-error');
        numberOfIterations.parent().removeClass('has-error');

        if (snippet1.val() == '') {
            snippet1.parent().addClass('has-error');
            return false;
        }
        if (snippet2.val() == '') {
            snippet2.parent().addClass('has-error');
            return false;
        }
        if (numberOfIterations.val() == '') {
            numberOfIterations.parent().addClass('has-error');
            return false;
        }
        return true;
    };


    this.showSimilarityWarning = function () {
        labelWarning.show().html('<strong>Note!</strong> Your codes are similar');
    };

    this.hideSimilarityWarning = function () {
        labelWarning.hide();
    };

    this.progressInc = function () {
        percent++;
        progressBar.width(percent + '%');
    };

    this.disableUI = function () {
        ui.attr('disabled', 'disabled');
        progressBar.width(0);
        percent = 1;
    };

    this.enableUI = function () {
        ui.removeAttr('disabled');
        progressBar.width(0);
        percent = 1;
    };

    this.showError = function (error) {
        alert.addClass('alert-danger').text(error);
    };

    this.removeError = function () {
        alert.removeClass('alert-danger').text('');
        snippet1.parent().removeClass('alert-danger');
        snippet2.parent().removeClass('alert-danger');
    };

    this.clear = function () {
        alert.removeClass('alert-success').html('');
        labelWarning.hide();
        percent = 1;
    };

    this.showResults = function (time, ratio) {
        alert.addClass('alert-success').append('<p>First test average time = ' + '<span>' + time.firstCodeRunTime/1000 + '</span>' + ' ms</p>');
        $('.alert-success').append('<p>Second test average time = ' + '<span>' + time.secondCodeRunTime/1000 + '</span>' + ' ms</p>');

        if (ratio > 1) {
            $('.alert-success').append('<p><strong>First code is ' + ratio + ' times slower then second</strong></p>');
        } else {
            $('.alert-success').append('<p><strong>First code is ' + (1 / ratio).toFixed(3) + ' times faster then second</strong></p>');
        }
        this.enableUI();
    };
}
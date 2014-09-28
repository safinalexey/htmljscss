/**
 * User: Safin Alexey
 * Date: 25.09.14
 * Time: 14:32
 */

 //TODO: A lot of selectors duplicate. Why not initialize them in one place  (init, constructor?) and use everywhere?
 //TODO: Use one pattern for string quotes, ' or "
function View() {
    var percent = 1;

    this.getSnippetValues = function(){
        return codes({code1:$('#snippet1').val(),
                      code2:$('#snippet2').val()});
    }

    this.getNumberOfIterations = function(){
        return $('#numberOfIterations').val();
    }

	// Check? For what?
    this.validateInputs = function () {
        $("#snippet1").parent().removeClass('has-error');
        $("#snippet2").parent().removeClass('has-error');
        $("#numberOfIterations").parent().removeClass('has-error');

        if ($("#snippet1").val() == '') {
            $("#snippet1").parent().addClass('has-error');
            return false;
        }
        if ($("#snippet2").val() == '') {
            $("#snippet2").parent().addClass('has-error');
            return false;
        }
        if ($("#numberOfIterations").val() == '') {
            $("#numberOfIterations").parent().addClass('has-error');
            return false;
        }
        return true;
    }

    this.checkSimilarity = function (code1, code2) {
		//TODO: UI logic?
        if (code1 == code2) {
            $('.label-warning').show().html("<strong>Note!</strong> Your codes are similar")
        } else {
            $('.label-warning').hide()
        }
    }

    this.progressInc = function () {
        percent++;
        $('.progress-bar').width(percent + "%");
    }

    this.disableUI = function () {
        $('.ui').attr('disabled', 'disabled');
        $('.progress-bar').width(0);
        percent = 1;
    }

    this.enableUI = function () {
        $('.ui').removeAttr('disabled');
        $('.progress-bar').width(0);
        percent = 1;
    }

    this.showError = function (error) {
        $('.alert').addClass('alert-danger').text(error);
    }

    this.removeError = function () {
        $('.alert').removeClass('alert-danger').text("");
        $('#snippet1').parent().removeClass('alert-danger');
        $('#snippet2').parent().removeClass('alert-danger');
    }

    this.clear = function () {
        $('.alert').removeClass('alert-success').html("")
        $('.label-warning').hide()
        percent = 1;
    }

    this.showResults = function (time) {
        $('.alert').addClass('alert-success').append("<p>First test average time = " + "<span>" + time.firstCodeRunTime + "</span>" + " ms</p>");
        $('.alert-success').append("<p>Second test average time = " + "<span>" + time.secondCodeRunTime + "</span>" + " ms</p>");

		// Also, why are we calculating it here? It's ok to have a rounding here.
        var ratio = (time.firstCodeRunTime / time.secondCodeRunTime).toFixed(3);
        if (ratio > 1) {
            $('.alert-success').append("<p><strong>First code is " + ratio + " times slower then second</strong></p>");
        } else {
            $('.alert-success').append("<p><strong>First code is " + (1/ratio).toFixed(3) + " times faster then second</strong></p>");
        }
        this.enableUI()
    }
}
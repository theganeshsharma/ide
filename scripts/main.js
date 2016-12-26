/**
 * Created by umair on 26/12/16.
 */

$(document).ready(function () {
    var URL = "http://judge.cb.lk/api/";

    var runButton = $('#submit');
    runButton.click(function () {
        // runButton.addClass('loading disabled');
        runButton.button('loading');
        var lang = "c";
        var source = ace.edit("editor").getValue();
        source = window.btoa(source);
        var testcases = ''; //hardcoded for now
        var expected = '';
        for (var i = 0; i < expected.length; ++i) {
            testcases[i] = window.btoa(testcases[i]);
            expected[i] = window.btoa(expected[i]);
        }
        var wait = true;
        console.log('source - ' + source);
        axios.post(URL + 'submission', {
            lang: lang,
            source: source,
            test_count: 1, //Always 1 for the IDE
            "testcases[0]": testcases,
            "expected[0]": expected,
            get_output: true, //Always true for the IDE
            wait: true //Always true for the one hosted at GitHub Pages
        }).then(function (response) {
            console.log(JSON.stringify(response));
            var output = response.data.data.testcases[0].output;
            output = window.atob(output);
            $('#program-output').text(output);
            // runButton.removeClass('loading disabled');
            runButton.button('reset');
        }).catch(function (error) {
            console.log(error);
        });
    });
    
    $('#clear').click(function () {
        ace.edit("editor").setValue('');
    });
});

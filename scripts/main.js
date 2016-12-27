/**
 * Created by umair on 26/12/16.
 */

var lang;
var lang_sample;

function init() {
    if (lang == undefined || lang == 'c') {
        lang = 'c';
    }
    lang_sample = lang_samples[lang];
    ace.edit("editor").setValue(lang_sample);
    console.log("Language = " + lang);
}

$(document).ready(function () {
    var URL = "http://judge.cb.lk/api/";

    init();

    var runButton = $('#submit');
    runButton.click(function () {
        runButton.button('loading');
        var source = ace.edit("editor").getValue();
        source = window.btoa(source);
        var testcases = ''; //hardcoded for now
        var expected = '';
        for (var i = 0; i < expected.length; ++i) {
            testcases[i] = window.btoa(testcases[i]);
            expected[i] = window.btoa(expected[i]);
        }
        var wait = true;
        axios.post(URL + 'submission', {
            lang: lang,
            source: source,
            test_count: 1, //Always 1 for the IDE
            "testcases[0]": testcases, //only one testcase required in IDE
            "expected[0]": expected, //only one expected output required in IDE
            get_output: true, //Always true for the IDE
            wait: true //Always true for the one hosted at GitHub Pages
        }).then(function (response) {
            runButton.button('reset');
            var data = response.data;
            if (data.result == "compile_error") {
                var output = data.error;
                output = window.atob(output);
                $('#output').text(output);
            } else {
                var output = data.data.testcases[0].output;
                output = window.atob(output);
                $('#output').text(output);
            }
        }).catch(function (error) {
            console.log(error);
        });
    });

    $('#clear').click(function () {
        ace.edit("editor").setValue('');
    });

    $('.lang').click(function (event) {
        event.preventDefault();
        lang = $(this).attr('id');
        $('ul li.active').removeClass('active');
        $(this).closest('li').addClass('active');
        init();
    });
});

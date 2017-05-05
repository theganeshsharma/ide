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

    $('.changetheme').click(function (event) {
        event.preventDefault();
        var newtheme = $(this).attr('id');
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/"+newtheme); 
    });

$(document).ready(function () {
    var URL = "https://judge.cb.lk/api/";

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
        var config = {
            headers: {'Access-Token': '79f3c2f8301fc60565de003f4ac76a1d4e5242cb0836995ec2bd28fd083ce86f'}
        };
        axios.post(URL + 'submission', {
            lang: lang,
            source: source,
            test_count: 1, //Always 1 for the IDE
            input: [testcases], //only one testcase required in IDE
            expected_output: [expected], //only one expected output required in IDE
            get_output: true, //Always true for the IDE
            wait: true //Always true for the one hosted at GitHub Pages
        }, config).then(function (response) {
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

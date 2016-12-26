/**
 * Created by umair on 26/12/16.
 */

$(document).ready(function () {
    var URL = "http://judge.cb.lk/api/";
    $('#submit').click(function () {
        var lang = "c";
        var editor = ace.edit("editor");
        var source = editor.getValue();
        console.log('source - ' + source);
        // axios.post('/');
    });
    
    $('#clear').click(function () {
        ace.edit("editor").setValue('');
    });
});

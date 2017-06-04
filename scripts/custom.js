function supportsLocalStorage() {
    return typeof(Storage) !== 'undefined';
}
function loadLocalStorage() {
    if (supportsLocalStorage()) {
        var code = localStorage.getItem('code');
        var codeLang = localStorage.getItem('Lang');
        var fileName = localStorage.getItem('fileName');
        var ifUpload_Local = localStorage.getItem('ifUpload');
        var cacheTheme = localStorage.getItem('Theme');
        var cacheFont = localStorage.getItem('Font');
        var cacheSize = localStorage.getItem('Size');
        var inputs = localStorage.getItem('Input');
        if (codeLang != undefined)
            lang = codeLang;
        if (code != undefined){
            ace.edit("editor").setValue(code + '');
        }
        if (fileName != undefined)
            document.getElementById('fileName').value = fileName;
        if (inputs != undefined)
            document.getElementById('test-input').value = inputs;
        if (ifUpload_Local != undefined)
            ifUpload = parseInt(ifUpload_Local);
        if (cacheTheme != undefined)
            editor.setTheme("ace/theme/" + cacheTheme);
        if (cacheFont != undefined)
           setFont(cacheFont);
        if (cacheSize != undefined)
           setFontSize(cacheSize);
    }
}
function saveCode() {
    if (supportsLocalStorage()) {
        var textToSave = ace.edit("editor").getValue();
        var fileName = document.getElementById('fileName').value;
        var inputs = document.getElementById('test-input').value;
        localStorage.setItem('code', textToSave);
        localStorage.setItem('Lang', lang);
        localStorage.setItem('fileName', fileName);
        localStorage.setItem('Input', inputs);
        localStorage.setItem('ifUpload', ifUpload);
        localStorage.setItem('Theme', editorTheme);
        localStorage.setItem('Font', editorFontFamily);
        localStorage.setItem('Size', editorFontSize);
        console.log("Saved!");
    }
}

var saveID = setInterval(function() {
    saveCode();
}, 30 * 1000);

function saveCodeAsFile() {
    var textToWrite = ace.edit("editor").getValue();
    var textFileAsBlob = new Blob([textToWrite], {type: 'text/plain'});
    var fileNameToSaveAs = document.getElementById("fileName").value;
    if (fileNameToSaveAs == undefined || fileNameToSaveAs == null || fileNameToSaveAs == "") {
        fileNameToSaveAs = "main";
        if (lang === 'js')
            fileNameToSaveAs += ".js";
        else if (lang === 'c')
            fileNameToSaveAs += ".c";
        else if (lang === 'cpp')
            fileNameToSaveAs += ".cpp";
        else if (lang === 'java')
            fileNameToSaveAs += ".java";
        else if (lang === 'py2')
            fileNameToSaveAs += ".py";
        else
            fileNameToSaveAs += ".txt";
    }
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        // Firefox requires the link to be added to the DOM before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

function destroyClickedElement(event) {
    // remove the link from the DOM
    document.body.removeChild(event.target);
}

function toggleSetting() {
    $("#settingModal").modal("toggle");
}

function setFont(Family) {
    editorFontSize = Family;
    editor.setOptions({
        fontFamily: Family
    });
}

function setFontSize(Size) {
    editorFontSize = Size;
    editor.setOptions({
        fontSize: Size + 'px'
    });
}

function resetSettings() {
    editor.setTheme("ace/theme/dawn");
    editor.setOptions({
        fontFamily: "Ubuntu",
        fontSize: "12px"
    });
}
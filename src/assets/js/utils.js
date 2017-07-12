"use strict";

function saveLocalStorage(state) {
  window.localStorage.setItem('code', state.code)
  window.localStorage.setItem('language', state.language)
  window.localStorage.setItem('theme', state.theme)
  window.localStorage.setItem('font', state.font)
  window.localStorage.setItem('fontSize', state.fontSize)
  window.localStorage.setItem('autoSave', state.autoSave)
  window.localStorage.setItem('customInput', state.customInput)
  window.localStorage.setItem('fileName', state.fileName)
  window.localStorage.setItem('customInputBuf', state.customInputBuf)
  window.localStorage.setItem('showCustomInput', state.showCustomInput)
}

export default saveLocalStorage

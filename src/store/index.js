/**
 * Created by abhishek on 14/06/17.
 */
'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import base64 from 'base-64'
import samples from '../assets/js/sample-source'
import saveLocalStorage from '../assets/js/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    code: samples['C'],
    language: 'C',
    theme: 'dawn',
    font: 'Ubuntu Mono',
    fontSize: 14,
    showCustomInput: 'false',
    showSettings: false,
    customInput: '',
    customInputBuf: '', //input buffer to store customInput when toggled OFF
    output: '',
    fileName: '',
    isChanged: false,
    autoSave: true,
    autoSaveIntervalId: null
  },
  mutations: {
    toggleCustomInput (state) {
      state.showCustomInput = !state.showCustomInput
      if (state.showCustomInput) {
        state.customInput = state.customInputBuf
      } else {
        state.customInputBuf = state.customInput
        state.customInput = ''
      }
    },
    toogleSettings (state) {
      state.showSettings = !state.showSettings
    },
    changeLanguage (state, val) {
      state.language = val
    },
    updateCode (state, val) {
      state.code = val
    },
    satCode (state, val) {
      state.code = val
    },
    uploadCode (state, val) {
      state.code = val
    },
    updateOutput (state, val) {
      state.output = val
    },
    fileNameChange(state, val){
      state.fileName = val
    },
    resetCode (state) {
      window.localStorage.clear()

      state.language = "C++"
      state.code = samples["C++"]
      state.fileName = ''
      state.customInput = ''
      state.customInputBuf = ''
      state.theme = 'dawn'
      state.font = 'Ubuntu Mono'
      state.fontSize = 14
    },
    changeCustomInput (state, val) {
      state.customInput = val
    },
    changeTheme (state, val) {
      state.theme = val
    },
    changeFont (state, val) {
      state.font = val
    },
    changeFontSize (state, val) {
      state.fontSize = val
    },
    resetEditor (state) {
      state.theme = 'dawn'
      state.font = 'Ubuntu Mono'
      state.fontSize = 14
    },
    setIsChanged (state, val){
      state.isChanged = val;
    },
    changeAutoSave (state, val) {
      if (val) {
        state.autoSave = true
        if (typeof(Storage) !== 'undefined') {
          state.autoSaveIntervalId = window.setInterval(() => {
            if (state.autoSave && state.isChanged) {
              saveLocalStorage(state)
              state.isChanged = false
            }
          }, 10000)
        }
      } else {
        window.clearInterval(state.autoSaveIntervalId)
        state.autoSaveIntervalId = null
        state.autoSave = false
      }
    },


    loadLocalStorage (state){
      if (typeof(Storage) !== 'undefined') {
        let item
        // item = window.localStorage.getItem('language') || state.language
        // state.language = item
        //
        // item = window.localStorage.getItem('code') || state.code
        // state.code = item

        item = window.localStorage.getItem('theme') || state.theme
        state.theme = item

        item = window.localStorage.getItem('font') || state.font
        state.font = item

        item = window.localStorage.getItem('fontSize') || state.fontSize
        state.fontSize = item

        item = window.localStorage.getItem('autoSave') || state.autoSave
        state.autoSave = (item === "true") ? true : item !== "false"

        // item = window.localStorage.getItem('customInput') || state.customInput
        // state.customInput = item
        //
        // item = window.localStorage.getItem('fileName') || state.fileName
        // state.fileName = item
        //
        // item = window.localStorage.getItem('customInputBuf') || state.customInputBuf
        // state.customInputBuf = item
        //
        // item = window.localStorage.getItem('showCustomInput') || state.showCustomInput
        // state.showCustomInput = item !== 'false'

        console.log("Local Storage Loaded!")
      }
    }
  },
  actions: {
    runJs (context, {code, input}) {
      let jsWorker = null
      if (process.env.NODE_ENV === 'production')
        jsWorker = new Worker('../../ide/static/jsWorker.js')
      else
        jsWorker = new Worker('../../static/jsWorker.js')
      input = JSON.stringify(input)
      jsWorker.postMessage({code, input})
      jsWorker.onmessage = function (e) {
        const output = e.data.join('\n')
        context.commit('updateOutput', output)
      }
    },

    loadDataFromServer ({ state, commit, dispatch }) {
      const pasteId = state.route.params.id

      if (state.route.name !== 'saved') {
        return
      }

      axios
        .get(`https://ide.cb.lk/code/${pasteId}`)
        .then(({ data }) => {
          commit('changeLanguage', data.language)
          commit('satCode', data.code)
          commit('changeCustomInput', data.customInput)
          commit('fileNameChange', data.fileName)
        })
    },

    saveDataToServer ({ state, commit, dispatch }) {
      return axios.post('https://ide.cb.lk/code/', {
        id: (void 0),
        language: state.language,
        code: state.code,
        customInput: state.customInput,
        fileName: state.fileName
      })
    },
    runCode ({state, commit, dispatch}) {
      let lang = 'c'
      switch (state.language) {
        case 'C++':
          lang = 'cpp';
          break
        case 'C#':
          lang = 'csharp';
          break
        case 'Javascript':
          lang = 'js';
          break
        case 'Java':
          lang = 'java';
          break
        case 'Python':
          lang = 'py2';
          break
      }

      if (lang === 'js') {
        return dispatch('runJs', {
          code: state.code,
          input: state.customInput
        })
      }

      const config = {
        headers: {
          'Access-Token': '79f3c2f8301fc60565de003f4ac76a1d4e5242cb0836995ec2bd28fd083ce86f'
        }
      }
      return axios.post('https://judge.cb.lk/api/submission', {
        lang,
        source: base64.encode(state.code),
        test_count: 1,
        input: [base64.encode(state.customInput)],
        expected_output: [''],
        get_output: true,
        wait: true
      }, config)
        .then(({data}) => {
          const output = data.result == 'compile_error' ? data.error : data.data.testcases[0].output // I know this seems stupid, but i got no choice :(
          commit('updateOutput', base64.decode(output))
        })
    }
  }
})

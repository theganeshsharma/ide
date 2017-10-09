/**
 * Created by abhishek on 14/06/17.
 */
'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import base64 from 'base-64'
import shajs from 'sha.js'
import VuexPersistence from 'vuex-persist'
import samples from '../assets/js/sample-source'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    code: samples['C++'],
    sampleCode: samples['C++'],
    language: 'C++',
    theme: 'dark',
    font: 'Ubuntu Mono',
    fontSize: 16,
    showInOutBox: false,
    showSettings: false,
    customInput: '',
    customInputBuf: '', //input buffer to store customInput when toggled OFF
    output: '',
    fileName: '',
    isChanged: false,
    autoSave: true,
    autoSaveIntervalId: null,
    checkData:'',
  },
  mutations: {
    toggleInOutBox(state) {
      state.showInOutBox = !state.showInOutBox
    },
    toogleSettings(state) {
      state.showSettings = !state.showSettings
    },
    changeLanguage(state, val) {
      state.language = val
    },
    updateCode(state, val) {
      state.code = val
    },
    satCode(state, val) {
      state.code = val
    },
    uploadCode(state, val) {
      state.code = val
    },
    updateOutput(state, val) {
      state.output = val
    },
    fileNameChange(state, val) {
      state.fileName = val
    },
    changeCustomInput(state, val) {
      state.customInput = val
    },
    changeTheme(state, val) {
      state.theme = val
    },
    changeFont(state, val) {
      state.font = val
    },
    changeFontSize(state, val) {
      state.fontSize = val
    },
    setCheckData(state,val) {
      state.checkData=shajs('sha256').update(val).digest('hex');
      },
    resetEditor(state) {
      state.theme = 'dark'
      state.font = 'Ubuntu Mono'
      state.fontSize = 16
    },
    resetCode(state, lang) {
      state.sampleCode = samples[lang];
    },
    setIsChanged(state, val) {
      state.isChanged = val;
    },
  },
  plugins: [
    (new VuexPersistence({
      storage: window.localStorage,
      reducer: (state) => ({
        theme: state.theme,
        font: state.font,
        fontSize: state.fontSize
      }),
      filter: (mutation) => (mutation.type.startsWith("changeFont"))
    })).plugin
  ],
  actions: {
    runJs(context, {state, code, input}) {
      let jsWorker = null
      if (process.env.NODE_ENV === 'production')
        jsWorker = new Worker('../../ide/static/jsWorker.js')
      else
        jsWorker = new Worker('../../static/jsWorker.js')
      input = JSON.stringify(input)
      jsWorker.postMessage({code, input})
      return new Promise((resolve, reject) => {
        jsWorker.onmessage = function (e) {
          const output = e.data.join('\n')
          context.commit('updateOutput', output)
          if (output.match(/^Error.*$/)) {
            reject({
              result: 'complie_error'
            });
          }
          resolve({
            result: 'success',
            data: {
              testcases: [{
                result: 'success'
              }]
            }
          });
        }
      })
    },

    loadDataFromServer({state, commit, dispatch}) {
      const pasteId = state.route.params.id
      if (state.route.name !== 'saved') {
        return
      }
      axios
        .get(`https://ide.cb.lk/code/${pasteId}`)
        .then(({data}) => {
          commit('changeLanguage', data.language)
          commit('satCode', data.code)
          commit('changeCustomInput', data.customInput)
          commit('fileNameChange', data.fileName)
          commit('setCheckData',data.code)
      })
    },
    saveDataToServer({state, commit, dispatch}) {
      if(state.checkData==shajs('sha256').update(state.code).digest('hex'))
        return;
      else {
        return axios.post(`https://ide.cb.lk/code/`, {
        id: (void 0),
        language: state.language,
        code: state.code,
        customInput: state.customInput,
        fileName: state.fileName
        });
      }
    },
    runCode({state, commit, dispatch}) {
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
          state: state,
          code: state.code,
          input: state.customInput
        });
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
          const output = data.result == 'compile_error' ? data.error : data.data.testcases[0].output
          commit('updateOutput', base64.decode(output))
          return data;
        })
    }
  }
})

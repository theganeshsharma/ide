/**
 * Created by abhishek on 14/06/17.
 */
'use strict'

//import '@babel-runtime/core-js/json/stringify';
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import base64 from 'base-64'
import shajs from 'sha.js'
import VuexPersistence from 'vuex-persist'
import samples from '../assets/js/sample-source'
import VueClipboard from 'vue-clipboard2'
import SocialSharing from 'vue-social-sharing';

Vue.use(VueClipboard)
Vue.use(SocialSharing)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    code: Object.assign({}, samples),
    sampleCodes: samples,
    language: 'C++',
    languageMode: 'cpp',
    theme: 'vs-dark',
    font: 'Ubuntu Mono',
    fontSize: 16,
    showInOutBox: false,
    showSettings: false,
    customInput: '',
    customInputBuf: '', //input buffer to store customInput when toggled OFF
    output: '',
    fileName: 'download.cpp',
    isChanged: false,
    autoSave: true,
    autoSaveIntervalId: null,
    checkData: '',
  },
  mutations: {
    toggleInOutBox(state) {
      state.showInOutBox = !state.showInOutBox
    },
    toogleSettings(state) {
      state.showSettings = !state.showSettings
    },
    changeLanguage(state, val) {
      const languageMode = {
        'C': 'c',
        'C++': 'cpp',
        'C#': 'csharp',
        'Java': 'java',
        'Python': 'python',
        'Javascript': 'javascript',
        'NodeJs': 'javascript',
        'Ruby': 'ruby'
      }
      const extension = {
        'C': '.c',
        'C++': '.cpp',
        'C#': '.cs',
        'Java': '.java',
        'Python': '.py',
        'Javascript': '.js',
        'NodeJs': '.js',
        'Ruby': '.rb'
      }
      state.language = val
      state.languageMode = languageMode[state.language]
      state.fileName = `download${extension[state.language]}`
    },
    updateCode(state, val) {
      state.code[state.language] = val
    },
    setCode(state, val) {
      state.code[state.language] = val
    },
    uploadCode(state, val) {
      state.code[state.language] = val
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
    setCheckData(state, val) {
      state.checkData = shajs('sha256').update(val).digest('hex');
    },
    resetEditor(state) {
      state.theme = 'vs-dark'
      state.font = 'Ubuntu Mono'
      state.fontSize = 16
    },
    resetCode(state, lang) {
      state.code[lang] = samples[lang];
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
          commit('setCode', data.code)
          commit('changeCustomInput', data.customInput)
          commit('fileNameChange', data.fileName)
          commit('setCheckData', data.code)
        })
    },
    saveDataToServer({state, commit, dispatch}) {
      if (state.checkData == shajs('sha256').update(state.code[state.language]).digest('hex'))
        return;
      else {
        return axios.post(`https://ide.cb.lk/code/`, {
          id: (void 0),
          language: state.language,
          code: state.code[state.language],
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
          lang = 'jsv';
          break
        case 'Java':
          lang = 'java';
          break
        case 'Python':
          lang = 'py2';
          break
        case 'NodeJs':
          lang = 'js';
          break
        case 'Ruby':
          lang = 'ruby';
          break;
      }

      if (lang === 'jsv') {
        return dispatch('runJs', {
          state: state,
          code: state.code[state.language],
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
        source: base64.encode(state.code[state.language]),
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

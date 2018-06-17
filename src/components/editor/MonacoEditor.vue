<template>
  <pre id="editor" @keyup="getDirty()" @keydown="resetEditorShortcut"></pre>
</template>

<script>
  import * as monaco from 'monaco-editor';
  import samples from '../../assets/js/sample-source'

  export default {
    name: 'monaco-editor',
    mounted() {
      addEventListener('dragover', this.dragOverHandler, false)
      addEventListener('drop', this.dropHandler, false)

      this.editor = 
        monaco.editor.create(document.getElementById('editor'), {
          value: samples[this.language],
          minimap: {
            showSlider: false
          },
          language: this.languageMode,
          automaticLayout: true,
          dragAndDrop: true,
          fontFamily: this.$store.state.font,
          fontSize: this.$store.state.fontSize,
          parameterHints: true,
          renderIndentGuides: true,
          lineNumbersMinChars: 3,
          theme: this.$store.state.theme,
          scrollBeyondLastLine: false
        })

      this.editor.onDidChangeModelContent(() => {
        this.$store.commit('updateCode', this.editor.getValue())
      })

      this.$store.dispatch('loadDataFromServer')

      this.$store.subscribe((mutation, state) => {
        switch (mutation.type) {
          case "resetCode":
            this.editor.setValue(this.$store.state.code)
            this.isClean = true
            break;
          case "uploadCode":
            this.editor.setValue(this.$store.state.code)
            break;
          case "satCode":
            this.editor.setValue(this.$store.state.code)
            this.getDirty()
            break;
          case "changeTheme":
            monaco.editor.setTheme(this.$store.state.theme);
            break;
          case "changeFont":
            this.editor.updateOptions({
              fontFamily: this.$store.state.font
            })
            break;
          case "changeFontSize":
            this.editor.updateOptions({
              fontSize: this.$store.state.fontSize
            })
            break;
          case "resetEditor":
            monaco.editor.setTheme(this.$store.state.theme);
            this.editor.updateOptions({
              fontFamily: this.$store.state.font,
              fontSize: this.$store.state.fontSize
            })
            break;
        }
      })

      this.$store.subscribe((plugin, state) => {
        switch (plugin.type) {
          case "createPersistedState":
            monaco.editor.setTheme(this.$store.state.theme);
            this.editor.updateOptions({
              fontFamily: this.$store.state.font,
              fontSize: this.$store.state.fontSize
            })
            break;
        }
      })
    },
    destroyed() {
      removeEventListener('dragover', this.dragOverHandler, false)
      removeEventListener('drop', this.dropHandler, false)
    },
    props: {
      language: {
        default: 'C++'
      }
    },
    data() {
      return {
        isClean: true,
        resetClean: false
      }
    },
    methods: {
      getDirty() {
        this.isClean = false
      },
      resetEditorShortcut(e) {
        if(e.ctrlKey&&e.keyCode==77)
        {
          e.preventDefault()
          this.$store.commit('resetCode', this.$store.state.language)
          this.editor.setValue(this.$store.state.sampleCode)
          this.resetClean = true
        }
      },
      dragOverHandler(e) {
        e.preventDefault()
        e.stopPropagation()
      },
      dropHandler(e) {
         e.preventDefault()
         e.stopPropagation()
         const dt = e.dataTransfer
         if (dt && dt.types && (dt.types.indexOf ?
             dt.types.indexOf('Files') !== -1 : dt.types.contains('Files'))) {
           if (File && FileReader) {
             const reader = new FileReader()
             const file = dt.files[0]
             reader.readAsText(file, 'UTF-8')
             reader.onload = (e) => {
               console.log('Uploaded File: ' + file.name)
               this.isClean = false
               this.$notify({
                text: 'Code Uploaded Successfully',
                type: 'success'
               })
               this.$store.commit('uploadCode', e.target.result)
               this.$store.commit('fileNameChange', file.name)
             };
           }
         }
       }
    },
    computed: {
      languageMode() {
        switch (this.language) {
          case 'C':
            return 'c'
          case 'C++':
            return 'cpp'
          case 'C#':
            return 'csharp'
          case 'Java':
            return 'java'
          case 'Python':
            return 'python'
          case 'Javascript':
            return 'javascript'
          case 'NodeJs':
            return 'javascript'
          case 'Ruby':
            return 'ruby'
          default :
            return 'cpp'
        }
      }
    },
    watch: {
      language(newLang) {
        if (this.isClean || this.resetClean) {
          this.editor.setValue(samples[newLang])
          this.resetClean = false
        }
      },
      languageMode(newMode) {
        monaco.editor.setModelLanguage(this.editor.getModel(), newMode)
      }
    }
  }
</script>

<style scoped>
  #editor {
    overflow: hidden;
    position: relative;
    border: none;
    height: calc(100vh - 40px);
    width: 100vw;
    z-index: 10;
    margin: 0;
    border-radius: 0;
  }
  .inputarea {
    opacity: 0;
  }
</style>

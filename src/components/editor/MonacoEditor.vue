<template>
  <pre id="editor" @keyup="getDirty()" @keydown="resetEditorShortcut"></pre>
</template>

<script>
  import * as monaco from 'monaco-editor';
  import samples from '../../assets/js/sample-source'

  export default {
    name: 'monaco-editor',
    mounted() {
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
            this.editor.updateOptions({
              theme: this.$store.state.theme
            })
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
            this.editor.updateOptions({
              theme: this.$store.state.theme,
              fontFamily: this.$store.state.font,
              fontSize: this.$store.state.fontSize
            })
            break;
        }
      })

      this.$store.subscribe((plugin, state) => {
        switch (plugin.type) {
          case "createPersistedState":
            this.editor.updateOptions({
              theme: this.$store.state.theme,
              fontFamily: this.$store.state.font,
              fontSize: this.$store.state.fontSize
            })
            break;
        }
      })
    },
    destroyed() {
      
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
          e.preventDefault();
          this.$store.commit('resetCode', this.$store.state.language);
          this.editor.setValue(this.$store.state.sampleCode);
          this.resetClean = true
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
        monaco.editor.setModelLanguage(this.editor.getModel(), newMode);
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

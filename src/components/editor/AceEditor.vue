<template>
  <pre id="editor" @keyup="getDirty()" @keydown="resetEditorShortcut"></pre>
</template>

<script>
  import ace from '@coding-blocks/brace'
  import '@coding-blocks/brace/mode/c_cpp'
  import '@coding-blocks/brace/mode/csharp'
  import '@coding-blocks/brace/mode/java'
  import '@coding-blocks/brace/mode/python'
  import '@coding-blocks/brace/mode/javascript'
  import '@coding-blocks/brace/snippets/c_cpp'
  import '@coding-blocks/brace/snippets/java'
  import '@coding-blocks/brace/snippets/javascript'
  import '@coding-blocks/brace/snippets/python'
  import '@coding-blocks/brace/snippets/csharp'
  import '@coding-blocks/brace/theme/dark'


  import samples from '../../assets/js/sample-source'

  export default {
    name: 'ace-editor',
    mounted() {
      this.editor = ace.edit('editor')
      this.editor.getSession().setMode(`ace/mode/${this.languageMode}`);
      this.editor.$blockScrolling = Infinity
      this.editor.setShowPrintMargin(false);
      this.editor.setValue(samples[this.language])
      this.editor.setTheme(`ace/theme/${this.$store.state.theme}`)
      require("@coding-blocks/brace/ext/language_tools");
      let langTools = ace.acequire("ace/ext/language_tools");
      this.editor.setOptions({
        fontFamily: this.$store.state.font,
        fontSize: this.$store.state.fontSize + 'px',
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        highlightActiveLine: false,
        wrap: 'free',
      })
      let flowCompleter = {
        getCompletions: function (editor, session, pos, prefix, callback) {
        }
      }
      langTools.addCompleter(flowCompleter);
      this.editor.renderer.setScrollMargin(0, 200, 0, 0);
      let changeCount = 0
      this.editor.on('change', () => {
        this.$store.commit('updateCode', this.editor.getValue())
      })

      addEventListener('dragover', this.dragOverHandler, false)
      addEventListener('drop', this.dropHandler, false)
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
            this.editor.setTheme(`ace/theme/${this.$store.state.theme}`)
            break;
          case "changeFont":
            this.editor.setOptions({fontFamily: this.$store.state.font})
            break;
          case "changeFontSize":
            this.editor.setOptions({fontSize: this.$store.state.fontSize + 'px'})
            break;
          case "resetEditor":
            this.editor.setTheme(`ace/theme/${this.$store.state.theme}`)
            this.editor.setOptions({fontFamily: this.$store.state.font})
            this.editor.setOptions({fontSize: this.$store.state.fontSize + 'px'})
            break;
        }
      })
      this.$store.subscribe((plugin, state) => {
        switch (plugin.type) {
          case "createPersistedState":
            this.editor.setTheme(`ace/theme/${this.$store.state.theme}`)
            this.editor.setOptions({fontFamily: this.$store.state.font})
            this.editor.setOptions({fontSize: this.$store.state.fontSize + 'px'})
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
          e.preventDefault();
          this.$store.commit('resetCode',this.$store.state.language);
          this.editor.setValue(this.$store.state.sampleCode);
          this.resetClean = true
        }
      },
      dragOverHandler(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      dropHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        const dt = e.dataTransfer;
        if (dt && dt.types && (dt.types.indexOf ?
            dt.types.indexOf('Files') !== -1 : dt.types.contains('Files'))) {
          if (File && FileReader) {
            const reader = new FileReader();
            const file = dt.files[0];
            reader.readAsText(file, 'UTF-8');
            reader.onload = (e) => {
              console.log('Uploaded File: ' + file.name);
              this.$store.commit('uploadCode', e.target.result);
              this.$store.commit('fileNameChange', file.name);
            };
          }
        }
      }
    },
    computed: {
      languageMode() {
        switch (this.language) {
          case 'C':
            return 'c_cpp'
          case 'C++':
            return 'c_cpp'
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
          default :
            return 'c_cpp'
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
        this.editor.getSession().setMode(`ace/mode/${newMode}`);
      }
    }
  }
</script>

<style scoped>
  #editor {
    position: relative;
    border: none;
    height: calc(100vh - 40px);
    width: 100vw;
    z-index: 10;
    margin: 0;
    border-radius: 0;
  }

  .smallEditor {
    height: calc(100vh - 240px) !important;
  }

  .largeEditor {
    height: calc(100vh - 40px) !important;
  }
</style>

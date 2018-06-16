<template>
  <pre id="editor" @keyup="getDirty()" @keydown="resetEditorShortcut"></pre>
</template>

<script>
    import * as monaco from 'monaco-editor';

    export default {
    name: 'monaco-editor',
      mounted() {
        this.editor = monaco.editor.create(document.getElementById('editor'), {
            value: [
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}'
            ].join('\n'),
            minimap: {
              showSlider: false
            },
            language: 'java',
            automaticLayout: true,
            dragAndDrop: true,
            fontFamily: this.$store.state.font,
            fontSize: this.$store.state.fontSize + 'px',
            parameterHints: true,
            renderIndentGuides: true,
            lineNumbersMinChars: 3,
            theme: this.$store.state.theme,
            scrollBeyondLastLine: false
        });

        this.$store.dispatch('loadDataFromServer');
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
          this.$store.commit('resetCode',this.$store.state.language);
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
        this.editor.getSession().setMode(`ace/mode/${newMode}`);
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
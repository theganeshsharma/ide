<template>
  <pre id="editor" @keyup="getDirty()" @keydown="resetEditorShortcut"></pre>
</template>

<script>
    import * as monaco from 'monaco-editor';

    export default {
    name: 'monaco-editor',
    mounted() {
        monaco.editor.create(document.getElementById('editor'), {
            value: [
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}'
            ].join('\n'),
            language: 'javascript'
        });
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
</style>
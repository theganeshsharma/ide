<template>
  <pre id="editor" @keyup="getDirty()" ></pre>
</template>

<script>
  import ace from 'brace'
  import 'brace/mode/c_cpp'
  import 'brace/mode/java'
  import 'brace/mode/python'
  import 'brace/mode/javascript'
  import 'brace/theme/dawn'
  import 'brace/theme/github'
  import 'brace/theme/solarized_light'
  import 'brace/theme/tomorrow'
  import 'brace/theme/xcode'
  import 'brace/theme/cobalt'
  import 'brace/theme/clouds_midnight'
  import 'brace/theme/idle_fingers'
  import 'brace/theme/monokai'


  import samples from '../../assets/js/sample-source'

  export default {
    name: 'ace-editor',
    mounted () {
      this.editor = ace.edit('editor')
      this.editor.getSession().setMode(`ace/mode/${this.languageMode}`);
      this.editor.$blockScrolling = Infinity
      this.editor.setValue(samples[this.language])
      this.editor.on('change', ()=>{
        this.$store.commit('updateCode',this.editor.getValue())
      })

      this.$store.subscribe((mutation, state) => {
        switch (mutation.type) {
          case "resetCode":
            this.editor.setValue(this.$store.state.code)
            break;
          case "uploadCode":
            this.editor.setValue(this.$store.state.code)
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
        }
      })
    },
    props: {
      language: {
        default: 'C++'
      }
    },
    data () {
      return {
        isClean: true
      }
    },
    methods: {
      getDirty(){
        this.isClean = false
      }
    },
    computed: {
      languageMode () {
        switch(this.language){
          case 'C': return 'c_cpp'
          case 'C++': return 'c_cpp'
          case 'Java': return 'java'
          case 'Python': return 'python'
          case 'Javascript': return 'javascript'
          default : return 'c_cpp'
        }
      }
    },
    watch: {
      language(newLang){
        if(this.isClean)
          this.editor.setValue(samples[newLang])
      },
      languageMode(newMode){
        this.editor.getSession().setMode(`ace/mode/${newMode}`);
      }
    }
  }
</script>

<style scoped>
  #editor {
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 0px;
    height: 400px;
  }
</style>

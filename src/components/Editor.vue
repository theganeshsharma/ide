<template>
  <div>
    <div class="row">
      <div>
        <menuBar>
          <ace-editor :language=this.$store.state.language :content=this.$store.state.code></ace-editor>
        </menuBar>
      </div>
      <inoutbox></inoutbox>
    </div>
  </div>

</template>

<script>
  import inoutbox from './editor/inoutbox.vue'
  import menuBar from './editor/menuBar.vue'
  import AceEditor from './editor/Ace-editor.vue'
  //
  // console.log(editor);
  export default {
    name: 'editor',
    components: {
      menuBar,
      AceEditor,
      inoutbox,
    },
    data() {
      return {
        showInOutBox: false,
        code: '',
        language: 'C++'
      }
    },
    watch: {
      '$route'(to, from) {
        if (to.name === 'root') {
          this.$store.commit('resetCode')
          return
        }

        this.$store.dispatch('loadDataFromServer')
      }
    }
  }
</script>

<style>
  * {
    border-radius: 0 !important;
  }

  .btn-group {
    margin: 0;
    padding: 0;
    vertical-align: text-top;
  }

  .btn-group .btn {
    margin: 0;
    padding: 0 15px;
  }

  .headPanel {
    height: 40px !important;
    padding: 0 15px !important;
  }

  .btn span {
    font-size: 11px;
    font-weight: 700 !important;
  }

  .btn-menu {
    background: transparent;
    border: none;
    color: #fff !important;
    outline: none!important;
  }

  .btn-menu:hover, .btn-menu:active, .btn-menu:focus {
    background: transparent;
    color: #e31d3b !important;
    border: none;
    box-shadow: none;
  }

  .btn i {
    font-size: 12px;
  }
</style>

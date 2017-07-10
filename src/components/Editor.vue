<template>
  <div>
      <div id="settingModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title text-center">Settings</h4>
            </div>
                <div>
                  <settings></settings>
                </div>
          </div>
        </div>
      </div>

    <div class="container" style="margin-top: 20px;">
      <div class="row" style="margin-top: 4%;margin-bottom: 9%;">
        <div>
          <panel-top></panel-top>
        </div>
        <div>
          <editor-buttons>
            <ace-editor :language=this.$store.state.language :content=this.$store.state.code ></ace-editor>
          </editor-buttons>
        </div>
        <div class="col-md-4 colw90">
          <div>
            <custom-input v-show="this.$store.state.showCustomInput"></custom-input>
          </div>
          <div>
            <actions></actions>
          </div>
          <div>
            <output-comp></output-comp>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Actions from './editor/Actions'
import CustomInput from './editor/Custom-input.vue'
import EditorButtons from './editor/Editor-buttons.vue'
import OutputComp from './editor/Output-comp.vue'
import PanelTop from './editor/Panel-top.vue'
import Settings from './editor/Settings.vue'
import AceEditor from './editor/Ace-editor.vue'
 //
 // console.log(editor);
export default {
  name: 'editor',
  components: {
    Actions,
    CustomInput,
    EditorButtons,
    OutputComp,
    PanelTop,
    Settings,
    AceEditor
  },
  mounted () {
    // set auto save true
    this.$store.commit('changeAutosave', true)
  },
  data () {
    return {
      showCustomInput: false,
      code: '',
      language: 'C++'
    }
  },
  methods: {
    toggleCustomInput () {
      this.showCustomInput = !this.showCustomInput
    }
  }
}
</script>

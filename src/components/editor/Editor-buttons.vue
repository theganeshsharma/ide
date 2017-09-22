<template>
  <fullscreen :fullscreen.sync="fullscreen">
    <div class="col-md-8 colw90">
    <div class="hovercard" id="fs_control">
      <div class="panel panel-default"
           style="margin-bottom: 0px; border-radius:0px; border-bottom-width:0px;   ">
        <div class="headPanel panel-heading" style=" border-bottom-width:0px; ">
          <!-- Single button -->
          <editor-dropdown :options=languages :selected=this.$store.state.language ></editor-dropdown>
          <div class="btn-group">
            <button type="button" id="settingButton" class="btn hovercard-light btn-sm btn-filled" @click="settingsToggle">
              Setting <span class="fa fa-cog"></span>
            </button>
          </div>
          <div class="btn-group" @click="customInputToggle()" >
            <button type="button" id="custInp" class="btn hovercard-light btn-sm btn-filled">
              Custom Input
            </button>
          </div>

          <ul class="list-inline panel-actions">
            <li><a href="#" id="panel-fullscreen" role="button" title="Enter Full Screen Mode"><i
              id="toggleBtn" @click="toggleFullscreen" class="glyphicon glyphicon-resize-full"></i></a></li>
          </ul>
        </div>
      </div>
      <settings v-show="this.$store.state.showSettings" ></settings>
      <!-- Editor Goes into the slot -->
      <slot></slot>
    </div>
    <p class="autoSaveText">Auto Saved!</p>
  </div>
  </fullscreen>
</template>

<script>
  import editorDropdown from './editor-dropdown.vue'
  import fullscreen from 'vue-fullscreen'
  import Vue from 'vue'
  import Settings from './Settings.vue'

  Vue.use(fullscreen)

  export default {
    name: 'editor-buttons',
    components: { editorDropdown, Settings },
    data () {
      return {
        languages: ['C', 'C++', 'C#', 'Java', 'Python', 'Javascript'],
        fullscreen: false
      }
    },
    methods: {
      toggleFullscreen () {
        this.$fullscreen.toggle(this.$el.querySelector('#fs_control'), {
          callback: this.fullscreenChange
        })
      },
      fullscreenChange (isFullscreen) {
        if (isFullscreen) {
          this.$el.querySelector('#editor').style.height = '100vh'
        } else {
          this.$el.querySelector('#editor').style.height = '400px'
        }
      },
      customInputToggle () {
        this.$store.commit('toggleCustomInput')
      },
      settingsToggle () {
        this.$store.commit('toogleSettings')
      }
    }
  }
</script>

<template>
  <div class="wrapper" @keydown="keyShortCuts">
    <div id="fs_control">
      <div class="panel panel-default">
        <div class="headPanel panel-heading">
          <div class="btn-group">
            <button id="submit" type="button" class="btn btn-sm btn-menu btn-run" :class="{ loading : disabled }"
                    @click="runCode()" :disabled="loading">
              <i class="fa fa-play" aria-hidden="true"></i>
              <span v-if="loading">Running</span>
              <span v-else> Run </span>
            </button>
            <language :options=languages :selected=this.$store.state.language></language>
            <button type="button" id="custInp" class="btn btn-sm btn-menu" @click="InOutBoxToggle()">
              Input <i class="fa fa-keyboard-o" aria-hidden="true"></i>
            </button>
            <button type="button" id="save" class="btn btn-sm btn-menu" @click="saveToServer()">Save <i
              class="fa fa-floppy-o" aria-hidden="true"></i></button>
            <button type="button" id="downlaod" class="btn btn-sm btn-menu" @click="downloadCode()">
              Download
              <i class="fa fa-download" aria-hidden="true"></i>
            </button>
            <input type="file" ref="fileUpload" style="display:none" @change="uploadCode">
            <button type="button" id="uploadFile" class=" btn btn-sm btn-menu" @click="selectFile">
              Upload <span class="fa fa-folder-open" aria-hidden="true"></span>
            </button>
            <input type="file" id="upload" style="display:none;">
            <button type="button" id="settingButton" class="btn btn-sm btn-menu" @click="settingsToggle">
              Setting <span class="fa fa-cog"></span>
            </button>
            <share></share>
            <shortcuts></shortcuts>
          </div>
          <div class="logoMenu">
            Made with <i class="fa fa-heart" aria-hidden="true" style="color: #e31d3b"></i> by
            <img src="../../assets/cb_logo_light.png">
          </div>
        </div>
      </div>
      <settings v-show="this.$store.state.showSettings"></settings>
      <!-- Editor Goes into the slot -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import language from './Language.vue'
  import Vue from 'vue'
  import base64 from 'base-64'
  import Settings from './Settings.vue'
  import Share from './Share.vue'
  import Shortcuts from './Shortcuts.vue'
  export default {
    name: 'menuBar',
    components: {language, Settings, Share, Shortcuts},
    data() {
      return {
        languages: ['C', 'C++', 'C#', 'Java', 'Python', 'Javascript', 'NodeJs'],
        fullscreen: false,
        loading: false
      }
    },
    methods: {
      runCode() {
        this.loading = !this.loading
        this.$store.dispatch('runCode').then((data) => {
          if (!this.$store.state.showInOutBox)
            this.$store.commit('toggleInOutBox')
          this.loading = false
          if (data.result == 'compile_error') {
            this.$notify({
              text: 'Compilation Error',
              type: 'error'
            })
          } else if (data.result == 'success') {
            if (data.data.testcases[0].result == 'run-error') {
              this.$notify({
                text: 'Runtime Error',
                type: 'error'
              })
            } else {
              this.$notify({
                text: 'Code Complied Successfully',
                type: 'success'
              })
            }
          }
        }).catch(err => {
          console.error(err)
          this.loading = false
          this.$notify({
            text: 'There was some error while running the code, please try again.',
            type: 'error'
          })
        })
      },
      saveToServer() {
        this.$store.dispatch('saveDataToServer')
          .then(({data}) => {
            return this.$router.push({name: 'saved', params: {id: data.id}})
          })
      },
      InOutBoxToggle() {
        this.$store.commit('toggleInOutBox')
      },
      settingsToggle() {
        this.$store.commit('toogleSettings')
      },
      downloadCode() {
        const code = this.$store.state.code
        const el = document.createElement('a')
        el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code))
        el.setAttribute('download', this.$store.state.fileName)
        el.style.display = 'none'
        document.body.appendChild(el)
        document.body.removeChild(el)
        el.click()
      },
      selectFile() {
        // open file select dialogue
        this.$refs.fileUpload.click()
      },
      uploadCode(e) {
        const files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }

        const file = files[0]
        const reader = new FileReader()
        const vm = this

        reader.onload = function (e) {
          console.log('Uploaded File: ' + file.name)
          vm.$store.commit('uploadCode', e.target.result)
          vm.$store.commit('fileNameChange', file.name)
        }
        reader.readAsText(file)
      },
      keyShortCuts(e){
        if(e.ctrlKey&&e.keyCode==81)
        {
          e.preventDefault();
          this.runCode();
        }
        if(e.ctrlKey&&e.keyCode==66)
        {
          e.preventDefault();
          this.$store.commit('resetEditor')
        }
      }
    }
  }
</script>

<style scoped>
  #fs_control {
    position: relative;
    z-index: 20;
  }

  .panel {
    width: 100vw;
    height: 40px;
    margin: 0;
    border: none;
    border-bottom: 1px;
  }

  .panel-heading {
    padding: 0 15px;
    background: #202020;
    color: #fff;
    border-color: #272727;
  }

  .logoMenu {
    float: right;
    font-weight: 700;
    text-transform: uppercase;
  }

  .logoMenu img {
    height: 40px;
  }

  @media (max-width: 877px) {
    .logoMenu {
      display: none;
    }
  }
</style>

<style>
  .btn-run {
    background: #e31d3b;
    border-radius: 50px !important;
    outline: none !important;
    color: white !important;
  }

  .btn-run:hover, .btn-run:focus, .btn-run:active {
    background: #e31d3b;
    color: white !important;
  }
  
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    color: black;
  }

  .modal-container {
    width: 45vw;
    margin: 0px auto;
    padding: 10px 30px 30px 30px;
    background-color: #fff;
    border-radius: 3px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header {
    padding: 15px 25px !important;
  }

  .modal-footer {
    padding: 15px 0 0 0;
  }

  .modal-header h3 {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 400;
  }

  .modal-body {
    margin: 5px 0;
    font-size: 15px;
  }

  .modal-default-button {
    float: right;
  }

  .modal-footer button {
    color: white;
  }

  .modal-body ul li kbd {
    display: inline-block;
    margin: 0 .1em;
    padding: .2em 1em;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: 10px;
    line-height: 1.4;
    color: #242729;
    text-shadow: 0 1px 0 #FFF;
    background-color: #e1e3e5;
    border: 1px solid #adb3b9;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(12, 13, 14, 0.2), 0 0 0 2px #FFF inset;
  }
</style>

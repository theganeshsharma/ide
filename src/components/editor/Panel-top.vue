<template>
  <div class="col-md-8 colw90 panelTopOptions">
              <textarea id="fileName" class="panelTopTextbox textbox hovercard-light panelTopOptions" rows="1"
                        style="font-size:16px!important;width: 25%; max-width:100%; margin: 0 5px 0 0!important;resize: none!important;"
                        placeholder="Enter file name" v-model="filename" ></textarea>
    <div class="btn-group panelTopOptions panelTopButton" style="float: right">
      <button type="button" id="downlaod" class="btn hover-light btn-sm btn-filled" @click="downloadCode()">
        Download
      </button>
    </div>
    <div class="btn-group panelTopOptions panelTopButton" style="float: right;margin-right: 5px;">
      <input type="file" ref="fileUpload" style="display:none" @change="uploadCode" >
      <button type="button" id="uploadFile" class=" btn hover-light btn-sm btn-filled" @click="selectFile" >
        Upload <span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
      </button>
      <input type="file" id="upload" style="display:none;">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'panel-top',
    methods: {
      selectFile () {
        // open file select dialogue
        this.$refs.fileUpload.click()
      },
      uploadCode (e) {
        console.log(e)
        const files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }

        const file = files[0]
        const reader = new FileReader()
        const vm = this

        reader.onload = function (e) {
          console.log(e.target.result)
          vm.$store.commit('uploadCode', e.target.result)
        }
        reader.readAsText(file)
      },
      downloadCode () {
        const code = this.$store.state.code
        const el = document.createElement('a')
        el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code))
        el.setAttribute('download', this.filename)
        el.style.display = 'none'
        document.body.appendChild(el)
        document.body.removeChild(el)
        el.click()
      }
    },
    data () {
      return {
        filename: ''
      }
    }
  }
</script>

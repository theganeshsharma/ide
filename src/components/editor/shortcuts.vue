<template>
  <div id="shortcutId" class="btn-group">
    <button id="panelLang" type="button" class="btn btn-sm btn-menu" @click="showModal=true" @blur="showModal=false">
      Shortcuts<i class="fa fa-reply-all" aria-hidden="true"></i>
    </button>
    <div name="modal" v-show="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header text-center">
              <h3>Shortcut Keys</h3>
            </div>

            <div class="modal-body">
              <ul class="list-group">
                <li class="list-group-item"><kbd>Ctrl</kbd> + <kbd>Q</kbd>: To Run the program.</li>
                <li class="list-group-item"><kbd>Ctrl</kbd> + <kbd>B</kbd> or <kbd>Ctrl</kbd> + <kbd>option</kbd> + <kbd>B</kbd>(MAC): To Reset to defaults.</li>
                <li class="list-group-item"><kbd>Ctrl</kbd> + <kbd>M</kbd>: To Reset the Code.</li>
              </ul>
            </div>

            <div class="modal-footer">
              <button class="btn btn-run btn-sm" @click="showModal=false">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Shortcuts',
    data() {
      return {
        showModal: false
      }
    }
  }
</script>

<style scoped>


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
    width: 65vh;
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

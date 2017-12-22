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
</style>

<template>
  <div id="inoutbox" class="fsHide" v-show="this.$store.state.showInOutBox">
    <div class="col-sm-6">
      <div class="panel panel-default">
        <div class="panel-heading">Input</div>
        <div class="panel-body">
          <textarea class="textbox" id="test-input" rows="2"
                    placeholder="Enter your custom inputs" :value="this.$store.state.customInput"
                    @change="customInputChange"></textarea>
        </div>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="panel panel-default">
        <div class="panel-heading">Output</div>
        <div class="panel-body">
          <pre id="output">{{this.$store.state.output}}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'inoutbox',
    data() {
      return {showInOutBox: this.$store.state.showInOutBox}
    },
    methods: {
      customInputChange(e) {
        this.$store.commit('changeCustomInput', e.target.value)
      }
    }
  }
</script>

<style scoped>
  #inoutbox {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;
  }

  .col-sm-6 {
    padding: 0;
  }

  #output, #test-input {
    width: 50vw;
    border-radius: 0 !important;
    margin: 0;
    height: 160px;
    max-height: 160px;
    overflow: scroll;
    background: #202020 !important;
    border-color: #272727 !important;
    color: white !important;
  }

  #test-input {
    resize: none;
  }

  .panel-body {
    padding: 0;
    margin: 0;
    border-radius: 0;
    height: 160px;
  }

  .panel-heading, .panel {
    width: 50vw;
    border-radius: 0;
    margin: 0;
  }

  .panel-heading {
    height: 40px !important;
    padding: 8px 15px;
    background: #272727;
    color: #fff;
    border-color: #272727;
  }

  .panel {
    height: 200px !important;
    max-height: 200px;
    border-color: #202020;
  }

  @media (max-width: 767px) {
    .panel-heading, .panel, #output, #test-input {
      width: 100vw;
    }
  }
</style>

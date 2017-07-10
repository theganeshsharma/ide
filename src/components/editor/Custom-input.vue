<template>
  <div id="custInpBox" class="fsHide">
    <div class="sidecol" id="inputBox">
      <div class="panel panel-default hovercard ">


        <div class="panel-heading">Input<i @click="customInputToggle()" style="margin-top: 5px" class="fa fa-times pull-right"></i></div>
        <div class="panel-body">
          <textarea class="textbox" id="test-input" rows="2" style="width: 100%; max-width:100%;" placeholder="Enter your custom inputs" @change="customInputChange"></textarea>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'custom-input',
    methods: {
      customInputToggle () {
        this.$store.commit('toggleCustomInput')
      },
      customInputChange (e) {
        this.$store.commit('changeCustomInput', e.target.value)
      }
    }
  }
</script>

<template>
  <div class="row top-buffer fsHide">
    <div class="col-md-12">
      <div class="hovercard">
        <div class="panel panel-default">
          <div class="panel-heading">Output</div>
          <div class="panel-body">
            <pre id="output">{{this.$store.state.output}}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'output-comp'
  }
</script>

<template>
  <div class="row fsHide">
    <div class="col-md-12 buttonCenter">
      <button id="submit" type="button" class="btn btn-sm hover-light btn-filled" :class="{ loading : disabled }" @click="runCode()" :disabled="loading" >
        <span v-if="loading" >  <i class='fa fa-circle-o-notch fa-spin'></i> Running  </span>
        <span v-else > Run </span>
      </button>
      <button type="button" id="save" class="btn hover-light btn-sm btn-filled"
              onclick="saveCode();">Save
      </button>
      <button id="clear" type="button" class="btn bg-dark hover-light btn-sm" @click="resetCode()" >Reset</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'actions',
    data () {
      return {
        loading: false
      }
    },
    methods: {
      runCode () {
        this.loading = !this.loading
        this.$store.dispatch('runCode').then(() => {
          this.loading = false
        })
      },
      resetCode () {
        this.$store.commit('resetCode')
      }
    }
  }
</script>

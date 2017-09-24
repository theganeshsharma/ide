<template>
  <div id="app">
    <editor></editor>
    <notifications />
  </div>
</template>

<script>
  import Editor from './components/Editor'

  export default {
    name: 'app',
    components: {
      Editor
    },
    mounted () {
      let mutationsToSubscribe = [
        'changeTheme',
        'changeFont',
        'changeFontSize',
        'resetEditor',
      ]

      this.$store.subscribe((mutation, state) => {
        if (mutationsToSubscribe.includes(mutation.type) && !state.isChanged) {
          this.$store.commit('setIsChanged', true)
        }
      })
    }
  }

</script>
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="font-awesome/css/font-awesome.css"></style>
<style src="./assets/css/whole.css"></style>

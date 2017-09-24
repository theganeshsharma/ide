<template>
  <div class="panel panel-default">
    <div class="headPanel panel-heading" style=" border-bottom-width:0px; ">
      <div class="btn-group">
        <b>Font:</b>
        <select @change="changeFont">
          <option v-for="font in fontOptions" :value="font" :selected="setDefault('font',font)"> {{font}} </option>
        </select>
      </div>
      <div class="btn-group">
        <b>Size:</b>
        <select @change="changeSize">
          <option v-for="size in sizeOptions" :value="size" :selected="setDefault('size',size)">{{size}}</option>
        </select>
      </div>

      <ul class="list-inline panel-actions">
        <li @click="resetEditor"><a href="#">Reset Defaults</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'settings',
    data () {
      return {
        themeOptions: ['dawn', 'github', 'solarized_light', 'tomorrow', 'xcode', 'clouds_midnight', 'cobalt', 'idle_fingers', 'monokai', 'dark'],
        fontOptions: ['Lucida Console', 'Anonymous Pro', 'Courier', 'Droid Sans Mono', 'Inconsolata', 'Source Code Pro', 'Ubuntu Mono'],
        sizeOptions: Array(30).fill(0).map((el, ind) => 6 + (2 * ind)),
      }
    },
    methods: {
      changeTheme (e) {
        this.$store.commit('changeTheme', e.target.value)
      },
      changeFont (e) {
        this.$store.commit('changeFont', e.target.value)
      },
      changeSize (e) {
        this.$store.commit('changeFontSize', e.target.value)
      },
      resetEditor () {
        this.$store.commit('resetEditor')
      },
      setDefault (type, val) {
        switch (type) {
          case 'theme':
            return val === this.$store.state.theme
          case 'size':
            return val === parseInt(this.$store.state.fontSize)
          case 'font':
            return val === this.$store.state.font
        }
      }
    }
  }
</script>

<style scoped>
  .btn-group {
    margin: 2px 10px;
  }

  li {
    position: relative;
    bottom: 26px;
  }
  .panel{
    width: 100vw;
    height: 40px;
    z-index: 20;
    position: absolute;
    margin: 0;
  }

  .panel-heading {
    background: #272727;
    color: #fff;
    border-color: #272727;
  }

  .panel-heading a{
    color:#fff;
  }

  .panel select{
    color: #202020;
  }
</style>

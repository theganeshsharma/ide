<template>
  <div class="panel panel-default"
       style="margin-bottom: 0px; border-radius:0px; border-bottom-width:0px;   ">
    <div class="headPanel panel-heading" style=" border-bottom-width:0px; ">
      <!-- Single button -->
      <div class="btn-group">
        <b>Theme:</b>
        <select @change="changeTheme">
          <option v-for="theme in themeOptions" :value="theme"> {{theme | capitalize }} </option>
        </select>
      </div>
      <div class="btn-group">
        <b>Font:</b>
        <select @change="changeFont">
          <option v-for="font in fontOptions" :value="font"> {{font}} </option>
        </select>
      </div>
      <div class="btn-group">
        <b>Size:</b>
        <select @change="changeSize">
          <option v-for="size in sizeOptions" :value="size">{{size}}</option>
        </select>
      </div>
      <div class="btn-group">
        <b>AutoSave:</b>
        <input type="checkbox" @change="changeAutosave" style="margin-bottom: 24px" checked>
      </div>


      <ul class="list-inline panel-actions">
        <li @click="resetEditor" ><a href="#">Reset Defaults</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'settings',
    data () {
      return {
        themeOptions: ['dawn', 'github', 'solarized_light', 'tomorrow', 'xcode', 'clouds_midnight', 'cobalt', 'idle_fingers', 'monokai'],
        fontOptions: ['Lucida Console', 'Anonymous Pro', 'Courier', 'Droid Sans Mono', 'Inconsolata', 'Source Code Pro', 'Ubuntu Mono'],
        sizeOptions: Array(30).fill(0).map((el, ind) => 6 + (2 * ind)),
        autoSave: false
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
      changeAutosave (e) {
        this.$store.commit('changeAutosave', e.target.checked)
      },
      resetEditor () {
        this.$store.commit('resetEditor')
      }
    }
  }
</script>

<style scoped>
  .btn-group{
    margin: 2px 10px;
  }
  li{
    position: relative;
    bottom: 26px;
  }
</style>

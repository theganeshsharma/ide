<template>
  <div class="btn-group" :class="{ open : isOpen}" @click="open" >
    <button id="panelLang" type="button" class="btn hovercard-light btn-sm btn-filled"
            data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">

      Language <span v-if="selected"> {{selected}} </span> <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <li v-for="option in options" @click="select(option)" ><a href="#">{{option}}</a></li>
    </ul>
  </div>
</template>


<script>
  export default {
    name: 'editor-dropdown',
    props: {
      options: {
        default: function () {
          return []
        }
      },
      selected: {
        default: null
      }
    },
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      select (selected) {
        this.$store.commit('changeLanguage', selected)
      },
      open () {
        this.isOpen = !this.isOpen
      }
    }
  }
</script>

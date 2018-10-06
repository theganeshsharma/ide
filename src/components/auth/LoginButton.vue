<template>
  <span v-if="userStore.isAuthenticated">
      <button class="btn btn-sm btn-menu">
        Welcome {{userStore.currentUser.firstname}}
      </button>
      <button 
        type="button" 
        class="btn btn-sm btn-menu"
        @click="logout"
        >
       Logout <i class="fas fa-sign-in-alt"></i>
    </button>
  </span>
  <button id="panelLang" type="button" class="btn btn-sm btn-menu"
    @click="login"
    v-else >
    Login <i class="fas fa-sign-in-alt"></i>
  </button>
  
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    userStore: 'user'
  }),
  methods: {
    login () {
      const oneauth = process.env.ONEAUTH
      window.location.href= oneauth.url + `/oauth/authorize?response_type=code&client_id=${oneauth.clientId}&redirect_uri=${process.env.url}callback`
    },
    logout () {
      this.$store.commit('user/logout')
      this.$notify({
        text: 'Logged you out. You may still keep the fiddling with code and use the ide in anonymous mode.',
        type: 'success'
      })
    }
  }
  
}
</script>

<template>
  <span v-if="userStore.isAuthenticated">
    <router-link class="btn btn-sm btn-menu" tag="button" to="/profile">
        Welcome {{userStore.currentUser.firstname}}
    </router-link>
      <button 
        type="button" 
        class="btn btn-sm btn-menu"
        @click="logout"
        >
       Logout <span class="fas fa-sign-in-alt"></span>
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
import { setToken } from '@/utils/api'

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
      setToken(null)
      this.$notify({
        text: 'Logged you out. You may still keep the fiddling with code and use the ide in anonymous mode.',
        type: 'success'
      })
    }
  }
  
}
</script>

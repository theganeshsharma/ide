export default {
  namespaced: true,
  state: {
    ref: null
  },
  mutations: {
    setFirebaseRef (state, val) {
      state.ref = val
    }
  }
}
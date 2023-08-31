const settings = {
  state: {
    viewport: {}
  },
  mutations: {
    SET_VIEWPORT: (state, payload) => {
      state.viewport = payload.viewport
    }
  }
}

export default settings


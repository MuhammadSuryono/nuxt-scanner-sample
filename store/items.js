export const state = () => ({
  data: []
})

export const getters = {
  data: state => state.data
}

export const mutations = {
  SET_DATA: (state, payload) => {
    state.data.push({
      avatar: `https://api.multiavatar.com/${payload}.svg`,
      title: `${payload}`,
      subtitle: `<span class="text--primary">Code</span> &mdash; ${payload}`,
      created: new Date()
    })
  }
}

export const actions = {
  addData ({commit}, data) {
    commit('SET_DATA', data)
  }
}

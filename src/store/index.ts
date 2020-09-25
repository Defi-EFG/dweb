import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coune:'xxx',
  },
  mutations: {
    add(state, value){
        state.coune = value
    }
  },
  actions: {
    addAction(context,value){
      context.commit('add' ,this.state.coune='doc')
    },
    addAction2(context,value){
      context.commit('add' ,this.state.coune='doc')
    }
  },
  modules: {}
})


import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import getters from './getters'

const store = new Vuex.Store({
  modules: {
    user,
    common
  },
  getters
})

export default store

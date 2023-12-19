import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from './user'
import come from './come'
import go from './go'
import details from './details'

Vue.use(Vuex)

// 创建vuex的实例
export default new Vuex.Store({
    modules: {
        tab,
        user,
        come,
        go,
        details
    }
})
const store = {
    state: {
        responds: []
    },
    mutations: {
        addRespond(state, any) {
            let temp = []
            any.forEach(respond => {
                temp.push(respond);
            });
            state.responds = temp
        },
        deleteRespond(state, id) {
            const index = state.responds.findIndex(item => item.id === id);
            if (index !== -1) {
                state.responds.splice(index, 1);
            }
        },
        updateRespond(state, updatedRespond) {
            const index = state.responds.findIndex(item => item.id === updatedRespond.id);
            if (index !== -1) {
                state.responds.splice(index, 1, updatedRespond);
            }
        }
    },
    actions: {
        addRespond({ commit }, item) {
            commit('addRespond', item);
        },
        deleteRespond({ commit }, id) {
            commit('deleteRespond', id);
        },
        updateRespond({ commit }, updatedRespond) {
            commit('updateRespond', updatedRespond);
        }
    },
};

export default store;

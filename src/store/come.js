const store = {
    state: {
        responds: []
    },
    mutations: {
        addItem(state, item) {
            state.responds.push(item);
        },
        deleteItem(state, id) {
            const index = state.responds.findIndex(item => item.id === id);
            if (index !== -1) {
                state.responds.splice(index, 1);
            }
        },
        updateItem(state, updatedItem) {
            const index = state.responds.findIndex(item => item.id === updatedItem.id);
            if (index !== -1) {
                state.responds.splice(index, 1, updatedItem);
            }
        }
    },
    actions: {
        addItem({ commit }, item) {
            commit('addItem', item);
        },
        deleteItem({ commit }, id) {
            commit('deleteItem', id);
        },
        updateItem({ commit }, updatedItem) {
            commit('updateItem', updatedItem);
        }
    },
};

export default store;

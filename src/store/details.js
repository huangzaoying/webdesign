const store = {
    state: {
        successDetails: []
    },
    mutations: {
        addSuccessDetail(state, successDetail) {
            state.successDetails.push(successDetail);
        },
        deleteSuccessDetail(state, id) {
            const index = state.successDetails.findIndex(detail => detail.id === id);
            if (index !== -1) {
                state.successDetails.splice(index, 1);
            }
        },
        updateSuccessDetail(state, updatedDetail) {
            const index = state.successDetails.findIndex(detail => detail.id === updatedDetail.id);
            if (index !== -1) {
                state.successDetails.splice(index, 1, updatedDetail);
            }
        }
    },
    actions: {
        addSuccessDetail({ commit }, successDetail) {
            commit('addSuccessDetail', successDetail);
        },
        deleteSuccessDetail({ commit }, id) {
            commit('deleteSuccessDetail', id);
        },
        updateSuccessDetail({ commit }, updatedDetail) {
            commit('updateSuccessDetail', updatedDetail);
        }
    },
    getters: {
        getSuccessDetails(state) {
            return state.successDetails;
        }
    }
};

export default store;

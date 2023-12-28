const state = {
    requests: [],
};

const mutations = {
    addRequest(state, any) {
        let temp = []
        any.forEach(request => {
            temp.push(request);
        });
        state.requests = temp
    },
    updateRequest(state, updatedRequest) {
        const index = state.requests.findIndex(request => request.requestId === updatedRequest.requestId);
        if (index !== -1) {
            state.requests.splice(index, 1, updatedRequest);
        }
    },
    deleteRequest(state, requestId) {
        const index = state.requests.findIndex(request => request.requestId === requestId);
        if (index !== -1) {
            state.requests.splice(index, 1);
        }
    },
};

const actions = {
    addRequest({ commit }, request) {
        commit('addRequest', request);
    },
    updateRequest({ commit }, updatedRequest) {
        commit('updateRequest', updatedRequest);
    },
    deleteRequest({ commit }, requestId) {
        commit('deleteRequest', requestId);
    },
};

export default {
    state,
    mutations,
    actions,
};

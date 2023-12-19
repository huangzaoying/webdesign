const state = {
    users: [],
};

const mutations = {
    addRequest(state, any) {
        any.forEach(user => {
            state.requests.push(user);
        });
    },
    updateRequest(state, updatedUser) {
        const index = state.requests.findIndex(user => user.userId === user.userId);
        if (index !== -1) {
            state.requests.splice(index, 1, updatedRequest);
        }
    },
    deleteRequest(state, userId) {
        const index = state.requests.findIndex(user => user.userId === userId);
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

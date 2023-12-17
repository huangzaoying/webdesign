const welcome = {
    state: {
        responseId: null,
        requestId: null,
        responseUserId: null,
        responseDescription: '',
        responseImages: [],
        createTime: null,
        updateTime: null,
        status: 0 // 0: 待接受, 1: 同意, 2: 拒绝, 3: 取消
    },
    mutations: {
        setResponseId(state, responseId) {
            state.responseId = responseId;
        },
        setRequestId(state, requestId) {
            state.requestId = requestId;
        },
        setResponseUserId(state, responseUserId) {
            state.responseUserId = responseUserId;
        },
        setResponseDescription(state, responseDescription) {
            state.responseDescription = responseDescription;
        },
        setResponseImages(state, responseImages) {
            state.responseImages = responseImages;
        },
        setCreateTime(state, createTime) {
            state.createTime = createTime;
        },
        setUpdateTime(state, updateTime) {
            state.updateTime = updateTime;
        },
        setStatus(state, status) {
            state.status = status;
        }
    },
    actions: {
        // You can define actions here if needed
    },
    getters: {
        // You can define getters here if needed
    }
};

export default welcome;

const state = {
    userId: null,
    userName: '',
    password: '',
    userType: '',
    realName: '',
    idType: '',
    idNumber: '',
    phoneNumber: '',
    userLevel: '',
    userIntro: '',
    registerCity: '',
    registerTime: null,
    modifyTime: null
}

const mutations = {
    setUser(state, user) {
        state.userId = user.userId;
        state.userName = user.userName; 
        state.password = user.password; 
        state.userType = user.userType;
        state.realName = user.realName;
        state.idType = user.idType;
        state.idNumber = user.idNumber;
        state.phoneNumber = user.phoneNumber;
        state.userLevel = user.userLevel;
        state.userIntro = user.userIntro; 
        state.registerCity = user.registerCity; 
        state.registerTime = user.registerTime;
        state.modifyTime = user.modifyTime; 
    },
    setUserId(state, userId) {
        state.userId = userId;
    },
    setUserName(state, userName) {
        state.userName = userName;
    },
    setPassword(state, password) {
        state.password = password;
    },
    setUserType(state, userType) {
        state.userType = userType;
    },
    setRealName(state, realName) {
        state.realName = realName;
    },
    setIdType(state, idType) {
        state.idType = idType;
    },
    setIdNumber(state, idNumber) {
        state.idNumber = idNumber;
    },
    setPhoneNumber(state, phoneNumber) {
        state.phoneNumber = phoneNumber;
    },
    setUserLevel(state, userLevel) {
        state.userLevel = userLevel;
    },
    setUserIntro(state, userIntro) {
        state.userIntro = userIntro;
    },
    setRegisterCity(state, registerCity) {
        state.registerCity = registerCity;
    },
    setRegisterTime(state, registerTime) {
        state.registerTime = registerTime;
    },
    setModifyTime(state, modifyTime) {
        state.modifyTime = modifyTime;
    }
}

export default {
    state,
    mutations
}

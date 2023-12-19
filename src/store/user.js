const state = {
    userId: null,
    userName: '',
    passWord: '',
    userType: '',
    name: '',
    idType: '',
    idNumber: '',
    phoneNumber: '',
    userLevel: '',
    bio: '',
    city: '',
    registerTime: null,
    updateTime: null
}

const mutations = {
    setUser(state, user) {
        state.userId = user.userId
        state.userName = user.userName
        state.passWord = user.passWord
        state.userType = user.userType
        state.name = user.name
        state.idType = user.idType
        state.idNumber = user.idNumber
        state.phoneNumber = user.phoneNumber
        state.userLevel = user.userLevel
        state.bio = user.bio
        state.city = user.city
        state.registerTime = user.registerTime
        state.updateTime = user.updateTime
    },
    setUserId(state, userId) {
        state.userId = userId
    },
    setUsername(state, userName) {
        state.userName = userName
    },
    setPassword(state, passWord) {
        state.passWord = passWord
    },
    setUserType(state, userType) {
        state.userType = userType
    },
    setname(state, name) {
        state.name = name
    },
    setIdType(state, idType) {
        state.idType = idType
    },
    setIdNumber(state, idNumber) {
        state.idNumber = idNumber
    },
    setPhoneNumber(state, phoneNumber) {
        state.phoneNumber = phoneNumber
    },
    setUserLevel(state, userLevel) {
        state.userLevel = userLevel
    },
    setBio(state, bio) {
        state.bio = bio
    },
    setCity(state, city) {
        state.city = city
    },
    setregisterTime(state, registerTime) {
        state.registerTime = registerTime
    },
    setUpdateTime(state, updateTime) {
        state.updateTime = updateTime
    }
}

export default {
    state,
    mutations
}

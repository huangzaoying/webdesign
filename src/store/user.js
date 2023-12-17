const state = {
    userId: null,
    username: '',
    password: '',
    userType: '',
    name: '',
    idType: '',
    idNumber: '',
    phoneNumber: '',
    userLevel: '',
    bio: '',
    city: '',
    registrationTime: null,
    updateTime: null
}

const mutations = {
    setUserId(state, userId) {
        state.userId = userId
    },
    setUsername(state, username) {
        state.username = username
    },
    setPassword(state, password) {
        state.password = password
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
    setRegistrationTime(state, registrationTime) {
        state.registrationTime = registrationTime
    },
    setUpdateTime(state, updateTime) {
        state.updateTime = updateTime
    }
}

export default {
    state,
    mutations
}

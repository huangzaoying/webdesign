import http from '../utils/request'
import qs from 'qs'

// user 的四个接口
export const login = (data) => {    
    return http.post('users/login',qs.stringify(data))
}
export const register = (data) => {
    return http.post('/users/register', data)
}
export const updateUser = (id, data) => {
    return http.put('/users/updateUser/' + id, data)
}
export const getUser = (data) => {
    return http.get('/users/getUser', qs.stringify(data))
}


// request 的四个接口

export const addRequest = (data) => {
    return http.post('/requests/add', qs.stringify(data))
}

export const getRequest = (data) => {
    return http.get('/requests/getSpecial', qs.stringify(data))
}

export const getRequestAdmin = (data) => {
    return http.get('/requests/getList', qs.stringify(data))
}

export const updateRequest = (data) => {
    return http.put('/requests/update', qs.stringify(data))
}

export const deleteRequest = (data) => {
    return http.delete('/requests/delete', qs.stringify(data))
}

// response 的四个接口

export const addResponse = (data) => {
    return http.post('/responses/add', qs.stringify(data))
}

export const getResponse = (data) => {
    return http.get('/responses/getResponse', qs.stringify(data))
}

export const updateResponse = (data) => {
    return http.put('/responses/update', qs.stringify(data))
}

export const deleteResponse = (data) => {
    return http.delete('/responses/delete', qs.stringify(data))
}

// 分析的接口

export const getAnalysis = (data) => {
    return http.get('/analysis/getAnalysis', qs.stringify(data))
}
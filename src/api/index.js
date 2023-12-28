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
    return http.get('/users/getUser?userId='+data)
}
export const getAllUser = () => {
    return http.get('/users/getAll')
}

// request 的接口

export const addRequest = (data) => {
    return http.post('/requests/add', data)
}

export const getRequest = (id) => {
    return http.get('/requests/getList/' + id)
}

export const getRequestByType = (type) => {
    return http.get('/requests/getSpecial?type=' +  type)
}
export const getRequestByName = (name) => {
    return http.get('/requests/getSpecial?name=' +  name)
}
export const getRequestAll = () => {
    return http.get('/requests/getSpecial')
}

export const updateRequest = (id, data) => {
    return http.put('/requests/update/' + id, data)
}

export const deleteRequest = (id) => {
    return http.delete('/requests/delete/' + id)
}

export const getRequestsByCity = (city) => {
    return http.get('/requests/getCity/' + city)
}

export const getRequestsResponder = (requestId) => {
    return http.get('/requests/getResponder/' + requestId)
}

export const getRequestsResponse = (requestId) => {    
    return http.get('/requests/getResponse/' + requestId)
}
// response 的接口

export const addResponse = (data) => {
    return http.post('/responses/add', data)
}

export const getResponse = (id) => {
    return http.get('/responses/getResponse/' + id)
}

export const updateResponse = (id, data) => {
    return http.put('/responses/update/' + id, data)
}

export const deleteResponse = (id) => {
    return http.delete('/responses/delete/' + id)
}
export const getAllResponse = () => {
    return http.get('/responses/getAll')
}

export const getAnalysis = (data) => {
    return http.get('/analysis/getAnalysis', qs.stringify(data))
}

export const getSummery = (data) => {    
    return http.get('summary/get?startMonth=' + data.startMonth + '&endMonth=' + data.endMonth + '&region=' + data.region)
}
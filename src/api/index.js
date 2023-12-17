import http from '../utils/request'

// 请求首页数据
export const getData = () => {
    // 返回一个promise对象
    return http.get('/home/getData')
}

export const getUser = (params) => {
    // console.log(params);

    // 返回用户列表
    // axios 请求
    // return http.get('/users/getUser', params)
    // 后端的路径出来了 请求不就是的 
    return http.get('/users/getUser', params)
    // return http.get('http://localhost:9000/api/users/getUser', params)
}

export const addUser = (data) => {
    return http.post('/user/add', data)
}

export const editUser = (data) => {
    return http.post('/user/edit', data)
}

export const delUser = (data) => {
    return http.post('/user/del', data)
}

export const getMenu = (data) => {
    return http.post('/permission/getMenu', data)
}

export const login = (data) => {
    return http.post('/user/login', data)
}
export const register = (data) => {
    return http.post('/user/register', data)
}

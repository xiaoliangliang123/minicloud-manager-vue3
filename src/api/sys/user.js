import request from '@/router/axios'

export function queryUserList(query) {
    return request({
        url: '/upms/user',
        method: 'get',
        params: query
    })
}

export function queryUserById(userId) {
    return request({
        url: '/upms/user/findById/'+userId,
        method: 'get',
    })
}

export function del(id) {
    return request({
        url: '/upms/user/'+id,
        method: 'delete',
    })
}

export function saveOrEdit(obj) {
    return request({
        url: '/upms/user',
        method: 'post',
        data: obj
    })
}
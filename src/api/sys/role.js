import request from '@/router/axios'

export function queryList(query) {
    return request({
        url: '/upms/role',
        method: 'get',
        params: query
    })
}

export function queryAllRoles() {
    return request({
        url: '/upms/role/all',
        method: 'get',
    })
}
export function getObj(id) {
    return request({
        url: '/upms/role/'+id,
        method: 'get',
    })
}

export function del(id) {
    return request({
        url: '/upms/role/'+id,
        method: 'delete',
    })
}
export function saveOrEdit(obj) {
    return request({
        url: '/upms/role',
        method: 'post',
        data: obj
    })
}
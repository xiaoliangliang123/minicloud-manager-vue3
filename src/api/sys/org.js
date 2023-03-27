import request from '@/router/axios'


export function saveOrEdit(obj) {
    return request({
        url: '/upms/org',
        method: 'post',
        data: obj
    })
}

export function queryOrgList(params) {
    return request({
        url: '/upms/org',
        method: 'get',
        params:params
    })
}

export function getOrgById(id) {
    return request({
        url: '/upms/org/'+id,
        method: 'get',
    })
}

export function removeOrgById(id) {
    return request({
        url: '/upms/org/'+id,
        method: 'delete',
    })
}
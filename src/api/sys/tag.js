import request from '@/router/axios'

export function queryTagList() {
    return request({
        url: '/upms/orgTag',
        method: 'get'
    })
}


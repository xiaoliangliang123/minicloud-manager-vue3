/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */
import request from '@/router/axios'
import qs from 'qs'

const scope = 'read'

export const loginByUsername = (uname,tenant, pwd) => {

  const username = uname;
  const password = pwd;
  let dataObj = qs.stringify({'username': username, 'password': password})

  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      isToken: false
    },
    method: 'post',
    url: '/tenant-'+tenant+'-login/tenant/login',
    data:dataObj,
  })

}


export const refreshToken = refresh_token => {
  const grant_type = 'refresh_token'
  return request({
    url: '/auth/oauth/token',
    headers: {
      isToken: false,
      Authorization: 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: {refresh_token, grant_type, scope}
  })
}

export const logout = () => {
  return request({
    url: '/auth/token/logout',
    method: 'delete'
  })
}


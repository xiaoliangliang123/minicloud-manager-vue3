import axios from "axios";
import {serialize} from "@/util/util";
import NProgress from "nprogress"; // progress bar
import errorCode from "@/api/errorCode";
import {ElMessage, ElMessageBox} from "element-plus";
import "nprogress/nprogress.css";
import qs from "qs";
import store from "@/store"; // progress bar style
axios.defaults.timeout = 30000;
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500; // 默认的
};
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress Configuration
NProgress.configure({
    showSpinner: false
});

// HTTPrequest拦截
axios.interceptors.request.use(
    config => {

        NProgress.start(); // start progress bar

        let isToken = (config.headers || {}).isToken ;
        if(typeof(isToken) == "undefined"){
            isToken = true ;
        }
        let token = store.getters.access_token;
        if (token && isToken) {
            config.headers["Authorization"] = "Bearer " + token; // token
        }else {
            config.headers["Authorization"] = null;
        }
        config.headers["version"] = "default " ; // 开发环境隔离

        // headers中配置serialize为true开启序列化
        if (config.method === "post" && config.headers.serialize) {
            config.data = serialize(config.data);
            delete config.data.serialize;
        }

        // 处理get 请求的数组 springmvc 可以处理
        if (config.method === "get"||config.method === "delete") {
            config.paramsSerializer = function (params) {
                return qs.stringify(params, {arrayFormat: "repeat"});
            };
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// HTTPresponse拦截
axios.interceptors.response.use(
    res => {
        NProgress.done();
        const status = Number(res.status) || 200;
        const message = res.data.msg || errorCode[status] || errorCode["default"];

        // 后台定义 424 针对令牌过去的特殊响应码
        if (status === 424) {
            ElMessageBox.confirm("令牌状态已过期，请点击重新登录", "系统提示", {
                confirmButtonText: "重新登录",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    store.dispatch("LogOut").then(() => {
                        // 刷新登录页面，避免多次弹框
                        window.location.reload();
                    });
                })
                .catch(() => {
                });
            return;
        }

        if (status !== 200 ) {
            ElMessage({
                message: message,
                type: "error"
            });
            return Promise.reject(new Error(message));
        }

        return res;
    },
    error => {
        NProgress.done();
        return Promise.reject(new Error(error));
    }
);

/**
* GET方式请求
*/
export function get(url, param) {
    if (typeof (param) != "undefined" && param != null) {
        url = url + "?" + qs.stringify(param);
    }
    return new Promise((resolve, reject) => {
        axios.get(url).then(
            response => {
                resolve(response.data);
            }
        ).catch(
            (error) => {
                reject(error);
            }
        );
    });
}

export function post(url, param) {


    // 配置请求头
    let config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } };
    return new Promise((resolve, reject) => {
        axios.post(url, param, config).then(
            response => {
                resolve(response.data);
            }
        ).catch(
            (error) => {
                reject(error);
            }
        );
    });
}

export function put(url, param) {
    // 配置请求头
    let config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } };
    return new Promise((resolve, reject) => {
        axios.put(url, param, config).then(
            response => {
                resolve(response.data);
            }
        ).catch(
            (error) => {
                reject(error);
            }
        );
    });
}

export function del(url, param) {
    if (typeof (param) != "undefined" && param != null) {
        url = url + "?" + qs.stringify(param);
    }
    let config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
    return new Promise((resolve, reject) => {
        axios.delete(url, config).then(
            response => {
                resolve(response.data);
            }
        ).catch(
            (error) => {
                reject(error);
            }
        );
    });
}

export default axios;

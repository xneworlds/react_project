import axios from 'axios'
import qs from 'querystring'
import NProgress from 'nprogress'
import {message} from 'antd'
import store from '../redux/store'
import {deleteUserInforAction} from '../redux/actions/login_action';
import 'nprogress/nprogress.css'

const instance = axios.create({
  timeout: 4000,//配置超时时间
});

//请求拦截器
instance.interceptors.request.use((config) => {
  NProgress.start()
  //从redux中获取之前所保存的token
  const {token} = store.getState().loginInfor
  //向请求头中添加token，用于校验身份
  if(token) config.headers.Authorization = 'atguigu_' + token

  const {method,data} = config
  if(method.toLowerCase() === 'post'){
    if(data instanceof Object){
      config.data = qs.stringify(data)
    }
  }
  return config
},(error) => {
  message.error(error.message,2)
  return Promise.reject(error)
})

//响应拦截器
instance.interceptors.response.use((response) => {
  NProgress.done()
  return response.data
},(error) => {
  NProgress.done()
  if(error.response.status === 401){
    message.error('身份校验失败，请重新登录',1)
    //分发一个删除用户信息的action
    store.dispatch(deleteUserInforAction())
  }else{
      //请求若失败，提示错误（这里可以处理所有请求的异常）
      message.error(error.message,2)
  }
  return Promise.reject(error)
})

export default instance
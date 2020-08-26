import axios from './ajax'
import {BASE_URL,WEATHER_AK,CITY} from '../config'
import jsonp from 'jsonp'
import {message} from 'antd'

//登录请求
export const resLogin = (value) => axios.post(`${BASE_URL}/login`, value)
//分类列表请求
export const resCategoryList = () => axios.get(`${BASE_URL}/manage/category/list`)
//获取天气信息（百度接口）
export const reqWeather = ()=>{
  return new Promise((resolve,reject)=>{
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_AK}`,(err,data)=>{
      if(err){
        message.error('请求天气接口失败，请联系管理员')
        return new Promise(()=>{})
      }else{
        const {dayPictureUrl,temperature,weather} = data.results[0].weather_data[0]
        let weatherObj = {dayPictureUrl,temperature,weather}
        resolve(weatherObj)
      }
    })
  })
}
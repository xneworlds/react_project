import {SAVE_USER_INFOR, DELETE_USER_INFOR} from '../action_types'

const user = JSON.parse(localStorage.getItem('user'))
const token = localStorage.getItem('token')
let initState = {
  user: user || '',
  token: token || '',
  isLogin: user && token ? true : false
}
export default function saveUserInforReducer(preState = initState, action){
  const {type, data} = action
  let newState
  switch (type) {
    case SAVE_USER_INFOR:
      newState = {user: data.user, token: data.token, isLogin: true}
      return newState
    case DELETE_USER_INFOR:
      newState = {user: '', token: '', isLogin: false}
      return newState
    default:
      return preState
  }
}
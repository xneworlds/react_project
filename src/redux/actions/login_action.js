import {SAVE_USER_INFOR, DELETE_USER_INFOR} from '../action_types'

export const saveUserInforAction = (value) => {
  localStorage.setItem('user', JSON.stringify(value.user))
  localStorage.setItem('token', value.token)
  return {type: SAVE_USER_INFOR, data: value}
}

export const deleteUserInforAction = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return {type: DELETE_USER_INFOR}
}

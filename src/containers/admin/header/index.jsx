import React, { Component } from 'react'
import {Button, Modal} from 'antd'
import {FullscreenOutlined, FullscreenExitOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router-dom' //在非路由组件中，要使用路由组件的api
import dayjs from 'dayjs'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import {reqWeather} from '../../../api'
import {deleteUserInforAction} from '../../../redux/actions/login_action'
import './header.less'

const {confirm} = Modal

@connect(
  state => ({loginInfor: state.loginInfor}),
  {deleteUserInfor: deleteUserInforAction}
)
@withRouter
class Header extends Component {
  state = {
    isFull:false,
    date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
    weatherInfo:{}
  }

  componentDidMount(){
    //给screenfull绑定监听
    screenfull.on('change', () => {
      let isFull = !this.state.isFull
      this.setState({isFull})
    });
    this.timeID = setInterval(()=>{
      this.setState({date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')})
    },1000)
    this.getWeather()
  }

  componentWillUnmount(){
    clearInterval(this.timeID)
  }

  getWeather = async()=>{
    let weather = await reqWeather()
    this.setState({weatherInfo:weather})
  }

  //切换全屏按钮的回调
  fullScreen = ()=>{
    screenfull.toggle()
  }

  logout = () => {
    let {deleteUserInfor} = this.props
    confirm({
      title: '确定退出？',
      content: '若退出需要重新登录',
      cancelText:'取消',
      okText:'确认',
      onOk(){
        deleteUserInfor()
      }
    })
  }

  render() {
    let {isFull,weatherInfo} = this.state
    let {user} = this.props.loginInfor
    return (
      <header className="header">
        <div className="header-top">
            <Button size="small" onClick={this.fullScreen}>
              {React.createElement(isFull ? FullscreenExitOutlined : FullscreenOutlined)}
            </Button>
            <span className="username">欢迎，{user.username}</span>
            <Button type="link" onClick={this.logout}>退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            {this.props.location.pathname}
          </div>
          <div className="header-bottom-right">
            {this.state.date}
            <img src={weatherInfo.dayPictureUrl} alt="天气信息"/>
            {weatherInfo.weather}&nbsp;&nbsp;&nbsp;温度：{weatherInfo.temperature}
          </div>
        </div>
      </header>
    )
  }
}
export default Header
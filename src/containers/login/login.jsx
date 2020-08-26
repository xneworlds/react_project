import React, { Component } from 'react'
import { Form, Input, Button, message} from 'antd';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {resLogin} from '../../api'
import {saveUserInforAction} from '../../redux/actions/login_action'
import {UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './imgs/logo.png'
import './css/login.less'

@connect(
    state => ({isLogin: state.loginInfor.isLogin}),
    {
        saveUserInfor: saveUserInforAction
    }
)
class Login extends Component {

    //验证通过后发送登录请求
    handleSubmit = async(value) => {
        let res = await resLogin(value)
        let {status, msg, data} = res
        if(status === 0){
            this.props.saveUserInfor(data)
            this.props.history.push('/admin')
        }else{
            message.warning(msg,2)
        }
    }

    //密码的验证器---每当在密码输入框输入东西后，都会调用此函数去验证输入是否合法。自定义校验，即：自己写判断
    pwdValidator = (rule,value)=>{
        if (!value) {
            return Promise.reject('请输入密码')
        }else if(value.length>12) {
            return Promise.reject('密码必须小于等于12位')
        }else if(value.length<4) {
            return Promise.reject('密码必须大于等于4位')
        }else if(!(/^\w+$/).test(value)) {
            return Promise.reject('密码必须是字母、数字、下划线组成')
        }else {
            return Promise.resolve(value)
        }
    }

    render() {
        const {isLogin} = this.props
        if(isLogin){
            return <Redirect to="/admin"/>
        }
        return (
            <div className="login">
                <header>
                    <img src={logo} alt="logo"/>
                    <h1>商品管理系统</h1>
                </header>
                <section>
                    <h1>用户登录</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={(value)=>{this.handleSubmit(value)}}
                        >
                        <Form.Item
                            name="username"
                            rules={[
                                {required: true, message: '请输入用户名'},
                                {max: 12, message: '用户名必须小于等于12位'},
                                {min: 4, message: '用户名必须大于等于4位'},
                                {pattern: /^\w+$/, message: '用户名必须是字母、数字、下划线组成'},
                            ]}
                        >
                            <Input 
                                prefix={<UserOutlined 
                                className="site-form-item-icon" />} 
                                placeholder="请输入用户名" 
                            /> 
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                // {required: true, message: '密码必须输入！'},
                                {validator: this.pwdValidator},
                                // ({ getFieldValue }) => ({
                                //     validator: this.pwdValidator
                                // }),
                                // ({ getFieldValue }) => ({
                                //     validator(rule, value) {
                                //       if (!value || getFieldValue('password') === value) {
                                //           console.log(value)
                                //           return Promise.resolve()
                                //       }
                                //       return Promise.reject('The two passwords that you entered do not match!')
                                //     }
                                // })
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="请输入密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

export default Login

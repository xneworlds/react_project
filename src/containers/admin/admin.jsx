import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
// import {resCategoryList} from '../../api'
import { Layout} from 'antd'
import Header from './header'
import LeftNav from './left_nav';
import Home from '../../components/home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons'
import './css/admin.less'

const {Footer, Sider, Content } = Layout

@connect(
    state => ({loginInfor: state.loginInfor}),
    {}
)
class Admin extends Component {

    state = {
        collapsed: false,
    }
    
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        })
    }

    render() {
        const {isLogin} = this.props.loginInfor
        if(!isLogin){
            return <Redirect to='/login'/>
        }else{
            return (
                <Layout className="admin-box">
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logo" />
                        <LeftNav/>
                    </Sider>
                    <Layout>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <Header className="header">
                        </Header>
                        <Content className="content">
                            <Switch>
                                <Route path="/admin/home" component={Home}/>
                                <Route path="/admin/prod_about/category" component={Category}/>
                                <Route path="/admin/prod_about/product" component={Product}/>
                                <Route path="/admin/user" component={User}/>
                                <Route path="/admin/role" component={Role}/>
                                <Route path="/admin/charts/bar" component={Bar}/>
                                <Route path="/admin/charts/line" component={Line}/>
                                <Route path="/admin/charts/pie" component={Pie}/>
                                <Redirect to="/admin/home"/>
                            </Switch>
                        </Content>
                        <Footer className="footer">
                            推荐使用谷歌浏览器，获取最佳用户体验
                        </Footer>
                    </Layout>
                </Layout>
            )
        }
    }
}
export default Admin

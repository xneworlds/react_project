import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu} from 'antd'
import menuList from '../../../config/menu_config';

const { SubMenu } = Menu

@withRouter
class LeftNav extends Component {

  createMune = (menuList) => {
    return menuList.map((item) => {
      if(!item.children){
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        )
      }else{
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.createMune(item.children)}
          </SubMenu>
        )
      }
    })
  }

  render() {
    return (
      <Menu theme="dark" mode="inline" 
        defaultSelectedKeys={this.props.location.pathname.split('/').reverse()[0]}
        defaultOpenKeys={this.props.location.pathname.split('/').splice(2)}
      >
        {this.createMune(menuList)}
      </Menu>
    )
  }
}
export default LeftNav

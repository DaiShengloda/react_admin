/**
 * 页面布局相关组件
 * Layout--布局容器、Menu--导航菜单、Breadcrumb--面包屑、Dropdown--下拉菜单
 */
import React, { Component } from 'react'
import { Switch, Route, Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './Dashboard.scss'
import Index from '../Index/Index'
import Text from '../Text/Text'
import Live from '../Live/Live'
import Activity from '../Activity/Activity'
import Safe from '../Safe/Safe'
import Setting from '../Setting/Setting'

/**
 * 导航菜单
 * --顶部导航：全局性的类目和功能；
 * --侧边导航：多级结构来收纳和排列网站架构；
 * Menu.Item：菜单项、SubMenu--子菜单
 */
const { SubMenu } = Menu

/**
 * 布局容器
 */
const { Header, Content, Footer, Sider } = Layout

class _Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      breadcrumbNameMap: {
        "/index": "首页",
        "/index/data": "数据统计",
        "/index/content": "内容管理",
        "/index/content/note": "笔记管理",
        "/index/content/quesition": "问股管理",
        "/index/content/course": "课程管理",
        "/index/content/report": "研报管理",
        "/index/live": "直播管理",
        "/index/live/room": "直播室管理",
        "/index/live/menu": "黑名单管理",
        "/index/live/ticket": "门票配置管理",
        "/index/activity": "活动管理",
        "/index/safe": "用户权限",
        "/index/setting": "系统配置"
      }
    }
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }

  onSelectHandler = (object) => {
    this.props.history.push(object.key)
  }

  render() {
    const { location } = this.props
    const pathSnippets = location.pathname.split('/').filter(i => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      return (
        <Breadcrumb.Item 
          key={url}
          className='bread_item'>
          <Link to={url}>
            {this.state.breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      )
    })
    const breadcrumbItem = [].concat(extraBreadcrumbItems)
    return(
      // 页面布局--上下侧边两列式布局 
      <Layout 
        className='dashboard'>
        {/* 上排--页眉 */}
        <Header className='dash_header'>
          <div className="header_ins">
            <img 
              src={require('../../static/images/RDS.png')}
              className='ins_logo'/>
            <div className='ins_name'>后台管理系统</div>
          </div>
          <div className='header_user'>
            <Icon 
              type="user" 
              className='user_icon'/>
            <div className='user_name'>admin</div>
          </div>
        </Header>
        {/* 下排 */}
        <Layout className='dash_cont'>
          {/* 第一列--侧边栏 */}
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            className='cont_sider'>
            {/* 导航菜单 */}
            <Menu 
              theme="dark" 
              className='sider_menu'
              defaultSelectedKeys={['1']} 
              mode="inline"
              onSelect={this.onSelectHandler}>
              <Menu.Item key="/index/data">
                <Icon type="pie-chart" />
                <span>数据统计</span>
              </Menu.Item>
              <SubMenu
                key="content"
                title={<span><Icon type="folder" /><span>内容管理</span></span>}>
                <Menu.Item key="/index/content/note">笔记管理</Menu.Item>
                <Menu.Item key="/index/content/quesition">问股管理</Menu.Item>
                <Menu.Item key="/index/content/course">课程管理</Menu.Item>
                <Menu.Item key="/index/content/report">研报管理</Menu.Item>
              </SubMenu>
              <SubMenu
                key="live"
                title={<span><Icon type="video-camera" /><span>直播管理</span></span>}>
                <Menu.Item key="/index/live/room">直播室管理</Menu.Item>
                <Menu.Item key="/index/live/menu">黑名单管理</Menu.Item>
                <Menu.Item key="/index/live/ticket">门票配置管理</Menu.Item>
              </SubMenu>
              <Menu.Item key="/index/activity">
                <Icon type="cluster" />
                <span>活动管理</span>
              </Menu.Item>
              <Menu.Item key="/index/safe">
                <Icon type="safety" />
                <span>用户权限</span>
              </Menu.Item>
              <Menu.Item key="/index/setting">
                <Icon type="setting" />
                <span>系统配置</span>
              </Menu.Item>
            </Menu>
          </Sider>
          {/* 第二列 */}
          <Layout className='cont_table'>
            <Content className='table_cont'>
              {/* 面包屑 */}
              <Breadcrumb 
                className='cont_bread'>
                {breadcrumbItem}
              </Breadcrumb>
              <div className='cont_view'>
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={300}>
                    <Switch>
                      <Route path='/index' component={Index} exact={true} />
                      <Route path='/index/data' component={Index} />
                      <Route path='/index/content' component={Text} />
                      <Route path='/index/live' component={Live} />
                      <Route path='/index/activity' component={Activity} />
                      <Route path='/index/safe' component={Safe} />
                      <Route path='/index/setting' component={Setting} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </div>
            </Content>
            {/* 页脚 */}
            <Footer className='table_footer'>
              Manager Project ©2019 Created by Loda
            </Footer>
          </Layout>
        </Layout>
      </Layout>  
    )
  }
}

const Dashboard = withRouter(_Dashboard)

export default Dashboard
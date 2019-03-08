import React, { Component } from 'react'
import { Input, Icon, Button, message } from 'antd'
import './Login.scss'
import { withRouter } from 'react-router-dom'

class _Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      loading: false
    }
  }

  nameEmpty = () => {
    this.userNameInput.focus()
    this.setState({ userName: '' })
  }

  wordEmpty = () => {
    this.passwordInput.focus()
    this.setState({ password: '' }) 
  }

  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value })
  }

  onChangePassword = (e) => {
      this.setState({ password: e.target.value })
  }

  loginIn = () => {
    let message
    const { userName, password } = this.state
    const closeBack = () => {
      if(!userName){
        message = '请输入用户名'
      }else if(!password){
        message = '请输入密码' 
      }else if(userName != 'admin' || password != 'admin'){
        message = '用户名或密码错误' 
        message.error(message)
        return
      }else{
        localStorage.setItem('loginIn',1)
        this.props.history.push('/index')
        return
      }
      message.warning(message)
    }
    message.loading('加载中...', 1, closeBack)
  }

  render() {
    const { userName, password } = this.state;
    const suffixName = userName ? <Icon type="close-circle" onClick={this.nameEmpty} /> : null;
    const suffixPassword = password ? <Icon type="close-circle" onClick={this.wordEmpty} /> : null;
    return(
      <div className='login'>
        <div className='login_box'>
          <div className='box_top'>
            <img 
              src={require('../../static/images/RDS.png')} 
              className="top_icon" 
              alt="logo" />
            <div className='top_title'>后台管理系统</div>
          </div>
          <div className='box_from'>
            <Input
              className='form_name'
              placeholder="用户名"
              size='large'
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={suffixName}
              value={userName}
              onChange={this.onChangeUserName}
              ref={node => this.userNameInput = node}/>
            <Input.Password 
              className='form_password'
              placeholder="密码"
              size='large'
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={suffixPassword}
              value={password}
              onChange={this.onChangePassword}
              ref={node => this.passwordInput = node}/>
            <Button 
              className='form_btn'
              type="primary"
              size='large'
              block={true}
              onClick={this.loginIn}>登录
            </Button>     
          </div>
        </div>
      </div>
    )
  }
}
const Login = withRouter(_Login)

export default Login
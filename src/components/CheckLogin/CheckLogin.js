import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class _CheckLogin extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const loginIn = localStorage.getItem('loginIn')
    if(loginIn!='1'){
      this.props.history.push('/login')
    }else{
      this.props.history.push('/index')
    }
  }

  render() {
    return null
  }
}

const CheckLogin = withRouter(_CheckLogin)

export default CheckLogin
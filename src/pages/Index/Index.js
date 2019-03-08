import React, { Component } from 'react'
import { Collapse, Icon, Statistic, Row, Col, Card, Avatar, Timeline } from 'antd'
import './Index.scss'

const Panel = Collapse.Panel
const { Meta } = Card

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deadline: Date.now() + 1000 * 60 * 60 * 5 + 1000 * 30
    }
  }

  onFinish = () => {
    console.log('finish')
  }

  render() {
    return(
      <Collapse
        className='data'
        bordered={false}
        defaultActiveKey={['text']}
        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
        <Panel 
          header="内容管理数据统计" 
          className="data_panel"
          key="text">
          <Row
            type='flex'
            align='middle'
            justify='space-between'>
            <Col>
              <Statistic title="阅读数" value={234562} prefix={<Icon type="read" />} />
            </Col>
            <Col>
              <Statistic title="点赞数" value={11280} prefix={<Icon type="like" />} />
            </Col>
            <Col>
              <Statistic title="评论数" value={5234} prefix={<Icon type="form" />} />
            </Col>
            <Col>
              <Statistic 
                title="分享率" 
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon type="arrow-up" />}
                suffix="%" />
            </Col>
          </Row>
        </Panel>
        <Panel 
          header="直播管理数据统计" 
          className="data_panel"
          key="live">
          <Row gutter={16}>
            <Col span={8}>
              <Card
                style={{ width: 300 }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}>
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title="肖奈"
                  description="普通直播室"
                />
                <Statistic.Countdown 
                  title='开播倒计时' 
                  value={this.state.deadline} 
                  onFinish={this.onFinish} 
                  format="HH:mm:ss:SSS" />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                style={{ width: 300 }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}>
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title="许云瑶"
                  description="VIP专属直播室"
                />
                <Statistic.Countdown 
                  title='开播倒计时' 
                  value={this.state.deadline} 
                  onFinish={this.onFinish} />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                style={{ width: 300 }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}>
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title="胡天"
                  description="文字直播室"
                />
                <Statistic.Countdown 
                  title='开播倒计时' 
                  value={this.state.deadline} 
                  onFinish={this.onFinish} 
                  format="D 天 H 时 m 分 s 秒"/>
              </Card>
            </Col>
          </Row>
        </Panel>
        <Panel 
          header="活动管理数据统计"
          className="data_panel" 
          key="activity">
            <Timeline mode="alternate">
              <Timeline.Item>3月8号女王节活动</Timeline.Item>
              <Timeline.Item color="green">2月19元宵节充值大酬宾</Timeline.Item>
              <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>春节小程序金猪收集金币兑换大礼包</Timeline.Item>
              <Timeline.Item color="red">圣诞庆典 2018-12-25</Timeline.Item>
              <Timeline.Item>国庆砸金蛋送VIP 2018-10-01</Timeline.Item>
              <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>上线开业大优惠 2018-03-029</Timeline.Item>
            </Timeline>
        </Panel>
      </Collapse>
    )
  }
}

export default Index
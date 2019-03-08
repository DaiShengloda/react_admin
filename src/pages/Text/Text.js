import React, { Component } from 'react'
import { Table, Input, Button, Icon } from 'antd'
import Highlighter from 'react-highlight-words'
import Const from '../../api/Const'
import Httplist from '../../api/Httplist'
import Methods from '../../api/Methods'
import './Text.scss'

class Text extends Component {
  state = {
    data: [],
    searchText: '',
    pagination: {},
    loading: false,
  }

  componentDidMount() {
    this.fetch()
  }

  /**
   * table变化时触发
   * pagination -- 分页
   * filters -- 过滤
   * sorter -- 排序
   */
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.fetch({
      page_no: pagination.current,
    })
  }

  fetch = (params = {}) => {
    this.setState({ loading: true })
    Httplist.getRequest(Const.API_URL.NOTE_LIST,{
      page_no: 1,
      page_size: 10,
      list_type: 2,
      ...params,
    }).then( data => {
      const pagination = { ...this.state.pagination }
      pagination.total = 200
      this.setState({
        loading: false,
        data: data,
        pagination,
      })
    })
  }

  getColumnSearchProps = (dataIndex,title) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`输入${title}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  render() {
    const columns = [{
      title: '头衔',
      dataIndex: 'user_title',
      key: 'user_title',
      width: '20%',
      ...this.getColumnSearchProps('user_title','头衔'),
    }, {
      title: '内容',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      className: 'row_cont',
      ...this.getColumnSearchProps('title','内容'),
    }, {
      title: '类型',
      dataIndex: 'sign',
      key: 'sign',
      width: '15%',
      ...this.getColumnSearchProps('sign','类型'),
    }, {
      title: '作者',
      dataIndex: 'user_name',
      key: 'user_name',
      width: '15%',
      ...this.getColumnSearchProps('user_name','作者'),
    }, {
      title: '时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: '20%',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.create_time - b.create_time,
      render: (text) => {
        return Methods.formatTimeLocal(text)
      }
    }];
    return(
      <Table 
        columns={columns} 
        bordered={true}
        className='text_table'
        rowClassName="table_row"
        rowKey={'contentid'}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}/>
    )
  }
}

export default Text
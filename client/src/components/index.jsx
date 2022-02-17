import React, { Component } from 'react';
import { Resizable } from 'react-resizable';
import './style.css';
import './example.css';
import axios from 'axios';
import MemberForm from './form';
import Table from './table';
import DisplayAnalytics from './displayAnalytics';

export default class Example extends Component {
  state = {

    box1width: window.innerWidth / 2 - 30,
    box1height: 500,
    box2width: window.innerWidth / 2 - 30,
    box2height: 500,
    box3width: window.innerWidth - 40,
    box3height: 300,

    box1style: { height: 500, width: window.innerWidth / 2 - 30, marginTop: 0, marginLeft: 0 },
    box2style: { height: 500, width: window.innerWidth / 2 - 30, marginTop: 0, marginRight: 0 },
    box3style: { height: 300, width: window.innerWidth - 40, marginTop: 0, marginLeft: 0 },

    members: [],
    memberToEdit: {},
    analyticsData: []
  };

  componentDidMount = () => {
    this.fetchMembers();
    this.getAnalyticsData();

  }

  getAnalyticsData = () => {
    axios.get('http://localhost:5000/api/getAnalytics').then(res => { return res }).then(result => {
      this.setState({ analyticsData: result.data.analyticsData })
    })
  }

  fetchMembers = () => {
    axios.get('http://localhost:5000/api/fetchMember').then(res => { return res }).then(result => {
      this.setState({ members: result.data })
    })
  }

  onFirstBoxResize = (event, { element, size, handle }) => {
    if (size.width <= 25) return;
    if (handle === 's') {
      this.setState({
        box1height: size.height,
        box1style: { ...this.state.box1style, height: size.height },
      })
    } else if (handle === 'e') {
      this.setState({
        box1width: size.width,
        box1style: { ...this.state.box1style, width: size.width },
        box2style: { ...this.state.box2style, width: window.innerWidth - (size.width + 60 + this.state.box2style.marginRight) },
        box2width: window.innerWidth - (size.width + 60 + this.state.box2style.marginRight)
      });
    } else if (handle === 'n') {
      if ((this.state.box1style.marginTop + this.state.box1style.height - size.height) <= 0) return;
      this.setState({
        box1height: size.height,
        box1style: { ...this.state.box1style, height: size.height, marginTop: this.state.box1style.marginTop + this.state.box1style.height - size.height }
      })
    } else {
      if ((this.state.box1style.marginLeft + this.state.box1style.width - size.width) <= 0) return;
      this.setState({
        box1width: size.width,
        box1style: { ...this.state.box1style, width: size.width, marginLeft: this.state.box1style.marginLeft + this.state.box1style.width - size.width }
      })
    }
  };

  onSecondBoxResize = (event, { element, size, handle }) => {
    if (size.width <= 25) return;
    if (handle === 's') {
      this.setState({
        box2height: size.height,
        box2style: { ...this.state.box2style, height: size.height },
      })
    } else if (handle === 'w') {
      this.setState({
        box2width: size.width,
        box2style: { ...this.state.box2style, width: size.width },
        box1style: { ...this.state.box1style, width: window.innerWidth - (size.width + 60 + this.state.box1style.marginLeft) },
        box1width: window.innerWidth - (size.width + 60 + this.state.box1style.marginLeft)
      });
    } else if (handle === 'n') {
      if ((this.state.box2style.marginTop + this.state.box2style.height - size.height) <= 0) return;
      this.setState({
        box2height: size.height,
        box2style: { ...this.state.box2style, height: size.height, marginTop: this.state.box2style.marginTop + (this.state.box2style.height - size.height) }
      })
    } else {
      //handle = 'e'
      if ((this.state.box2style.marginRight + this.state.box2style.width - size.width) <= 0) return;
      this.setState({
        box2width: size.width,
        box2style: { ...this.state.box2style, width: size.width, marginRight: this.state.box2style.marginRight + this.state.box2style.width - size.width }
      })
    }
  };

  onThirdBoxResize = (event, { element, size, handle }) => {
    if (size.width <= 25) return;
    if (handle === 's') {
      this.setState({
        box3height: size.height,
        box3style: { ...this.state.box3style, height: size.height },
      })
    } else if (handle === 'w') {
      this.setState({
        box3width: size.width,
        box3style: { ...this.state.box3style, width: size.width, marginLeft: this.state.box3style.marginLeft + this.state.box3style.width - size.width },
      });
    } else if (handle === 'n') {
      if ((this.state.box3style.marginTop + this.state.box3style.height - size.height) <= 0) return;
      this.setState({
        box3height: size.height,
        box3style: { ...this.state.box3style, height: size.height, marginTop: this.state.box3style.marginTop + (this.state.box3style.height - size.height) }
      })
    } else {
      //handle = 'e'
      this.setState({
        box3width: size.width,
        box3style: { ...this.state.box3style, width: size.width }
      })
    }
  };

  handleSubmit = (data) => {

    if (this.state.memberToEdit._id === undefined) {
      // insert api
      const analyticsData = { name: "addCount" }
      axios.post('http://localhost:5000/api/addMember', data).then(res => {
        axios.put('http://localhost:5000/api/updateAnalytics', analyticsData).then(analyticsRes => this.getAnalyticsData())
        this.fetchMembers();
      });
    } else {
      // update api
      const analyticsData = { name: "updateCount" }
      axios.put('http://localhost:5000/api/updateMember', data).then(res => {
        axios.put('http://localhost:5000/api/updateAnalytics', analyticsData).then(analyticsRes => this.getAnalyticsData())
        this.fetchMembers();
      });
      this.setState({ memberToEdit: {} })
    }
  }

  selectMemberToEdit = (id) => {
    this.setState({ memberToEdit: this.state.members.find(item => item._id === id) })
  }

  render() {
    return (
      <div>
        <div className="layoutRoot">
          <Resizable className="box" height={this.state.box1height} width={this.state.box1width} onResize={this.onFirstBoxResize} resizeHandles={['w', 'e', 'n', 's']}>
            <div style={this.state.box1style}>
              <MemberForm data={this.state.memberToEdit} handleSubmit={this.handleSubmit} />
            </div>
          </Resizable>
          <Resizable className="box" height={this.state.box2height} width={this.state.box2width} onResize={this.onSecondBoxResize} resizeHandles={['w', 'e', 'n', 's']}>
            <div style={this.state.box2style}>
              <DisplayAnalytics analyticsData={this.state.analyticsData} />
            </div>
          </Resizable>
        </div>
        <div className="layoutRoot">
          <Resizable className="box" height={this.state.box3height} width={this.state.box3width} onResize={this.onThirdBoxResize} resizeHandles={['w', 'e', 'n', 's']}>
            <div style={this.state.box3style}>
              <Table members={this.state.members} selectMemberToEdit={this.selectMemberToEdit} />
            </div>
          </Resizable>
        </div>

      </div>
    );
  }
}
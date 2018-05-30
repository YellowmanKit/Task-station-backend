import React, { Component } from 'react';
import './Content.css';
import axios from 'axios';

import NavBar from '../Items/NavBar';
import TodayMission from './DetailPages/TodayMission';
import MissionSetting from './DetailPages/MissionSetting';
import ResidentInfo from './DetailPages/ResidentInfo';

class Detail extends Component {

  constructor(props){
    super(props);
    this.state = {
      catagories: [
        {
          key: 'todayMission',
          name: '今日任務'
        },
        {
          key: 'missionSetting',
          name: '任務設定'
        },
        {
          key: 'residentInfo',
          name: '院友資料'
        }
      ],
      detailFunctions: {
        changeTempAssign: this.changeTempAssign.bind(this)
      },
      tempAssign : (' ' + this.props.profile.record.assign).slice(1)
    }
  }

  changeTempAssign(index,checked){
    var newAssign = this.replaceAt(this.state.tempAssign,index,checked?'1':'0');
    this.setState({
      tempAssign: newAssign
    });
    axios.get(this.props.contentFunctions.getApi() + 'updateAssign/' + this.props.profile.MemID + '/'+ newAssign);
  }

  replaceAt(myString,index, replacement) {
    var upper = myString.substring(0, index)
    var lower = myString.substring(index + 1, myString.length)
    var newStr = upper + replacement + lower;
    return newStr;
  }

  render(){

    //console.log(this.state.tempAssign)

    let detailStyle = {
      width: '80%',
      height: '' + this.props.height + 'px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'transparent',
      marginTop: '100px'
    }

    let sepStyle = {
      width: '100%',
      height: '2px',
      backgroundColor: 'black',
      opacity: 0.25
    }

    let content =
    this.props.detailStatus.onPage === 'todayMission'?
    <TodayMission
    record={this.props.profile.record}
    tasks={this.props.tasks}
    contentFunctions={this.props.contentFunctions}/>:

    this.props.detailStatus.onPage === 'missionSetting'?
    <MissionSetting
    tempAssign={this.state.tempAssign}
    profile={this.props.profile}
    tasks={this.props.tasks}
    height={this.props.height}
    detailFunctions={this.state.detailFunctions}
    contentFunctions={this.props.contentFunctions}/>:

    this.props.detailStatus.onPage === 'residentInfo'?
    <ResidentInfo
    profile={this.props.profile}
    height={this.props.height}
    detailFunctions={this.state.detailFunctions}
    contentFunctions={this.props.contentFunctions}/>:
    <div/>;

    return(
      <div style={detailStyle}>
        <div style={sepStyle}/>
        <NavBar catagories={this.state.catagories} detailStatus={this.props.detailStatus} contentFunctions={this.props.contentFunctions}/>
        <div style={sepStyle}/>
        {content}
      </div>
    )
  }

}

export default Detail;

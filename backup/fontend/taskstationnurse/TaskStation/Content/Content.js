import React, { Component } from 'react';
import './Content.css';
import axios from 'axios';

import Background from '../Images/bg.jpg';
import contentBg from '../Images/Content_bg.png';
import BG_Taskstation from '../Images/taskstation_bg.png';
import taskstationIcon from '../Images/taskstation_icon.png';

import ResidentList from './ResidentList';
import Detail from './Detail';
import Modal from '../Items/Modal';


class Content extends Component {

  constructor(props){
    super(props);
    this.state = {
      noPassword: false,
      loaded: true,

      showDetail: false,
      currentSeasonCode: 0,
      profiles: [],
      data: false,
      tasks:[],
      detailToCheck: {
        profile: {},
        data: {}
      },
      detailStatus:{
        onPage: 'todayMission'
      },
      contentFunctions:{
        loadTaskstationStatus: this.loadTaskstationStatus.bind(this),
        getDateString: this.getDateString.bind(this),
        getApi: this.getApi.bind(this),

        showDetail: this.showDetail.bind(this),
        switchDetailPage: this.switchDetailPage.bind(this),

        setModal: this.setModal.bind(this),
        isIndependent: this.isIndependent.bind(this),
        getLevelNameByScore: this.getLevelNameByScore.bind(this),
        getCurrentSeasonCode: this.getCurrentSeasonCode.bind(this)
      },
      modalStatus: {
        status: 'none',
        onConfirm: null
      }
    }
    this.loadAppData();
  }

  getLevelNameByScore(score){
    var name =
    score >= 79? '紫鑽級':
    score >= 71? '藍鑽級':
    score >= 63? '紅鑽級':
    score >= 55? '橙鑽級':
    score >= 47? '白鑽級':
    score >= 39? '紅玉級':
    score >= 31? '黃玉級':
    score >= 23? '翠玉級':
    score >= 17? '紫晶級':
    score >= 13? '粉晶級':
    score >= 9? '青晶級':
    score >= 6? '黃金級':
    score >= 4? '銀級':
    score >= 2? '銅級':
    '鐵級';

    return name;
  }

  isIndependent(code){
    if(this.state.tasks[code].assign.charAt(0) === '1'){
      return true;
    }
    return false;
  }

  getApi(){
    return this.props.apiServer;
  }

  setModal(_status,_onConfirm){
    this.setState({
      modalStatus:{
        status: _status,
        onConfirm: _onConfirm
      }
    })
  }

  loadAppData(){
    this.loadTaskstationStatus();
    this.loadTasks();
    this.loadCurrentSeasonCode();
  }

  loadTaskstationStatus(){
    axios.get(this.props.apiServer + 'taskstation').then(res=>{
      //console.log(res.data);
      this.setState({
        profiles: res.data
      });
      //console.log(this.state.profiles);
    });
  }

  loadTasks(){
    axios.get(this.props.apiServer + 'tasks').then(res=>{
      //console.log(res.data);
      this.setState({
        tasks: res.data
      });
    });
  }

  loadCurrentSeasonCode(){
    axios.get(this.props.apiServer + 'currentseasoncode').then(res=>{
      //console.log(res.data);
      this.setState({
        currentSeasonCodeasoncode: res.data
      });
    });
  }

  getCurrentSeasonCode(){
    return this.state.currentSeasonCode;
  }

  getHeight(){
    var extraHeight = 0;
    if(this.state.showDetail && this.state.detailStatus.onPage === 'missionSetting'){
      extraHeight += (this.state.tasks.length - 8) * 100;
    }
    if(!this.state.showDetail && this.state.profiles.length > 9){
      extraHeight += (this.state.profiles.length - 9) * 75;
    }
    return 1000 + extraHeight;
  }

  handleTopRightButton(){
    if(this.state.showDetail){
      this.loadTaskstationStatus();
      this.setState({
        showDetail: false,
        detailStatus: {
          onPage: 'todayMission'
        }
      });
    }else if(this.props.logStatus.logged){
      this.tryLogout();
    }
  }

  tryLogout(){
    this.setState({
      modalStatus: {
        status: 'confirmLogout',
        onConfirm: this.props.mainFunctions.logout
      }
    })
  }

  passwordSubmitted(event){
    event.preventDefault();
    let pw = document.getElementById("pw").value;
    if(pw !== ""){
      this.props.mainFunctions.login(pw);
      this.setState({
        noPassword: false
      });
      this.loadAppData();
    }else{
      this.setState({
        noPassword: true
      });
    }
  }

  getTimestamp(){
    var date = new Date();
    return date.getTime();
  }

  getDateString() {
    let date = new Date();
    let year = date.getFullYear();
    let monthIndex = date.getMonth() + 1;
    let day = date.getDate();

    let dateStr = year + '-' + this.addZeroIfSingle(monthIndex) + '-' + this.addZeroIfSingle(day);
    //console.log(dateStr);
    //return '2018-02-08';
    return dateStr;
  }

  addZeroIfSingle(num){
    if(num < 10){
      return '0' + String(num);
    }else{
      return '' + String(num);
    }
  }

  showDetail(_profile){
    this.setState({
      showDetail: true,
      detailToCheck: {
        profile: _profile
      }
    })
  }

  switchDetailPage(page){
    this.setState({
      detailStatus:{
        onPage: page
      }
    })
  }

  render() {

    window.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };

    if(!this.state.loaded){
      return <div/>
    }

    let bigboardStyle = {
      width: '100%',
      height: '' + this.getHeight() + 'px',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',

      backgroundImage: 'url(' + Background + ')',
      backgroundSize: 'cover'
    };

    let contentStyle = {
      width: '100%',
      height: '' + this.getHeight() + 'px',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',


      backgroundImage: 'url(' + contentBg + ')',
      backgroundSize: 'contain'
    }

    if(this.props.logStatus.logged){

      let profileName = this.state.showDetail? ' - ' + this.state.detailToCheck.profile.ElderName:'';

      let title = '每日小任務' + profileName;

      let iconStyle = {
        minWidth: '70px',
        minHeight: '70px',
        backgroundImage: 'url(' + taskstationIcon + ')',
        backgroundSize:'contain',
        backgroundRepeat: 'no-repeat'
      }

      let titleArea =
      <div className="TitleArea">
        <div style={iconStyle}></div>
        <p className="title">{title}</p>
      </div>;

      let topLeftButton =
      <button className="topRightButton" onClick={this.handleTopRightButton.bind(this)} />;

      let headerStyle = {
        width: '100%',
        height: '90px',
        backgroundColor: '#6D6B6A',
        display: 'flex',
        justifyContent: 'center'
      }

      let header =
      <header style={headerStyle}>{topLeftButton}{titleArea}</header>;

      let subcontent = !this.state.showDetail?
      <ResidentList
      profiles={this.state.profiles}
      contentFunctions={this.state.contentFunctions}
      height={this.getHeight() - 90}/>:
      <div/>;

      if(this.state.showDetail){
        return(
          <div style={bigboardStyle}>
            <div style={contentStyle}>
              {header}
              <Detail
              tasks={this.state.tasks}
              detailStatus={this.state.detailStatus}
              profile={this.state.detailToCheck.profile}
              contentFunctions={this.state.contentFunctions}
              height={this.getHeight() - 190}/>
            </div>
            <Modal status={this.state.modalStatus.status} onConfirm={this.state.modalStatus.onConfirm} onCancel={()=>{this.setModal('none',null)}} height={this.getHeight()}/>
          </div>
        )
      }

      return (
        <div style={bigboardStyle}>
          <div style={contentStyle}>
            {header}
            {subcontent}
          </div>
          <Modal status={this.state.modalStatus.status} onConfirm={this.state.modalStatus.onConfirm} onCancel={()=>{this.setModal('none',null)}} height={this.getHeight()}/>
        </div>
      );
    }

    let loginContentType = {
      width: '450px',
      height: '400px',
      margin: 'auto',
      marginTop: '200px',

      backgroundImage: "url(" + BG_Taskstation + ")",
      backgroundSize: 'contain'
    }

    let loginFailedMessage =
    this.state.noPassword? <div className="NoPasswordMessage"/>:
    this.props.logStatus.loginFailed? <div className="LoginFailedMessage"/>:
    null;

    return (
      <div style={bigboardStyle}>
        <div style={loginContentType}>
          <form className="LoginInfo" onSubmit={this.passwordSubmitted.bind(this)}>
            <input id="pw" className="password" type="password" placeholder="密碼"/>
            {loginFailedMessage}
            <input className="submitPassword" type="submit" value="" />
          </form>
        </div>
      </div>
    );
  }

}

export default Content;

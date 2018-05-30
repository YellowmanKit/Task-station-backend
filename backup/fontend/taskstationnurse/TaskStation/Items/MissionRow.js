import React, { Component } from 'react';
import './Item.css';

import tickImg from '../Images/box_tick.png';
import noTickImg from '../Images/box.png';

class MissionRow extends Component {

  constructor(props){
    super(props);
    this.state = {
      checked: this.props.tempAssign.charAt(this.props.code) === '1'? true:false
    }
  }

  onCheckboxClicked(){
    this.props.detailFunctions.changeTempAssign(this.props.code,!this.state.checked);
    this.setState({
      checked: !this.state.checked
    });
  }

  render(){

    let _style={
      width: '100%',
      height: '95px',
      display: 'flex',
      flexFlow: 'row nowrap',
      backgroundColor: '#C5C4C3'
    }

    let nameAreaStyle={
      flex: 3,
      backgroundColor: '#fffaf2',
      marginTop: 2,
      marginRight: 2,
      display: 'flex',
      alignItems: 'center'
    }

    let nameTextStyle = {
      flex: 1,
      fontFamily: 'adobestdb',
      fontSize: '2em',
      fontWeight: 'bold',
      textAlign: 'left',
      lineHeight: '1',
      color: this.props.task.assign.charAt(0) === '1'?'#096887':'#EA7443',
    }

    let countTextStyle = {
      flex: 1,
      fontFamily: 'adobestdb',
      fontSize: '2em',
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: '90px',
      backgroundColor: '#fffaf2',
      marginTop: 2,
      marginRight: 2,
      color: '#6D6B6A',
    }

    let assignBtnAreaStyle={
      flex: 1,
      backgroundColor: '#fffaf2',
      marginTop: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    let img = this.state.checked? tickImg:noTickImg;

    let assignBtnStyle={
      width: '75px',
      height: '75px',
      backgroundColor: 'transparent',
      backgroundImage: 'url(' + img + ')',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      border: 'none',
      cursor: 'pointer'
    }

    return(
      <div style={_style}>
        <div style={nameAreaStyle}>
          <div style={nameTextStyle}>{this.props.task.desc}</div>
        </div>
        <div style={countTextStyle}>{this.props.profile.seasonprofile.completedCountForEachTasks[this.props.code]}</div>
        <div style={assignBtnAreaStyle}>
          <button style={assignBtnStyle} onClick={this.onCheckboxClicked.bind(this)}></button>
        </div>
      </div>
    )
  }

}

export default MissionRow;

import React, { Component } from 'react';
import '../Content.css';

import completedIcon from '../../Images/completed.png';
import notCompletedIcon from '../../Images/notcompleted.png';

class TodayMission extends Component {

  renderMisionRow(index,task){

    let _style = {
      width: '100%',
      height: '100px',

      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center'
    }

    let nameTextStyle = {
      flex: 9,
      fontFamily: 'adobestdb',
      fontSize: '2em',
      fontWeight: 'bold',
      textAlign: 'left',
      lineHeight: 1,
      color: this.props.contentFunctions.isIndependent(task.code)?'#096887':'#EA7443',
    }

    let icon = task.completed? completedIcon:notCompletedIcon;

    let statusIconStyle = {
      width: '75px',
      height: '75px',
      backgroundImage: 'url(' + icon + ')',
      backgroundSize:'contain',
      backgroundRepeat: 'no-repeat'
    }

    let status = task.completed? '已完成':'未完成';

    let statusTextStyle = {
      flex: 1,

      fontFamily: 'adobestdb',
      fontSize: '2em',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#6D6B6A',
      lineHeight: 1,
    }
    return(
      <div style={_style}>
        <div style={nameTextStyle}>{'' + index + '. ' + this.props.tasks[task.code].desc}</div>
        <div style={statusIconStyle}/>
        <div style={statusTextStyle}> {status} </div>
      </div>
    )
  }

  render(){

    let _style = {
      width: '100%',
      height: '800px',

      display: 'flex',
      flexFlow: 'column nowrap'
    }

    let sepStyle = {
      width: '100%',
      height: '1px',
      backgroundColor: 'black',
      opacity: 0.15
    }

    return(
      <div style={_style}>
        {this.renderMisionRow(1,this.props.record.taskStatus.tasks[0])}
        <div style={sepStyle}/>
        {this.renderMisionRow(2,this.props.record.taskStatus.tasks[1])}
        <div style={sepStyle}/>
        {this.renderMisionRow(3,this.props.record.taskStatus.tasks[2])}
      </div>
    )
  }

}

export default TodayMission;

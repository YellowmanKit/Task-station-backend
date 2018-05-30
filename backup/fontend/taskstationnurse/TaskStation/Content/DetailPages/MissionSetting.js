import React, { Component } from 'react';
import '../Content.css';

import MissionRow from '../../Items/MissionRow';

class MissionSetting extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  renderTaskList(){
    return this.props.tasks.map((_task,i)=>{
      return(
        <MissionRow
        key={_task._id}
        task={_task}
        profile={this.props.profile}
        tempAssign={this.props.tempAssign}
        code={i}
        detailFunctions={this.props.detailFunctions}
        contentFunctions={this.props.contentFunctions} />
      )
    });
  }

  render(){

    let _style = {
      width: '100%',
      height: this.props.height,

      display: 'flex',
      flexFlow: 'column nowrap'
    }

    let items = ['任務','完成次數','給予'];

    return(
      <div style={_style}>
        <div className="listTopBar">
          <div className="listTopBarItemFlex3"> {items[0]} </div>
          <div className="listTopBarItem"> {items[1]} </div>
          <div className="listTopBarItem"> {items[2]} </div>
         </div>
        {this.renderTaskList()}
      </div>
    )
  }

}

export default MissionSetting

import React, { Component } from 'react';
import './Content.css';
import ResidentRow from '../Items/ResidentRow';

class ResidentList extends Component {

  renderListTopBarItems(){
    let barItems = ['姓名','印花','等級','類型','詳細資料'];
    return barItems.map(item=>{
      return <div key={item} className="listTopBarItem"> {item} </div>
    })
  }

  renderResidentList(){
    return this.props.profiles.map(_profile=>{
      return(
        <ResidentRow key={_profile.profile.MemID}
        profile={_profile.profile}
        contentFunctions={this.props.contentFunctions}/>
      );
    })
  }

  render(){
    if(!this.props.profiles){
      return(
        <div/>
      )
    }

    let subcontentStyle = {
      width: '80%',
      height: '' + this.props.height + 'px',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap'
    }

    return(
      <div style={subcontentStyle}>
        <div className="remarkArea">*每三個月會重新計算一次等級及印花</div>
        <div className="listTopBar"> {this.renderListTopBarItems()} </div>
        {this.renderResidentList()}
      </div>
    )
  }
}

export default ResidentList;

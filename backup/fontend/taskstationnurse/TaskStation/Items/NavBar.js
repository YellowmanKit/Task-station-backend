import React, { Component } from 'react';
import './Item.css';

import indBlock from '../Images/ind_block.png';
import supBlock from '../Images/sup_block.png';

class NavBar extends Component {

  renderChoices(){

    return this.props.catagories.map(item=>{
      let buttonAreaStyle = {
        flex: 3,

        fontFamily: 'adobestdb',
        fontSize: '1.4em',
        fontWeight: 'bold',
        lineHeight: 1,
        textAlign: 'center',
        backgroundColor: 'transparent',
        color: item.key === this.props.detailStatus.onPage?'#666666':'#C5C4C3',
        border: 'none',
        cursor: 'pointer'
      }
      return(
        <div key={item.key} style={buttonAreaStyle}>
          <button style={buttonAreaStyle} onClick={()=>{this.props.contentFunctions.switchDetailPage(item.key)}}>
            {item.name}
          </button>
        </div>
      )
    })
  }

  renderHint(indMission){

    let hintAreaStyle = {
      flex: 1,

      display: 'flex',
      flexFlow: 'row nowrap',

      border: 'none',
      cursor: 'pointer',

      opacity: this.props.detailStatus.onPage === 'residentInfo'? 0:1
    }

    let icon = indMission? indBlock:supBlock;

    let name = indMission? '獨立任務':'輔助任務';

    let iconStyle = {
      width: '50px',
      height: '50px',

      backgroundImage: 'url(' + icon + ')',
      backgroundSize:'contain',
      backgroundRepeat: 'no-repeat'
    }

    let nameStyle ={
      width: '125px',
      height: '50px',
      fontFamily: 'adobestdb',
      fontSize: '1.25em',
      fontWeight: 'bold',
      textAlign: 'left',

      backgroundColor: 'transparent',
      color: indMission?'#096887':'#EA7443',
    }

    return(
    <div style={hintAreaStyle}>
      <div style={iconStyle}/>
      <div style={nameStyle}>{name}</div>
    </div>
    )
  }

  render(){

    let navBarStyle = {
      width: '100%',
      height: '60px',

      display:'flex',
      flexFlow : 'row nowrap',
      alignItems: 'center'

    }

    let choiceAreaStyle = {
      flex: 3,
      display:'flex',
      flexFlow : 'row nowrap',
    }

    let hintAreaStyle = {
      flex: 1,
      display:'flex',
      flexFlow : 'row nowrap',
      justifyContent: 'flex-end'
    }

    return(
      <div style={navBarStyle}>
        <div style={choiceAreaStyle}>
          {this.renderChoices()}
        </div>
        <div style={hintAreaStyle}>
          {this.renderHint(true)}
          {this.renderHint(false)}
        </div>
      </div>
    )
  }
}

export default NavBar;

import React, { Component } from 'react';
import axios from 'axios';

class ResidentInfo extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
    this.loadResidentInfo();
  }

  async loadResidentInfo(){
    var seasonProfiles = await axios.get(this.props.contentFunctions.getApi() + 'seasonProfiles/' + this.props.profile.MemID);
    //console.log(seasonProfiles.data)
  }

  render(){

    let containerStyle={
      width: '100%',
      height: '700px',
      display: 'flex',
      flexFlow: 'column nowrap'
    }

    let headerStyle = {
      width: '100%',
      height: '75px',
      backgroundColor: '#C5C4C3',
      display: 'flex',
      flexFlow: 'row nowrap',

      fontFamily: 'adobestdb',
      fontWeight: 'bold',
      textAlign: 'center',
    }

    let items = ['每季成就','任務完成總數(每週)'];

    let itemStyle1 = {
      flex: 3,
      height: '75px',
      fontSize: '2.5em',
      color: '#fffaf2',
      backgroundColor: '#989898'
    }

    let itemStyle2 = Object.assign({},itemStyle1);
    itemStyle2.flex = 5;
    itemStyle2.marginLeft = 2;

    let header =
    <div style={headerStyle}>
      <div style={itemStyle1}>{items[0]}</div>
      <div style={itemStyle2}>{items[1]}</div>
    </div>

    let subcontainerStyle={
      width: '100%',
      height: '625px',
      backgroundColor: '#C5C4C3',
      display: 'flex',
      flexFlow: 'row nowrap'
    }

    let subLeftStyle={
      flex: 3,
      display: 'flex',
      flexFlow: 'column nowrap',
      marginRight: 2
    }

    let subRightStyle={
      flex: 5,
      backgroundColor:'#fffaf2',
      marginRight: 2
    }

    let option = ['2018/ 1 ~ 3月','2018/ 4 ~ 6月','2018/ 7 ~ 9月'];

    let typeOptions = option.map((type,i)=>{
      return <option key={type}>{type}</option>
    });

    let periodSelect =
    <select style={{
      fontFamily: 'adobestdb',
      fontSize: '1.6em',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#898989',
      margin: '15px',

      flex: 1}}
      value='option1'
      onChange={()=>{}}>
      {typeOptions}
    </select>;

    let scoreText = '23';
    let levelText = '翠玉級';
    let missionCount = '69';

    let textStyle1 = {
      fontFamily: 'adobestdb',
      fontSize: '4em',
      lineHeight: 1.95,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#6D6B6A',
      overflow: "hidden",
      textOverflow: 'ellipsis',
      flex: 6
    }
    let textStyle2 = Object.assign({},textStyle1);
    textStyle2.fontSize = '2em';
    textStyle2.lineHeight = 1.25;
    textStyle2.flex = 3;
    let textStyle3 = Object.assign({},textStyle1);
    textStyle3.fontSize = '4em';

    let hintStyle = {
      fontFamily: 'adobestdb',
      fontSize: '2em',
      lineHeight: 1.65,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#989898',
      overflow: "hidden",
      textOverflow: 'ellipsis',
      flex: 1,
      margin: 15
    }

    return(
      <div style={containerStyle}>
        {header}
        <div style={subcontainerStyle}>
          <div style={subLeftStyle}>
            <div style={{flex: 2,display: 'flex',backgroundColor:'#fffaf2'}}>
              {periodSelect}
            </div>
            <div style={{flex: 5,display: 'flex',backgroundColor:' #fffaf2'}}>
              <div style={{flex: 1,display: 'flex',flexFlow:'row nowrap',margin:'0px 15px 5px 15px'}}>
                <div style={{flex: 1,display: 'flex',flexFlow:'column nowrap',backgroundColor:'#EAD1DB',margin:5,borderRadius: 7}}>
                  <div style={textStyle1}>
                    {scoreText}
                  </div>
                  <div style={textStyle2}>
                    印花
                  </div>
                </div>
                <div style={{flex: 1,display: 'flex',flexFlow:'column nowrap',backgroundColor:'#F7E0AF',margin:5,borderRadius: 7}}>
                  <div style={textStyle3}>
                    {levelText}
                  </div>
                  <div style={textStyle2}>
                    等級
                  </div>
                </div>
              </div>
            </div>
            <div style={{flex: 5,display: 'flex',backgroundColor:'#fffaf2'}}>
              <div style={{flex: 1,display: 'flex',flexFlow:'column nowrap',backgroundColor:'#F5F4C6',margin:'0px 20px 5px 20px',borderRadius: 7}}>
                <div style={textStyle1}>
                  {missionCount}
                </div>
                <div style={textStyle2}>
                  任務完成次數
                </div>
              </div>
            </div>
            <div style={{flex: 3,display: 'flex',backgroundColor:'#fffaf2'}}>
              <div style={hintStyle}>
                *每三個月會重新計算一次印花、等級及任務完成次數。
              </div>
            </div>
          </div>
          <div style={subRightStyle}>
          </div>
        </div>
      </div>
    )
  }

}

export default ResidentInfo;

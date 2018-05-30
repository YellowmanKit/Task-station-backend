import React, { Component } from 'react';
import './Item.css';
import axios from 'axios';

class ResidentRow extends Component {

  constructor(props){
    super(props);
    this.state={
      resTypes: ['照顧者','活力者','聰明者'],
      currentResType: props.profile.record.type
    }
  }

  handleSelectResType(event){
    var value = this.state.resTypes.indexOf(event.target.value);

    axios.get(this.props.contentFunctions.getApi() + 'updateType/' + this.props.profile.MemID + '/' + value)
    .then(()=>{
      this.props.contentFunctions.loadTaskstationStatus();
    });
    this.setState({
      currentResType: value
    });
  }

  getScore(){
    return this.props.profile.seasonprofile === undefined? 0:this.props.profile.seasonprofile.score;
  }

  getLevel(){
    return this.props.profile.seasonprofile === undefined? this.props.contentFunctions.getLevelNameByScore(0):this.props.contentFunctions.getLevelNameByScore(this.props.profile.seasonprofile.score);
  }

  render(){

    let typeOptions = this.state.resTypes.map((type,i)=>{
      return <option key={type}
              style={{
                color: i === 0? '#D5515C': i === 1?'#0EAB9F': '#E8AE2B',
                textAlign: 'center'
              }}>{type}</option>
    });

    return(
      <div className="residentRow">
        <div className="residentRowItem">
          {this.props.profile.ElderName}
        </div>
        <div className="residentRowItem">
          {this.getScore()}
        </div>
        <div className="residentRowItem">
          {this.getLevel()}
        </div>
        <div className="residentRowItem">
          <select style={{
            fontFamily: 'adobestdb',
            fontSize: '0.9em',
            fontWeight: 'bold',
            color: this.state.currentResType === 0? '#D5515C': this.state.currentResType === 1?'#0EAB9F': '#E8AE2B',

            width: '150px',
            height: '60px'

            }} value={this.state.resTypes[this.state.currentResType]} onChange={this.handleSelectResType.bind(this)}>
            {typeOptions}
          </select>
        </div>
        <div className="residentRowItem">
          <button className="detailButton" onClick={()=>{this.props.contentFunctions.showDetail(this.props.profile)}}/>
        </div>
      </div>
    )
  }
}

export default ResidentRow;

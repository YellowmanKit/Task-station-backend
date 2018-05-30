var mongoose = require('mongoose');

var settingSchema = mongoose.Schema({
  currentSeasonCode: {
    type: Number
  },
  currentSeasonName: {
    type: String
  },
  currentSeasonEndAt: {
    type: Date
  },
  monthsPerSeason: {
    type: Number
  }
});

var Setting = module.exports = mongoose.model('setting',settingSchema);

module.exports.getSeasonCode = async ()=>{
  var now = new Date();
  var setting = await Setting.findOne(()=>{});
  //console.log(setting);

  var code = setting.currentSeasonCode;

  if(now > setting.currentSeasonEndAt){
    var doUpdate = await Setting.where({_id: "5ad568f5b35c0f140cd0c858"}).
    update({$set:{
      currentSeasonCode: setting.currentSeasonCode + 1,
      currentSeasonName: module.exports.getNewSeasonName(setting.currentSeasonEndAt,setting.monthsPerSeason),
      currentSeasonEndAt: setting.currentSeasonEndAt.setMonth(setting.currentSeasonEndAt.getMonth() + setting.monthsPerSeason)
    }});
    code += 1;
  }
  //console.log('getSeasonCode: ' + code)
  return code;
}

module.exports.getSetting = async (callback)=>{
  Setting.findOne(callback);
}

module.exports.getCurrentSeasonName = async ()=>{
  var setting = await Setting.findOne(()=>{});
  return setting.currentSeasonName;
}

module.exports.getNewSeasonName = (seasonStart,monthsPerSeason)=>{

  var now = seasonStart;
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var seasonLength = monthsPerSeason;
  var monthEnd = month + seasonLength

  var name = year + '/' + month + ' ~ ' + monthEnd + '月';
  return name;
}

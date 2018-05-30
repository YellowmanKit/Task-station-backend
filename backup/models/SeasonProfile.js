var mongoose = require('mongoose');

var seasonProfileSchema = mongoose.Schema({
  MemID: {
    type: String
  },
  seasonCode : {
    type: Number
  },
  seasonName : {
    type: String
  },
  score: {
    type: Number,
    default: 0
  },
  completedCount: {
    type: Number,
    default: 0
  },
  itemName: {
    type: Number,
    default: 0
  },
  completedCountForEachTasks: {
    type: Array
  }
});

var SeasonProfile = module.exports = mongoose.model('seasonprofile',seasonProfileSchema);

Setting = require('./Setting');

module.exports.updateSeasonProfile = async (record,callback)=>{
  var _seasonCode = await Setting.getSeasonCode();
  //var _seasonCode = 0;
  var seasonProfile = await SeasonProfile.findOne({ MemID:record.MemID,seasonCode: _seasonCode}, (err,docs) => {
    return docs
  });
  //console.log(seasonProfile);
  var _completedCountForEachTasks = [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0];
  if(seasonProfile && seasonProfile.completedCountForEachTasks){
    for(var i=0;i<_completedCountForEachTasks.length;i++){
      if(i > seasonProfile.completedCountForEachTasks.length - 1){
        seasonProfile.completedCountForEachTasks.push(0);
      }
    }
    _completedCountForEachTasks = seasonProfile.completedCountForEachTasks;
  }

  var _tasksCompleted = 0;
  for(var i=0;i<record.taskStatus.tasks.length;i++){
    if(!record.taskStatus.tasks[i].completed){
      _tasksCompleted++;
      _completedCountForEachTasks[record.taskStatus.tasks[i].code]++;
    }
  }
  var _score = _tasksCompleted === record.taskStatus.tasks.length? 1:0;

  var q = SeasonProfile.where({MemID:record.MemID,seasonCode: _seasonCode})
  .setOptions({ multi: false, upsert: true })
  .update({$set:
    {
      MemID: record.MemID,
      seasonCode: _seasonCode,
      seasonName: await Setting.getCurrentSeasonName(),
      completedCountForEachTasks: _completedCountForEachTasks
    }
  })
  .update({$inc:
    {
      score: _score,
      completedCount: _tasksCompleted
    }
  },callback);

}

module.exports.getSeasonProfilesByMemID = async (_MemID)=>{
  //console.log(_MemID + ' ' + _seasonCode)
  var seasonProfiles = await SeasonProfile.find({MemID: _MemID},(err,sp)=>{return sp});
  return seasonProfiles;
}

module.exports.getSeasonProfiles = async ()=>{
  var seasonProfiles = await SeasonProfile.find({},(err,sps)=>{return sps});
  //console.log(seasonProfiles)
  return seasonProfiles;
}

module.exports.getSeasonProfilesByCode = async (_seasonCode)=>{
  var seasonProfiles = await SeasonProfile.find({seasonCode: _seasonCode},(err,sps)=>{return sps});
  //console.log(seasonProfiles)
  return seasonProfiles;
}

var mongoose = require('mongoose');

var historySchema = mongoose.Schema({
  MemID: {
    type: String
  },
  taskLogs: {
    type: Array
  }
});

var History = module.exports = mongoose.model('history',historySchema);

module.exports.updateHistory = (record,callback)=>{
  var _tasksCompleted = 0;
  for(var i=0;i<record.taskStatus.tasks.length;i++){
    if(record.taskStatus.tasks[i].completed){
      _tasksCompleted++;
    }
  }
  if(_tasksCompleted === 0){
    return;
  }
  
  var q = History.where({MemID:record.MemID})
  .setOptions({ multi: false, upsert: true })
  .update({$set:
    {MemID: record.MemID}
  })
  .update({$push:
    {taskLogs: record.taskStatus}
  },callback);
}

module.exports.getHistoryByMemID = (_MemID,callback)=>{
  History.findOne({MemID: _MemID},callback);
}

module.exports.getHistory = (callback)=>{
  History.find(callback);
}

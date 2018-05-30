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
  var q = History.where({MemID:record.MemID})
  .setOptions({ multi: false, upsert: true })
  .update({$set:
    {MemID: record.MemID}
  })
  .update({$push:
    {taskLogs: record.taskStatus}
  },callback);
}

module.exports.getHistory = (callback)=>{
  History.find(callback);
}

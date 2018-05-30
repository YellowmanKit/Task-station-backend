var mongoose = require('mongoose');

var recordSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date()
  },
  MemID: {
    type: String
  },
  type: {
    type: Number,
    default: 0
  },
  assign: {
    type: String,
    default: ""
  },
  taskStatus: {
    assignAt: {
      type: Date,
      default: Date.now()
    },
    tasks: {
      type: Array,
      default: []
    }
  }
});

var Record = module.exports = mongoose.model('record',recordSchema);

Task = require('./Task');

module.exports.updateRecordAssign = (_MemID,_assign,callback)=>{
  var q = Record.where({MemID:_MemID})
  .setOptions({ multi: false, upsert: false })
  .update({$set:{ assign: _assign }},callback);
}

module.exports.updateRecordTaskStatus = (_MemID,_taskStatus,callback)=>{
  var q = Record.where({MemID:_MemID})
  .setOptions({ multi: false, upsert: false })
  .update({$set:{ taskStatus: _taskStatus }},callback);
}

module.exports.updateRecordType = (_MemID,_type,callback)=>{
  var q = Record.where({MemID:_MemID})
  .setOptions({ multi: false, upsert: false })
  .update({$set:{ type: _type,assign: Task.defaultAssign(_type) }},callback);
}

module.exports.createRecord = (_MemID)=>{
  var record = {
    createdAt: new Date(),
    old: false,
    MemID: _MemID,
    type: 0,
    assign: Task.defaultAssign('0'),
    taskStatus: Task.createNewTaskStatus(_MemID,Task.defaultAssign('0'))
  };
  Record.create(record,()=>{});
  return record;
}

module.exports.getRecords = (callback,limit)=>{
  Record.find(callback).limit(limit);
}

module.exports.getRecordById = (id,callback)=>{
  Record.findById(id,callback);
}

module.exports.getRecordByMemID = async (_MemID)=>{
  const record = await Record.findOne({MemID: _MemID},(err,rec)=>{return rec});
  return record;
}

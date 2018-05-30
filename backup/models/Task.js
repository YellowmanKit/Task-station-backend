var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  desc: {
    type: String
  },
  assign: {
    type: String
  }
});

var Task = module.exports = mongoose.model('task',taskSchema);

Record = require('./Record');


module.exports.getTasks = (callback,limit)=>{
  Task.find(callback).limit(limit);
}

module.exports.defaultAssign = (type,callback)=>{
  //console.log(type);
  var assign =
  type === '0'? "1111111111111111111111111111111":
  type === '1'? "1111111010111111111111111111111":
  type === '2'? "1111111111011001011101000010000":
  "";
  //console.log(assign);

  return assign;
}

module.exports.createNewTaskStatus = (MemId,assign)=>{
  //console.log("createNewTaskStatus")
  var length = assign.length;
  var used = [];
  var codes = [0,1,2];
  for(var i=0;i<3;i++){
    for(var j=0;j<999;j++){
      var code = getRndInteger(0,length);
      if(!used.includes(code) && (assign.charAt(code) !== 0)){
        used.push(code);
        codes[i] = code;
        break;
      }
    }
  }

  var newStatus = {
    assignAt: new Date(),
    tasks: [
      {
        code: codes[0],
        completed: false
      },
      {
        code: codes[1],
        completed: false
      },
      {
        code: codes[2],
        completed: false
      },
    ]
  }
  return newStatus;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

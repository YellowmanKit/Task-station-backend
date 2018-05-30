var cors = require('cors');
var express = require('express');
var axios = require('axios');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongoose = require('mongoose');

Task = require('./models/Task');
Record = require('./models/Record');
Setting = require('./models/Setting');
History = require('./models/History');
SeasonProfile = require('./models/SeasonProfile');

mongoose.connect('mongodb://localhost/taskstation');
var db = mongoose.connection;

app.use(cors({
  exposeHeaders: "*"
}));

const ernestapi = "http://10.0.48.22/EHMS_UAT/api/getResBedPrfl/";

app.get('/api/taskstationres/:nfcId',async (req,res)=>{
  const profile = await axios.get(ernestapi + req.params.nfcId);
  const prfl = profile.data.ResBedPrfl[0];
  //console.log(prfl);
  if(prfl === undefined){
    res.json({failed: true});
    return;
  }
  const record = await Record.getRecordByMemID(prfl.MemID);
  const seasonProfiles = await SeasonProfile.getSeasonProfilesByMemID(prfl.MemID);
  const currentSeasonCode = await Setting.getSeasonCode();

  if(!sameDay(new Date(record.taskStatus.assignAt),new Date())){
    History.updateHistory(record,()=>{});
    SeasonProfile.updateSeasonProfile(record,()=>{});
    record.taskStatus = Task.createNewTaskStatus(prfl.MemID,record.assign);
    Record.updateRecordTaskStatus(prfl.MemID,record.taskStatus,()=>{});
  }

  prfl.record = record;
  prfl.seasonProfiles = seasonProfiles;
  prfl.currentSeasonCode = currentSeasonCode;
  res.json(prfl);
});

app.get('/api/updateAssign/:id/:assign', (req,res)=>{
  //console.log(req.params)
  Record.updateRecordAssign(req.params.id,req.params.assign,()=>{
    res.json({
      status: "ok"
    });
  });
});

app.get('/api/updateType/:id/:type', (req,res)=>{
  //console.log(req.params)
  Record.updateRecordType(req.params.id,req.params.type,()=>{
    res.json({
      status: "ok"
    });
  });
});

app.get('/api/taskstation',async (req,res)=>{
  const profiles = await axios.get(ernestapi);
  //console.log(profiles)
  const prfl = profiles.data.ResBedPrfl;
  const seasonprofiles = await SeasonProfile.getSeasonProfilesByCode(await Setting.getSeasonCode());

  Record.getRecords((err,records)=>{
    if(err){ throw err }

    var taskstation = [];
    prfl.map(p=>{
      var resident = {};
      resident.profile = p;
      var init = true;
      for(var i=0;i<records.length;i++){
        if(records[i].MemID === p.MemID){
          if(!sameDay(new Date(records[i].taskStatus.assignAt),new Date())){
            History.updateHistory(records[i],()=>{});
            SeasonProfile.updateSeasonProfile(records[i],()=>{});
            records[i].taskStatus = Task.createNewTaskStatus(p.MemID,records[i].assign);
            Record.updateRecordTaskStatus(p.MemID,records[i].taskStatus,()=>{});
          }
          resident.profile.record = records[i];
          for(var i=0;i<seasonprofiles.length;i++){
            if(seasonprofiles[i].MemID === p.MemID){
              resident.profile.seasonprofile = seasonprofiles[i];
              break;
            }
          }
          //console.log(resident.profile.seasonprofile)
          init = false;
          break;
        }
      }
      if(init){
        resident.profile.record = Record.createRecord(p.MemID);
      }
      taskstation.push(resident);
    });
    res.json(taskstation);
  });

});

app.post('/api/updateRecordTaskStatus/:MemID/:taskStatus',(req,res)=>{
  const taskStatus = JSON.parse(req.params.taskStatus);
  //console.log(taskStatus);
  Record.updateRecordTaskStatus(req.params.MemID,taskStatus,()=>{});
});

app.get('/api/history/:MemID',(req,res)=>{
  History.getHistoryByMemID(req.params.MemID,(err,history)=>{
    if(err){ throw err }
    res.json(history);
  });
});

app.get('/api/history',(req,res)=>{
  History.getHistory((err,history)=>{
    if(err){ throw err }
    res.json(history);
  });
});

app.get('/api/setting',async (req,res)=>{
  const setting = await Setting.getSetting();
  res.json(setting);
});

app.get('/api/record/:id',(req,res,next)=>{
  Record.getRecordById(req.params.id,(err,record)=>{
    if(err){ throw err }
    res.json(record);
  });
});

app.get('/api/records',(req,res)=>{
  Record.getRecords((err,records)=>{
    if(err){ throw err }
    res.json(records);
  });
});

app.get('/api/tasks',(req,res)=>{
  Task.getTasks((err,tasks)=>{
    if(err){ throw err }
    res.json(tasks);
  });
});

app.get('/api/currentSeasonCode',async (req,res)=>{
  const currentseasoncode = await Setting.getSeasonCode();
  //console.log(seasonprofiles)
  res.json(currentseasoncode);
});

app.get('/api/seasonProfiles/:MemID',async (req,res)=>{
  //console.log(req.params.MemID)
  const seasonprofiles = await SeasonProfile.getSeasonProfilesByMemID(req.params.MemID);
  //console.log(seasonprofiles)
  res.json(seasonprofiles);
});

app.get('/api/currentSeasonProfiles',async (req,res)=>{
  const seasonprofiles = await SeasonProfile.getSeasonProfilesByCode(await Setting.getSeasonCode());
  //console.log(seasonprofiles)
  res.json(seasonprofiles);
});

app.get('/api/profiles',async (req,res)=>{
  const profiles = await axios.get(ernestapi);
  res.json(profiles.data);
});

app.get('/',(req,res)=>{
  res.send('Please use /api');
});

function sameDay(d1, d2) {
  //console.log(d1)
  //console.log(d2)
  return(
  d1.getFullYear() === d2.getFullYear()
  && d1.getMonth() === d2.getMonth()
  && d1.getDate() === d2.getDate());
}

app.listen(8009);
console.log('Running on port 8009...')

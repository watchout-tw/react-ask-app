var q = require('q'),
    http = require('http'),
    fs = require('fs');

function getData(path){
    var deferred = q.defer();
    var url = 'data/'+path+'.json';
    fs.readFile(url, 'utf8', function (err, data) {
       if (err) throw err;
       obj = JSON.parse(data);
       deferred.resolve(obj);
    });

    return deferred.promise;
};


getData('parsed_questions').then(function(data){
    var questions = {};
    var count = 0;

    questions["5"] = {};
    questions["5"]["1"] = {};
    questions["6"] = {};
    questions["6"]["1"] = {};
    questions["6"]["2"] = {};
    questions["6"]["3"] = {};
    questions["6"]["4"] = {};
    questions["7"] = {};
    questions["7"]["1"] = {};

    for(var key in data){
       var item = {};
       item.id = key;
       item.title = data[key].title;
       item.post_timestamp = data[key].post_timestamp;
       item.signatures_count = data[key].signatures_count;
       item.content = data[key].content;
       item.policyTitle = '推動「台北安居」＆「創藝飛翔」計畫 讓原民在北市快樂生活';


       if(count < 4){
          item.candidateID = "5";
          item.policyID = "1";
          questions["5"]["1"][key] = item;

       }else if(count >= 4 && count < 10){
          item.candidateID = "6";
          item.policyID = "1";
          questions["6"]["1"][key] = item;

       }else if(count >= 10 && count < 14){
          item.candidateID = "6";
          item.policyID = "2";
          questions["6"]["2"][key] = item;

       }else if(count >=14 && count < 20){
          item.candidateID = "6";
          item.policyID = "3";
          questions["6"]["3"][key] = item;

       }else if(count >= 20 && count < 35){
          item.candidateID = "6";
          item.policyID = "4";
          questions["6"]["4"][key] = item;

       }else{
          item.candidateID = "7";
          item.policyID = "1";
          questions["7"]["1"][key] = item;
       }
       count++;
       //console.log(questions);

    }

    //Save to json
    fs.writeFile("data/questions.json", JSON.stringify(questions), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(" - File saved : question.");

        }
    });


});



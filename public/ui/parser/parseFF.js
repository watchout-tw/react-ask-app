var q = require('q'),
    http = require('http'),
    fs = require('fs');

function getData(path){
    var deferred = q.defer();
    var url = path+'.json';
    fs.readFile(url, 'utf8', function (err, data) {
       if (err) throw err;
       obj = JSON.parse(data);
       deferred.resolve(obj);
    });

    return deferred.promise;
};

var policy = {};
getData('feng').then(function(data){

    var count = 1;
    data = data.reverse();
    for(var key in data){
        //"馮光遠夯台北新市政（二）ㄧ台北市公民投票自治條例",
        //《馮光遠夯台北新市政 #5》能源政策 Part III——多元綠能",
        var oriTitle = data[key].title;
        if(oriTitle.indexOf('》') !== -1){
            data[key].title = oriTitle.split("》")[1];
            data[key].indexTitle = oriTitle.split("》")[0]+'》';

        }else if(oriTitle.indexOf('ㄧ') !== -1){
            data[key].title = oriTitle.split("ㄧ")[1];
            data[key].indexTitle = oriTitle.split("ㄧ")[0]+"ㄧ";

        }else if(oriTitle.indexOf('──') !== -1){
            data[key].title = oriTitle.split("──")[1];
            data[key].indexTitle = oriTitle.split("──")[0]+"──";
        }

        data[key].content = "";
        data[key].fullContent.map(function(value){
            if(value)
                 data[key].content += '<p>'+value+'</p>';
        });

        data[key].id = count;
        policy[count]= data[key];
        count++;

        console.log(data[key].content);
    }
    //console.log(policy);

    //Save to json

    fs.writeFile("feng_policy.json", JSON.stringify(policy), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(" - File saved : feng_policy.");

        }
    });

});



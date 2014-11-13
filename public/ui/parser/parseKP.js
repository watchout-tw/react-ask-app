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
var temp = [];
getData('kp').then(function(data){

    data = data.reverse();
    for(var key in data){
        //"title": "【柯P新政】#1 i-voting ",
        var index = data[key].title.split("#")[1].split(" ")[0];
        data[key].id = index;
        var oriTitle = data[key].title;
        data[key].title = oriTitle.split(" ")[1];
        data[key].indexTitle = oriTitle.split(" ")[0];
        policy[index] = data[key];
        temp.push(data[key]);
        console.log(index);
    }

    temp.map(function(value){
        console.log(value.id);
    })
    //console.log(policy);

    //Save to json
    fs.writeFile("kp_policy.json", JSON.stringify(policy), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(" - File saved : kp_policy.");

        }
    });



});



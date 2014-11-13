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
getData('lien').then(function(data){


    data = data.reverse();
    for(var key in data){

        var oriTitle = data[key].title;
        var idx = oriTitle.indexOf(" ");
        data[key].title = oriTitle.substring(idx+1);
        data[key].indexTitle = oriTitle.split(" ")[0];
        var index = parseInt(data[key].indexTitle.split("#")[1]).toString();//remove the 0 in front
        data[key].id = index;


        var tmp = data[key].content.split(' ');
        data[key].content = "";
        tmp.map(function(value){
            data[key].content += '<p>'+value+'</p>';

        });

        policy[index]= data[key];

        console.log(data[key].indexTitle);
        console.log(data[key].title);
        console.log(data[key].id);
    }
    //console.log(policy);

    //Save to json

    fs.writeFile("lien_policy.json", JSON.stringify(policy), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(" - File saved : lien_policy.");

        }
    });

});



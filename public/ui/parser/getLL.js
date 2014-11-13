var q = require('q'),
    http = require('http'),
    fs = require('fs'),
    cheerio = require('cheerio'),
    async = require('async');

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
function getContent(num){
    var deferred = q.defer();
    /* GET CONTENT WITH HTML */
    var options = {
      host: 'taipeihope.tw',
      path: '/issue/issue-list/official-policy/topic/'+num,
      method: 'GET'

    };
    var request = http.get(options, function(response) {
        //response.setEncoding("utf8");
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(response.headers));
        var bodyChunks = [];
        response.on('data', function(chunk) {
            bodyChunks.push(chunk);

        }).on('end', function() {
            var body = Buffer.concat(bodyChunks);
            //console.log('BODY: ' + body);

            $ = cheerio.load(body, {decodeEntities: false});

            var parsedDOM = $.html('.text');
            //console.log(parsedDOM);

            deferred.resolve(parsedDOM);
        })

        response.on('error', function(err) {
            deferred.resolve("error");
        });
    });
    return deferred.promise;
};

// create a queue object with concurrency 1
  var queue = async.queue(function (task, callback) {
      //console.log('hello ' + task.title);



        var oriTitle = task.title;
        var idx = oriTitle.indexOf(" ");
        task.title = oriTitle.substring(idx+1);
        task.indexTitle = oriTitle.split(" ")[0];
        var index = parseInt(task.indexTitle.split("#")[1]).toString();//remove the 0 in front
        task.id = index;


        var num = task.link.split('http://taipeihope.tw/issue/issue-list/official-policy/topic/')[1];
        num = num.split('.')[0];

        console.log(oriTitle);

        getContent(num).then(function(d){
            //console.log(d);
            task.content = d;

            policy[index] = task;

            console.log(policy[index]);
            callback();


        })



  }, 1);

  // assign a callback
  queue.drain = function() {
    //Save to json
            fs.writeFile("lien_policy.json", JSON.stringify(policy), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(" - File saved : lien_policy.");

                }
            });
      console.log('------ 結束更新 ------');

  };


var policy = {};
getData('lien').then(function(data){

    for(var key in data){

        queue.push(data[key], function (err) {
              //console.log('----------------------');
              //console.log("finish processing:"+key);
        });

    }

});




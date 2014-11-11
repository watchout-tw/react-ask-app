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

var currentCandidates = ['-JFuCJcAoUNFQY9NEHZ4','-JFuCKMKOH_eCspPxRe1','-JFxrKQo3Qg19zsW73b1','-JWO-vJujwhnLgcYSdl4','-JWO0SxVP9GUJwQY-cyq','-JWO0YJbdZOOiPO8X5_t','-JWO0VB8p2n362agsM67','-JGgB1adbjJ4JNIi0G8X'];
//連柯馮 Only:['-JFxrKQo3Qg19zsW73b1','-JFuCKMKOH_eCspPxRe1','-JFuCJcAoUNFQY9NEHZ4'];

getData('questions').then(function(questions){
    getData('responses').then(function(responses){
        getData('issues').then(function(issues){
        getData('candidates').then(function(candidates){
            var question_output = {};
            for(var key in questions){
                questions[key]['id'] = key;
                //Handle only passed q
                if(questions[key].signatures_count >= questions[key].signatures_threshold){
                    console.log(key);

                    //save only current candidate's responses
                    if(responses[key]){
                        //console.log(responses[key]);
                        var currentResponses = [];
                        for(var rkey in responses[key]){
                           var rid = responses[key][rkey].responser;
                           if(currentCandidates.indexOf(rid) !== -1){
                              currentResponses.push(responses[key][rkey]);
                           }
                        }
                        questions[key].responses = currentResponses;
                    }

                    if(issues[key]){
                      var issueName = issues[key];
                      if(!issues[issueName])
                          issues[issueName] = [];

                      questions[key].issue = issues[key];
                      issues[issueName].push(questions[key].id);

                    }

                    //remove quit candidates & check if this question is fully answered
                    var pendingCount = 0;
                    for(ckey in questions[key].addressing){
                        //console.log(ckey);
                        if(currentCandidates.indexOf(ckey) === -1){
                          questions[key].addressing[ckey]={};
                        }
                        if(questions[key].addressing[ckey].state === 'pending'){
                          pendingCount++;
                        }
                    }
                    questions[key].pendingCount = pendingCount;

                    //save to candidate data
                    for(var i in currentCandidates){
                        var cid = currentCandidates[i];
                        //console.log(questions[key].addressing[cid]);
                        if(questions[key].addressing[cid]){
                          candidates[cid][key] = questions[key].addressing[cid].state;

                        }else{
                          //some candidates might already be dropped by this stage
                          if(candidates[cid])
                             candidates[cid][key] = "notasked";

                        }

                    }


                    //Save only passed q
                    question_output[key] = questions[key];
                }

            }
            //End of question processing
            console.log("\n");
            //Save to json
            fs.writeFile("data/parsed_questions.json", JSON.stringify(question_output), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(" - File saved : question.");

                }
            });
            fs.writeFile("data/parsed_candidates.json", JSON.stringify(candidates), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(" - File saved : candidate.");
                    console.log("\n");
                }
            });

        });
        });

    });
});



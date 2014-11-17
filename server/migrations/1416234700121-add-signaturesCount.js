var mongoose = require("mongoose");
var Question = require("../api/models/Question");
var config = require("../config/config");
var async =require("async");

mongoose.connect(config.database);
mongoose.connection.on('error', function (err) {
  console.log(err);
});


function updateCount (id, callback) {
  Question
  .findOne({id: id})
  .exec(function (err, question) {
    question.signaturesCount = question.signatures.length;
    question.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    callback(null, id);
  });
}

Question
  .find()
  .exec(function (err, questions){
    if (err) {
      return console.log(err);
    }
    var ids = questions.map(function (question) {
      return question.id;
    });
    console.log('process ' + ids.length + ' items.');
    async.map(ids, updateCount, function (err, results) {
      console.log(results.length + ' items is done');
      mongoose.disconnect();
    });
  });
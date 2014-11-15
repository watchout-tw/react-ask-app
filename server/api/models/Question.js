var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var supergoose = require("supergoose");
var QuestionSchema = new Schema({
  id: String,
  cid: String,
  pid: String,
  title: String,
  content: String,
  autor: Schema.Types.Mixed,
  createdAt: Date,
  signatures: [Schema.Types.Mixed]
});

QuestionSchema.plugin(supergoose);

module.exports = mongoose.model('Question', QuestionSchema);
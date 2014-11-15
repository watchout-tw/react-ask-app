var mongoose = require("mongoose");
var supergoose = require("supergoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: String,
  facebookId: String,
  facebookData: Schema.Types.Mixed,
  createdAt: Date,
  signatures: [Schema.Types.Mixed]
});

UserSchema.plugin(supergoose);

module.exports = mongoose.model('User', UserSchema);
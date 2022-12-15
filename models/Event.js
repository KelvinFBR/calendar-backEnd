const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

EventSchema.method("toJSON", function () {
  const { __v, _id, user, ...object } = this.toObject();
  object.user = {
    uid: user._id,
    name: user.name,
  };
  object.id = _id;
  return object;
});

module.exports = model("Event", EventSchema);

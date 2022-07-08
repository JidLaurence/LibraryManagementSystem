"use strict";
/**
 * ## Imports
 *
 */
//Mongoose - the ORM
var Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId,
  Schema = Mongoose.Schema;

const schema = new Mongoose.Schema(
  {
    user_id: { type: ObjectId, required: true, ref: "users" },
    in: { type: Date },
    out: { type: Date },
    studentId: { String },
  },
  {
    timestamps: true,
    _id: true,
  }
);

var _schema = Mongoose.model("logs", schema);

module.exports = _schema;

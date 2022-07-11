"use strict";

var internals = {};
const { Users, Logs } = require("@models");
const Crypto = require("@lib/Crypto");
const Image = require("@lib/Image");

internals.index = async function (req, reply) {
  const users = await Logs.find({}).populate("user_id").lean();
  return reply.view("admin/logs/index.html", {
    credentials: req.auth.credentials,
    users,
  });
};

internals.logs = async function (req, reply) {
  var today = new Date();
  const student = await Users.findOne({ studentId: req.payload }).lean();
  if (student) {
    const findStudent = await Logs.findOneAndUpdate(
      {
        $and: [{ user_id: student._id }, { out: null }],
      },
      {
        out: today,
      }
    ).lean();
    if (!findStudent) {
      await Logs.create({
        user_id: student._id,
        in: today,
        out: null,
      });
    }
  }
  if (!student) {
    return reply({
      message: "Student not found",
      type: "error",
    });
  }

  return reply({
    message: "Success",
    type: "success",
  });
};

module.exports = internals;

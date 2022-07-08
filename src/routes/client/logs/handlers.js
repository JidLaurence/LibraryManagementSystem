"use strict";

var internals = {};
const { Users, Logs } = require("@models");
const Crypto = require("@lib/Crypto");
const Image = require("@lib/Image");

internals.index = async function (req, reply) {
  const users = await Logs.find({ user_id: req.auth.credentials._id })
    .populate("user_id")
    .lean();
  return reply.view("client/logs/index.html", {
    credentials: req.auth.credentials,
    users,
  });
};

module.exports = internals;

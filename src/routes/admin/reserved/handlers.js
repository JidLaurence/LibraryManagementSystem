"use strict";

var internals = {};
const { Users, Sales } = require("@models");
const Crypto = require("@lib/Crypto");
const Image = require("@lib/Image");

internals.index = async function (req, reply) {
  const sales = await Sales.find({
    $and: [
      { status: "accepted" },
      { isReturn: true },
      { isAcceptReturn: false },
    ],
  })
    .populate("product_id user_id")
    .lean();
  return reply.view("admin/reserved/index.html", {
    credentials: req.auth.credentials,
    sales,
  });
};

module.exports = internals;

"use strict";

var internals = {};
const { Users } = require("@models");
const Crypto = require("@lib/Crypto");
const Image = require("@lib/Image");

internals.index = async function (req, reply) {
  const users = await Users.find({ isDeleted: false }).lean();
  return reply.view("admin/users/index.html", {
    credentials: req.auth.credentials,
    users,
  });
};
internals.add = async function (req, reply) {
  let payload = req.payload;
  payload.password = Crypto.encrypt(req.payload.password);
  payload.scope = ["admin"];
  payload.isStatus = true;
  const user = await Users.create(payload);
  if (!user) {
    return reply.redirect(
      "/admin/users?message=Error Please try again!&alert=error"
    );
  }
  return reply.redirect(
    "/admin/users?message=Successfully Created&alert=success"
  );
};
internals.update = async function (req, reply) {
  let payload = {
    email: req.payload.email,
  };
  if (req.payload.password) {
    payload.password = Crypto.encrypt(req.payload.password);
  }
  const user = await Users.findOneAndUpdate(
    {
      _id: req.payload._id,
    },
    { $set: payload }
  ).lean();
  if (!user) {
    return reply.redirect("/admin/users?message=Error to update&alert=error");
  }
  return reply.redirect(
    "/admin/users?message=Successfully Updated&alert=success"
  );
};
internals.delete = async function (req, reply) {
  const user = await Users.remove({
    _id: req.params._id,
  }).lean();
  if (!user) {
    return reply({ status: false, message: "Error to delete", icon: "fail" });
  }
  return reply({
    status: true,
    message: "Successfully deleted",
    icon: "success",
  });
};

internals.uploadLogo = async function (req, reply) {
  Image.uploadLogo(req.payload.img, req.auth.credentials._id);
  await Users.update(
    { _id: req.auth.credentials._id },
    {
      $set: {
        logo: `/assets/images/logo/${req.auth.credentials._id}.jpg`,
      },
    }
  );
  return reply.redirect(
    "/admin/users?message=Successfully update&alert=success"
  );
};

internals.acceptStudent = async function (req, reply) {
  const user = await Users.findOneAndUpdate(
    { _id: req.params._id },
    { $set: { isStatus: true } }
  );
  if (user) {
    return reply({
      message: "Successfully accepted",
      type: "success",
    });
  }

  return reply({
    message: "Error please try agaian",
    type: "error",
  });
};
module.exports = internals;

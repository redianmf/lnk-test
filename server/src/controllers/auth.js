const User = require("../../models/User");

const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.register = async (req, res) => {
  const data = req.body;

  // Validate request
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(7).email().required(),
    password: Joi.string().min(7).required(),
  });

  const { error } = schema.validate(data);

  // Fallback error validation
  if (error) {
    return res.status(400).send({
      status: "error",
      message: error.details[0].message,
    });
  }

  try {
    // Check email exist
    const isUserExist = await User.find({
      email: data.email,
    });

    if (isUserExist.length) {
      return res.status(400).send({
        status: "failed",
        message: "please use another email address",
      });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(data.password, salt);

    // Save user data
    const regUser = await User.create({
      name: data.name,
      email: data.email,
      password: encryptedPassword,
      last_login: "",
      last_logout: "",
    });

    // Create JWT
    const dataToken = {
      id: regUser.id,
    };
    const token = jwt.sign(dataToken, process.env.SECRET_KEY);

    // Send response
    res.send({
      status: "success",
      data: {
        user: {
          email: regUser.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const data = req.body;

  // Validate request
  const schema = Joi.object({
    email: Joi.string().min(7).email().required(),
    password: Joi.string().min(7).required(),
  });

  const { error } = schema.validate(data);

  // Fallback error validation
  if (error) {
    return res.status(400).send({
      status: "error",
      message: error.details[0].message,
    });
  }
  try {
    // Check email in db
    const existedUser = await User.findOne({
      email: data.email,
    });

    if (!existedUser) {
      return res.send({
        status: "failed",
        message: "Please enter valid email address",
      });
    }

    // Password validation
    const isValid = await bcrypt.compare(
      req.body.password,
      existedUser.password
    );

    // Fallback invalid password
    if (!isValid) {
      return res.send({
        status: "failed",
        message: "Email and password did not match",
      });
    }

    // Update last login & erase last logout
    existedUser.last_login = Date.now();
    existedUser.last_logout = "";
    existedUser.save();

    // Create JWT
    const dataToken = {
      id: existedUser.id,
    };
    const token = jwt.sign(dataToken, process.env.SECRET_KEY);

    // Send response
    res.send({
      status: "success",
      data: {
        user: {
          id: existedUser.id,
          email: existedUser.email,
          name: existedUser.name,
          last_login: moment(existedUser.last_login).local().format(),
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const id = req.user.id;
    const dataUser = await User.findOne({
      id,
    });

    // Update last logout
    dataUser.last_logout = Date.now();
    dataUser.save();

    // Send response
    res.send({
      status: "success logout",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;
    const dataUser = await User.findOne({
      id,
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
        message: "User not found",
      });
    }
    res.send({
      status: "success",
      data: {
        name: dataUser.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { errorObject } from "../../../utils/errors.utils";
import { UserBody, UserModel } from "./../models/user.model";
import config from "../../../config";
import { Decoded } from "../../../middleware/auth";

//get user by token
export const getUserByToken = async (token: string) => {
  if (!token) {
    throw errorObject(401, "Access denied. No token provided");
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as Decoded;
    const user = await UserModel.findById(decoded.user_id).exec();
    if (!user) {
      throw errorObject(404, "user not found");
    }
    const userWithoutPassword = { ...user.toObject(), password: undefined };

    return userWithoutPassword;
  } catch (error) {
    errorObject(401, "Invalid token");
  }
};

// get user by id
export const getUserById = async (userId: string) => {
  //isMongoIdValidation([userId]);
  let user;
  const isMongoId = mongoose.Types.ObjectId.isValid(userId);
  if (!isMongoId) {
    user = await UserModel.findOne({ email: userId }).exec();
    if (!user) {
      throw errorObject(400, "Invalid user id");
    }
    return user;
  }
  user = await UserModel.findById(userId).exec();
  if (!user) {
    throw errorObject(404, "User not found");
  }
  return user;
};

// create user
export const createUser = async (userData: UserBody) => {
  // validate request
  const { name, email, password } = userData;
  if (!(email && password && name)) {
    throw errorObject(400, "All input is required");
  }

  // check if user already exist
  const oldUser = await UserModel.findOne({ email });
  if (oldUser) {
    throw errorObject(409, "User already exist. Please login");
  }

  // encrypt user password
  const encryptedPassword = await bcrypt.hash(
    password,
    parseInt(config.HASH_STEPS)
  );

  // create user in db
  const user = await UserModel.create({
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  // create token
  const token = jwt.sign({ user_id: user._id, email }, config.JWT_SECRET, {
    expiresIn: "24h",
  });
  const expireDate = new Date().setDate(new Date().getDate() + 1);

  //return new user
  user.save();
  return { token, expireDate };
};

//login user
export const login = async (userData: UserBody) => {
  const { email, password } = userData;
  if (!(email && password)) {
    throw errorObject(400, "All input is required");
  }
  const user = await UserModel.findOne({ email }).populate("restaurant").exec();

  if (!user) {
    throw errorObject(404, "Invalid credentials");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw errorObject(404, "Invalid credentials");
  }
  const token = jwt.sign({ user_id: user._id, email }, config.JWT_SECRET, {
    expiresIn: "24h",
  });
  const expireDate = new Date().setDate(new Date().getDate() + 1);
  const userInfo = user.toObject();
  return {
    token,
    expireDate,
    userInfo: { ...userInfo, password: undefined },
  };
};

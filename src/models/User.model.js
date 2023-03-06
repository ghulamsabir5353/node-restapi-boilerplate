const { default: mongoose } = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const { StatusTypes, StatusTypesArray } = require('@constants/status');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'fullName is required field'],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, 'Invalid Email'],
      required: [true, 'Email is required field'],
    },
    phone: {
      type: String,
      required: [true, 'phone is required field'],
    },
    password: {
      type: String,
      selected: false,
    },
    status: {
      type: String,
      enum: StatusTypesArray,
      default: StatusTypes.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

//hashing password before save to DB
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

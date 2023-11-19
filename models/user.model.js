import { Schema, model } from "mongoose";
 import bcrypt from "bcryptjs";
// import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import crypto from "crypto-js";

const userSchema = new Schema(
  {
    fullname: {
      type: "String",
      // require: [true, "name is required"],
      minLength: [3, "name must be atleast 3 character"],
      maxLength: [15, "name must be atleast 15 character"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: "String",
      require: [true, "name is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: "String",
      require: [true, "name is required"],
      minLength: [4, "name must be atleast 4 character"],
      select: false,
    },
    avatar: {
      public_id: {
        type: "String",
      },
      secure_url: {
        type: "String",
      },
      // type :'String'
    },
    role: {
      type: "String",
      enum: ["INSTRUCTOR", "ADMIN"],
      default: "INSTRUCTOR",
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription:{
      id : String,
      status : String
    },
    lectures :[
      {
        coursename: {
          type : String,
          default : "vv"
        } ,
        lecturename :{
          type : String,
          default : "vv"
        } ,
        date : Date

      }

    ]
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// userSchema.methods.generateJWTToken = function () {
//   const payload = {
//     id: this._id,
//     email: this.email,
//     subscription: this.subscription,
//     role: this.role
//   };

//   // Replace 'yourSecretKey' with your actual secret key for JWT
//   const token = jwt.sign(payload,  process.env.JWT_SECRETE, {
//     expiresIn: process.env.JWT_EXPIRY // You can customize the token expiration time
//   });

//   return token;
// };

userSchema.methods = {
 
   generateJWTToken: async function () {
    return await Jwt.sign(
      {
        id: this._id,
        email: this.email,
        subscription: this.subscription,
        role: this.role,
      },
      process.env.JWT_SECRETE,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },
  comparePassword: async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
  },
  generatePasswordResetToken: async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // this.forgotPasswordToken= crypto
    // .createHash('varad')
    // .update(resetToken)

    this.forgotPasswordToken = resetToken;

    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

    return resetToken;
  },
};
const user = model("User", userSchema);

export default user;


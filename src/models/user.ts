import { CallbackError, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: { type: String, required: [true, "User Full Name is required"] },
  email: {
    type: String,
    requred: [true, "User Email is required."],
    unique: [true, "User Email must be unique."],
    trim: [true],
    lowercase: [true],
  },
  password: {
    type: String,
    required: [true, "User Password is required."],
    min: 8,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
  },
});
userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (!user.isModified("password")) return next(); // Only hash if password is modified
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  } catch (err: unknown) {
    next(err as CallbackError);
  }
});

const User = model("User", userSchema);

userSchema.static("findUserByEmail", function (email) {
  return this.findOne({ email }).exec();
});

export default User;

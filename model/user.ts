import mongoose, { Schema, model, models } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: { type: String, required: true },
  interests: { type: String, required: true },
  role: { type: String, required: true },
  bio: {
    type: String,
  },
  image: Number,
  requested: [{ type: String }],
  accepted: [{ type: String }],
});

const User = models.User || model("User", userSchema);

export default User;

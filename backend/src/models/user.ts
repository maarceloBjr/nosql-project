import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  level: 1 | 2 | 3 | 4 | 5;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  level: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;

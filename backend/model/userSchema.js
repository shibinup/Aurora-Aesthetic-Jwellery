import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type : String,
    unique : true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});
  




const User = mongoose.model("User", userSchema);
export default User
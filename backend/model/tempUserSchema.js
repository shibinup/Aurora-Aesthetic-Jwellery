import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const tempuserSchema = new mongoose.Schema({
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
    expires: 60
  },
  isVerified: {
      type: Boolean,
     default: false 
    },

     otp: {
      type:String
    }
    });
  
// here hashing password
tempuserSchema.pre('save', async function () { 
    
    if (!this.isModified('password')) return; 

    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt);
    console.log("first hashed",this.password) 
});


const Tempuser = mongoose.model("Tempuser", tempuserSchema);
export default Tempuser
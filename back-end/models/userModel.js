const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username:{
        type: 'string',
        required: 'true'
    },
    password:{
        type: 'string',
        required: 'true'
    }
},
{
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User",userSchema);
module.exports = User;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
  name: { type: String},
  email: {
    type: String
  },
  password: { type: String},
  cpassword: { type: String},
  profilePicture: {
    type: String,
    default: ""
  },
  coverPicture: {
    type: String,
    default: ""
  },
  following: {
    type: Array,
    default: []
  },
  followers: {
    type: Array,
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  desc:{
    type: String,
    max: 50
  },
  city:{
    type: String,
    max: 50
  },
  from:{
    type: String,
    max: 50
  },
  relationship:{
    type: String
  },
  DOB:{
    type: Date
  }
},{ timestamps: true });
// userSchema.methods.generatetoken = async function () {
//   try {
//     const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
//     this.tokens = this.tokens.concat({ token: token })
//     await this.save()
//     return token
//   } catch (error) {
//     res.send('error')
//   }
// }
// userSchema.methods.generatetokenforlogin = async function () {
//   try {
//     const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
//     return token
//   } catch (error) {
//     res.send('error')
//   }

// }
// userSchema.pre('save', async function (next) {
//   try {
//     if (this.isModified("password") || this.isNew) {
//       this.password = await bcrypt.hash(this.password, 10)
//     }
//   } catch (error) {
//     res.send('invalid')
//   }
//   next();
// })
let user = mongoose.model('user', userSchema);
module.exports = user;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const postSchema = new mongoose.Schema({
  userId:{
      type: String,
      required: true
  },
  desc:{
      type:String,
      max: 500
  },
  img:{
    type:String
},
    likes:{
        type: Array,
        default: []
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
let post = mongoose.model('post', postSchema);
module.exports = post;
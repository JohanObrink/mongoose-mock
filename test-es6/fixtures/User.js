import mongoose, { Schema } from 'mongoose'

const User = new Schema({})
User.static('findByName', function (name) {
  return this.find({ name })
})

export default mongoose.model('User', User)
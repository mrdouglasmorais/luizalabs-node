import mongoose from 'mongoose';

const NotificationsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  use: {
    type: Number,
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
    default: false,
  } 
}, {
  timestamps: true,
})

export default mogoose.model('NotificationsSchema', NotificationsSchema)
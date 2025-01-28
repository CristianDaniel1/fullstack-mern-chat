import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

messageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const MessageModel = mongoose.model('Message', messageSchema);

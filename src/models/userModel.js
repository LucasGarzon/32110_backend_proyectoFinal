import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  age: {
    type: Number,
  },
  phone: {
    type: String,
    required: true
  },
  photo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return next(err);
          user.password = hash;
          next();
      });
  });
});

userSchema.methods.comparePassword = function(password) {
return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;

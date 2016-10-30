import * as  mongoose from 'mongoose';
let bcrypt = require('bcrypt');
let Schema = mongoose.Schema;


interface IUserModel extends mongoose.Document {
  phone: Number;
  password: String;
  email: String;
  Code: Number;
  Type: String;
  veri: number;
}
// Schema defines how the user data will be stored in MongoDB
let UserSchema = new Schema({
  phone: {
    type: Number,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: { // TODO: need validation !!
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  code: {
    type: Number,
    default: 0
  },
  // tpye: {
  //     tpye: String,
  //     required: true,
  //     enum: ['admin', 'cus', 'driver'],
  //     default: 'cus'
  // },
  veri: {
    type: Boolean,
    default: false
  }
});

// Hash the user's password before inserting a new user
UserSchema.pre('save', function(next) {
  let user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

// Export the model
export default mongoose.model<IUserModel>('User', UserSchema);


import * as  mongoose from 'mongoose';
import ErrorB from '../util/ErrorB';
let bcrypt = require('bcrypt');
let Schema = mongoose.Schema;
let validate = require('mongoose-validator');
let beautifyUnique = require('mongoose-beautiful-unique-validation');

/**
 * @interface IUserModel
 */
interface IUserModel extends mongoose.Document {
  phone: string;
  password: string;
  email: string;
  Code: number;
  u_type: string;
  veri: number;
}

/**
 * Validation
 *  SA Mobile Number
 */
let SA_Number = [validate({
    validator: 'matches',
    arguments:  /^(!?(\+?966)|0)?5\d{8}$/,
    message: ErrorB.PHONE_INVALID
})];

/**
 * @Schema UserSchema
 */
let UserSchema = new Schema({
  phone: {
    type: String,
    unique: ErrorB.PHONE_EXIST,
    required: ErrorB.PHONE_MISSING,
    validate: SA_Number
  },
  password: {
    type: String,
    required: ErrorB.PHONE_MISSING,
  },
  email: { // TODO: need validation !!
    type: String,
    lowercase: true,
    unique: ErrorB.EMAIL_EXIST,
    required: ErrorB.EMAIL_MISSING
  },
  code: {
    type: Number,
    default: 0
  },
  u_type: {
      type: String,
      required: true,
      enum: ['admin', 'cus', 'driver'],
      default: 'cus'
  },
  veri: {
    type: Boolean,
    default: false
  }
});

/**
 * mongoose does not support unique validation
 * thus we use this plugin
 */
UserSchema.plugin(beautifyUnique);

/**
 * Pre Save function
 */
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

/**
 * @function comparePassword
 */
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


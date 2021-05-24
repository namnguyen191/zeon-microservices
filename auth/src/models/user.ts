import mongoose from 'mongoose';
import { Password } from '../services/password';

interface IUser {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(user: IUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        // Reformatting _id to id for consistency across other microservices
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

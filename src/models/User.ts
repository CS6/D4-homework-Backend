import {
  Document, Model, model, Schema,
} from 'mongoose';

interface Hobby {
  ID: string;
  Hobby: string;
  Category: string;
}

export interface User extends Document {
  age: number;
  name: string;
  gender: string;
  school: object;
  dept: object;
  talent: Hobby,
  hobby: [Hobby];
  club: string;
  lovedCountry: string;
  trouble: string;
  wantToTry: string;
  exchange: [Hobby];
  date: Date;
  avatar: string;
}

const schema: Schema = new Schema({
  age: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    // unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  school: {
    type: Object,
    required: true,
  },
  dept: {
    type: Object,
    required: true,
  },
  talent: {
    type: Object,
    required: true,
  },
  hobby: {
    type: Array,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    // unique: true,
  },
  club: {
    type: String,
    required: true,
  },
  lovedCountry: {
    type: String,
    required: true,

  },
  trouble: {
    type: String,
    required: true,
  },
  wantToTry: {
    type: String,
    required: true,
  },
  exchange: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserModel: Model<User> = model('User', schema);

export default UserModel;

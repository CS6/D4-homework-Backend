import { CreateQuery } from 'mongoose';
import UserModel, { User } from '../models/User';

async function CreateUser({
  age,
  name,
  gender,
  school,
  dept,
  talent,
  hobby,
  avatar,
  club,
  lovedCountry,
  trouble,
  wantToTry,
  exchange,
  date,

}: CreateQuery<User>): Promise<User> {
  return UserModel.create({
    age,
    name,
    gender,
    school,
    dept,
    talent,
    hobby,
    avatar,
    club,
    lovedCountry,
    trouble,
    wantToTry,
    exchange,
    date,
  })
    .then((data: User) => data)
    .catch((error: Error) => {
      throw error;
    });
}

export default {
  CreateUser,
};

import * as faker from 'faker/locale/zh_TW';
import * as _ from "lodash";

import deptObject from "./data/dept.json";
import schoolObject from "./data/school.json";
import hobbyObject from "./data/hobby.json";
import moodObject from "./data/mood.json";

export const add = (num1: number, num2: number): number => {
  return num1 + num2
}

const hobbyGenerator = (num: number) => {
  let hobbys = _.range(1, _.random(2, num, false));
  let hobbyList = hobbys.map(hobby => {
    return hobbyObject[_.random(10,hobbyObject.length, false)]
  })
  return hobbyList
}

export const fakeDcardUser = () => {
  let name = faker.fake("{{name.lastName}}{{name.firstName}}")
  let genders = ['female', 'male'];
  let gender = faker.random.arrayElement(genders);
  // console.log(name)
  const uid: string = '' + 100000000 * Math.random()
  const Dcard = {
    age: _.random(18, 30, false),
    name: name,
    gender: gender,
    school: schoolObject[_.random(2,schoolObject.length, false)-1],
    dept: deptObject[_.random(deptObject.length, false)-1],
    talent: hobbyObject[_.random(2,hobbyObject.length, false)-1],
    hobby: hobbyGenerator(10),
    club: hobbyObject[_.random(2,hobbyObject.length, false)-1].Hobby + "社",
    lovedCountry: faker.address.country(),
    trouble: moodObject[_.random(2,moodObject.length, false)-1].mood,
    wantToTry: hobbyObject[_.random(2,hobbyObject.length, false)-1].Hobby,
    exchange: hobbyGenerator(5),
    avatar: `https://avatars1.githubusercontent.com/u/${uid.replace(/^(\d{8}).*$/, '$1')}`
  }

  return Dcard
}
const sleep = () => new Promise((res, rej) => setTimeout(res, 345));

export const fakeDcardALLUser = () => {
  let Users = _.range(1, 50);
  let ALLUser =  Users.map(User => {
    return  fakeDcardUser();
  })
  return ALLUser;
}


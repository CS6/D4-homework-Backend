import * as faker from 'faker/locale/zh_TW';
import * as _ from "lodash";

import * as deptObject from "./data/dept.json";
import * as schoolObject from "./data/school.json";
import * as hobbyObject from "./data/hobby.json";
import * as moodObject from "./data/mood.json";

export const add = (num1: number, num2: number): number => {
  return num1 + num2
}

const hobbyGenerator = (num: number) => {
  let hobbys = _.range(1, _.random(2, num, false));
  let hobbyList = hobbys.map(hobby => {
    return hobbyObject[_.random(hobbyObject.length, false)]
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
    school: schoolObject[_.random(schoolObject.length, false)],
    dept: deptObject[_.random(deptObject.length, false)],
    talent: hobbyObject[_.random(hobbyObject.length, false)],
    hobby: hobbyGenerator(10),
    club: hobbyObject[_.random(hobbyObject.length, false)].Category + "社",
    lovedCountry: faker.address.country(),
    trouble: moodObject[_.random(moodObject.length, false)].mood,
    wantToTry: hobbyGenerator(2)[0].Hobby,
    exchange: hobbyGenerator(3),
    avatar: `https://avatars1.githubusercontent.com/u/${uid.replace(/^(\d{8}).*$/, '$1')}`
  }

  return Dcard
}

export const fakeDcardALLUser = () => {
  let Users = _.range(1, 50);
  let ALLUser = Users.map(User => {
    return fakeDcardUser();
  })
  return ALLUser;
}

// import './pre-start'; // Must be the first import
import logger from './shared/logger';
import Joi from 'joi';
import * as dotenv from "dotenv";
import * as fs from 'fs';
import * as path from 'path';
// 選擇環境變數的檔案
// dotenv.config({ path: '.env' });
dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });


// 建立每個變數 joi 驗證規則
const envVarSchema = Joi.object().keys({
  VERSION: Joi.string().default('0.0.0'), // 字串
  MODE: Joi.string().default('development'), // 字串且預設值為 'development'
  MONGODB: Joi.string().default('127.0.0.1'), // 字串且預設值為 '127.0.0.1'
  REDIS: Joi.string().default('127.0.0.1'), // 字串
}).unknown().required();


// process.env 撈取 .env 內的變數做 joi 驗證
const { error, value: envVars } = envVarSchema.validate(process.env);
console.log(process.env.VERSION)
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  version: envVars.VERSION, // 版本
  mode: envVars.MODE,  // 開發模式
  mongodb: envVars.MONGODB, // mongodb 阜號  
  redis: envVars.REDIS, // redis 阜號  
};

export default config;  // 匯出共用
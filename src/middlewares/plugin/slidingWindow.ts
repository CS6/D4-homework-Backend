// const luaScript_Test = `return {KEYS[1],ARGV[1],ARGV[2],ARGV[3]}`
//ZRANGEBYSCORE $now +inf，刪除過期的密鑰，即可ZREMRANGEBYSCORE -inf $now完成操作。
//ZRANGEBYSCORE expirationzset -inf 1023
//ZREMRANGEBYSCORE expirationzset -inf 1023
export default  `
local ipAddress = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local clearBefore = now - window
redis.call('ZREMRANGEBYSCORE', ipAddress, '-inf' , clearBefore)
local amount = redis.call('ZCARD', ipAddress)
if amount < limit then
    redis.call('ZADD', ipAddress, now, now)
end
redis.call('EXPIRE', ipAddress, 3600)
local ResetTime = redis.call('TTL', KEYS[1])
return {limit - amount,ResetTime,now-clearBefore}`
// return limit - amount`
// return {token,now,window,limit}`
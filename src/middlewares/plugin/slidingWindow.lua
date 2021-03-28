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
local resetTime = redis.call('TTL', KEYS[1])
return { limit - amount, resetTime, now - clearBefore }

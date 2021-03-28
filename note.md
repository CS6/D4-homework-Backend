X-Forwarded-For ${__Random(10,200,)}.${__Random(2,255,)}.${__Random(2,255,)}.${__Random(1,255,)}


https://github.com/redis/redis/issues/135


https://dzone.com/articles/subkey-expires-amp-real-time-expire-deletion-imple

https://stackoverflow.com/questions/39996380/expiry-time-for-member-in-redis
https://redis.io/commands/

https://redis.readthedocs.io/en/2.6/script/eval.html

https://www.runoob.com/redis/strings-incr.html
https://groups.google.com/g/redis-db/c/NkdwzdTMsaw?pli=1




實作參考
https://dzone.com/articles/counting-distinct-users-in-real-time-with-redis-us
https://engagor.github.io/blog/2017/05/02/sliding-window-rate-limiter-redis/


衍生 關於 Redis 是沒有原生的 Expiry time for member 事件，無意中看到了 KeyDB ，覺得也不錯。
http://redisdoc.com/expire/index.html
https://dzone.com/articles/subkey-expires-amp-real-time-expire-deletion-imple
https://github.com/EQ-Alpha/KeyDB


jmeter  
Duran 節省哥

https://ithelp.ithome.com.tw/articles/10186852
https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Headers/X-Forwarded-For
https://stackoverflow.com/questions/43753504/how-to-add-x-forwarded-for-request-header-in-jmeter
https://ithelp.ithome.com.tw/articles/10203900




https://stackoverflow.com/questions/16022624/examples-of-http-api-rate-limiting-http-response-headers
https://www.chaijs.com/api/bdd/



如何在mongodb中找到隨機記錄
db.getCollection('users').find().limit( 1 ).skip( _rand() * db.getCollection('users').count() )
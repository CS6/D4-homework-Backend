import { Request, Response, NextFunction } from 'express';
import { getClientIp } from '../utils/getIpAddress';
import { connectToRedis } from '../databases/RedisConnection';

export default (req: Request, res: Response, next: NextFunction) => {
	const redis_client = connectToRedis();
	const ipAddress = getClientIp(req);
	// const ipAddress = '1.1.1.99';
	const evalScript = `return redis.call('SET', KEYS[1], ARGV[2])`;
	
	redis_client.defineCommand("evalTest", {
		numberOfKeys: 2,
		lua: evalScript,
	})
	redis_client.get('foo', (err: any, reply: any) => {
		if (err) throw err;
		console.log(reply);
	});
	
	async function evalTest() {
		await redis_client.eval(evalScript, 1, 'nameEE1', 'nameEE2', 'valEE1', 'valEE2');
		const result = await redis_client.get('nameEE2');
		console.log(result);
		return result; // val2
	}
	evalTest();
	redis_client
		.multi()
		.set([ipAddress, 0, 'EX', 3600, 'NX']) // NX -> 只有 key 不存在才會設立
		.incr(ipAddress) //只有 key 存在才會 key 加 1
		// .EXPIRE(ipAddress, 100)
		.ttl(ipAddress)
		.exec((err: any, replies: any) => {
			if (err) {
				return res.status(500).send(err.message);
			}
			const requestCount = replies[1];
			res.set({
				'X-RateLimit-Remaining': 1000 - requestCount,
				'X-RateLimit-Reset': replies[2]
			});

			if (requestCount > 1000) {
				return res.status(429).send(replies+'You sent too many requests in an hour!')
			}
			// return res.status(200).send(JSON.stringify(req.ips))

			return res.status(200).send(req.socket.address())
			// return next()
		})
}



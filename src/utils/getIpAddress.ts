import { Request } from 'express';
import { AddressInfo } from 'net';

export function getClientIp(req: Request) {
	const ipInfo = req.socket.address() as AddressInfo;
	const ipAddress = ipInfo.address || '';
	
	if (!ipAddress) {
		return '';
	}
	
	// convert from "::ffff:192.0.0.1"  to "192.0.0.1"
	if (ipAddress.substr(0, 7) == "::ffff:") {
		return ipAddress.substr(7)
	}

	return ipAddress;
}

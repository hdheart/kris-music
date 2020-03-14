import {
	address,
	reqHeader
} from './config.js'


async function request(url, reqData, method) {
	return await new Promise((resolve, reject) => {
		uni.request({
			url: address.api + url,
			data: reqData,
			header: reqHeader.json,
			method: method,
			success: res => {
				resolve(res);
			},
			fail: err => {
				console.log('request方法请求接口失败', err);
				reject();
			}
		})
	})
}

export function requestGet(url, reqData = {}) {
	return request(url, reqData, 'GET');
}

export function requestPost(url, reqData = {}) {
	return request(url, reqData, 'POST');
}

import {
	requestGet,
	requestPost
} from './request.js'

import {
	SUCCESS
} from './config.js'

export async function getBanner(reqData) {
	try{
		let res = await requestGet('/banner', reqData);
		if (res.data.code == SUCCESS){
			return res.data.banners;
		} else {
			throw new Error();	
		}
			
	}
	catch(e){
		//TODO handle the exception
		console.log('getBanner失败', e);
	}
	
}
export async function getPersonalized(reqData) {
	try{
		let res = await requestGet('/personalized', reqData)
		if(res.data.code == SUCCESS){
			return res.data.result;
		}else {
			throw new Error();
		}
		
	}catch(e){
		//TODO handle the exception
		console.log('getpersonalized失败' ,e);
	}
	
}

export async function getPersonalizedMv(reqData) {
	try{
		let res = await requestGet('/personalized/mv', reqData)
		if(res.data.code == SUCCESS){
			return res.data.result;
		}else {
			throw new Error();
		}
	}catch(e){
		//TODO handle the exception
		console.log('getpersonalizedmv失败' ,e);
	}
	
}

export async function getPlaylistDetail(reqData) {
	try{
		let res = await requestGet('/playlist/detail', reqData)
		if(res.data.code == SUCCESS){
			return res.data.playlist;
		}else{
			throw new Error();
		}
	}catch(e){
		//TODO handle the exception
		console.log('getplaylistdetail 失败', e);
	}
	
	
}

export async function getSong(reqData) {
	try{
		let res = await requestGet('/song/url', reqData)
		if(res.data.code == SUCCESS){
			return res.data.data;
		}else {
			throw new Error();
		}
	}catch(e){
		//TODO handle the exception
		console.log('getSong失败' ,e);
	}
	
}

export async function getMv(reqData) {
	try{
		let res = await requestGet('/mv/url', reqData)
		if(res.data.code == SUCCESS){
			return res.data.data;
		}else {
			throw new Error();
		}
	}catch(e){
		//TODO handle the exception
		console.log('getMv失败' ,e);
	}
	
}

export async function getLyric(reqData) {
	try{
		let res = await requestGet('/lyric', reqData)
		if(res.data.code == SUCCESS){
			return res.data.lrc;
		}else {
			throw new Error();
		}
	}catch(e){
		//TODO handle the exception
		console.log('getLyric失败' ,e);
	}
	
}

export async function getPlaylistMore(reqData) {
	try{
		let res = await requestGet('/top/playlist', reqData)
		if(res.data.code == SUCCESS){
			return res.data.playlists;
		}else {
			throw new Error();
		}
	}catch(e){
		//TODO handle the exception
		console.log('getPlaylistMore失败' ,e);
	}
	
}

export async function getSongDetail(reqData) {
	try{
		let res = await requestGet('/song/detail', reqData)
		if(res.data.code == SUCCESS){
			return res.data.songs[0];
			console.log('return data')
		}else {
			throw new Error();
		}
		
	}catch(e){
		console.log('getSongDetail失败', e)
	}
}




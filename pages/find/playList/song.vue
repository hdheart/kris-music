<template>
	<view v-if="song">
	<view v-if="lyric">	
	<view class="container">
		        <view class="page-body">
				
		            <view class="page-section" style="text-align: center;" v-for="(item,index) in song" :key="index">
	
		                <!-- <audio style="text-align: left" :src="item.url"  :name="current.name" :author="current.author" :action="audioAction" controls></audio> -->
					<view class="content">
						<imt-audio continue :src="item.url" :duration="time" @prev="now = now === 0?audio.length-1:now-1"
						 @next="now = now === audio.length-1?0:now+1"></imt-audio>
						<!-- 
							 src: String 音频链接*必须*
							 duration: Number 总时长（单位：s）*必须*
							 autoplay: Boolean 是否自动播放*默认false*
							 control: Boolean 是否需要上一曲/下一曲按钮*默认true*
							 continue:Boolean 播放完成后是否继续播放下一首，需定义@next事件*默认false*
							 color: String 主色调*默认#169af3*
							 @prev:点击上一首按钮
							 @next:点击下一首按钮
						  -->
						<!-- <view class="list" :class="{active:key===now}" v-for="(item,key) in audio" :key="key" @click="now = key">
							<view class="list-title">{{key+1}}</view>
							<image class="list-pic" src="../../../static/images/stream.png"></image>
						</view> -->
						<!-- <audio :src='item.url' ></audio> -->
					</view>
				</view>
		        </view>
				<!-- <button @click="getLyricTime" type="default">btn</button> -->
				
			<!-- <text>{{ lyric.lyric }}</text> -->
				
				<view class="bg-image">
				<image :src="imgUrl" mode="aspectFill"></image>
				</view>
				</view>
				<view class="ft-image">
				<image :src="imgUrl" mode="aspectFill"></image>
				</view>
	</view>
	</view>
	
</template>

<script>

import { getSong, getLyric, getSongDetail } from "api/find.js"
import imtAudio from 'components/imt-audio/imt-audio'
import lyricItem from './playList.js'
// var music = null;
// music = uni.createInnerAudioContext(); //创建播放器对象
// music.src= "http://m7.music.126.net/20191119181311/d11775fa733eab03a75fc5c8ad6be107/ymusic/030b/055f/530b/4a0b6f24db25f0a6c1eadad7062df25d.mp3"; //选择播放的音频

export default {
	data(){
		return{
			id : undefined,
			song : null,
			lyric : null,
			songdetail : null,
			now : 0,
			time : 180,
			current: {
				name:'大碗宽面',
				author:'kris',
				
				
			},
			audioAction: {
				method: 'pause'
				
			},
			audio: [{
					// src: 'http://m8.music.126.net/20191121133405/31674ec61fc1adcda70ff0256ca44d50/ymusic/030b/055f/530b/4a0b6f24db25f0a6c1eadad7062df25d.mp3',
					duration: 120
				},
			
			
			],
			lyricArray : [],
			imgUrl : '',
			
		} 
	},
	// props:{
	// 	playlistdetail: {},
		
		
	// },
	onLoad(options) {
		this.id = options.id;
		console.log(options.id)
		this.init();
		
		
	},
	methods: {
		init(){
			this.handleSong();
			this.handleLyric();
			this.handleSongDetail();
		},
		async handleSong(){
			let reqdata = {};
			reqdata.id = this.id;
			this.song = await getSong(reqdata);		
		},
		async handleLyric(){
			let reqdata = {};
			reqdata.id = this.id;
			this.lyric = await getLyric(reqdata);
			console.log(this.lyric)
		},
		async handleSongDetail(){
			let reqdata = {};
			reqdata.ids = this.id;
			this.songdetail = await getSongDetail(reqdata);	
			this.imgUrl = this.songdetail.al.picUrl
		},
		getLyricTime(){
			console.log(this.lyric.lyric)
			console.log(this.songdetail.al.picUrl)
			// console.log(this.lyric.lyric)
		},
		parselyric(lyric){		
			     console.log('---');
			    let RegExp=/\[(\d*:\d*\.\d*)\]/;
			    let arr='',timeArr=[],lyricArr=[],mergeArr=[];
			    let ar = '';
				let mix = '';
				let finmix;
			    /**将歌词转换成数组 */
			    arr=lyric.split('\n');
				// ar = arr[6].split(':')
				// console.log(ar)
				// mix = ar[2].substr(0, ar[2].length - 1)
				// finmix = Number(mix) + Number(ar[1]*60)
				// console.log(finmix)
				// this.time = finmix
				ar = arr.slice(-2)[0];
				mix = ar.split(']')[0].substr(1).split(':')
				finmix = Number(mix[1]) + Number(mix[0]*60)
				this.time = finmix
				console.log(finmix)
			     
			},
		
		
		//播放音频
		
		
				
	},
		
	watch:{
			lyric(){
				this.parselyric(this.lyric.lyric)
				
			}
		},
	components: {
		imtAudio,
		
		}
	
	
}
	
</script>

<style lang="scss" scoped>
	.container{
		background-color: rgba(0, 0, 0, 0.3);
	}
	.page-body {
		padding: 0upx;
		
		position : fixed;
		bottom : 0;
		left : 0;
		right : 0;
		height: 105px;
		
		
	}
	
	.list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		background: #fff;
		border-radius: 10upx;
		margin-top: 20upx;
		color: #333;
	}
	
	.list-title {
		font-size: 28upx;
		line-height: 88upx;
	}
	
	.list-pic {
		display: none;
		width: 28upx;
		height: 28upx;
	}
	
	.active {
		background: #169af3;
		color: #fff;
	}
	
	.active .list-pic {
		display: block;
	}		
	.bg-image{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
		image{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		filter: blur(20upx);
		transform: scale(1.1);
		// z-index: -1;
		}
	}
	.ft-image{
		padding-top: 300upx;
		text-align: center;
		image{
			// text-align: center;
			// width: 50%;
			// height: 50%;	
		
			text-align: center;
			width: 300upx;
			height: 300upx;	
			
		}
		
	}
</style>

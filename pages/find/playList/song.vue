<template>
	<view v-if="song">
	<view v-if="lyric">	
	<view class="container">
		        <view class="page-body">
		            <view class="page-section" style="text-align: center;" v-for="(item,index) in song" :key="index">
		                <!-- <audio style="text-align: left" :src="item.url"  :name="current.name" :author="current.author" :action="audioAction" controls></audio> -->
					<view class="content">
						<imt-audio continue :src="item.url" :duration="audio[now].duration" @prev="now = now === 0?audio.length-1:now-1"
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
						<view class="list" :class="{active:key===now}" v-for="(item,key) in audio" :key="key" @click="now = key">
							<view class="list-title">{{key+1}}</view>
							<image class="list-pic" src="http://mouyizhan.com/music.gif"></image>
						</view>
					</view>
				</view>
		        </view>
				
			<text>{{ lyric.lyric }}</text>
	</view>
	</view>
	</view>
	
</template>

<script>

import { getSong, getLyric } from "api/find.js"
import imtAudio from 'components/imt-audio/imt-audio'
// var music = null;
// music = uni.createInnerAudioContext(); //创建播放器对象
// music.src= "http://m7.music.126.net/20191119181311/d11775fa733eab03a75fc5c8ad6be107/ymusic/030b/055f/530b/4a0b6f24db25f0a6c1eadad7062df25d.mp3"; //选择播放的音频

export default {
	data(){
		return{
			id : undefined,
			song : null,
			lyric : null,
			now : 0,
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
				// {
				// 	src: 'http://mouyizhan.com/2.mp3',
				// 	duration: 189
				// },
				// {
				// 	src: 'http://mouyizhan.com/3.mp3',
				// 	duration: 214
				// },
				// {
				// 	src: 'http://mouyizhan.com/4.mp3',
				// 	duration: 205
				// },
				// {
				// 	src: 'http://mouyizhan.com/5.mp3',
				// 	duration: 228
				// }
			],
		} 
	},
	// props:{
	// 	playlistdetail: {},
		
		
	// },
	onLoad(options) {
		this.id = options.id;
		this.init();
		
	},
	methods: {
		init(){
			this.handleSong();
			this.handleLyric();
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
		},
		//播放音频
	
		
				
	},
	components: {
		imtAudio
		}
	
	
}
	
</script>

<style>
	.content {
		padding: 20upx;
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
</style>

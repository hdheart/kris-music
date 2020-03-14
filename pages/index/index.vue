<template>
	<view class="container">
		<view class="tab">
			<view class="tab-item" :class="currentIndex == 0 ? 'active' :''" @click="tabClick(0)">
				<text>我的</text>
			</view>
			<view class="tab-item" :class="currentIndex == 1 ? 'active' :''" @click="tabClick(1)">
				<text>发现</text>
			</view>
			<view class="tab-item" :class="currentIndex == 2 ? 'active' :''" @click="tabClick(2)">
				<text>云村</text>
			</view>
			<view class="tab-item" :class="currentIndex == 3 ? 'active' :''" @click="tabClick(3)">
				<text>视频</text>
			</view>
		</view>
		<view v-show="currentIndex == 0"></view>
		<view v-show="currentIndex == 1"><find :bannerList="bannerList" :personalized="personalized" :personalizedmv="personalizedmv"></find></view>
		<view v-show="currentIndex == 2"></view>
		<view v-show="currentIndex == 3"></view>
		<view class="test" @click="musicClick()">
			<text>音乐</text>
		</view>
		</view>
</template>

<script>
import { getBanner, getPersonalized, getPersonalizedMv} from 'api/find.js';
import find from '../find/index.vue';
//0-pc 1-android 2-ip 3 ipad  
// const TYPE = 1;
const LIMIT = 6;
 var music = null;
music = uni.createInnerAudioContext(); //创建播放器对象
music.src= "http://m8.music.126.net/20191121133405/31674ec61fc1adcda70ff0256ca44d50/ymusic/030b/055f/530b/4a0b6f24db25f0a6c1eadad7062df25d.mp3"; //选择播放的音频

export default {
	data() {
		return {
			currentIndex: 1,
			bannerList: null,
			personalized: null,
			personalizedmv: null,
		}
	},
	onLoad() {
		this.init();
		// this.ScanAudio();
				

	},
	methods: {

		
		init() {
			this.initFindData();
		},
		//处理find的数据
		initFindData() {
			this.handleBanner();
			this.handlePersonalized();
			this.handlePersonalizedMv();
		},
		//处理banner数据
		async handleBanner() {
			let reqData = {};
			// reqData.type = TYPE;
			this.bannerList = await getBanner(reqData);
		},
		//处理personalized数据
		async handlePersonalized() {
			let reqData = {};
			reqData.limit = LIMIT;
			this.personalized = await getPersonalized(reqData);
		},
		//处理推荐MV的数据
		async handlePersonalizedMv() {
			let reqData = {};
			this.personalizedmv = await getPersonalizedMv(reqData);
		},
		musicClick(){
			music.play();
			
		},
		//切换tab
		tabClick(index) {
			this.currentIndex = index;
			switch(index){
				case 0:
					break;
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
			}		
		}	
	},
	components: {find}
};

</script>
<!-- scoped只对当前组件有效 -->
<style lang="scss" scoped>
.container {
	.tab {
		width: 100%;
		height: 80upx;
		position: fixed;
		display: flex;
		z-index: 9;
		background-color: #DD524D;
		.tab-item {
			flex: 1;
			position: relative;
			display: flex;
			flex-direction: column;
			text-align: center;
			padding: 10upx;
			text {
				font-size: 15px;
				color: #FFFFFF;
				transition: all 0.1s ease;
				&:last-child {
					position: absolute;
					bottom: 10%;
					left: 50%;
					transform: translateX(-50%);
					opacity: 0.5;
				}
			}		
		}
		.active {
			text {
				&:first-child {
					transform: scale(1.2);
				}
				&:last-child {
					opacity: 1;
				}
			}
		}
		
	}
}

</style>

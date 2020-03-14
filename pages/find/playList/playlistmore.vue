<template>
<view class="playlist">
	<view class="playlist-content" v-for="(item,index) in playlistmore" :key="index" @click="clickplaylist(item.id)">
		<view class="content-item-img">
			<image :src="item.coverImgUrl" mode="aspectFill"></image>
		</view>
			<text>{{item.name}}</text>
	</view>
</view>
<!-- 	<view class="content-item" v-for="(item, index) in personalized" :key="index" @click="clickplaylist(item.id)">
		<view class="content-item-img">
			<image :src="item.picUrl" mode="aspectFill"></image>
		</view>
		<text>{{item.name}}</text>
	</view> -->
	
	
	

</template>


<script>

import { getPlaylistMore } from "api/find.js"
const LIMIT = 21;
const ORDER = "new";
export default {
	data(){
		return{
		
			playlistmore : null,	
		} 
	},
	props:{
		playlistdetailmore: {},
		
		
	},
	onLoad(options) {
		this.id = options.id;
		this.init();
		
	},
	methods: {
		init(){
			this.handlePlaylist();
	
		},
		async handlePlaylist(){
			let reqdata = {};
			reqdata.limit = LIMIT;
			reqdata.order = ORDER;
			this.playlistmore = await getPlaylistMore(reqdata);		
		},
		clickplaylist(id) {
			uni.navigateTo({
				url:`../playList/playlistdetail?id=${id}`
				//等同于'../find/playList/playlistdetail?id=' + id 反撇号简化了拼接
			
			});
		},
				
	},
	
	
}
	
</script>
<style lang="scss" scoped>	

	.playlist {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		
		.playlist-content {
			width: 210upx;
			position: relative;
			display: flex;
			flex-direction: column;
			
			.content-item-img {
				position: relative;
				width: 100%;
				height: 210upx;
				align-items: center;
				margin: 10upx 10upx 10upx 0upx;
				
			 	image {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border-radius: 10upx;//圆角边框
					z-index: -1;
					
					
			 	}
				
				
			 }
			text {
			  display:-webkit-box;//自适应盒子模型
			  text-overflow:ellipsis;//省略
			  overflow:hidden;
			  -webkit-line-clamp: 2;//clamp钳
			  -webkit-box-orient:vertical;
				
					
			}	
			
			
		}
	}
</style>

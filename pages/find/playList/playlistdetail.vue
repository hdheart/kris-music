<template>
<view class="container">
	<!-- 数据加载 -->
	<view v-if="playlistdetail">
		
	<view class="head">

		
		<view class="p3">
			<view class="head-cont">
			<image :src="playlistdetail.coverImgUrl" mode="aspectFill"></image>
			</view>
			<view class="p1">
			<text>{{playlistdetail.name}}</text>
			</view>
		</view>
			
			<view class="p2">
			<view class="tags">
				<text>标签:</text>
				<view class="content-tag" v-for="(item,index) in playlistdetail.tags" :key="index">
				<text>{{ item }}</text>
				</view>
			</view>
			<view class="playlist-intro">
				<view class="introduction">
					<view class="content-descrip">
						<text>{{playlistdetail.description}}</text>
						<text>作者：{{playlistdetail.creator.nickname}}</text>
					</view>
				</view>
			</view>
			</view>
	</view>
	
	
	<view class="playlist-content" v-for="(item, index) in playlistdetail.tracks" :key="index" @click="clicksong(item.id)">
			<view class="tracks-name">
				<text>{{index+1}}</text>
				<uni-icons class="heart" type="heart" size="11"></uni-icons>
				<text>{{item.name}}</text>
				<text>{{item.ar[0].name}}-{{item.al.name}}</text>
				
			</view>
	</view>
	<view class="comment">
		<view class="comment-cont">
			
		</view>	
	</view>
	<view class="bg-img">
		<image :src="playlistdetail&&playlistdetail.coverImgUrl" mode="aspectFill"></image>
	</view>
	<!-- 加载完毕 -->
	</view>
</view>
</template>

<script>
	import {getPlaylistDetail} from "api/find.js"
	import uniIcons from "@/components/yangxiaochuang-icons/yangxiaochuang-icons.vue"
export default {
	data() {
		return{
			id : undefined,
			playlistdetail : null,
				
		}
	
	},
	onLoad(options) {
		this.id = options.id;
		this.init();
		
	},
	
	methods: {
		init(){
			this.handlePlayListDetail();	
			
		},
		async handlePlayListDetail(){
			let reqdata = {};
			reqdata.id = this.id;
			this.playlistdetail = await getPlaylistDetail(reqdata);
		},
		clicksong(id) {
			uni.navigateTo({
				url:`/pages/find/playList/song?id=${id}`
			});
		},
		
		
	},
	components:{uniIcons}
	
	
}
	
	
	
</script>

<style lang="scss" scoped>
.container{
		display: flex;
		flex-direction: column;
		background-color: rgba(0, 0, 0, 0.3);
	.head{
		display: flex;
		flex-direction: column;
		
		
		.p3{
			display: flex;	
		.head-cont{
			display: flex;
		
			
			image{				
				width: 250upx;
				height: 250upx;					
			}	
		}		
		.p1{
			margin-left: 30upx;
			margin-top: 30upx;
			font-size: larger;
			
			text{
				color: #FFFFFF;
				
			}
		}
		}
		
		.p2{
			margin-bottom: 50upx;
			
			.tags{
				display: flex;
				align-content: space-between;
				color: #FFFFFF;
				margin-top: 50upx;
				margin-bottom: 50upx;
				margin-left: 50upx;
				.content-tag{
					margin-left: 40upx;
					text{
						
					}
		
				}				
			}
			.playlist-intro{
					margin-left: 50upx;
					color: #FFFFFF;
					
					.content-descrip{
						display:-webkit-box;//自适应盒子模型
						text-overflow:ellipsis;//省略
						overflow:hidden;
						-webkit-line-clamp: 5;//clamp钳
						-webkit-box-orient:vertical;
						
					}
					
				
				
				}
					
		
		}
		
	}
		
		
		
	
	.playlist-content{
		display: flex;
		align-items: center;
		margin-left: 30upx;
			
		.tracks-name{
			text{
				&:nth-child(1){
					color: #FFFFFF;
					
				}
				&:nth-child(3){
					font-size: medium;
					color: #FFFFFF;
					display:-webkit-box;//自适应盒子模型
					// text-overflow:ellipsis;//省略
					// overflow:hidden;
					// -webkit-line-clamp: 1;//clamp钳
					// -webkit-box-orient:vertical;
					
				}
				&:nth-child(4){
					margin-left: 10upx;
					font-size: small;
					opacity: 0.7;
					color: #F8F8F8;
				}
						
						
			}
					
					
					
		}
	}	
	.bg-img{
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

}
	

</style>

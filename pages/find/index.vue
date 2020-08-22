<template>
	<view class="container">
		<view class="bannerList">
			<!-- banner -->
			<swiper class="card-swiper" :circular="true" :autoplay="true">
				<swiper-item v-for="(item, index) in bannerList" :key='index' @click="clickbanner(item.targetId)">
					<view class="swiper-item"><image :src="item.imageUrl" mode="aspectFill" ></image></view>
					
				</swiper-item>
			</swiper>
			
			<view class="menu">
				<!-- 导航列表 -->
				<view class="menu-nav">
					<view class="menu-nav-item">
						<image src="/static/images/meirituijian.png"></image>
						<text>每日推荐</text>
					</view>
					<view class="menu-nav-item">
						<image src="/static/images/playlist.png"></image>
						<text>歌单</text>
					</view>
					<view class="menu-nav-item">
						<image src="/static/images/paihang.png"></image>
						<text>排行榜</text>
					</view>
					<view class="menu-nav-item">
						<image src="/static/images/fm.png"></image>
						<text>电台</text>
					</view>
					<view class="menu-nav-item">
						<image src="/static/images/stream.png"></image>
						<text>直播</text>
					</view>
				</view>
				<!-- 推荐歌单 -->
				<view class="menu-playlist">
					<view class="menu-playlist-head">
						<view class="head-title">
							<text>推荐歌单</text>
						</view>	
						<view class="head-more" @click="clickMore">
							<text>歌单广场</text>
							<uni-icons type="forward" size="11"></uni-icons>
						</view>
					</view>
					<view class="menu-playlist-content">
						<view class="content-item" v-for="(item, index) in personalized" :key="index" @click="clickplaylist(item.id)">
							<view class="content-item-img">
								<image :src="item.picUrl" mode="aspectFill"></image>
							</view>
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="mv-title">
						<text>推荐MV</text>
					</view>
					<view class="menu-playlist-mv">	
						<view class="content-item-mvs" v-for="(item, index) in personalizedmv" :key="index" @click="clickmv(item.id)">
							<view class="content-item-mv">
								<image :src="item.picUrl" mode="aspectFill"></image>
							</view>
								<text>{{ item.name }}</text>		
						</view>
					</view>
				</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniIcons from "@/components/yangxiaochuang-icons/yangxiaochuang-icons.vue"
	// import {getBanner} from 'api/find.js'
	
	export default {
		name:'find',
		data() {
			return {
				// cardCur : 0
			};
		},
		//props down ,events up.父组件向子组件传递参数
		props: {
			bannerList: {
				// type: Array,
				// default() {
				// 	return null;
				// }
			},
			personalized: {},
			personalizedmv: {},
			
		},
		onLoad() {
			
		},
		methods: {
			//lunbo
			// cardSwiper(e) {
			// 	this.cardCur = e.detail.current;
			// },
			
			clickMore(){
				uni.navigateTo({
					url:'/pages/find/playList/playlistmore'
				});
	
			},
			clickplaylist(id) {
				uni.navigateTo({
					url:`../find/playList/playlistdetail?id=${id}`
					//等同于'../find/playList/playlistdetail?id=' + id 反撇号简化了拼接
	
				});
				
			},
			clickbanner(id) {
				uni.navigateTo({
					url:`../find/playList/song?id=${id}`
				});
				
				
			},
			clickmv(id) {
				uni.navigateTo({
					url:`../find/playList/mv?id=${id}`
				});
				
				
			},

		},
		components: {uniIcons}
	}
</script>

<style lang="scss" scoped>
.container {
	.menu {
		width: 700upx;
		margin-left: 25upx;
		.menu-nav {
			width: 100%;
			display: flex;
			justify-content: space-around;
			padding-bottom: 30upx;
			border-bottom: 2upx solid rgba(0,0,0,0.1);
			.menu-nav-item {
				width: 140upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				padding: 0 10upx 20upx 10upx;
				&:active {
					opacity: 0.7;
					transform: translate(1upx, 1upx);
				}
				image {
					width: 80upx;
					height: 80upx;
				}
				text {
					margin-top: 10upx;
					
				}
				uni-icons {
					width: 80upx;
					height: 80upx;
				}
			}
		}
		.menu-playlist{
			width: 100%;
			padding-top: 30upx;
			.menu-playlist-head {
				display: flex;
				justify-content: space-between;	
				align-content: center;
				text-align: center;
				.head-title {
					font-weight: bold;
				}
				.head-more {
					display: flex;
					align-items: center;
					&:active {
						opacity: 0.7;
						transform: translate(1upx, 1upx);
					}
				}
			}
			
			.menu-playlist-content {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				
				.content-item {
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
			.menu-playlist-mv {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				
				.content-item-mvs {
					width: 210upx;
					// position: relative;
					display: flex;
					flex-direction: column;
					
					.content-item-mv {
						width: 100%;
						height: 210upx;
						align-items: center;
						margin: 10upx 10upx 10upx 0upx;
						image {
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							border-radius: 10upx;
							
							
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
			.mv-title {
				margin-top: 20upx;
				text {
					font-weight: bold;
				}
			}
			
		}
	}
	.card-swiper {
		padding-top: 60upx;
	}
	
}	
</style>

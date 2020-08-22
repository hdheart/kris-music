<template>
	<view class="page-body">
		<view class="tabSearch">
			<input type="text" style="flex-grow: 2;" value=""  placeholder="输入歌曲" @input="InputValue"/>		
			<view class="" @click="search">	
			<uni-icons type="search" style="flex-grow: 1;text-align: center;padding-right: 40px;"></uni-icons>				
			</view>
		</view>
		<!-- <hr style="margin-left: 10px;margin-bottom: 20px; width: 80%; color='grey';"> -->
		<!-- <hr> -->
		<view class="historySearch" style="margin-bottom: 10px;">
			<text>历史记录</text>
			
		</view>
	<view @click="clickId(item.id)" v-for="(item, index) in searchResult" :key='index'>
	<!-- 	<text>{{item.name}}</text>
		<text>{{item.id}}</text>
		<text>{{item.artists[0].name}}</text> -->
		<view class="tracks-name">
				<view class="" style="display: flex;align-items: center;margin: 10px;">
					<text>{{index+1}}</text>
				</view>
			<!-- <uni-icons class="heart" type="heart" size="11"></uni-icons> -->
			<view class="" style="display: flex; flex-direction: column;">			
				<text>{{item.name}}</text>
				<text>{{item.artists[0].name}}-{{item.album.name}}</text>
			</view>
		</view>
	</view>
	
	
	</view>
</template>

<script>
	import {getSearch} from "api/find.js";
	import uniIcons from '../../components/uni-icons/uni-icons.vue';
	export default{
		data() {
			return {
			searchResult : null,
			value : 'aimyon',
			id : undefined,
			playlistdetail : null,
			}
		},
		onLoad() {
			this.init()
		},
		methods:{
			init(){
				console.log('sss');
				this.handleSearch();
				// this.handlePlayListDetail();
			},
			async handleSearch(){
				let reqdata = {};
				reqdata.keywords = this.value;
				this.searchResult = await getSearch(reqdata);
			},
			// async handlePlayListDetail(){
			// 	let reqdata = {};
			// 	reqdata.id = this.id;
			// 	this.playlistdetail = await getPlaylistDetail(reqdata);
			// },
			InputValue(e){
				this.value = e.target.value;
				console.log(e.target.value);
			},
			search(){
				this.init();
			},
			clickId(id){
				console.log(id)
				uni.navigateTo({
					url:`/pages/find/playList/song?id=${id}`
				});
			}
		},
		components:{
			uniIcons
		}
	}
</script>

<style lang="scss" scoped>
	.page-body {
		padding-left: 10px;
		padding-right: 10px;
	}
	.tabSearch {
		display: flex;
		padding-left: 10px;
		align-items: center;
		padding-top: 5px;
		padding-bottom: 5px;
		border-bottom: 1px solid #555555;
	}
	.tracks-name{
		display: flex;
		text{
			&:nth-child(1){
				// color: #FFFFFF;
				
			}
			&:nth-child(1){
				font-size: medium;
				// color: #FFFFFF;
				display:-webkit-box;//自适应盒子模型
				// text-overflow:ellipsis;//省略
				// overflow:hidden;
				// -webkit-line-clamp: 1;//clamp钳
				// -webkit-box-orient:vertical;
				
			}
			&:nth-child(2){
				margin-left: 5upx;
				font-size: small;
				opacity: 0.7;
				// color: #F8F8F8;
			}
									
		}		
				
	}
</style>

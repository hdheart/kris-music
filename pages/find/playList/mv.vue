<template>
	<view v-if="mv">
	<view class="container">
		<view class="mv">
			<text>{{ mv.url }}</text>
			<video :src="mv.url" controls></video>
			
		</view>
	</view>
	</view>
</template>

<script>
import{ getMv } from"api/find.js" 
export default{
	data(){
		return{
			mv : null,	
			
		}
	},
	onLoad(options) {
		this.id = options.id;
		this.init();
	},
	methods: {	
		
	init(){
		this.handlemv();
			
	},
	async handlemv(){
		let reqdata = {};
		reqdata.id = this.id;
		this.mv = await getMv(reqdata);
		
		
		
	} 
		
		
		

		
		
	}
		
		
		
		
	
	
	
	
	
	
	
}
</script>

<style>
</style>

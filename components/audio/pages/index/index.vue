<template>
	<view class="info">
		<view class="song-title">
			<view class="song-name">{{songList[nowIndex].name}}</view>
			<view class="song-author">{{songList[nowIndex].author}}</view>
		</view>
		
		<view class="audio-wrapper">
			<view class="audio-number">{{nowtime}}</view>
			<slider class="audio-slider"  :value="currentTime" min="0" :max="duration" @change="sliderChange" block-size="15"  />
			<view class="audio-number">{{alltime}}</view>
		</view>
		<view  class="audio-control-wrapper" >
			<view  @tap="updateWay()" v-if="playWay==2">
				<image  class="iconbtn" src="../../static/image/icon/suijibofang.png"/>
			</view>
			<view  @tap="updateWay()" v-if="playWay==1">
				<image  class="iconbtn" src="../../static/image/icon/xunhuanbofang.png"/>
			</view>
			<view  @tap="updateWay()" v-if="playWay==0">
					<image  class="iconbtn" src="../../static/image/icon/danquxunhuan.png"/>
			</view>
			<view  @tap="last()" >
				<image class="iconbtn" src="../../static/image/icon/shangyishou.png"></image>
			</view>
			<view @tap="play()" v-if="playState===1">
					<image class="iconbtn play" src="../../static/image/icon/kaishi-2.png"></image>
			</view>
			<view @tap="pause()" v-else >
				<image class="iconbtn play" src="../../static/image/icon/zanting-2.png"></image>
			</view>
			<view  @tap="next()" >
				<image class="iconbtn" src="../../static/image/icon/xiayishou.png"></image>
			</view>
			<view><image class="iconbtn" src="../../static/image/icon/yinleliebiao.png"></image></view>
		</view>

	</view>
</template>

<script>
	let bgAudioMannager = ''
	export default {
		data() {
			return {
				playWay: 1,
				playState: 1,
				nowIndex: 0,
				duration: 0,
				currentTime: 0,
				songList: [{
						"name": "走歌人",
						"author": "暗杠",
						"src": "http://music.163.com/song/media/outer/url?id=418990139.mp3",
						"img": "http://p2.music.126.net/_UOTSqLC8qHRivyuUBC9OQ==/18200215974944920.jpg"				
					},
					{
						"name": "走歌人18",
						"author": "暗杠",
						"src": "http://music.163.com/song/media/outer/url?id=866018207.mp3",
						"img": "http://p2.music.126.net/D9_qDt18yiHxVPr6CRGgLA==/109951163406952902.jpg"

					},
					{
						"name": "走歌人原版无损伴奏",
						"author": "暗杠",
						"src": "http://music.163.com/song/media/outer/url?id=430685718.mp3",
						"img": "http://p2.music.126.net/_UOTSqLC8qHRivyuUBC9OQ==/18200215974944920.jpg"
					}
				]
			}
		},
		onLoad() {
			bgAudioMannager = uni.getBackgroundAudioManager();
			//如果要默认播放的话，把以下注释取消
			//this.bgAudioInnit();
		},
		computed: {
			'nowtime': function() {
				var that = this
				var s = that.currentTime
				//计算分钟
				//算法：将秒数除以60，然后下舍入，既得到分钟数
				var h;
				h = Math.floor(s / 60);
				//计算秒
				//算法：取得秒%60的余数，既得到秒数
				s = s % 60;
				//将变量转换为字符串
				h += '';
				s += '';
				//如果只有一位数，前面增加一个0
				h = (h.length == 1) ? '0' + h : h;
				s = (s.length == 1) ? '0' + s : s;
				return h + ':' + s;
			},
			'alltime': function() {
				var that = this
				var s = that.duration
				//计算分钟
				//算法：将秒数除以60，然后下舍入，既得到分钟数
				var h;
				h = Math.floor(s / 60);
				//计算秒
				//算法：取得秒%60的余数，既得到秒数
				s = s % 60;
				//将变量转换为字符串
				h += '';
				s += '';
				//如果只有一位数，前面增加一个0
				h = (h.length == 1) ? '0' + h : h;
				s = (s.length == 1) ? '0' + s : s;
				return h + ':' + s;
			}		
		},
		methods: {
			sliderChange(e) {
				this.currentTime = e.detail.value
				bgAudioMannager.seek(this.currentTime)
			},
			bgAudioInnit() {
				var that = this
				bgAudioMannager.title = that.songList[that.nowIndex].name;
				bgAudioMannager.singer = that.songList[that.nowIndex].author;
				bgAudioMannager.coverImgUrl = that.songList[that.nowIndex].img;
				bgAudioMannager.src = that.songList[that.nowIndex].src;

				bgAudioMannager.onPlay(() => {
					that.playFunc()
				})
				bgAudioMannager.onPause(() => {
					that.pauseFunc()
				})
				bgAudioMannager.onEnded(() => {
					that.next()
				})
				bgAudioMannager.onTimeUpdate(() => {
					this.currentTime = Math.floor(bgAudioMannager.currentTime);
				})
				bgAudioMannager.onPrev(function() {
					that.last()
				})
				bgAudioMannager.onNext(function() {
					that.next()
				})

				bgAudioMannager.onError(function() {
					that.error()
				})
				bgAudioMannager.onWaiting(function() {
					that.playState = 0
				})

				bgAudioMannager.onCanplay(function() {
					that.duration = Math.floor(bgAudioMannager.duration)
				})

			},
			error() {
				this.playState = 0
			},
			play() {
				var that = this
				if (bgAudioMannager.src == undefined) {
					this.bgAudioInnit()
				}
				bgAudioMannager.play()

			},
			pause() {
				var that = this

				bgAudioMannager.pause()
			},
			playFunc() {
				var that = this
				that.playState = 0
			},
			pauseFunc() {
				var that = this
				that.playState = 1
			},
			last() {
				var that = this
				//随机
				if (that.playWay == 2) {
					that.nowIndex = Math.floor(Math.random() * this.songList.length);
				} else if (that.playWay == 1) { //顺序播放
					//顺序
					if (that.nowIndex < 1) {
						that.nowIndex = that.songList.length - 1
					} else {
						that.nowIndex = that.nowIndex - 1
					}
				} else { //单曲播放 不做处理

				}

				that.bgAudioInnit()
			},
			next() {
				var that = this
				//随机
				if (that.playWay == 2) {
					that.nowIndex = Math.floor(Math.random() * this.songList.length);
				} else if (that.playWay == 1) { //顺序播放
					//顺序
					if (that.nowIndex >= (this.songList.length - 1)) {
						that.nowIndex = 0
					} else {
						that.nowIndex = that.nowIndex + 1
					}
				} else { //单曲播放 不做处理

				}
				that.bgAudioInnit()
			},
			updateWay() {
				var that = this
				if (that.playWay == 2) {
					that.playWay = 0
				} else {
					that.playWay = that.playWay + 1
				}

			}


		}

	}
</script>

<style>
	.song-title{
		margin: 30upx;
	}
	.song-name{
		text-align: center;
		color: #FFFFFF;
		font-size: 35upx;
		margin-top: 30upx;

	}
	.song-author{
		text-align: center;
		color: #FFFFFF;
		font-size: 25upx;
	}
	.info{
		background-color: #990000;
		margin: 30upx;
		border-radius:5px
	}
	.iconbtn{
		width: 60upx;
		height: 60upx;	
		margin-left: 30upx;
		margin-right: 30upx;

	}
	.imt-audio {
		padding: 30upx;
		background: #fff;
		border-radius: 20upx;
	}

	.audio-wrapper {
		display: flex;
		align-items: center;
		margin: 30upx;
	}

	.audio-number {
		font-size: 24upx;
		line-height: 1;
		color: #FFFFFF;
	}

	.audio-slider {
		flex: 1;
		margin: 0 30upx;
	}

	.audio-control-wrapper {
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: "iconfont" !important;
	
	}





</style>
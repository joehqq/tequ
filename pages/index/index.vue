<template>
	<view class="content">
		<view class="biglod" v-if="bgfalng">
			<image src="../../static/image/bar.jpg" mode=""></image>
			<h3 class='hend' v-if="timeend" data-text='珠海·四十而已 | 穿越时空来@你'>珠海·四十而已 | 穿越时空来@你</h3>
			<u-button size='medium' :plain='true' :ripple="true" class="btnqqq"  v-if="timeend" @click="bfsp" >点击飞越珠海</u-button>
			
		</view>
		  <video
		  class="addview"
		  @play='start'
	:muted='jy'
		  object-fit='fill'
		   x5-playsinline="" playsinline="true" webkit-playsinline="true"
		   x-webkit-airplay="true"
		   x5-video-player-type="h5"  
		   x5-video-player-fullscreen="" 
		    x5-video-orientation="portraint"
			ref='vido'
			@ended='end'
			v-if="flgq"
			  v-show="spflang" 
			  id="myVideo" src="https://geli.oss-cn-shenzhen.aliyuncs.com/zhuhai_40/zhuhai_40years.mp4"
			  @error="videoErrorCallback" 
			   controls></video>
		   <view  v-if="spflang" @click="jmp" class="btn">
			   
		   	跳过
		   </view>
		<image class="banr"  src="../../static/image/bar.jpg" mode=""></image>
	
		<view class="swiper-container" style="height:560rpx;width: 380rpx;margin-top:240rpx " ref="mySwiper">
			<view class="swiper-wrapper">
			
			
				<view class="swiper-slide" style="color:#000" v-for="(item,index) in imglist" :key='index'><view class='imgbox'>
				<image v-if="hcend" class='imgq' :src="hcend" mode=""></image>
				<u-icon v-if="(!flang)&&(!hcend)" class="qnms" @tap="goimg" name="plus"></u-icon>
				<view   v-if="(!flang)&&(!hcend)" class="qnm" @tap="goimg" >
					点击选择图片 单人效果更佳
					
				</view>
			
				 <image v-if="flang" class='imgq' :src="item.img" mode=""></image>
				
				 </view></view>
			</view>

		</view>
		<view v-show="flang">
			<view v-show="flang" class="swiper-button-prev"></view>
			<view v-show="flang" class="swiper-button-next"></view>
		</view>
	
		
		<view v-if="flang" class="qd" @click="qd">
			
		</view>
		<view v-else class="qdsss" @click="qdend">
			
		</view>
		<view class="ldbox" v-if="ldflang">
			 <div class="loader"></div>
			<view class="wz">
				正在加载请稍后...
			</view>
		</view>
		<view v-if="bigfl">
			<view class="xz" v-if="flang">
				
			</view>
			<view class="xz qs" v-if="!flang">
				
			</view>
		</view>
		
		<u-mask :show="show">
			
					<image v-if="hcend" class='imgqn' :src="hcend" mode="widthFix"></image>
					<view  class="endbox"  >
						{{str}}
					<!-- <view class="eq" >
						
					</view> -->
					<!-- <image v-if="!bigfl" src="../../static/image/ca.png" mode=""></image> -->
					</view>
					<view class="wenzi endbox" v-if="hcend" >
						与珠海共成长 您是第{{num}}位见证珠海40岁生日的奋斗者
					</view>
			<view class="clos" @click="guan">
				X
			</view>
		
		</u-mask>
			
		 <helang-compress ref="helangCompress"></helang-compress>
			
				<image class="footimg" src="../../static/image/qbz.png" mode=""></image>
	</view>
</template>

<script>
	var jweixin = require('jweixin-module')
	jweixin.ready(function(){
	    // TODO
	});
	import homeApi from '../../api/home.js'
	import helangCompress from '../../components/helang-compress/helang-compress';
	import axios from 'axios'
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper';
	var app = getApp();
	export default {
		data() {
			return {
				num:'110',
				str:'< 长 按 保 存 图 片 >',
				show:false,
				bigfl:true,
				flgq:true,
				compressed:['compressed'],
				// start:false,
				url:"https://plugins.zhdutyfreemall.com/api/facefusion/getImage",
				ldflang:false,
				jy:false,
				spflang:false,
				timeend:false,
					src: '',
				hcend:'',
				bgfalng:true,
					action: 'http://www.example.com/upload',
				flang:true,
				imglist:[{
					img:'../../static/image/1.jpg',
					id:1
				},{
					img:'../../static/image/2.jpg',
					id:2
				},{
					img:'../../static/image/3.jpg',
					id:3
				},{
					img:'../../static/image/4.jpg',
					id:4
				},{
					img:'../../static/image/5.jpg',
					id:5
				},{
					img:'../../static/image/6.jpg',
					id:6
				},{
					img:'../../static/image/7.jpg',
					id:7
				},{
					img:'../../static/image/8.jpg',
					id:8
				}],
				title: 'Hello',
				datas:{},
				paused: true,
				innerAudioContext: {

				},
				mySwiper:{},
				base:'',
				compressPath:''


			}
		},
		created() {
			var that=this
			setTimeout(()=>{
				that.timeend=true
			},1000)
			
		},

		onLoad() {
			
		},
		components: {
			swiper,
			swiperSlide,
			helangCompress
		},
		mounted() {
		 this.mySwiper=	new Swiper(".swiper-container", {
				prevButton: '.swiper-button-prev',
				nextButton: '.swiper-button-next',
				pagination: {
					el: ".swiper-pagination"
				},
				loop: false,
				
				onlyExternal:true
				

			});
			
		},
		methods: {
			guan(){
				this.show = false
				this.bigfl=true
			},
			goimg(){
				const that=this
				uni.chooseImage({
				    count: 1,
				    sizeType: ['compressed'],
				    sourceType: ['album','camera'],
				    success: (res)=> {
						that.ldflang=true
				        this.$refs.helangCompress.compress({
				        	src:res.tempFilePaths[0],
				        	maxSize:800,
							fileType:'jpg',
				        	quality:0.8
				        }).then((res)=>{
							
				        	
								 var sj = res.split('base64,')[1]
								 this.getImage(sj)
							console.log(this.hcend);
				        }).catch((err)=>{
							that.ldflang=false
							uni.showModal({
								title:'提示',
								content:err,
								showCancel:false,
								confirmText:'压缩错误,请稍后重试'
							});
						});
				    }
				});
				// uni.chooseImage({
				//      count: 1, //默认9
				//      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				//      sourceType: ['album', 'camera'], //从相册选择
				//      success: function(res) {
				// 		 that.ldflang=true
				//       if (res.tempFilePaths.length > 0) {
				
				//        const file = res.tempFiles[0]
				//        const form = new FormData();
				//        form.append('file', file);
				//        axios
				//         .post(`https://plugins.zhdutyfreemall.com/api/facefusion/getImage?id=${that.imglist[that.mySwiper.realIndex].id}`, form, {
				//          headers: {
				//           "content-type": "multipart/form-data"
				//          }
				//         })
				//         .then(response => {
				// 			that.hcend=response.data.data.Image
				// 			that.ldflang=false
				// 		})
				//         .catch(error => {
				// 			that.ldflang=false
				// 		})
				//       }
				//      }
				//     });
			},
			getImage: function(img) {
			    var that = this;
			    var param = {};
			    param.id = that.imglist[that.mySwiper.realIndex].id;
			    param.img = img;
			    app.basePost('/api/facefusion/getImage', param, function(res) {
					if(res.status==200){
					return	uni.showModal({
							title:'提示',
							content:err,
							showCancel:false,
							confirmText:'状态错误,请稍后重试'
						});
					}
					that.show=true,
				that.hcend = res.data.Image
				that.num=res.data.Num
				 that.ldflang=false
				 that.bigfl=false
			    }, function(res) {
					that.ldflang=false
					uni.showToast({
						title:res.errorMsg ,
						icon: 'none'
					});
			    });
			   },
			cg(val,val1,val2){
				console.log(val)
				console.log(val1)
				console.log(val2)
			},
			start(){
				this.bgfalng=false
				this.spflang=true
				this.ldflang=false
				console.log(9999788)
			},
			bfsp(){
				this.ldflang=true
				this.$refs.vido.play()
				
			},
			jmp(){
				this.flgq=false
				this.jy=true
				this.spflang=false
			},
			end(){
				this.spflang=false
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			add(val){
				console.log(val,987)
				this.datas=val
				this.urlTobase64(val[0].url)
			},
			qdend(){
				console.log(2222)
				this.flang=true
				this.hcend=''
				
				
			},
			qd(){
				
				this.flang=false
				// this.url=`https://plugins.zhdutyfreemall.com/api/facefusion/getImage?id=${this.mySwiper.realIndex].id}`  
			this.url=`https://plugins.zhdutyfreemall.com/api/facefusion/getImage?id=${this.imglist[this.mySwiper.realIndex].id}`
				// this.mySwiper.nextButton=''
				// this.mySwiper.prevButton=''
				// console.log(  )
			},
			click(index, item) {
				console.log('点击了:' + index + ', ' + JSON.stringify(item));
				uni.showToast({
					title: '点击了:' + index,
					icon: 'none'
				});
			},
			onPause() {
				this.innerAudioContext.pause()
				this.paused = false
				console.log(this.innerAudioContext.paused)
				console.log('暂停播放');
			},
			onPlay() {
				this.innerAudioContext.play()
				this.paused = true
				console.log(this.innerAudioContext.paused)
				console.log('开始播放');
			}
		}
	}
</script>

<style scoped lang="scss">
	
		   
		   
		   
	// .anim-opacity3{animation: 3s opacity3   alternate forwards; }
	// @keyframes opacity3 {
	//   0% {
	//     opacity:1;
	//   }
	
	//   100% {
	//      opacity:0;
	//   }
	// }
	       
	.endbox{
		opacity:1;
		margin-bottom: 4rpx;
		  color:#a0cfff;
		    height: 38rpx;
		    position: relative;
			margin: 0 auto;
			    opacity: 1;
			    display: block !important;
		    z-index: 8;
		    text-align: center;
		    line-height: 38rpx;
		// image{
		// 	    width: 332rpx;
		// 	    height: 26rpx;
		// 	    display: inline-block;
		// 	    overflow: hidden;
		// 	    /* line-height: 12px; */
		// 	    position: relative;
		// 	    display: block;
		// 	    margin: 0 auto;
		// }

	}
	.clos{
		position: fixed;
		top: 20rpx;
		right: 20rpx;
		width: 50rpx;
		height: 50rpx;
		color: #fff;
		background-color: #c8c9cc;
		border-radius: 50%;
		z-index: 999999;
		    text-align: center;
		    line-height: 50rpx;
	}
	/deep/.u-mask{
		background-color: #fff !important;
	}
	.eq{
		background-image: url(../../static/image/ca.png) !important;
		background-position: center;
		background-size: 100%;
		transform: translateX(-50%);
		height: 40rpx;
		z-index: 99999;
		position: fixed;
		background-repeat: no-repeat;
		        bottom: 14rpx;
		    left: 50%;
		    transform: translateX(-50%);
		    width: 300rpx;
	}
	 .loader {
	    position: relative;
	    width: 80rpx;
	    height: 80rpx;
	    border-radius: 50%;
	    background: linear-gradient(45deg, transparent, transparent 40%, #e5f403);
	    animation: animate 1s linear infinite;
		top: 480rpx;
		left:334rpx;
	  }
	  
	  .loader::before {
	    content: "";
	    position: absolute;
	    top: 12rpx;
	    left: 12rpx;
	    right: 12rpx;
	    bottom: 12rpx;
	    background-color: #333;
	    border-radius: 50%;
	    z-index: 1000;
	  }
	  .btn{
		      font-size: 22rpx;
		      line-height: 40rpx;
		      color: rgb(157, 131, 80);
		  position: fixed;
		  top: 20rpx;
		  left: 600rpx;
		  z-index: 99999999999;
		  text-align:center ;
		  width: 80rpx;
		  height: 40rpx;
		  border-radius: 15rpx;
		  background-color: #FFFFFF;
		  border: 2rpx solid #e5f403;
	  }
	  .loader::after {
	    content: "";
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: linear-gradient(45deg, transparent, transparent 40%, #e5f403);
	    border-radius: 50%;
	    z-index: 100;
	    filter: blur(2px);
	  }
	  
	  /* la animacion */
	  
	  @keyframes animate {
	    0% {
	      transform: rotate(0deg);
	      filter: hue-rotate(0deg);
	    }
	  
	    100% {
	        transform: rotate(360deg);
	        filter: hue-rotate(360deg);
	    }
	  }
	
	.biglod{
		image{
			    position: fixed;
			    top: 0;
			    left: 0;
				bottom: 0;
				right: 0;
				width: 100%;
				height: 100%;
		}
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		
		box-sizing: border-box;
		min-height: 100vh;
		position: fixed;
		z-index: 9999999999;
		background: linear-gradient(to right, rgb(178, 254, 250), rgb(14, 210, 247));
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.qnm{
		      width: 168rpx;
		      margin: 16rpx auto 0;
		      color: #909399;
		      line-height: 60rpx;
	}
	.wenzi{
		  color: #f96;
		position: relative;
			display: block !important;
			    margin: 10rpx auto 0;
			    text-align: center;
		    background: transparent !important;
		margin-bottom: 0rpx;
		// color: #c27237 !important;
		width: 680rpx;
		    font-weight: 600;
		    font-size: 26rpx;
		    height: 56rpx;
		    line-height: 32rpx;
	}
	h3{
		position: relative;
		color:#222;
		height: 80rpx;
		text-transform: uppercase;
		border-bottom: 14rpx solid #222;
		letter-spacing: 0.05;
		line-height: 2.2rem;
		z-index: 99;
	}
	.ldbox{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 9999999999;
		text-align: center;
		
		height: 100%;
		background-color: rgba(0,0,0,0.6);
		.wz{
			margin-top: 600rpx;
			  color: rgb(157, 131, 80);
		}
	}
	h3:before{
		content: attr(data-text);
		position: absolute;
		top: 0;
		height: 80rpx;
		left:0;
		letter-spacing: 0.05;
		line-height: 2.2rem;
		width: 100%;	
		color: #03a9f4;
		overflow: hidden;
		border-bottom: 14rpx solid #03a9f4;
		animation: animta 2s alternate forwards;
		-webkit-transform:translate3d(0,0,0);
		transform:translate3d(0,0,0);
	}
	.qnms{
		    margin: 190rpx auto 0;
		    display: block;
		    text-align: center;
	}
	uni-video {
		object-fit: fill;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left:0;
		right: 0;
		z-index: 99999999;
	}
	 .anim-opacity2{animation: 3s opacity2   alternate forwards; }
	        @keyframes opacity2{
	            0%{opacity:0;
				top: 0;
				}
	            100%{opacity:1;
					top: 89%;}
	        }
	       
	.btnqqq{
		    position: fixed;
		    top: 640rpx;
		    left:210rpx;
	}
	@keyframes animta {
		0%{
			width: 0;
		}
		100%{
			width: 100%;
		}
	}
	.footimg{
		// width: 100rpx;
		// height: 100rpx;
		// position: fixed;
		// top: 0;
		// left: 0;
		    width: 60rpx;
		    height: 103rpx;
		    position: fixed;
		    top: 224rpx;
		    left: 510rpx;
		    z-index: 9;
	}
	/deep/.u-preview-wrap{
		width: 100% !important;
		height: 100% !important;
	}
	/deep/.u-add-tips{
		    margin-top: 100rpx;
		    text-align: center;
		    color: rgb(157, 131, 80);
	}
	/deep/.uicon-plus{
		font-size: 70rpx !important;
		color: rgb(213, 202, 175) !important;
	}
	/deep/.u-upload{
		// width: 100%;
		    height: 100%;
			view{
				// width: 100%;
			}
	}
	/deep/.clas{
		position: absolute;
		top: 25%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	/deep/.u-add-wrap{
		width: 100% !important;
		    height: 100% !important;
			background::transparent !important;
	}
	.qdsss{
		background-image: url(../../static/image/fh.png);
		background-position: center;
		background-size: 100%;
		transform: translateX(-50%);
		z-index: 9999;
		position: fixed;
		background-repeat: no-repeat;
		    top: 880rpx !important;
		    left: 50%;
		    transform: translateX(-50%);
			    top: 880rpx;
			    width: 170rpx;
			    height: 180rpx;
	}
	.qd{
		background-image: url(../../static/image/qd.png);
		background-position: center;
		background-size: 100%;
		transform: translateX(-50%);
		z-index: 9999;
		position: fixed;
		background-repeat: no-repeat;
		    top: 888rpx !important;
		    left: 50%;
		    transform: translateX(-50%);
			    top: 880rpx;
			    width: 170rpx;
			    height: 180rpx;
	}
	/deep/.swiper-container{
		    position: fixed;
		    top: 36rpx;
		    left: 180rpx;
	}
	.qs{
		background-image: url(../../static/image/xy.png) !important;
		background-position: center;
		background-size: 100%;
		transform: translateX(-50%);
		height: 200rpx;
		z-index: 99999;
		position: fixed;
		top: 0;
		left: 0;
		background-repeat: no-repeat;
		    top: 800rpx;
		    left: 50%;
		    transform: translateX(-50%);
		    width: 300rpx;
	}
	.hend{
		position: fixed;
		    top: 500rpx;
		    left: 140rpx;
		z-index: 9999999999999;
	}
	.xz{
		background-image: url(../../static/image/xyqq.png);
		background-position: center;
		background-size: 100%;
		transform: translateX(-50%);
		height: 80rpx;
		z-index: 99999;
		position: fixed;
		top: 0;
		left: 0;
		background-repeat: no-repeat;
		    top: 860rpx;
		    left: 50%;
		    transform: translateX(-50%);
		    width: 300rpx;
	}
	/deep/.swiper-button-prev{
		    position: fixed !important;
		    top: 484rpx !important;
		    left: 40rpx !important;
		    width: 66px !important;
		    height: 90rpx !important;
		    transform: scale(0.5);
	}
	/deep/.swiper-button-next{
		position: fixed !important;
		top: 484rpx !important;
		right: 50rpx !important;
		width: 132rpx !important;
		height: 90rpx !important;
		transform: scale(0.5);
	}
	.imgbox{
		padding: 18rpx;
		box-sizing: border-box;
	background-image: url(../../static/image/qa.png);
		width: 380rpx;
		height: 560rpx;
	}
	.swiper-button-prev{
		background-image: url(../../static/image/left.png);
	}
	.swiper-button-next{
		background-image: url(../../static/image/right.png);
	}
	.imgq{
		width: 100%;
		height: 100%;
	}
	.imgqn{
        display: block;
        margin-top: 48rpx;
		width: 90%;
		margin: 0 auto;
		text-align: center;
	}
	.banr{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}
	// .musices {
	// 	width: 100px;
	// 	height: 100px;
	// 	background: aqua;
	// 	margin: 100px auto;
	// }

	.turn {

		animation: turn 1s linear infinite;
	}
	.content{
		padding: 40rpx;
		box-sizing: border-box;
		height: 100%;
	}
	page{
		height: 100%;
	}
	@keyframes turn {
		0% {
			-webkit-transform: rotate(0deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
		}
	}
</style>

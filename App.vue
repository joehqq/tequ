<script>
	import Vue from 'vue'
	import util from './utils/util.js';
	import sha1 from './utils/sha1.js';
	import {
		HTTP_REQUEST_URL,
		HEADER,
	} from './config.js';
	var jweixin = require('jweixin-module')
	export default {
		onLaunch: function() {
			//#ifdef H5
			var that = this;
			var param = {};
			that.baseGet('/weixin/getsign', param, function(data) {
				if (data.errcode == 0) {
					var noncestr = that.randomString(16);
					var timestamp = Math.round(new Date().getTime() / 1000);
					var str = 'jsapi_ticket=' + data.ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + window.location.href;
					var signature = sha1.hex_sha1(str);
					console.log("noncestr:" + noncestr);
					console.log("signature:" + signature);
					jweixin.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: "wx5c1a378aaacd04ba", // 必填，公众号的唯一标识
						timestamp: timestamp, // 必填，生成签名的时间戳
						nonceStr: noncestr, // 必填，生成签名的随机串
						signature: signature, // 必填，签名
						jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
					});
					jweixin.ready(function() {
						//分享到朋友
						jweixin.updateAppMessageShareData({
							title: "珠海·四十而已 | 穿越时空来@你", // 分享标题
							desc: "", // 分享描述
							link: window.location.href, // 分享链接
							imgUrl: "https://plugins.zhdutyfreemall.com/wap/facefusion/share.jpg", // 分享图标
							success: function() {
								//alert("分享成功");
							},
							cancel: function() {
								//alert("未分享!");
							}
						});
						jweixin.updateTimelineShareData({
							title: "珠海·四十而已 | 穿越时空来@你", // 分享标题
							link: window.location.href, // 分享链接
							imgUrl: "https://plugins.zhdutyfreemall.com/wap/facefusion/share.jpg", // 分享图标
							success: function(res) {},
						});
					});
				}
			}, function(res) {

			}, false, true);
			//#endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			/**
			 * POST 访问快捷方法
			 */
			basePost: function(url, data, successCallback, errorCallback, isMsg, isWeixin) {
				url = HTTP_REQUEST_URL + url;
				util.basePost(url, data, successCallback, errorCallback, isMsg, isWeixin, HEADER);
			},
			/**
			 * GET 访问快捷方法
			 */
			baseGet: function(url, data, successCallback, errorCallback, isMsg, isWeixin) {
				url = HTTP_REQUEST_URL + url;
				util.baseGet(url, data, successCallback, errorCallback, isMsg, isWeixin, HEADER);
			},
			/**
			 * 信息提示 + 跳转
			 * @param object opt {title:'提示语',icon:''} | url
			 * @param object to_url 跳转url 有5种跳转方式 {tab:1-5,url:跳转地址}
			 */
			Tips: function(opt, to_url) {
				return util.Tips(opt, to_url);
			},
			getUrlParams: function(param, k, p) {
				return util.getUrlParams(param, k, p);
			},
			setUrlParams: function(param) {
				return util.setUrlParams(param);
			},
			getQrcode: function(path) {
				return HTTP_REQUEST_URL + path;
			},
			randomString: function(len) {
				len = len || 32;
				var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
				/****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
				var maxPos = chars.length;
				var str = '';
				for (var i = 0; i < len; i++) {
					str += chars.charAt(Math.floor(Math.random() * maxPos));
				}
				return str;
			},
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>

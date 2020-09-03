const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

const systemTips = [
	'哎哟，前面太挤啦！亲请稍后再试试~',
	'哎哟，前面挤爆啦，正在努力加载中~！',
	'活动太火爆！导致系统繁忙，请耐心等等！',
	'别挤别挤~慢慢来~手慢也有~'
];

/**
 * 处理服务器扫码带进来的参数
 * @param string param 扫码携带参数
 * @param string k 整体分割符 默认为：&
 * @param string p 单个分隔符 默认为：=
 * @return object
 */
const getUrlParams = (param, k, p) => {
	if (typeof param != 'string') return {};
	k = k ? k : '&'; //整体参数分隔符
	p = p ? p : '='; //单个参数分隔符
	var value = {};
	if (param.indexOf(k) !== -1) {
		param = param.split(k);
		for (var val in param) {
			if (param[val].indexOf(p) !== -1) {
				var item = param[val].split(p);
				value[item[0]] = item[1];
			}
		}
	} else {
		var item = param.split(p);
		value[item[0]] = item[1];
	}
	return value;
}
const setUrlParams = (param) => {
	var str = '';
	for (var key in param) {
		if (str != '') str += '&';
		str += (key + '=' + param[key]);
	}
	return str;
}
const requestMap = {};
/**
 * post网络请求 
 */
const basePost = function(url, data, successCallback, errorCallback, wantCheck, header) {
	if (wantCheck) {
		if (requestMap[url]) {
			console.log('POST请求过于频繁：' + url);
			return;
		}
		requestMap[url] = true;
		setTimeout(function() {
			requestMap[url] = null;
			delete requestMap[url];
		}, 1000);
	}
	uni.request({
		url: url,
		data: data,
		dataType: 'json',
		method: 'POST',
		header: header,
		timeout: 10000,
		success: function(res) {
			if (res.errMsg == "request:ok" && res.statusCode == 200) {
				if (res.data.status == 100) {
					successCallback && successCallback(res.data);
				} else {
					errorCallback && errorCallback(res.data);
				}
			} else {
				errorCallback && errorCallback({
					errorMsg: systemTips[Math.floor((Math.random() * 4))]
				});
			}
		},
		fail: function(res) {
			errorCallback && errorCallback({
				errorMsg: systemTips[Math.floor((Math.random() * 4))]
			});
		}
	});
}
/**
 * get网络请求 
 */
const baseGet = function(url, data, successCallback, errorCallback, wantCheck, header) {
	if (wantCheck) {
		if (requestMap[url]) {
			console.log('GET请求过于频繁：' + url);
			return;
		}
		requestMap[url] = true;
		setTimeout(function() {
			requestMap[url] = null;
			delete requestMap[url];
		}, 1000);
	}
	uni.request({
		url: url,
		data: data,
		dataType: 'json',
		method: 'GET',
		header: header,
		timeout: 10000,
		success: function(res) {
			if (res.errMsg == "request:ok" && res.statusCode == 200) {
				if (res.data.status == 100) {
					successCallback && successCallback(res.data);
				} else {
					errorCallback && errorCallback(res.data);
				}
			} else {
				errorCallback && errorCallback({
					errorMsg: systemTips[Math.floor((Math.random() * 4))]
				});
			}
		},
		fail: function(res) {
			errorCallback && errorCallback({
				errorMsg: systemTips[Math.floor((Math.random() * 4))]
			});
		}
	});
}
/**
 * @param opt  object | string
 * @param to_url object | string
 * 例:
 * this.Tips('/pages/test/test'); 跳转不提示
 * this.Tips({title:'提示'},'/pages/test/test'); 提示并跳转
 * this.Tips({title:'提示'},{tab:1,url:'/pages/index/index'}); 提示并跳转值table上
 * tab=1 一定时间后跳转至 table上
 * tab=2 一定时间后跳转至非 table上
 * tab=3 一定时间后返回上页面
 * tab=4 关闭所有页面跳转至非table上
 * tab=5 关闭当前页面跳转至table上
 */
const Tips = function(opt, to_url) {
	if (typeof opt == 'string') {
		to_url = opt;
		opt = {};
	}
	var title = opt.title || '',
		icon = opt.icon || 'none',
		endtime = opt.endtime || 2000;
	if (title) uni.showToast({
		title: title,
		icon: icon,
		duration: endtime
	})
	if (to_url != undefined) {
		if (typeof to_url == 'object') {
			var tab = to_url.tab,
				url = to_url.url;
			switch (tab) {
				case 1:
					//一定时间后跳转至 table
					setTimeout(function() {
						uni.switchTab({
							url: url
						})
					}, endtime);
					break;
				case 2:
					//跳转至非table页面
					setTimeout(function() {
						uni.navigateTo({
							url: url,
						})
					}, endtime);
					break;
				case 3:
					//返回上页面
					setTimeout(function() {
						uni.navigateBack({
							delta: parseInt(url),
						})
					}, endtime);
					break;
				case 4:
					//关闭当前所有页面跳转至非table页面
					setTimeout(function() {
						uni.reLaunch({
							url: url,
						})
					}, endtime);
					break;
				case 5:
					//关闭当前页面跳转至非table页面
					setTimeout(function() {
						uni.redirectTo({
							url: url,
						})
					}, endtime);
					break;
			}

		} else if (typeof to_url == 'function') {
			setTimeout(function() {
				to_url && to_url();
			}, endtime);
		} else {
			//没有提示时跳转不延迟
			setTimeout(function() {
				uni.navigateTo({
					url: to_url,
				})
			}, title ? endtime : 0);
		}
	}
}

module.exports = {
	formatTime: formatTime,
	getUrlParams: getUrlParams,
	setUrlParams: setUrlParams,
	baseGet: baseGet,
	basePost: basePost,
	Tips: Tips
}

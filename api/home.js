


import http from './request.js'

// 人脸溶和
function fise(data){
	return http({
		url: `/api/facefusion/getImage`,
		method: 'POST', // 严格区分大小写,必须是大写
		data
	})
}

export default {
	fise
}
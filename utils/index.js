//json转query参数
export function transParams(params) {
	let result = ''
	for (const propName of Object.keys(params)) {
		const value = params[propName]; //键值
		var part = encodeURIComponent(propName) + "="; //给键名加=
		if (value !== null && value !== "" && typeof(value) !== "undefined") {
			if (typeof value === 'object') {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && value[key] !== "" && typeof(value[key]) !== 'undefined') {
						let params = propName + '[' + key + ']';
						var subPart = encodeURIComponent(params) + "=";
						result += subPart + encodeURIComponent(value[key]) + "&";
					}
				}
			} else {
				result += part + encodeURIComponent(value) + "&";
			}
		}
	}
	return result
}
//多条件筛选
export function multiFilter(array, filters) {
	const filterKeys = Object.keys(filters)
	return array.filter((item) => {
		return filterKeys.every(key => {
			//如果筛选条件空返回所有
			if (!filters[key].length) return true
			return !!~filters[key].indexOf(item[key])
		})
	})
}
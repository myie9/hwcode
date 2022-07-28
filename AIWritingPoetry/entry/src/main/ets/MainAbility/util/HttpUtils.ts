import http from '@ohos.net.http';

export function HttpRequestGet(url: string, param: string) {
    // 拼接get请求URL,参数在URL后面
    if (param) {
        url = url + param
    }
    // 每一个httpRequest对应一个http请求任务，不可复用
    let httpRequest = http.createHttp()
    // 发送数据请求
    let promise = httpRequest.request(url, {
        method: http.RequestMethod.GET,
        readTimeout: 60000,
        connectTimeout: 60000
    })
    // 处理数据，并返回
    return promise.then((value) => {
        let data: { code: number,data: any,msg: string } = { code: 0, data: '', msg: '' }
        data.code = value.responseCode
        if (value.responseCode === 200) {
            // 获取返回数据
            var result = value.result +''
            data.code = 0
            data.data = result;
            data.msg = ''
        } else {
            data.code = -1
            data.msg = '网络异常，请稍后尝试！'
        }
        console.info(" return data " + JSON.stringify(data))
        return data
    })
}
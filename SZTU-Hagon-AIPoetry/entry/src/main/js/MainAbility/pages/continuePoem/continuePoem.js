import http from '@ohos.net.http';
import router from '@system.router';
// 每一个httpRequest对应一个http请求任务，不可复用
let httpRequest = http.createHttp();

export default {
    data: {
        poemHead:"123",
        aiResult:"请在上方输入符合要求的字段"
    },
    onInit() {
    },
    continuePoem() {
        httpRequest = http.createHttp();
        console.info("xxx--- enter")
        httpRequest.on('headersReceive', (header) => {
            console.info('xxx--- header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            "https://py.myie9.com/xuxietest/"+this.poemHead,
            {
                header: {
                    'Content-Type': 'text/plain'
                },
                readTimeout: 10000,
                connectTimeout: 10000
            }, (err, data) => {
            if (!err) {
                console.info("xxx--- enter2")
                console.info("xxx--- "+JSON.stringify(data))
                this.aiResult = data.result;
            } else {
                console.info('xxx--- error:' + JSON.stringify(err));
            }
        })
    },
    check2(e){
        console.log("xxx---"+JSON.stringify(e.value))
        this.poemHead = e.value.poemHead
        this.continuePoem();
    },
    back(){
        router.back()
    }



}




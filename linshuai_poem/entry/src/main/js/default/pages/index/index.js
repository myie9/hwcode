import http from '@ohos.net.http';
import prompt from '@system.prompt'
export default {
    data: {
        first: "",              // 续写诗首句
        keyword: "七夕快乐",     // 藏头诗关键词
        title: "",             // 弹窗标题
        content: "",           // 弹窗内容
    },
    onReady() {

    },
    // 显示弹框
    showDialog(){
        this.$element('dialog').show()
    },
    // 隐藏弹框
    hideDialog(){
        this.$element('dialog').close()
    },
    // 藏头诗输入变化时触发
    changeKeyword(e){
        this.keyword = e.value;
    },
    // 生成藏头诗
    createCangtou(){
        if(this.keyword.length === 0){
            return this.toast('请输入关键词');
        }
        this.fetch({
            url: 'https://py.myie9.com/cangtoutest/' + this.keyword,
            success: (data) => {
                this.content = data;
                this.title = '藏头诗';
                this.showDialog();
            },
            fail: () => {
                this.toast('请求失败');
            }
        })
    },
    // 续写诗输入变化时触发
    changeFirst(e){
        this.first = e.value;
    },
    // 生成续写诗
    createXuxie(){
        if(this.first.length === 0){
            return this.toast('请输入第一句诗');
        }
        this.fetch({
            url: 'https://py.myie9.com/xuxietest/' + this.first,
            success: (data) => {
                this.content = data;
                this.title = '续写诗';
                this.showDialog();
            },
            fail: () => {
                this.toast('请求失败');
            }
        })
    },
    // 封装请求方法
    fetch(params){
        let httpRequest = http.createHttp();
        httpRequest.request(
            params.url,
            {
                header: {
                    'Content-Type': 'application/json'
                },
                connectTimeout: 60000,
                readTimeout: 60000,
            }, (err, data) => {
                if (!err) {
                    console.info('Result:' + data.result);
                    params.success && params.success(data.result)
                } else {
                    console.info('error:' + JSON.stringify(err));
                    params.fail && params.fail(err)
                    httpRequest.destroy();
                }
            }
        );
    },
    // 封装toast方法
    toast(message){
        prompt.showToast({
            message,
            duration: 3000,
            bottom: '50%'
        })
    }
}

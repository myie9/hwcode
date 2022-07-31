import fetch from '@system.fetch';
import prompt from '@system.prompt';
export default {
    data: {
        aiMode: '藏头诗',  // 当前写诗模式
        argot: '鸿蒙应用开发',    // 诗中的暗语
        seekUrl: 'https://py.myie9.com/cangtoutest/',   // AI作诗的接口
        rawPoetry: ''
    },

    // 切换 藏头诗 或者 续写诗 模式
    modeChange () {
        if (this.aiMode === '藏头诗') {
            this.aiMode = '续写诗';
            this.seekUrl = 'https://py.myie9.com/xuxietest/';
        } else {
            this.aiMode = '藏头诗';
            this.seekUrl = 'https://py.myie9.com/cangtoutest/';
        }
    },

    // 修改诗中的暗语
    argotChange (e) {
        this.argot = e.text;
    },

    // 根据当前暗语进行写诗
    writeStart () {
        if (this.argot === '') {
            prompt.showDialog({
                message: '请先输入暗语',
                duration: 2000,
                bottom: '60%'
            })
            return;
        }

        // 拼接AI作诗的地址
        let mySeekUrl = this.seekUrl + this.argot;
        let that = this;
        fetch.fetch({
            url: mySeekUrl,
            method: 'GET',
            responseType: 'text',
            success (res) {
                console.log('请求返回res——' + JSON.stringify(res));
                prompt.showToast({
                    message: that.aiMode + '写作完成',
                    duration: 2000,
                    bottom: '60%'
                })
                let originData = res.data;
                console.log('获取的原诗为——' + originData);
                // 将原诗进行格式化
                that.rawPoetry = originData.split(/，|。/);
                if (that.aiMode === '藏头诗') {
                    that.rawPoetry = that.rawPoetry.slice(0, that.argot.length);
                } else {
                    that.rawPoetry = that.rawPoetry.slice(0, 8);
                }
                console.log('排版完成的诗如下——');
                for (let i = 0; i < that.rawPoetry.length; i++) {
                    console.log('第' + (i+1) + '句诗——' + that.rawPoetry[i]);
                }
            },
            fail (err) {
                prompt.showToast({
                    message: '写诗失败……',
                    duration: 2000,
                    bottom: '60%'
                })
            }
        })
    }
}

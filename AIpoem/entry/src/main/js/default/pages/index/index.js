import prompt from '@system.prompt';
import fetch from '@system.fetch';

export default {
    data: {
        resultShow: "hidden",
        headPoemInput: "星星之火可燎原",
        keywordInput: "鸿蒙牛逼",
        resultPoemInput: "",
        lastLine: ""
    },
    onInit() {
    },
    textChangeKey(e) {
        this.keywordInput = e.text;
    },
    textChangeResult(e) {
        this.resultPoemInput = e.text;
    },
    textChangeHead(e) {
        this.headPoemInput = e.text;
    },
    debug(msg) {
        console.log(msg)
    },
    paste: function () {
        var that = this;
    },
    genHeadPoem() {
        this.debug(this.keywordInput)
        this.keywordInput = this.keywordInput.replace(/[\s]+/g, "").replace(/\n/g, "").replace(/\r/g, "")
        this.debug(this.keywordInput)
        if (this.keywordInput === "") {
            this.showToast("请随便输入4个不同的汉字")
            return
        }
        let url = "https://py.myie9.com/cangtoutest/" + this.keywordInput
        let that = this
        this.resultPoemInput = ""
        that.resultShow = "hidden"

        this.showToast("生成中...，请等待10秒")
        fetch.fetch({
            url: url,
            method: 'GET',
            responseType: 'text',
            success: function (ret) {
                that.debug(JSON.stringify(ret))
                if (500 == ret.code) {
                    that.showToast("您的这句诗我接不上哦。换一句吧")
                    return
                }
                let data = ret.data
                that.debug(data.toString())
                that.showTips(data.toString(), "藏头诗生成成功")
                that.$element('keyPoem').focus(false)
            },
            fail: function (data, code) {
                if (data.code == 500) {
                    that.showToast("您的这句诗我接不上哦。换一句吧")
                } else {
                    that.showToast("发生错误，请重试。错误码：" + code + '。' + JSON.stringify(data))
                }
            }
        })
    },
    genPoem() {
        this.debug(this.headPoemInput)
        this.headPoemInput = this.headPoemInput.replace(/[\s]+/g, "").replace(/\n/g, "").replace(/\r/g, "")
        this.debug(this.headPoemInput)
        if (this.headPoemInput === "") {
            this.showToast("请随便输入第一句诗")
            return
        }
        let url = "https://py.myie9.com/xuxietest/" + this.headPoemInput
        let that = this
        this.resultPoemInput = ""
        that.resultShow = "hidden"

        this.showToast("生成中...，请等待10秒")
        fetch.fetch({
            url: url,
            method: 'GET',
            responseType: 'text',
            success: function (ret) {
                that.debug(JSON.stringify(ret))
                if (500 == ret.code) {
                    that.showToast("您的这句诗我接不上哦。换一句吧")
                    return
                }
                let data = ret.data
                that.debug(data.toString())
                that.showTips(data.toString(), "藏头诗生成成功")
                that.$element('keyPoem').focus(false)
            },
            fail: function (data, code) {
                if (data.code == 500) {
                    that.showToast("您的这句诗我接不上哦。换一句吧")
                } else {
                    that.showToast("发生错误，请重试。错误码：" + code + '。' + JSON.stringify(data))
                }
            }
        })
    },
    showToast(msg) {
        prompt.showToast({
            message: msg,
            duration: 2000,
        })
    },
    callback(err, data) {
        if (err) {
            console.info('showDialog err: ' + err);
            return;
        }
        console.info('showDialog success callback, click button: ' + data.index);
    },
    showTips(msg, title) {
        prompt.showDialog({
            title: title,
            message: msg,
            buttons: [
                {
                    text: '分享',
                    color: '#33dd44'
                },
                {
                    text: '关闭',
                    color: '#33dd44'
                }],
        })
    }
}

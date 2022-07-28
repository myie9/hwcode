import prompt from '@system.prompt';
import fetch from '@system.fetch';
import router from '@system.router';

export default {
    data: {
        keywordInput: "唐伯虎爱秋香",
        headPoemInput: "",
        resultPoemInput: "",
        content: ''
    },
    textChangeKey(e) {
        this.keywordInput = e.text;
    },
    textChangeHead(e) {
        this.headPoemInput = e.text;
    },

    genHeadPoem() {
        console.log(this.keywordInput);

        this.keywordInput = this.keywordInput.replace(/[\s]+/g, "").replace(/\n/g, "").replace(/\r/g, "");
        if (this.keywordInput == "") {
            this.showDialog("请输入想说的话", "诗句生成失败");
            return;
        }

        // AI接口
        let url = 'https://py.myie9.com/hidepoem/' + this.keywordInput;
        let that = this;
        this.resultPoemInput = "";

        fetch.fetch({
            url: url,
            method: 'GET',
            responseType: 'text',
            success: function (ret) {

                if (ret.code == 500) {
                    that.showDialog("你说得太好了，以后就不要再说了", "诗句生成失败");
                    return;
                }

                let data = ret.data;
                console.log(data.toString());
                that.content = data.toString();
                that.genPoem(data.toString());
            },
            fail: function (data, code) {
                if (data.code == 500) {
                    that.showDialog("你说得太好了，以后就不要再说了", "诗句生成失败");
                } else {
                    that.showDialog("发生错误，请重试。错误码：" + code + "。" + JSON.stringify(data), "AI错误");
                }
            }
        })
    },

    genPoem(headStr) {

        if (this.headStr == "") {
            this.showDialog("这藏头诗太好了，还是换一句话吧", "整首诗生成失败");
            return;
        }
        // AI接口
        let url = 'https://py.myie9.com/xuxietest/' + headStr;
        let that = this;
        this.resultPoemInput = "";

        fetch.fetch({
            url: url,
            method: 'GET',
            responseType: 'text',
            success: function (ret) {

                if (ret.code == 500) {
                    that.showDialog("这藏头诗太好了，还是换一句话吧", "整首诗生成失败");
                    return;
                }

                let data = ret.data;
                console.log(data.toString());
//                that.showDialog(data.toString(), "诗句生成成功：");
                that.content = data.toString();
                that.resultPoemInput =data.toString();

            },
            fail: function (data, code) {
                if (data.code == 500) {
                    that.showDialog("你说得太好了，以后就不要再说了", "诗句生成失败");
                } else {
                    that.showDialog("发生错误，请重试。错误码：" + code + "。" + JSON.stringify(data), "AI错误");
                }
            }
        })
    },

    showDialog(msg, title = '提示') {
        prompt.showDialog({
            title: title,
            message: msg,
            buttons: [{
                          text: '关闭',
                          color: '#33dd44'
                      }],
            success: function (data) {
                console.log(JSON.stringify(data));
                console.log("用户点击关闭按钮");
            },
            cancel: function () {
                console.log("用户点击按钮");
            }
        })
    },

    genPic(){
        router.push({
            uri: 'pages/details/details',
            params:{
                content: this.resultPoemInput,
            }
        });
    }
}

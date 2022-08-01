import prompt from '@system.prompt';
import fetch from '@system.fetch';
export default {
    data: {
        inputText: "我爱中国",
        poemType : 0,
        resultPoem: "",
    },

    radioOnChange(e) {
        var value = e.value
        this.poemType = value;

    },

    onTextChang(e) {
        this.inputText = e.text;
    },
    textChangeHead(e) {
        this.headPoemInput = e.text;
    },

    buttonClick(){
        if(this.poemType == 0){
            this.getHeadPoem();
        }else{
            this.getAIPoem();
        }
    },

    getHeadPoem() {

        if (this.inputText == "") {
            this.showDialog("请输入4个不同的汉字", "藏头诗生成失败");
            return;
        }

        // Head接口
        let url = 'https://py.myie9.com/hidepoem/' + this.inputText;
        let that = this;
        this.resultPoem = "";

        fetch.fetch({
            url: url,
            method: 'GET',
            responseType: 'text',
            success: function (ret) {
                if (ret.code == 500) {
                    that.showDialog("获取失败---", "藏头诗生成失败");
                    return;
                }

                let data = ret.data;
                that.showDialog(data.toString(), "藏头诗生成成功");
            },
            fail: function (data, code) {
                if (data.code == 500) {
                    that.showDialog("获取失败---", "藏头诗生成失败");
                } else {
                    that.showDialog("获取失败----错误码：" + code + " - " + JSON.stringify(data), "Head生成错误");
                }
            }
        })
    },

    getAIPoem() {
        if (this.inputText == "") {
            this.showDialog("输入为空，请重新输入", "AI作诗生成失败");
            return;
        }

        // AI接口
        let url = 'https://py.myie9.com/xuxietest/' + this.inputText;
        let that = this;
        this.resultPoem = "";

        fetch.fetch({
            url: url,
            method: 'GET',
            responseType: 'text',
            success: function (ret) {

                if (ret.code == 500) {
                    that.showDialog("获取失败---", "AI作诗生成失败");
                    return;
                }

                let data = ret.data;
                that.showDialog(data.toString(), "AI作诗生成成功");
            },
            fail: function (data, code) {
                if (data.code == 500) {
                    that.showDialog("获取失败---", "生成失败");
                } else {
                    that.showDialog("获取失败----错误码：" + code + " - " + JSON.stringify(data), "AI生成错误");
                }
            }
        })
    },
    showDialog(msg, title) {
        prompt.showDialog({
            title: title,
            message: msg,
            buttons: [{
                          text: '关闭',
                          color: '#17A98E'
                      }],
            success: function (data) {
                console.log("用户点击关闭按钮");
            },
            cancel: function () {
                console.log("用户点击按钮");
            }
        })
    }
}

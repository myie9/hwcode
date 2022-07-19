import prompt from '@system.prompt';
import fetch from '@system.fetch';

export default {
    data: {
        keywordInput: "河山一统",
        headPoemInput: "千军万马渡海峡",
        resultPoemInput: "",
    },
    textChangeKey(e){
        this.keywordInput = e.text;
    },
    textChangeHead(e){
        this.headPoemInput = e.text;
    },
    showTip(msg, title= ''){
        prompt.showDialog({
            title: title,
            message: msg,
            buttons:[{
                        text: '确定',
                        color: '#33dd44'
                     }]
        })
    },
    genHeadPoem(){
        this.keywordInput = this.keywordInput.replace(/[\s]+/g,"").replace(/\n/g,"").replace(/\r/g,"");
        if(this.keywordInput == ""){
            this.showTip("请输入4个不同的汉字", "输入错误");
            return;
        }

        let that = this;
        fetch.fetch({
            url: 'https://py.myie9.com/hidepoem/' + this.keywordInput,
            method: 'GET',
            responseType: 'text',
            success: function(ret){
                if (ret.code == 500){
                    that.showTip("您的藏头诗我想不出哦，换4个字试试？", "生成失败");
                    return;
                }

                that.showTip(ret.data.toString(), "藏头诗生成成功");
            },
            fail: function(data, code){
                if(data.code == 500){
                    that.showTip("您的藏头诗我想不出哦，换4个字试试？", "生成失败");
                }else{
                    that.showTip("发生错误，请重试。 错误码：" + code + "。 " + JSON.stringify(data), "连接失败");
                }
            }
        })
    },
    genPoem(){
        this.headPoemInput = this.headPoemInput.replace(/[\s]+/g,"").replace(/\n/g,"").replace(/\r/g,"");
        if(this.headPoemInput == ""){
            this.showTip("请输入诗的开头一两句，以逗号隔开", "输入错误");
            return;
        }

        let that = this;
        fetch.fetch({
            url: 'https://py.myie9.com/xuxietest/' + this.headPoemInput,
            method: 'GET',
            responseType: 'text',
            success: function(ret){
                if (ret.code == 500){
                    that.showTip("您的这句诗我接不上哦，换一句吧", "生成失败");
                    return;
                }

                that.showTip(ret.data.toString(), "整首诗续写成功");
            },
            fail: function(data, code){
                if(data.code == 500){
                    that.showTip("您的这句诗我接不上哦，换一句吧", "生成失败");
                }else{
                    that.showTip("发生错误，请重试。 错误码：" + code + "。 " + JSON.stringify(data), "连接失败");
                }
            }
        })
    }
}

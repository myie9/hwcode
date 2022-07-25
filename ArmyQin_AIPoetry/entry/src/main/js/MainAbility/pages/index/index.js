import fetch from '@system.fetch';
import prompt from '@system.prompt';

export default {
    data: {
        flagOne: false,
        flagTwo: false,
        inputOne: '我爱祖国',
        inputTwo: '沁园春雪',
        poetryOne: [],
        poetryTwo: []
    },

    /**
     * 获取藏头诗文本框内容
     * @param e
     */
    textChangeOne(e) {
        // 赋值给变量
        this.inputOne = e.text;
    },
    /**
     * 获取输入第一句诗文本框内容
     * @param e
     */
    textChangeTwo(e) {
        // 赋值给变量
        this.inputTwo = e.text;
    },

    /**
     * 生成藏头诗事件
     * @param res
     */
    onClickOne() {
        // 去掉文本框空格和换行符
        this.inputOne = this.inputOne.replace(/[\s]+/g, "").replace(/\n/g, "").replace(/\r/g, "");
        // 当文本框为空时，温馨提示，并阻止往执行
        if (this.inputOne === "") {
            prompt.showDialog({
                message: "不能为空，请输入汉字",
                duration: 3000,
                bottom: '80%'
            })
            return;
        }

        // 封装URL
        var url = "https://py.myie9.com/cangtoutest/"+this.inputOne;
        var that = this;
        fetch.fetch({
            url: url,
            method: 'GET',
            responseType: 'text',
            success: function(res) {
                console.log('xx' + JSON.stringify(res));
                // 返回错误码时，温馨提示
                if(res.code == 500) {
                    prompt.showToast({
                        message: "请输入至少4个不同的汉字",
                        duration: 3000,
                        bottom: '80%'
                    })
                    return;
                }
                // 温馨提示生成成功
                prompt.showToast({
                    message: "藏头诗生成成功",
                    duration: 3000,
                    bottom: '80%'
                })

                // 获取返回的数据
                var descOne = res.data;
                // 把返回的字符串数据，按照句号切分为数组
                var descOneArray = descOne.split("。");
                console.log('xx' + descOne)
                // 清空储存诗数组
                that.poetryOne = []
                // 固定行字符长度为50
                var rowLen = 50;
                for (var index = 0; index < descOneArray.length; index++) {
                    if(descOneArray[index] === '') {
                        continue;
                    }
                    // 在每行诗后面加上句号
                    var str = descOneArray[index] + "。";
                    // 当前行诗的字符长度
                    var currentLen = str.length;
                    // 如果长度少于50个字符，补上空格(为什么要补上空格，长度不够时, Marquee是不会滚动的)
                    if(currentLen < rowLen) {
                        for(var i=0; i< rowLen - currentLen; i++) {
                            str += " ";
                        }
                    }
                    // 存储到藏头诗数组
                    that.poetryOne.push(str)
                }
            },
            fail: function(err) {
                // 出现错误时，温馨提示
                prompt.showToast({
                    message: "生成失败，请重新生成",
                    duration: 3000,
                    bottom: '80%'
                })
            }
        })
    },

    /**
     * 生成整首诗事件
     * @param res
     */
    onClickTwo() {
        // 去掉文本框空格和换行符
        this.inputTwo = this.inputTwo.replace(/[\s]+/g, "").replace(/\n/g, "").replace(/\r/g, "");
        // 当文本框为空时，温馨提示，并阻止往执行
        if (this.inputTwo === "") {
            prompt.showToast({
                message: "不能为空，请输入一句诗",
                duration: 3000,
                bottom: '50%'
            })
            return;
        }

        // 封装URL
        var url = "https://py.myie9.com/xuxietest/"+this.inputTwo;
        var that = this;
        fetch.fetch({
            url: url,
            method: 'GET',
            responseType: 'text',
            success: function(res) {
                console.log('xx' + JSON.stringify(res));
                // 返回错误码时，温馨提示
                if(res.code == 500) {
                    prompt.showToast({
                        message: "整首诗生成失败",
                        duration: 3000,
                        bottom: '50%'
                    })
                    return;
                }
                // 温馨提示生成成功
                prompt.showToast({
                    message: "整首诗生成成功",
                    duration: 3000,
                    bottom: '50%'
                })
                // 在每行诗后面加上句号
                var descTwo = res.data;
                // 把返回的字符串数据，按照句号切分为数组
                var descTwoArray = descTwo.split("。");
                console.log('xx' + descTwo)
                // 清空储存诗数组
                that.poetryTwo = []
                // 固定行字符长度为50
                var rowLen = 50;
                for (var index = 0; index < descTwoArray.length; index++) {
                    if(descTwoArray[index] === '') {
                        continue;
                    }
                    // 在每行诗后面加上句号
                    var str = descTwoArray[index] + "。";
                    // 当前行诗的字符长度
                    var currentLen = str.length;
                    // 如果长度少于50个字符，补上空格(为什么要补上空格，长度不够时, Marquee是不会滚动的)
                    if(currentLen < rowLen) {
                        for(var i=0; i< rowLen - currentLen; i++) {
                            str += " ";
                        }
                    }
                    // 存储到整首诗数组
                    that.poetryTwo.push(str)
                }
            },
            fail: function(err) {
                // 出现错误时，温馨提示
                prompt.showToast({
                    message: "生成失败，请重新生成",
                    duration: 3000,
                    bottom: '50%'
                })
            }
        })
    },

    /**
     * 控制藏头诗滚动与暂停
     */
    onMarqueeOne() {
        // 由于把返回的整首诗，按句号分开，赋值给不同的Marquee，这里循环处理滚动或暂停
        for (var i = 0; i < this.poetryOne.length; i++) {
            if(!this.flagOne){
                this.$element('oneMarquee'+i).stop();
            }else{
                this.$element('oneMarquee'+i).start();
            }
        }
        // 切换状态
        this.flagOne = !this.flagOne
    },

    /**
     * 控制整首诗滚动与暂停
     */
    onMarqueeTwo() {
        // 由于把返回的整首诗，按句号分开，赋值给不同的Marquee，这里循环处理滚动或暂停
        for (var i = 0; i < this.poetryTwo.length; i++) {
            if(!this.flagTwo){
                this.$element('twoMarquee'+i).stop();
            }else{
                this.$element('twoMarquee'+i).start();
            }
        }
        // 切换状态
        this.flagTwo = !this.flagTwo;
    }
}




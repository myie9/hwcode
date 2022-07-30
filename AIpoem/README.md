### **关键代码**

生成藏头诗代码，藏头诗接口：https://py.myie9.com/cangtoutest/

```js
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
}
复制
```

生成整首诗代码，续写诗接口：https://py.myie9.com/xuxietest/

```js
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
}
复制
```

### **演示效果**

![img](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/251/810/102/0260086000251810102.20220726231546.28289308330200699709010335893619:50530726154705:2800:D95E998F4FA774468755BD7E83F3AB2D4860867F7EC8616DB4DF7571DAACF46E.gif)

### **参考资料**

[弹窗-UI界面-接口参考（JS及TS API）-手机、平板、智慧屏和智能穿戴开发-JS API参考-HarmonyOS应用开发](https://developer.harmonyos.com/cn/docs/documentation/doc-references/js-apis-prompt-0000001281001138)

[数据请求-已停止维护的接口-接口参考（JS及TS API）-手机、平板、智慧屏和智能穿戴开发-JS API参考-HarmonyOS应用开发](https://developer.harmonyos.com/cn/docs/documentation/doc-references/js-apis-system-fetch-0000001333640985)https://developer.harmonyos.com/cn/docs/documentation/doc-references/js-apis-http-0000001281201030)
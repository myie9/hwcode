import http from '@ohos.net.http';

@Entry
@Component
struct Index {
  @State str: string = '';
  @State resStr1: string = '';
  @State resStr2: string = '';

  build() {
    Row() {
      Column() {
        Text('藏头诗')
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
          .padding(20)

        TextInput({ placeholder: '请输入内容' })
          .placeholderColor("rgb(0,0,225)")
          .placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic })
          .caretColor(Color.Blue)
          .height(40)
          .fontSize(20)
          .width('80%')
          .fontFamily("sans-serif")
          .fontStyle(FontStyle.Normal)
          .onChange((value: string) => {
            this.str = value;
          })

        Text(this.resStr1)
          .height(126)
          .fontSize(18)
          .fontFamily("sans-serif")
          .fontStyle(FontStyle.Normal)

        Button('AI生成藏头诗')
          .fontSize(30)
          .onClick(() => {
            let httpRequest = http.createHttp();
            let url = 'https://py.myie9.com/cangtoutest/' + this.str;
            httpRequest.request(
              url,
              {
                // 开发者根据自身业务需要添加header字段
                header: {
                  'Content-Type': 'application/json'
                },
              }, (err, data) => {
              if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                console.info('Result:' + data.result);
                this.resStr1 = data.result.toString();

              } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
              }
            })
          })

        Text('续写诗')
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
          .padding(20)

        TextInput({ placeholder: '请输入内容' })
          .placeholderColor("rgb(0,0,225)")
          .placeholderFont({ size: 30, weight: 100, family: 'cursive', style: FontStyle.Italic })
          .caretColor(Color.Blue)
          .height(40)
          .fontSize(20)
          .width('80%')
          .fontFamily("sans-serif")
          .fontStyle(FontStyle.Normal)
          .onChange((value: string) => {
            this.str = value;
          })

        Text(this.resStr2)
          .height(124)
          .fontSize(18)
          .fontFamily("sans-serif")
          .fontStyle(FontStyle.Normal)

        Button('AI生成续写诗')
          .fontSize(30)
          .onClick(() => {
            let httpRequest = http.createHttp();
            let url = 'https://py.myie9.com/xuxietest/' + this.str;
            httpRequest.request(
              url,
              {
                header: {
                  'Content-Type': 'application/json'
                },
              }, (err, data) => {
              if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                console.info('Result:' + data.result);
                this.resStr2 = data.result.toString();
              } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
              }
            })
          })

      }
      .width('100%')
      .height('100%')

    }
    .height('100%')
  }
}



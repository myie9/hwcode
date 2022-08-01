import { HttpRequestGet } from '../util/HttpUtils'
import prompt from '@system.prompt';

@Extend(Text) function fancyOne(fontSize: number) {
  .fontSize(fontSize)
  .fontColor(Color.Black)
  .fontWeight(FontWeight.Bold)
  .align(Alignment.Start)
  .margin({ top: 50 })
}

@Extend(TextArea) function fancyTwo(fontSize: number) {
  .textAlign(TextAlign.Start)
  .caretColor(Color.Blue)
  .fontSize(fontSize)
  .fontStyle(FontStyle.Normal)
  .fontColor(Color.Black)
  .height(50)
  .margin({ top: 30, left: 16, right: 16 })
}

@Entry
@Component
struct Index {
  @State text1: string = ''
  @State text2: string = ''
  controller: TextAreaController = new TextAreaController()

  build() {
    Column() {
      Text('藏头诗')
        .fancyOne(40)
      TextArea({ placeholder: 'input your word', controller: this.controller})
        .fancyTwo(36)
        .onChange((value: string) => {
          this.text1 = value
          this.controller.caretPosition(-1)
        })
      Button('生成藏头诗')
        .margin({ top: 30 })
      .onClick(() => {
        this.getPoetryHead()
      })
      Text('续写诗')
        .fancyOne(40)
      TextArea({ placeholder: 'input your word', controller: this.controller})
        .fancyTwo(36)
        .onChange((value: string) => {
          this.text2 = value
          this.controller.caretPosition(-1)
        })
      Button('生成整首诗')
        .margin({ top: 30 })
        .onClick(() => {
          this.getPoetryAll()
        })
    }.width('100%')
  }

  async getPoetryHead() {
    var url = 'https://py.myie9.com/hidepoem/'
    var param = this.text1
    var data = await HttpRequestGet(url,param)
    this.showDialog(data.data,'')
  }

  async getPoetryAll() {
    var url = 'https://py.myie9.com/xuxietest/'
    var param = this.text2
    var data = await HttpRequestGet(url,param)
    this.showDialog(data.data,'')
  }

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
  }

}
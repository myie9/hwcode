/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import router from '@system.router';
import prompt from '@system.prompt';

export default {
    data: {
        content: '',
        ctx: {},
        imageURL: {},
    },
    back: function () {
        router.back();
    },

    savePic() {
        this.showDialog("图片保存成功", "诗情画意");
        const canvasRe = this.$refs.canvas;
        var dataURL = canvasRe.toDataURL();
//        this.imageURL = dataURL;
    },
    share() {
        this.showDialog("分享", "诗情画意");
    },

    onInit() {
    },

    onShow() {
        console.log("pic:" + this.content);
        this.ctx = this.$element("board").getContext("2d");
        this.ctx.font = "30px serif";
        this.ctx.strokeStyle = "#000";
        this.ctx.stroke();
        this.ctx.fillText(this.content,10,100);
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
}

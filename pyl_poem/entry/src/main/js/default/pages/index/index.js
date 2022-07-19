import http from '@ohos.net.http';

export default {
    data: {
        content_tou:"我爱祖国",
        content_xu:"本来无一物",
        result_tou:'',
        result_xu:''
    },

    get_cangtou(e){
        this.content_tou=e.value
    },

    get_xuxie(e){
        this.content_xu=e.value
    },

    create_cangtou(){
        console.info('pyl-Input:'+this.content_tou);
        let httpRequest = http.createHttp();
        httpRequest.request(
            "https://py.myie9.com/cangtoutest/"+this.content_tou,
            {
                method:http.RequestMethod.GET,
                header: {
                    'Content-Type': 'text/plain'
                },
                connectTimeout: 60000,
                readTimeout: 60000,
            }, (err, data) => {
            if (!err) {
                console.info('pyl-Result:' + data.result);
                this.result_tou = data.result;
                this.$element('cangtouDialog').show();
            } else {
                console.info('pyl-error:' + JSON.stringify(err));
            }
        })
    },

    create_xuxie(){
        console.info('pyl-Input:'+this.content_xu);
        let httpRequest = http.createHttp();
        httpRequest.request(
            "https://py.myie9.com/xuxietest/"+this.content_xu,
            {
                method:http.RequestMethod.GET,
                header: {
                    'Content-Type': 'text/plain'
                },
                connectTimeout: 60000,
                readTimeout: 60000,
            }, (err, data) => {
            if (!err) {
                console.info('pyl-Result:' + data.result);
                this.result_xu = data.result;
                this.$element('xuxieDialog').show();
            } else {
                console.info('pyl-error:' + JSON.stringify(err));
            }
        })
    },

    close_tou(){
        this.$element('cangtouDialog').close();
    },

    close_xu(){
        this.$element('xuxieDialog').close();
    }
}

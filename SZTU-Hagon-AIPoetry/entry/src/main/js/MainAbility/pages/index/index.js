
import router from '@system.router';

export default {
    data: {
        poemHead:"123",
        aiResult:"请在上方输入符合要求的字段"
    },
    onInit() {
    },
    goHideHeadPoem(){
        router.push({
            uri: 'pages/hideHeadPoem/hideHeadPoem',
        })
    },
    goContinuePoem(){
        router.push({
            uri: 'pages/continuePoem/continuePoem',
        })
    },

}




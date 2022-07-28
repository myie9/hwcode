//异步方法需要引入文件
const globalRef = Object.getPrototypeOf(global) || global
// 注入regeneratorRuntime
globalRef.regeneratorRuntime = require('@babel/runtime/regenerator')

// abilityType: 0-Ability; 1-Internal Ability
const ABILITY_TYPE_EXTERNAL = 0;
const ABILITY_TYPE_INTERNAL = 1;
// syncOption(Optional, default sync): 0-Sync; 1-Async
const ACTION_SYNC = 0;
const ACTION_ASYNC = 1;
const ACTION_MESSAGE_CODE_PLUS = 1001;


export const gameAbility={
    callAbility: async function(data){
        let action = {};
        action.bundleName = 'com.cangjie.jsabilitydemo';
        action.abilityName = 'com.cangjie.jsabilitydemo.services.BoardServiceAbility';
        action.messageCode = data.code;
        action.data = data;
        action.abilityType = ABILITY_TYPE_EXTERNAL;
        action.syncOption = ACTION_SYNC;
        let result= await FeatureAbility.callAbility(action);
        return JSON.parse(result);
    },
    //根据messeage_code 订阅不同事件
    subAbility: async function(messeage_code,callBack){
        let action={};
        action.bundleName = 'com.cangjie.jsabilitydemo';
        action.abilityName = 'com.cangjie.jsabilitydemo.services.BoardServiceAbility';
        action.messageCode = messeage_code;
        action.abilityType = ABILITY_TYPE_EXTERNAL;
        action.syncOption = ACTION_SYNC;
        let result = await FeatureAbility.subscribeAbilityEvent(action, function(callbackData) {
            var callbackJson = JSON.parse(callbackData);
            this.eventData = JSON.stringify(callbackJson.data);
            callBack && callBack(callbackJson);
        });
        return JSON.parse(result);
    },
    //根据message_code取消订阅不同事件
   unSubAbility : async function(messeage_code){
       let action={};
       action.bundleName = 'com.cangjie.jsabilitydemo';
       action.abilityName = 'com.cangjie.jsabilitydemo.services.BoardServiceAbility';
       action.messageCode = messeage_code;
       action.abilityType = ABILITY_TYPE_EXTERNAL;
       action.syncOption = ACTION_SYNC;
       let result= await FeatureAbility.unsubscribeAbilityEvent(action);
       return JSON.parse(result);
    }
}
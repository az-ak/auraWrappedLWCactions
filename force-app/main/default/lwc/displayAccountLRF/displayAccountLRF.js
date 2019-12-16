import { LightningElement, api } from 'lwc';

export default class DisplayAccountLRF extends LightningElement {
    // recordIdはauraから受け取るためapiデコレータが必要
    @api recordId;

    // クローズボタンクリック時に'close'というカスタムイベントを発生させて親のauraに処理してもらう。
    // その他の処理は lightning-record-edit-form におまかせ。
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
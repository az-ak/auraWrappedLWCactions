import { LightningElement, api } from 'lwc';

export default class UpdateName extends LightningElement {
    // recordIdとオブジェクトAPI名はauraから受け取るためapiデコレータが必要
    @api recordId;
    @api objectApiName;

    // 更新成功時およびクローズボタンクリック時に'close'というカスタムイベントを
    // 発生させて親のauraに処理してもらう。
    // その他の処理は lightning-record-edit-form におまかせ。
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
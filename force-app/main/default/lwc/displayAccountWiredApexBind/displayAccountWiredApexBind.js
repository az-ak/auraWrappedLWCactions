import { LightningElement, api, wire } from 'lwc';
import singleAccount from '@salesforce/apex/DisplayAccount.selectSingleAccount';

export default class DisplayAccountWiredApexBind extends LightningElement {
    // recordIdはauraから受け取るためapiデコレータが必要
    @api recordId;
    // プロパティに(cacheable=true)のApexメソッドをwireする
    @wire(singleAccount, { accountId: '$recordId' }) account;

    // クローズボタンクリック時に'close'というカスタムイベントを発生させて親のauraに処理してもらう
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import massCloseApex from '@salesforce/apex/CloseAccountCases.massClose';

export default class CloseAccountCases extends LightningElement {
    // recordIdはauraから受け取るためapiデコレータが必要
    @api recordId;

    // connectedCallback() はこのコンポーネントの初期化が完了したタイミングで実行される。
    connectedCallback(){
        // Apexメソッドをimperativeに実行
        massCloseApex({id: this.recordId})
        // Apex成功時の処理
        .then(() => {
            // Toastを表示
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Cases closed',
                    message: 'ケースがクローズされました',
                    variant: 'success'
                })
            );
            // Toast表示後にアクションのモーダルウィンドウをクローズ
            this.close();
        })
        // Apex失敗時の処理
        .catch(error => {
            // Toastを表示
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error closing cases',
                    message: error.body.message,
                    variant: 'error'
                })
            );
            // Toast表示後にアクションのモーダルウィンドウをクローズ
            this.close();
        })
    }

    // カスタムイベント'close'を発生させてauraにウィンドウをクローズしてもらう
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }

}
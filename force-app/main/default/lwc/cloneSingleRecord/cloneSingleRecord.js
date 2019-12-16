import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import cloneRecordApex from '@salesforce/apex/CloneSingleRecord.cloneAnySobject';

export default class CloneSingleRecord extends LightningElement {
    // recordIdはauraから受け取るためapiデコレータが必要
    @api recordId;

    // connectedCallback() はこのコンポーネントの初期化が完了したタイミングで実行される。
    connectedCallback() {
        // Apexメソッドをimperativeに実行
        cloneRecordApex({ recordId: this.recordId })
            // Apex成功時の処理
            .then(result => {
                this.dispatchEvent(
                    // Toastを表示
                    // 元のrecordIdとApexの戻り値として得られたコピーされたレコードのIdを表示
                    new ShowToastEvent({
                        title: 'Record cloned',
                        message: 'Origin {0} -> Cloned {1}',
                        messageData: [
                            {
                                url: '/' + this.recordId,
                                label: this.recordId
                            },
                            {
                                url: '/' + result,
                                label: result
                            }
                        ],
                        variant: 'success'
                    })
                );
                // Toast表示後にアクションのモーダルウィンドウをクローズ
                this.close();
            })
            // Apex失敗時の処理
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error cloning record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
                this.close();
            })
    }

    // カスタムイベント'close'を発生させてauraにウィンドウをクローズしてもらう
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
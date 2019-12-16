import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import ID_FIELD from '@salesforce/schema/Opportunity.Id';
import PROBABILITY_FIELD from '@salesforce/schema/Opportunity.Probability';

export default class UpdateOppsProbability extends LightningElement {
    // recordIdはauraから受け取るためapiデコレータが必要
    @api recordId;
    // recordIdと項目のリストを引数としてui-apiのgetRecordでプロパティとwireする
    @wire(getRecord, { recordId: '$recordId', fields: [PROBABILITY_FIELD] })
    opp;

    // 押下されたボタンに応じて確度の値を引数として後続処理を実行
    highProbability() {
        this.updateOpportunity(80);
    }
    mediumProbability() {
        this.updateOpportunity(50);
    }
    lowProbability() {
        this.updateOpportunity(20);
    }

    // 設定された確度の値でレコードを更新
    updateOpportunity(p) {
        // ui-apiの引数として渡すrecordInputを作成
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[PROBABILITY_FIELD.fieldApiName] = p;
        const recordInput = { fields };
        // ui-apiのupdateRecordを実行
        updateRecord(recordInput)
            // 更新成功時の処理
            .then(() => {
                // Toastを表示
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: '商談の確度を変更しました',
                        variant: 'success'
                    })
                );
                // Toast表示後にアクションのモーダルウィンドウをクローズ
                this.close();
            })
            // 更新失敗時の処理
            .catch(error => {
                // Toastを表示
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
                // Toast表示後にアクションのモーダルウィンドウをクローズ
                this.close();
            });
    }

    // カスタムイベント'close'を発生させてauraにウィンドウをクローズしてもらう
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
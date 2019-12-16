import { LightningElement, api, track } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class DeleteSingleRecord extends NavigationMixin(LightningElement) {
    // recordIdとオブジェクトAPI名はauraから受け取るためapiデコレータが必要
    @api recordId;
    @api objectApiName;
    @track error;

    // 削除ボタン押下時の処理
    deleteRec() {
        // ui-apiのdeleteRecordを実行
        deleteRecord(this.recordId)
            // 削除成功時の処理
            .then(() => {
                this.dispatchEvent(
                    // Toastを表示
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'レコードを削除しました',
                        variant: 'success'
                    })
                );
                // 削除したレコードのオブジェクトホームに遷移
                this[NavigationMixin.Navigate]({
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: this.objectApiName,
                        actionName: 'home',
                    },
                });
            })
            // 削除失敗時に処理
            .catch(error => {
                this.dispatchEvent(
                    // Toastを表示
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    // キャンセルボタン押下時の処理
    cancel() {
        // キャンセル時は元のレコードを表示
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                actionName: 'view',
            },
        });
    }
}
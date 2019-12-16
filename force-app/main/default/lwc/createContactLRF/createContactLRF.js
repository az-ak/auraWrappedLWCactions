import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class CreateContactLRF extends LightningElement {
    // recordIdはauraから受け取るためapiデコレータが必要
    @api accountId;
    // lightning-record-form で定義する項目を定義
    fields = [LASTNAME_FIELD,FIRSTNAME_FIELD,PHONE_FIELD,EMAIL_FIELD];

    // Submit時に入力されていない項目、すなわち、取引先責任者の紐づく取引先のIDを設定
    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        fields.AccountId = this.accountId;
        this.template.querySelector('lightning-record-form').submit(fields);
    }

    // Submit成功時のハンドラ
    handleSuccess(event) {
        this.dispatchEvent(
            // detailパラメータに作成されたレコードの情報が存在するのでToastで表示
            new ShowToastEvent({
                title: 'Record Created',
                message: '取引先責任者名: {0}',
                messageData: [{
                    url: '/' + event.detail.id,
                    label: event.detail.fields[LASTNAME_FIELD.fieldApiName].value
                     +' '+ event.detail.fields[FIRSTNAME_FIELD.fieldApiName].value
                }],
                variant: 'success'
            })
        );
        // Toast表示後にアクションのモーダルウィンドウをクローズ
        this.close();
    }

    // カスタムイベント'close'を発生させてauraにウィンドウをクローズしてもらう
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
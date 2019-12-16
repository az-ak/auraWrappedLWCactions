import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';

export default class CreateContactUiapi extends LightningElement {
    // recordIdはauraから受け取るためapiデコレータが必要
    @api accountId;

    // 初期値の設定
    firstName = '';
    lastName = '';
    phone = '';
    email = '';

    // 入力があるたびプロパティを更新
    handleFirstNameChange(event) { this.firstName = event.target.value; }
    handleLastNameChange(event) { this.lastName = event.target.value; }
    handlePhoneChange(event) { this.phone = event.target.value; }
    handleEmailChange(event) { this.email = event.target.value; }

    // 作成ボタン押下時のハンドラ
    createContact() {
        // ui-apiの引数として渡すrecordInputを作成
        const fields = {};
        fields[FIRSTNAME_FIELD.fieldApiName] = this.firstName;
        fields[LASTNAME_FIELD.fieldApiName] = this.lastName;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        fields[ACCOUNTID_FIELD.fieldApiName] = this.accountId;
        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };

        // ui-apiのcreateRecordを実行
        createRecord(recordInput)
            // ui-api成功時の処理
            .then(contact => {
                // Toastを表示
                // 作成したレコードがthenブロックで戻されるので、そこから姓名とIdを得て表示
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Record Created',
                        message: '取引先責任者名: {0}',
                        messageData: [{
                            url: '/' + contact.id,
                            label: contact.fields[LASTNAME_FIELD.fieldApiName].value + ' '
                                 + contact.fields[FIRSTNAME_FIELD.fieldApiName].value
                        }],
                        variant: 'success'
                    })
                );
                // Toast表示後にアクションのモーダルウィンドウをクローズ
                this.close();
            })
            // ui-api失敗時の処理
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
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
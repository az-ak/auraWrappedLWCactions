import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createContactApex from '@salesforce/apex/CreateContactController.newContactForAccount';

export default class CreateContactApex extends LightningElement {
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
        // Apexメソッドをimperativeにコール
        createContactApex({
            accountId: this.accountId,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            email: this.email
        })
            // Apex成功時の処理
            .then(contact => {
                // Toastを表示
                // Apexの戻り値がContactのレコード型なので、そこから姓名とIdを得て表示
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Record Created',
                        message: '取引先責任者名: {0}',
                        messageData: [{
                            url: '/' + contact.Id,
                            label: contact.LastName + ' ' + contact.FirstName
                        }],
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
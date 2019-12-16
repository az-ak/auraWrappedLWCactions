import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import BILLINGSTREET_FIELD from '@salesforce/schema/account.BillingStreet';
import BILLINGCITY_FIELD from '@salesforce/schema/account.BillingCity';
import BILLINGSTATE_FIELD from '@salesforce/schema/account.BillingState';
import BILLINGCOUNTRY_FIELD from '@salesforce/schema/account.BillingCountry';
import SHIPPINGSTREET_FIELD from '@salesforce/schema/account.ShippingStreet';
import SHIPPINGCITY_FIELD from '@salesforce/schema/account.ShippingCity';
import SHIPPINGSTATE_FIELD from '@salesforce/schema/account.ShippingState';
import SHIPPINGCOUNTRY_FIELD from '@salesforce/schema/account.ShippingCountry';

const FIELDS = [
    BILLINGSTREET_FIELD,
    BILLINGCITY_FIELD,
    BILLINGSTATE_FIELD,
    BILLINGCOUNTRY_FIELD,
    SHIPPINGSTREET_FIELD,
    SHIPPINGCITY_FIELD,
    SHIPPINGSTATE_FIELD,
    SHIPPINGCOUNTRY_FIELD
];

export default class OpenMap extends LightningElement {
    // recordIdはauraから受け取るためapiデコレータが必要
    @api recordId;
    // recordIdと項目のリストを引数としてui-apiのgetRecordでプロパティとwireする
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    record;

    url = "https://www.google.com/maps/search/?api=1&query="

    // 請求先押下時の処理。請求先住所でURLを組み立たてる
    openBillingAddress(){
        this.url = this.url + getFieldValue(this.record.data, BILLINGSTREET_FIELD)
                      + "+" + getFieldValue(this.record.data, BILLINGCITY_FIELD)
                      + "+" + getFieldValue(this.record.data, BILLINGSTATE_FIELD)
                      + "+" + getFieldValue(this.record.data, BILLINGCOUNTRY_FIELD);
        this.openMapPage();
    }

    // 納入先押下時の処理。納入先住所でURLを組み立たてる
    openShippingAddress(){
        this.url = this.url + getFieldValue(this.record.data, SHIPPINGSTREET_FIELD)
                      + "+" + getFieldValue(this.record.data, SHIPPINGCITY_FIELD)
                      + "+" + getFieldValue(this.record.data, SHIPPINGSTATE_FIELD)
                      + "+" + getFieldValue(this.record.data, SHIPPINGCOUNTRY_FIELD);
        this.openMapPage();
    }

    // 組み立てられたURLを開く
    openMapPage(){
        window.open(this.url);
        // アクションのモーダルウィンドウをクローズ
        this.close();
    }

    // カスタムイベント'close'を発生させてauraにウィンドウをクローズしてもらう
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
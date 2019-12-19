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
    // api decorator is required since recordId is passed from aura
    @api recordId;
    // property is wired with getRecord ui-api which has recordId and field list as arguments.
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    record;

    url = "https://www.google.com/maps/search/?api=1&query="

    // Construct URL for Billing Address.
    openBillingAddress(){
        this.url = this.url + getFieldValue(this.record.data, BILLINGSTREET_FIELD)
                      + "+" + getFieldValue(this.record.data, BILLINGCITY_FIELD)
                      + "+" + getFieldValue(this.record.data, BILLINGSTATE_FIELD)
                      + "+" + getFieldValue(this.record.data, BILLINGCOUNTRY_FIELD);
        this.openMapPage();
    }

    // Construct URL for Shipping Address.
    openShippingAddress(){
        this.url = this.url + getFieldValue(this.record.data, SHIPPINGSTREET_FIELD)
                      + "+" + getFieldValue(this.record.data, SHIPPINGCITY_FIELD)
                      + "+" + getFieldValue(this.record.data, SHIPPINGSTATE_FIELD)
                      + "+" + getFieldValue(this.record.data, SHIPPINGCOUNTRY_FIELD);
        this.openMapPage();
    }

    // Open the URL
    openMapPage(){
        window.open(this.url);
        // Close modal window for the action.
        this.close();
    }

    // Cause aura to close the window by firing the custom event 'close'.
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
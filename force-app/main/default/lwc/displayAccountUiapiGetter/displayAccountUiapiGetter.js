import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/account.Name';
import BILLINGCITY_FIELD from '@salesforce/schema/account.BillingCity';
import BILLINGSTATE_FIELD from '@salesforce/schema/account.BillingState';
import INDUSTRY_FIELD from '@salesforce/schema/account.Industry';
import REVENUE_FIELD from '@salesforce/schema/account.AnnualRevenue';
import NUM_EMP_FIELD from '@salesforce/schema/account.NumberOfEmployees';
import WEBSITE_FIELD from '@salesforce/schema/account.Website';
import OWNERSHIP_FIELD from '@salesforce/schema/account.Ownership';
import PHONE_FIELD from '@salesforce/schema/account.Phone';
import OWNER_NAME_FIELD from '@salesforce/schema/account.Owner.Name'; // Parent's object field

const FIELDS = [
    NAME_FIELD,
    BILLINGCITY_FIELD,
    BILLINGSTATE_FIELD,
    INDUSTRY_FIELD,
    REVENUE_FIELD,
    NUM_EMP_FIELD,
    WEBSITE_FIELD,
    OWNERSHIP_FIELD,
    PHONE_FIELD,
    OWNER_NAME_FIELD
];

export default class DisplayAccountUiapiGetter extends LightningElement {
    // api decorator is required since recordId is passed from aura
    @api recordId;
    // property is wired with getRecord ui-api which has recordId and field list as arguments.
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    account;

    // getter methods for each property
    get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
    }
    get billingCity() {
        return getFieldValue(this.account.data, BILLINGCITY_FIELD);
    }
    get billingState() {
        return getFieldValue(this.account.data, BILLINGSTATE_FIELD);
    }
    get industry(){
        return getFieldValue(this.account.data, INDUSTRY_FIELD);
    }
    get revenue(){
        return getFieldValue(this.account.data, REVENUE_FIELD);
    }
    get num_emp() {
        return getFieldValue(this.account.data, NUM_EMP_FIELD);
    }
    get website() {
        return getFieldValue(this.account.data, WEBSITE_FIELD);
    }
    get ownership() {
        return getFieldValue(this.account.data, OWNERSHIP_FIELD);
    }
    get phone() {
        return getFieldValue(this.account.data, PHONE_FIELD);
    }
    get owner() {
        return getFieldValue(this.account.data, OWNER_NAME_FIELD);
    }

    // Cause aura to close the window by firing the custom event 'close'.
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
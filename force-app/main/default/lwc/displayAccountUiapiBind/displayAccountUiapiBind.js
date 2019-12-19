import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
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

export default class DisplayAccountUiapiBind extends LightningElement {
    // api decorator is required since recordId is passed from aura
    @api recordId;
    // property is wired with getRecord ui-api which has recordId and field list as arguments.
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    account;

    // Cause aura to close the window by firing the custom event 'close'.
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
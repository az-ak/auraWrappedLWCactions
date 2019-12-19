import { LightningElement, api, wire } from 'lwc';
import { getSObjectValue } from '@salesforce/apex';
import singleAccount from '@salesforce/apex/DisplayAccount.selectSingleAccount';
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

export default class DisplayAccountWiredApexGetter extends LightningElement {
    // api decorator is required since recordId is passed from aura
    @api recordId;
    // wire cacheable Apex method to property
    @wire(singleAccount, { accountId: '$recordId' }) account;

    // getter methods for each property
    get name() {
        return this.account.data ? getSObjectValue(this.account.data, NAME_FIELD) : '';
    }
    get billingCity() {
        return this.account.data ? getSObjectValue(this.account.data, BILLINGCITY_FIELD) : '';
    }
    get billingState() {
        return this.account.data ? getSObjectValue(this.account.data, BILLINGSTATE_FIELD) : '';
    }
    get industry(){
        return this.account.data ? getSObjectValue(this.account.data, INDUSTRY_FIELD) : '';
    }
    get revenue(){
        return this.account.data ? getSObjectValue(this.account.data, REVENUE_FIELD) : '';
    }
    get num_emp() {
        return this.account.data ? getSObjectValue(this.account.data, NUM_EMP_FIELD) : '';
    }
    get website() {
        return this.account.data ? getSObjectValue(this.account.data, WEBSITE_FIELD) : '';
    }
    get ownership() {
        return this.account.data ? getSObjectValue(this.account.data, OWNERSHIP_FIELD) : '';
    }
    get phone() {
        return this.account.data ? getSObjectValue(this.account.data, PHONE_FIELD) : '';
    }
    get owner() {
        return this.account.data ? getSObjectValue(this.account.data, OWNER_NAME_FIELD) : '';
    }

    // Cause aura to close the window by firing the custom event 'close'.
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
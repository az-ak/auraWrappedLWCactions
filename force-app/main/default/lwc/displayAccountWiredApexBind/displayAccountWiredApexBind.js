import { LightningElement, api, wire } from 'lwc';
import singleAccount from '@salesforce/apex/DisplayAccount.selectSingleAccount';

export default class DisplayAccountWiredApexBind extends LightningElement {
    // api decorator is required since recordId is passed from aura
    @api recordId;
    // wire cacheable Apex method to property
    @wire(singleAccount, { accountId: '$recordId' }) account;

    // Cause aura to close the window by firing the custom event 'close'.
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
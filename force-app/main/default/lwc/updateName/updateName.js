import { LightningElement, api } from 'lwc';

export default class UpdateName extends LightningElement {
    // api decorator is required since recordId and objectApiName are passed from aura
    @api recordId;
    @api objectApiName;

    // Cause aura to close the window by firing the custom event 'close'.
    // Leave the rest to lightning-record-edit-form.
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
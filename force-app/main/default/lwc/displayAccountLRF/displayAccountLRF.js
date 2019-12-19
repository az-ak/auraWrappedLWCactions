import { LightningElement, api } from 'lwc';

export default class DisplayAccountLRF extends LightningElement {
    // api decorator is required since recordId is passed from aura
    @api recordId;

    // Cause aura to close the window by firing the custom event 'close'.
    // Leave the rest to lightning-record-edit-form.
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
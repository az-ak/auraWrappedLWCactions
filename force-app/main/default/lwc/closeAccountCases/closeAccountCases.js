import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import massCloseApex from '@salesforce/apex/CloseAccountCases.massClose';

export default class CloseAccountCases extends LightningElement {
    // api decorator is required since recordId is passed from aura
    @api recordId;

    // connectedCallback() is executed when the component is inserted into the DOM.
    connectedCallback(){
        // Perform Apex method imperatively.
        massCloseApex({id: this.recordId})
        // Apex Success Action
        .then(() => {
            // Display a toast notification.
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Cases closed',
                    message: 'Account Cases are closed.',
                    variant: 'success'
                })
            );
            // After displaying toast, close Action's modal window.
            this.close();
        })
        // Apex Failure Handling
        .catch(error => {
            // Display a toast notification.
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error closing cases',
                    message: error.body.message,
                    variant: 'error'
                })
            );
            // After displaying toast, close Action's modal window.
            this.close();
        })
    }

    // Cause aura to close the window by firing the custom event 'close'.
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }

}
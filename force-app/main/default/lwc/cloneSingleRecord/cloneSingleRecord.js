import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import cloneRecordApex from '@salesforce/apex/CloneSingleRecord.cloneAnySobject';

export default class CloneSingleRecord extends LightningElement {
    // api decorator is required since recordId is passed from aura
    @api recordId;

    // connectedCallback() is executed when the component is inserted into the DOM.
    connectedCallback() {
        // Perform Apex method imperatively.
        cloneRecordApex({ recordId: this.recordId })
            // Apex Success Action
            .then(result => {
                this.dispatchEvent(
                    // Display a toast notification.
                    // Original recordId and cloned recordId which is returned from Apex is in message.
                    new ShowToastEvent({
                        title: 'Record cloned',
                        message: 'Origin {0} -> Cloned {1}',
                        messageData: [
                            {
                                url: '/' + this.recordId,
                                label: this.recordId
                            },
                            {
                                url: '/' + result,
                                label: result
                            }
                        ],
                        variant: 'success'
                    })
                );
                // After displaying toast, close Action's modal window.
                this.close();
            })
            // Apex Failure Handling
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error cloning record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
                this.close();
            })
    }

    // Cause aura to close the window by firing the custom event 'close'.
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
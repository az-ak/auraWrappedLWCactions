import { LightningElement, api, track } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class DeleteSingleRecord extends NavigationMixin(LightningElement) {
    // api decorator is required since recordId and objectApiName are passed from aura
    @api recordId;
    @api objectApiName;
    @track error;

    // Delete button is clicked
    deleteRec() {
        // perform deleteRecord of ui-api
        deleteRecord(this.recordId)
            // ui-api success action
            .then(() => {
                this.dispatchEvent(
                    // Display a toast notification.
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record is deleted',
                        variant: 'success'
                    })
                );
                // go to object home of deleted record
                this[NavigationMixin.Navigate]({
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: this.objectApiName,
                        actionName: 'home',
                    },
                });
            })
            // ui-api failure handling
            .catch(error => {
                this.dispatchEvent(
                    // Display a toast notification.
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    // Cancel button is clicked
    cancel() {
        // show original record
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                actionName: 'view',
            },
        });
    }
}
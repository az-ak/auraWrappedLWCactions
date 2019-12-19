import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import ID_FIELD from '@salesforce/schema/Opportunity.Id';
import PROBABILITY_FIELD from '@salesforce/schema/Opportunity.Probability';

export default class UpdateOppsProbability extends LightningElement {
    // api decorator is required since recordId is passed from aura
    @api recordId;
    // property is wired with getRecord ui-api which has recordId and field list as arguments.
    @wire(getRecord, { recordId: '$recordId', fields: [PROBABILITY_FIELD] })
    opp;

    // Subsequent process is executed with the probability as an argument 
    // according to the pressed button.
    highProbability() {
        this.updateOpportunity(80);
    }
    mediumProbability() {
        this.updateOpportunity(50);
    }
    lowProbability() {
        this.updateOpportunity(20);
    }

    // Updates the record with argument value.
    updateOpportunity(p) {
        // Create recordInput passed as an argument to ui-api
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[PROBABILITY_FIELD.fieldApiName] = p;
        const recordInput = { fields };
        // execute updateRecord of ui-api
        updateRecord(recordInput)
            // Action on successful update
            .then(() => {
                // Display a toast notification.
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Probability is changed.',
                        variant: 'success'
                    })
                );
                // After displaying toast, close Action's modal window.
                this.close();
            })
            // Handling Update Failures
            .catch(error => {
                // Display a toast notification.
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
                // After displaying toast, close Action's modal window.
                this.close();
            });
    }

    // Cause aura to close the window by firing the custom event 'close'.
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
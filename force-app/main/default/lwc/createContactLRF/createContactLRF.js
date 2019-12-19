import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class CreateContactLRF extends LightningElement {
    // api decorator is required since recordId is passed from aura
    @api accountId;
    // Fields used by lightning-record-form
    fields = [LASTNAME_FIELD,FIRSTNAME_FIELD,PHONE_FIELD,EMAIL_FIELD];

    // When submit, non-entered value (i.e. AccountId which new contact belongs to) is set.
    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        fields.AccountId = this.accountId;
        this.template.querySelector('lightning-record-form').submit(fields);
    }

    // handler on successful submit
    handleSuccess(event) {
        this.dispatchEvent(
            // detail parameter has created record info.  Display it in toast.
            new ShowToastEvent({
                title: 'Record Created',
                message: 'Contact Name: {0}',
                messageData: [{
                    url: '/' + event.detail.id,
                    label: event.detail.fields[FIRSTNAME_FIELD.fieldApiName].value
                     +' '+ event.detail.fields[LASTNAME_FIELD.fieldApiName].value
                }],
                variant: 'success'
            })
        );
        // After displaying toast, close Action's modal window.
        this.close();
    }

    // Cause aura to close the window by firing the custom event 'close'.
    close() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
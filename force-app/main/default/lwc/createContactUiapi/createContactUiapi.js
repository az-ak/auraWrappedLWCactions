import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';

export default class CreateContactUiapi extends LightningElement {
    // api decorator is required since recordId is passed from aura
    @api accountId;

    // Set initial value
    firstName = '';
    lastName = '';
    phone = '';
    email = '';

    // When the value changes, handleChange function updates property.
    handleFirstNameChange(event) { this.firstName = event.target.value; }
    handleLastNameChange(event) { this.lastName = event.target.value; }
    handlePhoneChange(event) { this.phone = event.target.value; }
    handleEmailChange(event) { this.email = event.target.value; }

    // Create button is clicked
    createContact() {
        // Create recordInput passed as an argument to ui-api
        const fields = {};
        fields[FIRSTNAME_FIELD.fieldApiName] = this.firstName;
        fields[LASTNAME_FIELD.fieldApiName] = this.lastName;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        fields[ACCOUNTID_FIELD.fieldApiName] = this.accountId;
        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };

        // perform createRecord of ui-api
        createRecord(recordInput)
            // ui-api success action
            .then(contact => {
                // Display a toast notification.
                // Created record is returned in then block. We can get Id and Name fields.
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Record Created',
                        message: 'Contact Name: {0}',
                        messageData: [{
                            url: '/' + contact.id,
                            label: contact.fields[FIRSTNAME_FIELD.fieldApiName].value + ' '
                                 + contact.fields[LASTNAME_FIELD.fieldApiName].value
                        }],
                        variant: 'success'
                    })
                );
                // After displaying toast, close Action's modal window.
                this.close();
            })
            // ui-api failure handling
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
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
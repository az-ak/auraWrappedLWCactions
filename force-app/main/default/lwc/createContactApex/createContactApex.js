import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createContactApex from '@salesforce/apex/CreateContactController.newContactForAccount';

export default class CreateContactApex extends LightningElement {
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
        // Call Apex method imperatively
        createContactApex({
            accountId: this.accountId,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            email: this.email
        })
            // Apex Success Action
            .then(contact => {
                // Display a toast notification.
                // Apex returns Contact record which has Id, First Name, Last Name.
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Record Created',
                        message: 'Contact Name: {0}',
                        messageData: [{
                            url: '/' + contact.Id,
                            label: contact.FirstName + ' ' + contact.LastName
                        }],
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
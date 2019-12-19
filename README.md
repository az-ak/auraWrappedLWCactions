# Samples for invoking aura wrapped Lightning Web Component from Action

## Introduction
When transitioning from Classic to Lightning Experience, you may have to provide alternatives of JavaScript buttons/links.  The alternatives should be considered in following order:
1. Standard features (such as Quick Action)
2. Auto conversion by [Lightning Configuration Converter](https://lightning-configuration.salesforce.com/)  
3. Self-made Lightning Action

As of Winter'20, Lightning Web Component(LWC) cannot be invoked from Action directly. (Action invoked aura Component samples are [here](https://github.com/developerforce/LEXComponentsBundle).)
However, when regarding LWC as future mainstream, you may not want to take time to study aura and may want to avoid to elaborate aura component.  
This repository provides samples of aura wrapped LWC, where the majority of functions are implemented by LWC and aura's roles are suppressed as possble.  Use cases are similar to above aura Action Samples.

## What aura Components do
aura Components do followings **ONLY**.  Other all functions are implemented in LWC.
* invoke LWC
* allow to use in Action (force:lightningQuickAction[WithoutHeader])
* get recordId of the record page (force:hasRecordId) and pass it to LWC.
* get object API name of the record page (force:hasSObjectName) and pass it to LWC.
* catch the event from LWC then close modal window ("e.force:closeQuickAction"), and refreshing the page ("e.force:refreshView") if need be.

## Contents
### Naming Rules
* LWC and Action have same name.
* aura has postfix "Wrapper".
* When use case is same, component name includes the way to access data and show property value.
	* Data access
		* lightning-record-form
		* ui-api
		* Wired Apex
		* Imperative Apex
	* Show property value
		* lightning-record-form
		* binding
		* getter

### Component list
1. Display a record
	* Object: Account
	* Explanation: Display a record with various manners
	1. lightning-record-form
		* LWC: displayAccountLRF
	2. ui-api
		1. binding property
			* LWC: displayAccountUiapiBind
		2. getter
			* LWC: displayAccountUiapiGetter
	3. Wired Apex
		* Apex class: DisplayAccount.cls
		1. binding property
			* LWC: displayAccountWiredApexBind
		2. getter
			* LWC: displayAccountWiredApexGetter
2. Delete a record
    * Object: General-purpose
    * Explanation: Delete a record by ui-api
	* LWC: deleteSingleRecord
	* Action: (as sample) Opportunity
3. Update a record
	1. lightning-record-form
		* Object: General-purpose
		* Explanation: Change Name field
		* LWC: updateName
		* Action: (as sample) Opportunity
	2. ui-api
		* Object: Opportunity
		* Explanation: Selecting High/Medium/Low then update probability
		* LWC: updateOppsProbability
4. Create a child record
	* Object: Account
	* Explanation: Create a Contact record under the Account
	1. lightning-record-form
		* LWC: createContactLRF
	2. ui-api
		* LWC: createContactUiapi
	3. imperative Apex
		* Apex class: CreateContactController.cls
		* LWC: createContactApex
5. Mass update of child records
	* Object: Account
	* Explanation: Close all cases under the Account by imperative Apex
	* Apex class: CloseAccountCases.cls
	* LWC: closeAccountCases
6. Clone a record
	* Object: General-purpose
	* Explanation: Clone a record by imperative Apex
	* Apex class: CloneSingleRecord.cls
	* LWC: cloneSingleRecord
	* Action: (as sample) Opportunity
7. Open another window
	* Object: Account
	* Explanation: Open a map in another window
	* LWC: openMap

### Disclaimer
This code was written for the purpose of technical verification of the Lightning Platform as an individual and does not guarantee the accuracy of operation or security. It is published as a sample code for the Lightning Platform implementation.
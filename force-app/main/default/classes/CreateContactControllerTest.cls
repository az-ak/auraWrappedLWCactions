@isTest
public with sharing class CreateContactControllerTest {

    @testSetup
    static void setupData(){
        Account a = new Account();
        a.Name = 'Test Account For Unit Test Purposes';
        a.BillingStreet = '350 Mission St';
        a.BillingCity = 'San Francisco';
        a.BillingState = 'CA';
        a.BillingCountry = 'US';
        a.ShippingStreet = '1095 Avenue of the Americas, 6th Ave';
        a.ShippingCity = 'New York';
        a.ShippingState = 'NY';
        a.ShippingCountry = 'US';
        insert a;
    }

    @isTest
    static void newContactForAccount(){
        Account acc = [SELECT Id FROM Account WHERE Name = 'Test Account For Unit Test Purposes'];
        Test.startTest();
        Contact c = CreateContactController.newContactForAccount(acc.Id, 'John', 'Test', '1231231231', 'unit@test.com');
        Test.stopTest();
        System.assertEquals('John', c.FirstName);
        System.assertEquals('Test', c.LastName);
        System.assertEquals('1231231231', c.Phone);
        System.assertEquals('unit@test.com', c.Email);
    }
}

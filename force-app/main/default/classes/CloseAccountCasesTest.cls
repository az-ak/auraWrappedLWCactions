@isTest
public with sharing class CloseAccountCasesTest {

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

        Case c1 = new Case();
        c1.Status = 'New';
        c1.Origin = 'Phone';
        c1.Priority = 'High';
        c1.AccountId = a.Id;
        insert c1;

        Case c2 = new Case();
        c2.Status = 'New';
        c2.Origin = 'Phone';
        c2.Priority = 'Medium';
        c2.AccountId = a.Id;
        insert c2;
    }

    @isTest
    static void massCloseTest(){
        Account acc = [SELECT Id FROM Account WHERE Name = 'Test Account For Unit Test Purposes'];
        Test.startTest();
        CloseAccountCases.massClose(acc.Id);
        Test.stopTest();
        List<Case> casesFromAccount = [SELECT Id, Status, Description, Priority FROM Case WHERE Account.Name = 'Test Account For Unit Test Purposes' LIMIT 2];
        for(Case c : casesFromAccount){
            System.assertEquals('Closed', c.Status);
            System.assertEquals('Low', c.Priority);
            System.assertEquals('Case Closed.', c.Description);
        }
    }

}

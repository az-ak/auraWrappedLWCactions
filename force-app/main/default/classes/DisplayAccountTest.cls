@isTest
public with sharing class DisplayAccountTest {

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
        a.Industry = 'Retail';
        a.AnnualRevenue = 111;
        a.NumberOfEmployees = 222;
        a.Website = 'www.example.co.jp';
        a.Ownership = 'S Corporation';
        a.Phone = '(03)4222-9999';
        insert a;
    }

    @isTest
    static void selectSingleAccount() {
        Account a1 = [SELECT Id, Name, BillingCity, BillingState, Industry,
            AnnualRevenue, NumberOfEmployees, Website, Ownership, Phone,
            Owner.Name FROM Account WHERE Name = 'Test Account For Unit Test Purposes'];
        Test.startTest();
        Account a2 = DisplayAccount.selectSingleAccount(a1.Id);
        Test.stopTest();
        System.assertEquals(a1.Id, a2.Id, 'Id must be same.');
        System.assertEquals(a1.Name, a2.Name, 'Name must be same.');
        System.assertEquals(a1.BillingCity, a2.BillingCity, 'BillingCity must be same.');
        System.assertEquals(a1.BillingState, a2.BillingState, 'BillingState must be same.');
        System.assertEquals(a1.Industry, a2.Industry, 'Industry must be same.');
        System.assertEquals(a1.AnnualRevenue, a2.AnnualRevenue, 'AnnualRevenue must be same.');
        System.assertEquals(a1.NumberOfEmployees, a2.NumberOfEmployees, 'NumberOfEmployees must be same.');
        System.assertEquals(a1.Website, a2.Website, 'Website must be same.');
        System.assertEquals(a1.Ownership, a2.Ownership, 'Ownership must be same.');
        System.assertEquals(a1.Phone, a2.Phone, 'Phone must be same.');
        System.assertEquals(a1.Owner.Name, a2.Owner.Name, 'Owner.Name must be same.');
    }
}

public with sharing class DisplayAccount {
    /**
        LWCから呼び出すメソッドには @AuraEnabled のアノテーションが必要。
        また、メソッドはpublic/globalなstaticメソッドでなければならない。
        またメソッドをWireするため (cacheable=true) が必要。
     */
    @AuraEnabled(cacheable=true)
    public static Account selectSingleAccount(string accountId) {
        return [SELECT Id, Name, BillingCity, BillingState, Industry,
            AnnualRevenue, NumberOfEmployees, Website, Ownership, Phone,
            Owner.Name FROM Account WHERE Id = :accountId];
    }
}

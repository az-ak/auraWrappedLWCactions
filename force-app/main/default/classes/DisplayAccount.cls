public with sharing class DisplayAccount {
    /**
        Method called from LWC has to have @AuraEnabled annotation.
        Also the method has to be global/public static method.
        This method is wired in LWC, so (cacheable=true) is required.
     */
    @AuraEnabled(cacheable=true)
    public static Account selectSingleAccount(string accountId) {
        return [SELECT Id, Name, BillingCity, BillingState, Industry,
            AnnualRevenue, NumberOfEmployees, Website, Ownership, Phone,
            Owner.Name FROM Account WHERE Id = :accountId];
    }
}

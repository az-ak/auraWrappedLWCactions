public with sharing class CreateContactController {
    /**
        Method called from LWC has to have @AuraEnabled annotation.
        Also the method has to be global/public static method.
        This method is called imperatively, so (cacheable=true) is not required.
        Incidentally (cacheable=true) method can be called imperatively but DML cannot be performed in it.
     */
    @AuraEnabled
    public static Contact newContactForAccount(String accountId, String firstName, String lastName, String phone, String email){
        Contact c = new Contact();
        c.FirstName = firstName;
        c.LastName = lastName;
        c.Phone = phone;
        c.Email = email;
        c.AccountId = accountId;
        insert c;
        return c;
    }
}

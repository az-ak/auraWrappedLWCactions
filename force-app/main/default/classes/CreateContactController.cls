public with sharing class CreateContactController {
    /**
        LWCから呼び出すメソッドには @AuraEnabled のアノテーションが必要。
        また、メソッドはpublic/globalなstaticメソッドでなければならない。
        imperativeに呼び出すため (cacheable=true) は不要。
        なお (cacheable=true) のメソッドをimperativeに呼び出すことは可能だが、その中でDMLは実行できない。
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

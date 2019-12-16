public with sharing class CloseAccountCases {
    /**
        LWCから呼び出すメソッドには @AuraEnabled のアノテーションが必要。
        また、メソッドはpublic/globalなstaticメソッドでなければならない。
        imperativeに呼び出すため (cacheable=true) は不要。
        なお (cacheable=true) のメソッドをimperativeに呼び出すことは可能だが、その中でDMLは実行できない。
     */
    @AuraEnabled
    public static void massClose(String id){
        List<Case> cases = [SELECT Id, Status FROM Case WHERE AccountId=:id LIMIT 1000];
        for(Case cse : cases){
            cse.Status = 'Closed';
            cse.Priority = 'Low';
            cse.Description = 'Case Closed.';
        }
        update cases;
    }
}

public with sharing class CloseAccountCases {
    /**
        Method called from LWC has to have @AuraEnabled annotation.
        Also the method has to be global/public static method.
        This method is called imperatively, so (cacheable=true) is not required.
        Incidentally (cacheable=true) method can be called imperatively but DML cannot be performed in it.
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

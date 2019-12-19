public with sharing class CloneSingleRecord {

    /**
        Method called from LWC has to have @AuraEnabled annotation.
        Also the method has to be global/public static method.
        This method is called imperatively, so (cacheable=true) is not required.
        Incidentally (cacheable=true) method can be called imperatively but DML cannot be performed in it.

        This Apex code is borrowed from following blog:
        https://rajvakati.com/2018/10/17/clone-to-any-sobject-record-with-lightning-component/
     */
    @AuraEnabled
    public static String cloneAnySobject(String recordId){
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        String objectAPIName = '';
        String keyPrefix = recordId.substring(0,3);
        for( Schema.SObjectType obj : schemaMap.Values() ){
            String prefix = obj.getDescribe().getKeyPrefix();
            if(prefix == keyPrefix){
                objectAPIName = obj.getDescribe().getName();
                break;
            }
        }
        Set <String> fieldMap = schemaMap.get(objectAPIName).getDescribe().fields.getMap().keySet();
        String soqlQuery = 'SELECT ' ;
        for (String s :fieldMap ){
            if(schema.getGlobalDescribe().get(objectAPIName).getDescribe().fields.getMap().get(s).getDescribe().isAccessible()){
                soqlQuery +=  + s+',';
            }
        }
        soqlQuery =  soqlQuery.removeEnd(',');
        soqlQuery += ' FROM ' +objectAPIName +' WHERE ID = \'' + recordId +'\'' ;
        System.debug('soqlQuery'+soqlQuery);
        SObject record = Database.query(soqlQuery);
        SObject clondedParentRecordID= record.clone(false, false, false, false);
        try{
            insert clondedParentRecordID ;
            return clondedParentRecordID.id ;
        }catch(Exception e){
            return '' ;
        }
    }
}
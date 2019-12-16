public with sharing class CloneSingleRecord {

    /**
        LWCから呼び出すメソッドには @AuraEnabled のアノテーションが必要。
        また、メソッドはpublic/globalなstaticメソッドでなければならない。
        imperativeに呼び出すため (cacheable=true) は不要。
        なお (cacheable=true) のメソッドをimperativeに呼び出すことは可能だが、その中でDMLは実行できない。

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
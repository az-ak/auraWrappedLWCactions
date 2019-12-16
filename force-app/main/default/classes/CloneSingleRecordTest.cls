@isTest
public with sharing class CloneSingleRecordTest {

    @testSetup
    static void setupData(){
        Opportunity opp = new Opportunity();
        opp.Name = 'Test Opportuniy For Unit Test Purposes';
        opp.CloseDate = Date.today();
        opp.StageName = 'Closed Won';
        insert opp;
    }

    @isTest
    static void cloneAnySobjetTest(){
        Opportunity opp = [SELECT Id, Name, CloseDate, StageName FROM Opportunity WHERE Name = 'Test Opportuniy For Unit Test Purposes'];
        System.debug('Id of source record: ' + opp.Id);
        Test.startTest();
        String c = CloneSingleRecord.cloneAnySobject(opp.Id);
        Test.stopTest();
        System.debug('Id of cloned record: ' + c);
        Opportunity clonedOpp = [SELECT Id, Name, CloseDate, StageName FROM Opportunity WHERE Id = :c];
        System.assertNotEquals(clonedOpp.Id, opp.Id, 'Ids must be different.');
        System.assertEquals(clonedOpp.Name, opp.Name, 'Name fields must be same.');
        System.assertEquals(clonedOpp.CloseDate, opp.CloseDate, 'CloseDate fields must be same.');
        System.assertEquals(clonedOpp.StageName, opp.StageName, 'StageName fields must be same.');
    }
}

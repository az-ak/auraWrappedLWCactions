({
	close : function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
        // refreshing Account record to show related list.
        $A.get("e.force:refreshView").fire();
	}
})
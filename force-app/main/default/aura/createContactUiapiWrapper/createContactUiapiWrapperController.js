({
	close : function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
        // 関連リストを更新するため、取引先レコードをリフレッシュ
        $A.get("e.force:refreshView").fire();
	}
})
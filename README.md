# Salesforce App

## はじめに
ClassicからLightning Experienceに切り替えるとき、JavaScriptボタンの代替機能を提供しなければならない場合があります。このときの検討順序は以下ようになります。
1. 標準機能での代替（クイックアクション等）
2. [Lightning Configuration Converter](https://lightning-configuration.salesforce.com/)での自動コンバート  
使用方法は[こちら](https://success.salesforce.com/0D53A00003tjmxL)
3. Lightning Actionの自作

Spring'20の時点で、アクションからLightning Webコンポーネント(LWC)を直接呼び出すことはできません。（auraコンポーネントからアクションを呼び出すサンプルは[こちら](https://github.com/az-ak/LEXComponentsBundleJP)にあります。）
しかし、今後の開発でLWCを主流にするのであれば、auraを勉強するのに時間をかけたくありませんし、auraでの作り込みもなるべく避けたいところです。  
そこで、このリポジトリでは、ロジックの大部分をLWCで記述し最小限のauraコンポーネントでwrapするという方針でサンプルを作成しました。ユースケースについてはauraのサンプルとほぼ同様です。

## auraコンポーネントで実装していること
auraにて実装しているのは以下の役割**のみ**です。ほかのすべての作業はLWCで行っています。
* LWCを呼び出す
* アクションでの表示を許可する(force:lightningQuickAction[WithoutHeader])
* レコードページのrecordIdを取得しLWCに渡す(force:hasRecordId)
* レコードページのオブジェクトAPI名をLWCに渡す(force:hasSObjectName)
* LWCからイベントを受け取りモーダルウィンドウをクローズする("e.force:closeQuickAction")。また必要に応じてページをリフレッシュする("e.force:refreshView")。

## リポジトリの内容
### 命名規則
* LWCとアクションは同じ名前
* auraはLWCの名前に続いて"Wrapper"とつけている
* 同一目的のLWCが複数存在する場合、データアクセス方法とプロパティの表示方法がコンポーネント名に含まれる
	* データアクセス
		* lightning-record-form
		* ui-api
		* Wired Apex
		* Imperative Apex
	* プロパティの表示
		* lightning-record-form
		* binding
		* getter

### コンポーネントのリスト
1. レコード表示
	* オブジェクト: 取引先
	* 説明: 異なった手法でレコードを表示
	1. lightning-record-form
		* LWC: displayAccountLRF
	2. ui-api
		1. プロパティのbinding
			* LWC: displayAccountUiapiBind
		2. getterによるプロパティ参照
			* LWC: displayAccountUiapiGetter
	3. Wired Apex
		* Apexクラス: DisplayAccount.cls
		1. プロパティのbinding
			* LWC: displayAccountWiredApexBind
		2. getterによるプロパティ参照
			* LWC: displayAccountWiredApexGetter
2. レコード削除
    * オブジェクト: 汎用
    * 説明: ui-apiを使用してレコードを削除
	* LWC: deleteSingleRecord
	* アクション: サンプルとして商談に作成
3. レコード更新
	1. lightning-record-form
		* オブジェクト: 汎用
		* 説明: Name項目変更
		* LWC: updateName
		* アクション: サンプルとして商談に作成
	2. ui-api
		* オブジェクト: 商談
		* 説明: High/Medium/Low を選択して確度を変更
		* LWC: updateOppsProbability
4. 子レコード作成
	* オブジェクト: 取引先
	* 説明: 紐づく取引先責任者を作成
	1. lightning-record-form
		* LWC: createContactLRF
	2. ui-api
		* LWC: createContactUiapi
	3. imperative Apex
		* Apexクラス: CreateContactController.cls
		* LWC: createContactApex
5. 子レコード一括更新
	* オブジェクト: 取引先
	* 説明: Imperative Apexで紐づくケースを一括クローズ
	* Apexクラス: CloseAccountCases.cls
	* LWC: closeAccountCases
6. レコードのコピー（クローン）
	* オブジェクト: 汎用
	* 説明: Imperative Apexでレコードのコピー
	* Apexクラス: CloneSingleRecord.cls
	* LWC: cloneSingleRecord
	* アクション: サンプルとして商談に作成
7. 別ウィンドウ表示
	* オブジェクト: 取引先
	* 説明: 別ウィンドウで地図を表示
	* LWC: openMap

### 免責事項
本コードは Lightning Platform の技術検証をかねて個人として作成したものであり、動作の正確性、セキュリティ上の安全性などについて保証するものではありません。Lightning Platform における実装のサンプルコードとして個人として公開するものです。

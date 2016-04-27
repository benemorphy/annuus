var idb,event,dbobject,store;
if (!window.indexedDB) {  
    window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB;  
}  

idb = indexedDB.open('newtest',3);
//open方法返回的是一个对象idb （IDBOpenDBRequest），回调函数定义在这个对象上面。

    idb.onupgradeneeded = function (evt) {  //第一次打开该数据库，或者数据库版本发生变化
        var tasks, transaction;
       event=evt;
        dbobject = evt.target.result;
        //回调函数接受一个事件对象event作为参数，它的target.result属性就指向打开的IndexedDB数据库。
			alert ("evt.oldVersion:"+evt.oldVersion);

        if (evt.oldVersion <3) {
			if(!dbobject.objectStoreNames.contains("firstOS")) {
db.createObjectStore("firstOS");
}
          //  tasks = dbobject.createObjectStore('firstOS', {autoIncrement: true}); // 创建了一个名为firstOS的对象仓库

        store = evt.target.transaction.objectStore('firstOS');//创建一个数据库事务
		// indexedDB.open并不能简单的看成是打开数据库，而是在打开数据库的基础上启动了一个version_change事件方法回调。在这个回调方法里自动启动了一个事务，用于version_change。IDBDatabase对象必须要在这个事务中才能取得。
		// var store = transaction.objectStore("firstOS");
			var o = {p: 323};
			var request = store.add(o,1);
          //  transaction.createIndex('by_task', 'task');
         
        }	
    };

    idb.onsuccess = function (event) {
        if (dbobject === undefined) {
            dbobject = event.target.result;
			alert ("evt.oldVersion:"+event.oldVersion);
			tasks = dbobject.createObjectStore('firstOS', {autoIncrement: true}); // 创建了一个名为firstOS的对象仓库

        store = evt.target.transaction.objectStore('firstOS');//创建一个数据库事务
		// indexedDB.open并不能简单的看成是打开数据库，而是在打开数据库的基础上启动了一个version_change事件方法回调。在这个回调方法里自动启动了一个事务，用于version_change。IDBDatabase对象必须要在这个事务中才能取得。
		// var store = transaction.objectStore("firstOS");
			var o = {p: 223};
			var request = store.add(o);
        }
        // displaytasks(dbobject);
    };

idb.onerror = function(e) {
alert ("Error");
// console.dir(e);
};



	//	var t = db.transaction(["firstOS"],"readwrite");
	//	var store = t.objectStore("firstOS");
	//	t.oncomplete = function(event) {
	//		alert ("t.complete ");
	//		var store = t.objectStore("firstOS");
	//		var o = {p: 123};
	//		var request = store.add(o);
	//		request.onerror = function(e) {
	//		alert ("Error"+e.target.error.name);
// error handler
	//		};
	//	request.onsuccess = function(e) {
	//	alert("数据添加成功！");
	//	};
	
			// some code
	//	};
	//	t.onabort = function(event) {
	//		alert ("t.abort");
// some code
	// };
	//	t.onerror = function(event) {
	//	alert ("t.error ");
// some code
	//	};



// };



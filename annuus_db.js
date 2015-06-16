  var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
  var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
	IDBTransaction.READ_WRITE="readwrite";
	NewStoreName=Date.now().toString();//以时间名字为会议记录名
 var db;
        
            
 
            function initDb() {
                var request = indexedDB.open("AnnuusDB", 1);  
                request.onsuccess = function (evt) {
                    db = request.result;  
										
                };
 
                request.onerror = function (evt) {
                    console.log("IndexedDB error: " + evt.target.errorCode);
                };
 
                request.onupgradeneeded = function (evt) {                   
                    var objectStore = evt.currentTarget.result.createObjectStore(
                             NewStoreName, { keyPath: "id", autoIncrement: true });
 
                //  objectStore.createIndex("name", "name", { unique: false });
 
                   
                };
            };
 
          function contentLoaded() {
                initDb(); 
               
 
                
 };
 function annuusDB_add_msg (msg_name,msg) {
                  //  var name = document.getElementById("txtName").value;
                  //  var email = document.getElementById("txtEmail").value;
					var StoreName=db.objectStoreNames[0];
                    var transaction = db.transaction(StoreName, IDBTransaction.READ_WRITE);
                    var objectStore = transaction.objectStore(StoreName);                    
                   // var request = objectStore.add({ name: name, email: email });
				       request = objectStore.add({ name: msg_name, message: msg });

                    request.onsuccess = function (evt) {
                        // do something after the add succeeded
						console.log ("msg had add")
                    };
                };
            window.addEventListener("DOMContentLoaded", contentLoaded, false); 
                
 
                         
            
 
          

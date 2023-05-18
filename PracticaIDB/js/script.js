// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
var indexedDB = window.indexedDB;
var database = "usersDB";
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
var db;

function sendData(){

  var req = indexedDB.open(database, DB_VERSION);

  req.onsuccess = function (e) {
    db = this.result;
    console.log("openDb DONE");

    addUser(db);
  };

  req.onerror = function (e) {
    console.error("openDb:", e.target.errorCode);
  };

  // Create the schema
  req.onupgradeneeded = function() {
    console.log("openDb.onupgradeneeded");
    db = req.result;
    var store = db.createObjectStore(DB_STORE_NAME, { keyPath: "id", autoIncrement: true});

    store.createIndex('fname', 'fname', { unique: false });
    store.createIndex('lname', 'lname', { unique: false });
  };
}

function addUser(db) {
  var fname = document.getElementById("fname");
  var lname = document.getElementById("lname");
  var obj = { fname: fname.value, lname: lname.value };

  // Start a new transaction
  var tx = db.transaction(DB_STORE_NAME, "readwrite");  //readonly 
  var store = tx.objectStore(DB_STORE_NAME);

  try {
    req = store.add(obj);
  } catch (e) {
    console.log("Catch");
  }

  req.onsuccess = function (e) {
    console.log("Insertion in DB successful");    
  };

  req.onerror = function(e) {
    console.error("addPublication error", this.error);   
  };

  tx.oncomplete = function() {
    db.close();
  };
}

function limpiarInputs() {
  var fname = document.getElementById("fname");
  var lname = document.getElementById("lname");

  fname.value = "";
  lname.value = "";
}

document.getElementById("form").addEventListener("submit", addUser, false);

window.addEventListener("load", sendData);
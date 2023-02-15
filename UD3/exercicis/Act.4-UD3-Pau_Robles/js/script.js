// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "usersDB";
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
var db;

function sendData() {
  var req = indexedDB.open(database, DB_VERSION);

  req.onsuccess = function (e) {
    // Equal to: db = req.result;
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

    store.createIndex('id', 'id', { unique: false });
    store.createIndex('name', 'name', { unique: false });
    store.createIndex('password', 'password', { unique: false });
    store.createIndex('image', 'image', { unique: false });
  };

  function getObjectStore(DB_STORE_NAME,mode) {
    console.log(db + "," + DB_STORE_NAME + "," + mode);
    var trans = db.transaction(DB_STORE_NAME, mode);
  }
}

function addUser(db){
  var name = document.getElementById("name");
  var password = document.getElementById("password");
  var image = document.getElementById("image");
  
  var identificationhash = CryptoJS.MD5(password.value).toString();

  var blob = new Blob(['blob object'], {type: 'text/plain'});

  try {
    var store = db.transaction([DB_STORE_NAME], 'readwrite').objectStore(DB_STORE_NAME);

    // Store the object  
    var req = store.put(blob, 'blob');

    req.onerror = function(e) {
        console.log(e);
    };

    req.onsuccess = function(event) {
        console.log('Successfully stored a blob as Blob.');
    };

  } catch (e) {
    var reader = new FileReader();
    reader.onload = function(event) {

        // After exception, you have to start over from getting transaction.
        var store = db.transaction([DB_STORE_NAME, 'readwrite']).objectStore(DB_STORE_NAME);

        // Obtain DataURL string
        var data = event.target.result;
        var req = store.put(data, 'blob');

        req.onerror = function(e) {
            console.log(e);
        };

        req.onsuccess = function(event) {
            console.log('Successfully stored a blob as String.');
        };
    };

    // Convert Blob into DataURL string
    reader.readAsDataURL(blob);

  }

  var obj = { name: name.value, password: identificationhash, image: blob };

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
    console.error("addUser error", this.error);
  };
  
  tx.oncomplete = function() {
    db.close();
  };

}

function addUsersToHTML(users) {
  var ul = document.getElementById("users-ul");

  for (let i = 0; i < users.length; i++) {
    ul.innerHTML += "<li><span>"+users[i].id+" "+users[i].name+" "+users[i].password+" "+users[i].image+"</span><button id=edit_"+users[i].id+">Edit user</button><button id=delete_"+users[i].id+">Delete user</button></li>";
    document.getElementById("edit_"+ users[i].id).addEventListener("click", editUser, false);
    document.getElementById("delete_"+ users[i].id).addEventListener("click", deleteUser, false);
  }
} 


//THESE FUNCTIONS DON'T WORK

 function readOne() { 
    var id = document.getElementById("idread").value;
    var store = getObjectStore(DB_STORE_NAME, "readonly");
    var request = store.openCursor();  

    request.onsuccess = function(event) {
      var record = event.target.result;
      console.log("Id: " + record.id + " Name: " + record.name + "Password: " + record.password + "Image: " + record.image);
    };

    request.onerror = function (event) {
      console.log("Error reading data: " + id);
    }
  } 

  function deleteUser() {
    var id = document.getElementById("idremove").value;  
    var store = getObjectStore(DB_STORE_NAME, "readwrite");
    var request = store.delete(parseInt(id));

    request.onsuccess = function(event) {
      console.log("Data successfully removed: " + id);
    };

    request.onerror = function (event) {
      console.log("Error removing data: " + id);
    };
  } 

  function editUser() {
   var id = document.getElementById("idupdate").value;
   var user = document.getElementById("userdelete").value;
   var password = document.getElementById("passworddelete").value;
   var store = getObjectStore(DB_STORE_NAME, "readwrite");
   var request = store.put({"id": parseInt(id), "name": name, "password": identificiationhash});

   request.onsuccess = function(event) {
    console.log("Data successfully updated: " + link);
   };

   request.onerror = function(event) {
    console.log("Error updating data: " + link);
   };
  }

  

function encode() {
  var selectedfile = document.getElementById("image").files;
    if (selectedfile.length > 0) {
      var imageFile = selectedfile[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result;
      var newImage = document.createElement('img');
      newImage.src = srcData;
      document.getElementById("dummy").innerHTML = newImage.outerHTML;
      document.getElementById("txt").value = document.getElementById("dummy").innerHTML;
    }
      fileReader.readAsDataURL(imageFile);
  }
}

document.getElementById("form").addEventListener("submit", sendData, false);
document.getElementById("image").addEventListener("change", encode, false);
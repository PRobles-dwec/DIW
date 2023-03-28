const store = Pinia.defineStore('counter', {
    state: () => ({ 
      users: [], // Array with the users.
      user_logged: null,  // The user logged by default will be null.

    }),    
    getters: {
        getUser: function (state) { // // Method to get an specific user.
            return function(userId) {
                return state.users.filter(u => u.id === userId );
            }            
        },
        getUsers: function (state) { // Method to get all the users.
            return state.users;
        },        
    },
    actions: {
      init() { // Method to innitiate the Pinia DB.
        console.log("Starting Pinia DB.");
  
        try {
            this.users = JSON.parse(localStorage.getItem("users"));
        } catch (e) {
            this.users = [];
        }
        console.log(this.users);
        if(this.users == null) {
            this.users = [];
        }
        try {
            this.user_logged = JSON.parse(localStorage.getItem("user_logged"));
        } catch (ex) {
            this.user_logged = null;
        }
        console.log(this.user_logged);      
      },
      registerUser() { // Method to register an user to the Pinia DB.
        console.log("Registering an user.");
        
        if(this.users == null) {
          this.users = [];
        } else {
          try {
            this.users = JSON.parse(localStorage.getItem("users"));
            if(this.users.find((user) => user.email === this.email)){
              console.log("The email exists. Try again");
            }
            if(this.users.find((user) => user.nickname === this.nickname)){ 
              console.log("The nickname exists. Try again.");
            }
            let user = {
              "email": this.email,
              "nickname": this.nickname,
              "password": this.password,                    
            };  
            console.log(user);    
            console.log(this.users); 
            this.users.push(user);
  
            this.users(localStorage.setItem("users", JSON.stringify(this.users)));
            this.user_logged(localStorage.setItem("user_logged", user.nickname));   
  
          }catch (e) {
            this.users = [];
          }
        }     
      },
      loginUser() { // Method to login to the Pinia DB.
        console.log("Login with an user.");
  
       if(this.users == null) {
          this.users = [];
        } else {
          this.users = JSON.parse(localStorage.getItem("users"));
          var user = this.users.find((user) => user.email === this.email); 
          
          if(this.password === user.password) {
            this.user_logged(localStorage.setItem("user_logged", user.nickname)); 
          }
        }
      }
    },
  });
  
  export default store
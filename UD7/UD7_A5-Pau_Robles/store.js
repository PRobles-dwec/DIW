const store = Pinia.defineStore('counter', {
    state: () => ({ 
      users: [], // Array with the users.
      user_logged: null  // The id by default will be null.
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
      init() {
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
      addItem: function(item) {
        this.users.push(item);
      },
    },
  });
  
  export default store
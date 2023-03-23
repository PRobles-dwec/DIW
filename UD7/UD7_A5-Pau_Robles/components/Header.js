export default {
    name: "ComponentHeader",
    props: ["nickname", "buttonlogout", "buttonlogin", "buttonregister"], // We will pick up the nickname from the index.
    emits: ["updatebuttonlogin", "updateregister", "updatebuttonlogout", "updateuserlogged"],
    methods: {
        gotoLogin: function() { // Method to login.
           
            this.$emit("updatebuttonlogout", false);                                                                                  
            this.$emit("updateregister", true); 
            this.$emit("updatebuttonlogin", false); 
            this.$router.push("/login");     
        },
        gotoRegister: function() { // Method to register.
            this.$emit("updateregister", false); 
            console.log("goToRegister");
            this.$emit("updatebuttonlogout", false);                                                                                
            
            this.$emit("updatebuttonlogin", true);   
            this.$router.push("/register");  
        },
        doLogout: function() { // Method to logout.
            localStorage.removeItem("user_logged");
            this.$emit("updateuserlogged", null);
            this.$emit("updatebuttonlogout", false);                                                                                  
            this.$emit("updateregister", false); 
            this.$emit("updatebuttonlogin", true);   
            console.log("doLogout");
            this.$router.push("/login"); 
        },     
    },
    template: 
    `   <div> 
            <header>
                <h1> Greenlife </h1>
                <h2 v-show="nickname !== null"> Hello {{ nickname }} </h2> 
                <button v-show="buttonlogin" @click="gotoLogin()"> Login </button>
                <button v-show="buttonregister" @click="gotoRegister()"> Register </button>                
                <button v-show="buttonlogout" @click="doLogout()"> Logout </button>
            </header>
        </div>
    `
}
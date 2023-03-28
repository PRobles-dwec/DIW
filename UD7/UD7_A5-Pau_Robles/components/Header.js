export default {
    name: "ComponentHeader",
    props: ["nickname", "buttonlogout", "buttonlogin", "buttonregister"], // We will pick up the nickname from the index.
    emits: ["updatebuttonlogout", "updateregister", "updatebuttonlogin", "updateuserlogged"],
    methods: {
        gotoLogin: function() {
            this.$router.push("/login");
             
            this.$emit("updatebuttonlogout", false);                                                                                  
            this.$emit("updateregister", true); 
            this.$emit("updatebuttonlogin", false);       
        },
        gotoRegister: function() {            
            this.$emit("updateregister", false); 
            this.$emit("updatebuttonlogin", true);             
            this.$emit("updatebuttonlogout", false);     
            this.$router.push("/register");                
        },
        doLogout: function() {
            localStorage.removeItem("user_logged");                
            this.$emit("updateuserlogged", null);
            this.$emit("updatebuttonlogout", false);                                                                                  
            this.$emit("updateregister", true); 
            this.$emit("updatebuttonlogin", false);  
            console.log("Logged out"); 
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
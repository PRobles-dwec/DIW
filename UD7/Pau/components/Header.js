export default {
    name: "ComponentHeader",
    props: ["nickname"],
    data() {
        return {
            logout: false,
            login: false,
            register: true,
            products: true,
            //HelloUser: false,
            //nickname: "",
        }
    },
    methods: {
        gotoLogin: function() {
            this.$router.push("/login");
            this.login = false;
            this.register = true;
            this.products = false;
            
        },
        gotoRegister: function() {
            this.$router.push("/register");
            this.register = false;
            this.login = true;
            this.products = false;
        },

        gotoProducts: function() {
            this.$router.push("/products");       
            this.login = false;
            this.register = false;     
            this.logout = true;
            this.products = false;
        }
    },
    template: `
        <div> 
            <header>
                <h1> GreenLife </h1>
                <h1 v-show="nickname"> Hello {{ nickname }} </h1> 
                <button v-show="login" @click ="gotoLogin()"> Login </button>
                <button v-show="register" @click ="gotoRegister()"> Register </button>                
                <button v-show="logout"> Logout </button>
            </header>
        </div>        
    `
}
export default {
    name: "ViewRegister",
    data() {
        return {
            email: "",
            nickname: "",
            password: "",
            repeatPassword: "",
            errorEmail: false,
            errorNotEmail: false,
            errorEmailExists: false,
            errorNickname: false,
            errorPassword: false,
            errorRepeatPassword: false,    
            users: [],        
        }        
    },
    methods: {         
        registerUser: function(e){              
            if(this.email == "") {                
                this.errorEmail = true;               
            } else {
                if(JSON.parse(localStorage.getItem(this.email)) != null){
                    this.errorEmailExists = true;                    
                }
                else {
                    this.errorEmailExists = false;
                }
            }
           
            if(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(this.email)){
                this.errorNotEmail = false;
            }  

            if(this.nickname == ""){                
                this.errorNickname = true;                
            }else {
                if(JSON.parse(localStorage.getItem(this.nickname)) != null) {
                    this.errorNicknameExists = true;
                }
            }

            if(this.password == ""){
                this.errorPassword = true;
            }
  
            if(this.repeatPassword == "") {
                this.errorPassword = true;
                this.errorRepeatPassword = false;
            }
            if(this.password !== this.repeatPassword) {
                this.errorRepeatPassword = true;
            } else {  
                this.errorRepeatPassword = false;                  
                let user = {
                    "email": this.email,
                    "nickname": this.nickname,
                    "password": this.password                    
                } 

                //Donat que this.users és un array buit, cada vegada que es registra un usuari, 
                // elimines tots els que hi hagi abans registrats...
                //Primer has de llegir del localstorage i després afegir-ho a la llista
                this.users.push(user);

                localStorage.setItem("users", JSON.stringify(this.users));
                localStorage.setItem("user_logged", JSON.stringify(user));      
                
                //Falta crear emits aquí també
                
                this.email = "";
                this.nickname = "";
                this.password = "";
                this.repeatPassword = "";

                this.$router.push("/fruits"); 
            }   
            e.preventDefault();                     
        },
    },
    template: `
        <form>
            <h1> REGISTER </h1> 
            <input type="email" placeholder="Email" v-model="email"> 

            <p v-show="errorEmail">The email is empty</p>
            <p v-show="errorNotEmail">This is not an e-mail</p>
            <p v-show="errorEmailExists">This e-mail exists</p>

            <input type="text" placeholder="Nickname" v-model="nickname">
            <p v-show="errorNickname">The nickname is empty</p>

            <input type="password" placeholder="Password" v-model="password" autocomplete>
            <p v-show="errorPassword">The password is empty</p>

            <input type="password" placeholder="Repeat password" v-model="repeatPassword" autocomplete>            
            <p v-show="errorPassword">The password is empty</p>
            <p v-show="errorRepeatPassword">The password is different. Try again.</p> <br>
            
            <button @click="registerUser"> Register </button>
        </form>  
    `
}
export default {
    name: "ViewRegister",
    data() {
        return {          
            errorEmail: false,
            errorNotEmail: false,
            errorEmailExists: false,
            errorNickname: false,
            errorPassword: false,
            errorRepeatPassword: false,    
            email: "",
            nickname: "",
            password: "",
            repeatPassword: "",
            users: [],        
        }        
    },
    methods: {         
        registerUser: function(){   
            this.errorEmail = false;
            this.errorEmailExists = false;
            this.errorNickname = false;
            this.errorNicknameExists = false;
            this.errorNotEmail = false;
            this.errorPassword = false;
            this.errorRepeatPassword = false;
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if(this.email === "" || !(this.email.match(regex))) {                
                this.errorEmail = true;    
                this.errorNotEmail = true;           
            } 
             else {  
                if(JSON.parse(localStorage.getItem(this.email)) != null){
                    this.errorEmailExists = true;                    
                }
                else {
                    this.errorEmailExists = false;
                }
            }
                 
            if(this.nickname === ""){                
                this.errorNickname = true;                
            }else {
                if(JSON.parse(localStorage.getItem(this.nickname)) != null) {
                    this.errorNicknameExists = true;
                }
            }

            if(this.password === ""){
                this.errorPassword = true;
            }

            if(this.repeatPassword === "") {
                this.errorPassword = true;
            }
            if(this.password !== this.repeatPassword) {
                this.errorRepeatPassword = true;
            } 
            if(!this.errorEmail && !this.errorNickname && !this.errorPassword && !this.errorRepeatPassword){  
                this.errorRepeatPassword = false;                  
                let user = {
                    "email": this.email,
                    "nickname": this.nickname,
                    "password": this.password                    
                } 
                this.users.push(user);

                localStorage.setItem("users", JSON.stringify(this.users));
                localStorage.setItem("user_logged", JSON.stringify(user));                            
                this.email = "";
                this.nickname = "";
                this.password = "";
                this.repeatPassword = "";

                this.$router.push("/fruits"); 
            }             
        },
    },
    template: 
    `
        <div> 
            <form>
                <h1> REGISTER </h1> 
                <input type="email" placeholder="Email" v-model="email"> 

                <p class="error" v-show="errorEmail">The email is empty</p>
                <p class="error" v-show="errorNotEmail">This is not an e-mail</p>
                <p class="error" v-show="errorEmailExists">This e-mail exists</p>

                <input type="text" placeholder="Nickname" v-model="nickname">
                <p class="error" v-show="errorNickname">The nickname is empty</p>

                <input type="password" placeholder="Password" v-model="password" autocomplete>
                <p class="error" v-show="errorPassword">The password is empty</p>

                <input type="password" placeholder="Repeat password" v-model="repeatPassword" autocomplete>            
                <p class="error" v-show="errorPassword">The password is empty</p>
                <p class="error" v-show="errorRepeatPassword">The password is different. Try again.</p>
                
                <button @click="registerUser"> Register </button>
            </form> 
        </div>         
    `
}
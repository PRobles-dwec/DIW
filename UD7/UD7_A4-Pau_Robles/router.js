import ViewLogin from "./views/Login.js";
import ViewRegister from "./views/Register.js";
import ViewFruits from "./views/Fruits.js";

let router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [                
        { path: "/login", component: ViewLogin },
        { path: "/register", component: ViewRegister },
        { path: "/fruits", component: ViewFruits }
    ]
});

export default router
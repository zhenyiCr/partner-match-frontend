import team from "../pages/Team.vue";
import index from "../pages/Index.vue";
import user from "../pages/User.vue";
import {createMemoryHistory, createRouter} from "vue-router";

const routes = [
    { path: '/', component: index },
    { path: '/team', component: team },
    { path: '/user', component: user },
]
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
export default router

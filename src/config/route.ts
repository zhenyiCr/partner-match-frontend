import team from "../pages/Team.vue";
import index from "../pages/Index.vue";
import user from "../pages/User.vue";
import Search from "../pages/Search.vue";
import EditUser from "../pages/EditUser.vue";
import SearchResult from "../pages/SearchResult.vue";
import UserLogin from "../pages/UserLogin.vue";

const routes = [
    {path: '/', component: index},
    {path: '/team', component: team},
    {path: '/user', component: user},
    {path: '/search', component: Search},
    {path: '/user/editUser', component: EditUser},
    {path: '/login', component: UserLogin},
    {path: '/searchResult', component: SearchResult},
]

export default routes

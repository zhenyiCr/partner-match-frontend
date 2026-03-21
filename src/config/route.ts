import team from "../pages/Team.vue";
import index from "../pages/Index.vue";
import user from "../pages/User.vue";
import Search from "../pages/Search.vue";
import EditUser from "../pages/EditUser.vue";
import SearchResult from "../pages/SearchResult.vue";
import UserLogin from "../pages/UserLogin.vue";
import AddTeam from "../pages/AddTeam.vue";
import UpdateTeam from "../pages/UpdateTeam.vue";
import UpdateUser from "../pages/UpdateUser.vue";
import UserTeamJoin from "../pages/UserTeamJoin.vue";
import UserTeamCreate from "../pages/UserTeamCreate.vue";


const routes = [
    {path: '/', component: index},
    {path: '/team', component: team},
    {path: '/user', component: user},
    {path: '/user/update', component: UpdateUser},
    {path: '/user/team/join', component: UserTeamJoin},
    {path: '/user/team/create', component: UserTeamCreate},
    {path: '/search', component: Search},
    {path: '/user/editUser', component: EditUser},
    {path: '/login', component: UserLogin},
    {path: '/searchResult', component: SearchResult},
    {path: '/team/add', component: AddTeam},
    {path: '/team/update', component: UpdateTeam},
]

export default routes

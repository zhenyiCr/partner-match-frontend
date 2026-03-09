import myAnxios from "../plugins/myAnxios.ts";
import { setCurrentUserState} from "../states/user.ts";


export const getCurrentUser = async () => {
    // const user = getCurrentUserState();
    // if (user) {
    //     return user;
    // }
    const res = await myAnxios.get('/user/current')
    if ((res as any).code === 0) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;

}






import { getAllRepo } from '../store/reposSlice'
import {fetchUsersLogin, fetchReadyUsers} from '../store/usersSlice';
import {bindActionCreators} from "redux";
import {useAppDispatch} from "./useRedux";

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators({fetchUsersLogin, fetchReadyUsers, getAllRepo}, dispatch)
}

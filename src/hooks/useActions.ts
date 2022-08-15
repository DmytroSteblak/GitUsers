import {fetchUsers, fetchReadyUsers, getAllRepo} from '../store/UserSlice';
import {bindActionCreators} from "redux";
import {useAppDispatch} from "./useRedux";

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators({fetchUsers, fetchReadyUsers, getAllRepo}, dispatch)
}

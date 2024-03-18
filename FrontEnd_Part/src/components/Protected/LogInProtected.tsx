// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';
import { Navigate } from 'react-router-dom';
import { gettingTokenInCookieAndLocalHost } from '../../App';



function LogInProtected({ children }: { children: React.ReactNode }) {

    // const userDataStore = useSelector((store: RootState) => store.userReducer)


    // if (userData.name === "" && userData.id === "") {

    // if (userDataStore.isError) {
    //     return <Navigate to="/login" replace={true} ></Navigate>;
    // }

    // console.log(gettingTokenInCookieAndLocalHost())


    if(!gettingTokenInCookieAndLocalHost()){
        return <Navigate to="/login" replace={true} ></Navigate>;
    }


    // return <>{children}</>;
    return children;
}

export default LogInProtected;
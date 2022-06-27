import React, { createContext, useEffect } from 'react';
import loadable from '@loadable/component'
import OAuthRedirectHandler from '@components/KakaoLogin/OAuthRedirectHandler';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createBrowserHistory } from 'history';
import useSWR from 'swr';
import fetcher from '@utils/userfetcher';
import Nav from '@components/Nav';
import userfetcher from '@utils/userfetcher';

const LogIn = loadable(() => import('@pages/Login'))
const SignUp = loadable(() => import('@pages/SignUp'))
const Home = loadable(() => import('@pages/Home'))
const Detail = loadable(() => import('@pages/Detail'))
const MyList = loadable(() => import('@pages/MyList'))
const Search = loadable(() => import('@pages/Search'))

export const UserContext = createContext({
    userData: { 
        uId: "",
        user: {
            uNo: ""
        }
    },
    error: null,
    mutateUsers: (key?: any) => {}
})

const User = () => {
    const { data: userData, error, mutate: mutateUsers } = useSWR(`${process.env.REACT_APP_SERVICE_PORT}/user/info`, userfetcher, {
        revalidateOnMount:true,
        revalidateOnFocus: true,
    });
    
    const value = React.useMemo(() => ({ userData, error,mutateUsers }), [
        userData,
        error,
        mutateUsers,
      ]);
    

    return (
        <>
            <UserContext.Provider value={value}>
                <Nav></Nav>
            </UserContext.Provider>
            <Routes >
                <Route path="/" element={<Navigate replace to="/login" />} ></Route>
                <Route path="/login" element={
                    <UserContext.Provider value={value}>
                        <LogIn />
                    </UserContext.Provider>
                } ></Route>
                <Route path="/signup" element={<SignUp />} ></Route>
                <Route path="/my-list" element={   
                    <UserContext.Provider value={value}>
                        <MyList />
                    </UserContext.Provider>
                    } >
                        <Route path="/my-list/:id" element = {<Detail />}/>
                    </Route>
                <Route path="/search/:word" element = {<Search />}/>
                <Route path="/home" element={<Home /> } >
                    <Route path="/home/:id" element = {<Detail />}/>
                </Route>
                <Route path="/user/kakao" element = {<OAuthRedirectHandler />}/>             
            </Routes>
        </>
    )}

export default User; 
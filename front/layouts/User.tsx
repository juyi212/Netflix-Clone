import React, { createContext, useEffect } from 'react';
import loadable from '@loadable/component';
import OAuthRedirectHandler from '@components/kakao-login/OAuthRedirectHandler';
import { Route, Routes, Navigate } from 'react-router-dom';
import useSWR from 'swr';
import Nav from '@components/nav';
import userfetcher from '@utils/userfetcher';

const LogIn = loadable(() => import('@pages/login'));
const SignUp = loadable(() => import('@pages/signup'));
const Home = loadable(() => import('@pages/home'));
const Detail = loadable(() => import('@pages/detail'));
const MyList = loadable(() => import('@pages/mylist'));
const Search = loadable(() => import('@pages/search'));
const CategoryDepartment = loadable(() => import('@pages/category-department'));
const CategoryList = loadable(() => import('@pages/category-list'));

export const UserContext = createContext({
  userData: {
    uId: '',
    user: {
      uNo: '',
    },
  },
  error: null,
  mutateUsers: (key?: any) => {},
});

const User = () => {
  const {
    data: userData,
    error,
    mutate: mutateUsers,
  } = useSWR(`${process.env.REACT_APP_SERVICE_PORT}/user/info`, userfetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: true,
  });

  const value = React.useMemo(() => ({ userData, error, mutateUsers }), [userData, error, mutateUsers]);

  return (
    <>
      <UserContext.Provider value={value}>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/my-list" element={<MyList />}>
            <Route path="/my-list/:id" element={<Detail />} />
          </Route>
          <Route path="/search" element={<Search />}>
            <Route path="/search/:id" element={<Detail />} />
          </Route>
          <Route path="/home" element={<Home />}>
            <Route path="/home/:id" element={<Detail />} />
          </Route>
          <Route path="/user/kakao" element={<OAuthRedirectHandler />} />
          <Route path="/movie" element={<CategoryDepartment />}>
            <Route path="/movie/:id" element={<Detail />} />
          </Route>

          <Route path="/movie/genre/:genreId" element={<CategoryList />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default User;

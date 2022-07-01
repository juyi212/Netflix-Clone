import category from '@utils/category';
import React, { useCallback, useContext, useEffect } from 'react';
import { Category, Container } from './styles';


const categoryList = [
    {id: "12", name: "모험"},
    {id: "14", name: "판타지"},
    {id: "16", name: "애니메이션"},
    {id: "18", name: "드라마"},
    {id: "27", name: "공포"},
    {id: "35", name: "역사"},
    {id: "37", name: "서부"},
    {id: "53", name: "스릴러"},
    {id: "80", name: "범죄"},
    {id: "99", name: "다큐멘터리"},
    {id: "878", name: "SF"},
    {id: "9648", name: "미스터리"},
    {id: "10402", name: "음악"},
    {id: "10749", name: "로맨스"},
    {id: "10751", name: "가족"},
    {id: "0752", name: "전쟁"},
    {id: "10770", name: "TV 영화"},
]


const CategoryList = React.memo(() => {

    return (
        <Container>
            <h1> 장르 </h1>
            <div style={{ color: 'white'}}>
                {categoryList.map((category: any) => {
                    return (
                        <Category>{category.name}</Category>
                    )
                })}
            </div>          
            <div>
                <span>국가 리스트들 나열</span>
            </div>
            <div>
                기본 데이터들 보여주기 
            </div>
        </Container>
    )})

export default CategoryList;
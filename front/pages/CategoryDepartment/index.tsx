import category from '@utils/category';
import React, { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category, Container, StyledCategory } from './styles';


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

const settings = {
    slide: 'div',
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 5,
    initialSlide: 0,
}

const CategoryDepartment = React.memo(() => {
    const navigate = useNavigate()
    const onClickCategory = (categoryNum: string, categoryName: string) => {
        navigate(`genre/${categoryNum}`) 
        // navigate(
        //     {
        //         pathname: '/movie',
        //         search: `?genre=${categoryNum}`,

        //     },
        //     { state: categoryName }
        //     ) 
    }

    return (
        <Container>
            <h1> 장르 </h1>
            <StyledCategory {...settings}>
                {categoryList.map((category: any) => {
                    return (
                        <Category onClick={(e) => {onClickCategory(category.id, category.name)}}>{category.name}</Category>
                    )
                })}
            </StyledCategory>          

            <div>
                찜한 데이터 보여주기 
            </div>
            <div>
                인기 순위 프로그램 
            </div>
        </Container>
    )})

export default CategoryDepartment;
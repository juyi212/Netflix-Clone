import Carousel from '@components/carousel';
import Detail from '@pages/detail';
import category from '@utils/category';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Category, Container, StyledCategory } from './styles';

const categoryList = [
  { id: '12', name: '모험' },
  { id: '14', name: '판타지' },
  { id: '16', name: '애니메이션' },
  { id: '18', name: '드라마' },
  { id: '27', name: '공포' },
  { id: '35', name: '역사' },
  { id: '37', name: '서부' },
  { id: '53', name: '스릴러' },
  { id: '80', name: '범죄' },
  { id: '99', name: '다큐멘터리' },
  { id: '878', name: 'SF' },
  { id: '9648', name: '미스터리' },
  { id: '10402', name: '음악' },
  { id: '10749', name: '로맨스' },
  { id: '10751', name: '가족' },
  { id: '0752', name: '전쟁' },
  { id: '10770', name: 'TV 영화' },
];

const settings = {
  slide: 'div',
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 5,
  initialSlide: 0,
};

const CategoryDepartment = React.memo(() => {
  const navigate = useNavigate();
  const genre = useLocation();
  const [pageNum, setPageNum] = useState(1);

  const onClickCategory = (categoryNum: string, categoryName: string) => {
    navigate(`genre/${categoryNum}`);
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && pageNum < 3) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      setPageNum(pageNum + 1);
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener('scroll', handleScroll);
    if (pageNum > 2) {
      // scroll event listener 해제
      window.removeEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageNum]);

  return (
    <Container>
      <h1> 장르 </h1>
      <Outlet />
      <StyledCategory {...settings}>
        {categoryList.map((category: any) => {
          return (
            <Category
              onClick={(e) => {
                onClickCategory(category.id, category.name);
              }}
            >
              {category.name}
            </Category>
          );
        })}
      </StyledCategory>
      <div>
        {pageNum > 0 && (
          <>
            <Carousel from={'/movie'} header={'인기 순위'} category={'popular_movie'} genre_id={''} />
            <Carousel from={'/movie'} header={'SF 모여라'} category={'category_movie'} genre_id={'878'} />
          </>
        )}
        {pageNum > 1 && (
          <>
            <Carousel from={'/movie'} header={'달달한 로맨스'} category={'category_movie'} genre_id={'10749'} />
            <Carousel from={'/movie'} header={'힐링의 음악 컨텐츠'} category={'category_movie'} genre_id={'18'} />
          </>
        )}
        {/* {pageNum > 2 && 
            <>
                
            
            </>} */}
      </div>
    </Container>
  );
});

export default CategoryDepartment;

import React, { PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { Box, Container, Image, NoData } from './styles';
import { Link, Outlet } from 'react-router-dom';

interface ContentProps {
  from?: string;
  movieData: Array<string>;
}

const MovieList = React.memo(({ from, movieData }: PropsWithChildren<ContentProps>) => {
  const [goToPage, setGoToPage] = useState('');

  useEffect(() => {
    if (from) {
      setGoToPage(from);
    }
    console.log(goToPage);
  }, [from]);

  return (
    <Container style={{ color: 'white', textAlign: 'center' }}>
      {movieData?.length !== 0 ? (
        <>
          {movieData?.forEach((data: any) => {
            return (
              <Box>
                <Link to={{ pathname: `${goToPage}`, search: `movieId=${data.id}` }}>
                  <Image src={data.posterPath} />
                </Link>
              </Box>
            );
          })}
        </>
      ) : (
        <>
          <NoData>
            <div>찜한 목록이 없습니다.</div>
          </NoData>
        </>
      )}
    </Container>
  );
});

export default MovieList;

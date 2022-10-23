import React, { useEffect, useState, useCallback, useContext } from 'react';
import Slider from '@components/slider';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { UserContext } from '@layouts/User';

const Banner = () => {
  const context = useContext(UserContext);
  const userNo = context?.userData.user.uNo;
  const { data: bannerData } = useSWR(
    `${process.env.REACT_APP_SERVICE_PORT}/movie/popular_movie?userNo=${userNo}`,
    fetcher,
  );

  const [translateValue, setTranslateValue] = useState<number>(0);

  const moveRight = useCallback(() => {
    setTranslateValue((prev) => {
      if (translateValue !== 100 * (bannerData?.length - 1)) {
        return prev + 100;
      } else return 0;
    });
  }, [translateValue]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      moveRight();
    }, 4000);
    return () => {
      clearInterval(imageInterval);
    };
  }, [translateValue]);

  return (
    <div style={{ marginBottom: '30px' }}>
      <Slider translateValue={translateValue} bannerData={bannerData} />
    </div>
  );
};

export default Banner;

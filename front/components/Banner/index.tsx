import React, { SetStateAction, useEffect, useState } from 'react';
import { Item, MainSwiper, SwiperInner } from './styles';

const items = ['/images/banner1.jpg', '/images/banner2.jpg', '/images/banner3.jpg',]

const Banner = () => {
    // const swiperRef = useRef<HTMLInputElement>(null);
    const swiperRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const [swiperCurrentPosition, setSwiperCurrentPosition] = useState(0)
    const [loop, setLoop] = useState()

    // useEffect(() => {
    //     swiperRef.current.style.width = items?
    //     `${items.length}00vw`: '0';
    // }, [items])

    // useEffect(() => {
    //     const swiperLoop: ReturnType<typeof setTimeout> = setTimeout(() => {
    //         setSwiperCurrentPosition(prev => {
    //             if(prev < items.length -1) {
    //                 return prev + 1;
    //             } else return 0;
    //         });
    //     }, 3000);
    //     setLoop(swiperLoop)
    //     return clearTimeout(loop)
    // }, [
    //     swiperCurrentPosition
    // ])

    return (
        <div>
            <MainSwiper>
                <SwiperInner>
                    <Item>
                        
                    </Item>
                </SwiperInner>
            </MainSwiper>
        </div>
    )}

export default Banner;

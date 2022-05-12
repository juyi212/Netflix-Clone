import React from 'react';

interface Props {
    translateValue: number;
    images: { pic: string; id: number }[];
    moveRight: () => void;
    moveLeft: () => void;
}

const Slider: React.FC<Props> = ({
    translateValue, 
    images, 
    moveRight, 
    moveLeft
}) => {
    return (
        <div>
            ㅎㅎ
        </div>
    )}

export default Slider;
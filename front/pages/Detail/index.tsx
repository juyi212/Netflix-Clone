import React, { PropsWithChildren } from 'react';
import { DetailContainer } from './styles';

// interface ContentProps {
//     show: boolean;
//     onCloseDetail: () => void;
//   }

// ({show, onCloseDetail}: PropsWithChildren<ContentProps>
const Detail = () => {
    // if (!show) {
    //     return null;
    // }

    return (
        <DetailContainer>
            <div >안녕</div>
            {/* <div onClick={onCloseDetail}>안녕</div> */}
        </DetailContainer>
    )
}

export default Detail;
import React, { PropsWithChildren } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { DetailContainer } from './styles';

// interface ContentProps {
//     show: boolean;
//     onCloseDetail: () => void;
//   }

// ({show, onCloseDetail}: PropsWithChildren<ContentProps>
const Detail = () => {
    const navigate = useNavigate()
    // if (!show) {
    //     return null;
    // }
    const onClickDismiss = () => {
        navigate(-1)
    }

    return (
        <DetailContainer>
            <div onClick ={onClickDismiss}>안녕</div>
        </DetailContainer>
    )
}

export default Detail;
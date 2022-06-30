import React, { useCallback, useContext, useEffect } from 'react';




const CategoryList = React.memo(() => {

    
    return (
        <div style={{ marginTop : "150px"}}>
            <div>
                <span>카테고리 리스트들 나열</span>
            </div>
            <div>
                <span>국가 리스트들 나열</span>
            </div>
            <div>
                기본 데이터들 보여주기 
            </div>
        </div>
    )})

export default CategoryList;
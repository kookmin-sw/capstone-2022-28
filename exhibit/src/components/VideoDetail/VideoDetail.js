import React, { useState } from "react";
import './VideoDetail.css';

function VideoDetailBox() {

    let nft_src = `https://cdn.pixabay.com/photo/2013/03/02/02/41/alley-89197_1280.jpg`;
    const nftId = "1";
    let overView = "바쁘다 바빠 현대사회!! 속 바쁘디 바쁜 자신을 찾아 몸부림 치는 현대인들의 애환을 담아낸 전시회. 바쁘다 바빠 현대사회!! 속 바쁘디 바쁜 자신을 찾아 몸부림 치는 현대인들의 애환을 담아낸 전시회.바쁘다 바빠 현대사회!! 속 바쁘디 바쁜 자신을 찾아 몸부림 치는 현대인들의 애환을 담아낸 전시회."
    const nftTitle = "도심 속에서 나를 찾다.";
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [value, setValue] = useState(0);

    return (<div><div className="detailPage__background">
         <div className="detailPage__overlay"></div>
         
         <img
            src={nft_src}
          />
         </div>
         <div className="detailPage__info">
             <div className="detailPage__container">
                 <h1 className="detailPage__title">{nftTitle}</h1>
                 
             </div>
             <div className="detailPage__description">
              <p>민대인     17분</p>
              <p>{overView}</p>
            </div>
         </div>
    </div>);
}

export default VideoDetailBox;
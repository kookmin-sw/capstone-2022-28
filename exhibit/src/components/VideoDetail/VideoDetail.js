import React, { useState, useCallback } from "react";
import './VideoDetail.css';
import { Button} from "react-bootstrap";
import VideoArt from "../../routes/VideoPage";
import { Components } from "antd/lib/date-picker/generatePicker";
import { useCast } from 'react-chromecast';
import { useMedia } from 'react-chromecast';
import VideoImageThumbnail from 'react-video-thumbnail-image';


const mediaSrc = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"

function VideoDetailBox() {

    let nft_src = `https://raw.githubusercontent.com/juanpablocs/react-vplayer/master/demo/video/1080p.mp4`;
    const nftId = "1";
    let overView = "바쁘다 바빠 현대사회!! 속 바쁘디 바쁜 자신을 찾아 몸부림 치는 현대인들의 애환을 담아낸 전시회. 바쁘다 바빠 현대사회!! 속 바쁘디 바쁜 자신을 찾아 몸부림 치는 현대인들의 애환을 담아낸 전시회.바쁘다 바빠 현대사회!! 속 바쁘디 바쁜 자신을 찾아 몸부림 치는 현대인들의 애환을 담아낸 전시회."
    const nftTitle = "도심 속에서 나를 찾다.";
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [value, setValue] = useState(0);
    const [web, setWeb] = useState(0);
    const [chromeCT, setChromeCT] = useState(0);
    const media = useMedia()
    const playVideo = useCallback(async () => {
      if (media) {
        await media.playMedia(mediaSrc);
      }
    }, [media]);

    return (<div><div className="detailPage__background">
         <div className="detailPage__overlay"></div>
         <VideoImageThumbnail
          videoUrl={nft_src}
          thumbnailHandler={(thumbnail) => console.log(thumbnail)}

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
            {/* <div className="detaiPage__buttons">
              <Button
                className="detailPage__chromecastBtn" onClick={playVideo}
              >
                크롬캐스트로 보기
              </Button>
              <Button
                className="detailPage__webBtn" onClick={() =>{
                    alert("webBtn clicked");
                }}
              >
                웹으로 보기
              </Button> */}
            </div>
         </div>);
}

export default VideoDetailBox;
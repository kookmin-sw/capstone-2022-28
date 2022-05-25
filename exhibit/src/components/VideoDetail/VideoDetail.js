import React, { useState, useCallback } from "react";
import './VideoDetail.css';
import { Button} from "react-bootstrap";
import VideoArt, { vidurl } from "../../routes/VideoPage";
import { Components } from "antd/lib/date-picker/generatePicker";
import { useCast } from 'react-chromecast';
import { useMedia } from 'react-chromecast';
import VideoImageThumbnail from 'react-video-thumbnail-image';
import { title } from "../../routes/VideoPage";
import { descript } from "../../routes/VideoPage";
import { creater } from "../../routes/VideoPage";


const mediaSrc = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"

function VideoDetailBox() {
    let nft_src = vidurl;
    const nftId = "1";
    let overView = descript
    const nftTitle = title;
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
          width='1500px'
          height='1200px'

         />
         </div>
         <div className="detailPage__info">
             <div className="detailPage__container">
                 <h1 className="detailPage__title">{nftTitle}</h1>
                 
             </div>
             <div className="detailPage__description">
              <p>{creater}</p>
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
import React, { useCallback } from "react";
import "./VideoDetail.css";
import { vidurl } from "../../routes/VideoPage";
import { useMedia } from "react-chromecast";
import VideoImageThumbnail from "react-video-thumbnail-image";
import { title } from "../../routes/VideoPage";
import { descript } from "../../routes/VideoPage";
import { creater } from "../../routes/VideoPage";

const mediaSrc =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

function VideoDetailBox() {
  let nft_src = vidurl;
  let overView = descript;
  const nftTitle = title;
  const media = useMedia();
  const playVideo = useCallback(async () => {
    if (media) {
      await media.playMedia(mediaSrc);
    }
  }, [media]);

  return (
    <div>
      <div className="detailPage__background">
        <div className="detailPage__overlay"></div>
        <VideoImageThumbnail
          videoUrl={nft_src}
          width="1500px"
          height="1200px"
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
      </div>
    </div>
  );
}

export default VideoDetailBox;

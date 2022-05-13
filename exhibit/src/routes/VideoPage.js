import { Components } from "antd/lib/date-picker/generatePicker";
import VPlayer from "react-vplayer";
import { useState } from "react";
import React, { useEffect } from 'react';
import VideoDetailBox from "../components/VideoDetail/VideoDetail";

function VideoArt(id) {
  let vi = id;
  return (<div>
    <VPlayer width="100%" height="100%" source={[
    {
      url:
        "https://raw.githubusercontent.com/juanpablocs/react-vplayer/master/demo/video/720p.mp4",
      type: "video/mp4",
      quality: 720
    },
    {
      url:
        "https://raw.githubusercontent.com/juanpablocs/react-vplayer/master/demo/video/1080p.mp4",
      type: "video/mp4",
      quality: 1080
    },
    {
      url:
        "https://raw.githubusercontent.com/juanpablocs/react-vplayer/master/demo/video/480p.mp4",
      type: "video/mp4",
      quality: 480
    },
    {
      url:
        "https://raw.githubusercontent.com/juanpablocs/react-vplayer/master/demo/video/360p.mp4",
      type: "video/mp4",
      quality: 360
    }
  ]}/>
    
</div>);
}

function VideoDetail(id){
  return (
    <div>
      <VideoDetailBox></VideoDetailBox>
    </div>
  );
}

function Detail(id){

  let [ alert, alertState ] = useState(true);   
  let vi = id;

  useEffect(()=>{                               
    let timer = setTimeout(()=>{ alertState(false) }, 3000);
    return ()=>{ clearTimeout(timer)}
  },[]);

  return (
  <Components />
  ,
    alert === true
    ? VideoDetail(vi)
    : VideoArt(vi)
  );
}

function VideoPage(id) {
    
  return (
    Detail(id)
    );
  }

export default VideoPage;
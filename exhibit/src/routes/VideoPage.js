import { Components } from "antd/lib/date-picker/generatePicker";
import VPlayer from "react-vplayer";
import { useState } from "react";
import React, { useEffect } from 'react';
import VideoDetailBox from "../components/VideoDetail/VideoDetail";
import { useLocation } from "react-router-dom";
export let URL = "https://raw.githubusercontent.com/juanpablocs/react-vplayer/master/demo/video/1080p.mp4";

function VideoArt(id) {
  let URL = vidurl;
  return (<div>
    <VPlayer width="100%" height="100%" source={[
    {
      url:
        URL,
      type: "video/mp4",
      quality: 720
    },
    {
      url:
        URL,
      type: "video/mp4",
      quality: 1080
    },
    {
      url:
        URL,
      type: "video/mp4",
      quality: 480
    },
    {
      url:
        URL,
      type: "video/mp4",
      quality: 360
    }
  ]}/>
    
</div>);
}

function VideoDetail(title, description, id){

  URL = id;

  return (
    <div>
      <VideoDetailBox></VideoDetailBox>
    </div>
  );
}

function Detail(id){

  URL = id;

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

export let title="";
export let descript="";
export let vidurl="";
export let creater="";

function VideoPage(id) {

  const video_datas = useLocation();
  title = video_datas.state.title;
  descript = video_datas.state.description;
  vidurl = video_datas.state.url;
  creater = video_datas.creator_nick;
    
  return (
    Detail(title, descript, vidurl)
  );
}

export default VideoPage;
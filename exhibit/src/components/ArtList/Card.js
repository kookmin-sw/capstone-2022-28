import React, { useState } from "react";
import card1 from "../Image/001.png";
import card2 from "../Image/002.png";
import card3 from "../Image/003.png";
import card4 from "../Image/004.png";
import card5 from "../Image/005.png";
import card6 from "../Image/006.png";
import card7 from "../Image/007.png";
import card8 from "../Image/008.png";
import card9 from "../Image/009.png";
import card10 from "../Image/010.png";
import VideoPage from "../../routes/VideoPage";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const ArtContainer = () => {
}

const Card = props => {
  const navigate = useNavigate();
  
  const onClickListener = (id) =>{
    navigate('/video')
  }
  
  return (
    <div>
    <ImgBox 
      id={props.id}
      src={card1}
      // src={props.img}
      alt="imgbox"
      onClick={() => {
        onClickListener(props.id);
      }}
      onMouseEnter={props.onMouseEnter}
    />
    <ImgBox
      id={props.id}
      src={card2}
      // src={props.img}
      alt="imgbox"
      onClick={() => {
        onClickListener(props.id);
      }}
      onMouseEnter={props.onMouseEnter}
    />
    <ImgBox
      id={props.id}
      src={card3}
      // src={props.img}
      alt="imgbox"
      onClick={() => {
        onClickListener(props.id);
      }}
      onMouseEnter={props.onMouseEnter}
    />
    <ImgBox
      id={props.id}
      src={card4}
      // src={props.img}
      alt="imgbox"
      onClick={() => {
        onClickListener(props.id);
      }}
      onMouseEnter={props.onMouseEnter}
    />
    <ImgBox
      id={props.id}
      src={card5}
      // src={props.img}
      alt="imgbox"
      onClick={() => {
        onClickListener(props.id);
      }}
      onMouseEnter={props.onMouseEnter}
    />
    <ImgBox
      id={props.id}
      src={card6}
      // src={props.img}
      alt="imgbox"
      onClick={() => {
        onClickListener(props.id);
      }}
      onMouseEnter={props.onMouseEnter}
    />
    <ImgBox
      id={props.id}
      src={card7}
      // src={props.img}
      alt="imgbox"
      onClick={() => {
        onClickListener(props.id);
      }}
      onMouseEnter={props.onMouseEnter}
    />
    <ImgBox
      id={props.id}
      src={card8}
      // src={props.img}
      alt="imgbox"
      onClick={() => {
        onClickListener(props.id);
      }}
      onMouseEnter={props.onMouseEnter}
    />
    <ImgBox
      id={props.id}
      src={card9}
      // src={props.img}
      alt="imgbox"
      onClick={() => {
        onClickListener(props.id);
      }}
      onMouseEnter={props.onMouseEnter}
    />
    <ImgBox
      id={props.id}
      src={card10}
      // src={props.img}
      alt="imgbox"
      onClick={() => {
        onClickListener(props.id);
      }}
      onMouseEnter={props.onMouseEnter}
    />

    </div>
  );
};
export default Card;

const ImgBox = styled.img`
  width: 220px;
  height: 308px;
  border-radius: 7px;
  margin: 10px;
  
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.35s;
  }
`;
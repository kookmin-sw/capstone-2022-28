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
import ModalPortal from "../Modal/Portal";
import Modal from "../Modal/Modal";


const Card = props => {
  const navigate = useNavigate();
  
  const [modalOn, setModalon] = useState(false);
  const [content, setContent] = useState("");
  const handleModal = e => {
    const {src} = e.target;
    setModalon(!modalOn);
    setContent(src);
  };

  return (
    <div>
    <ImgBox 
      id={props.id}
      src={props.img}
      alt="imgbox"
      onClick={handleModal}
      onMouseEnter={props.onMouseEnter}
    />
    
    <ModalPortal>
      {modalOn && <Modal onClose={handleModal} id={props.id} src={content}/>}
    </ModalPortal>
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
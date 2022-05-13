//Modal.js
import React from "react";
import ModalPortal from "./Portal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Modal = ({onClose, id, src}) => {
  const navigate = useNavigate();
return (
  <ModalPortal>
    <Background>
      <Content>
        <ContentInfo>
          <ContentVideo>
          <CloseBtn onClick={onClose}>X</CloseBtn>
            <ContentExhibition src={src} id={id}></ContentExhibition>
          </ContentVideo>
          <Title>
            <Left>전시회 제목</Left>
            <Right>
              <PlayBtn onClick={() =>{ 
                  navigate("/video");
                }}>
                <PlayIcon className="fa-solid fa-play"/>
                <span>재생</span>
              </PlayBtn>    
            </Right>
          </Title>
          <ContentDetail>
            <ContentDetailLeft>
              <H4>이 전시회는 ~~~에 관련된 것입니다.</H4>
            </ContentDetailLeft>
            <ContentDetailRight>
              <H4>국가 : 대한민국</H4>
            </ContentDetailRight>
          </ContentDetail>
        </ContentInfo>
      </Content>
    </Background>
  </ModalPortal>
);
};

export default Modal;

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgba(0,0,0,0.50);
`;

const Content = styled.div`
  margin-top: 70px;
  z-index: 1001;
  height: 80%;
  width: 950px;
  position: relative;
  background: #141414;
  overflow: scroll;
`;

const ContentInfo = styled.div`
  color: white;
`;

const ContentVideo = styled.div`
  width: 950px;
`;

const ContentExhibition = styled.img`
  width: 950px;
`

const ContentDetail = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 50px 50px 0;
`;

const Text = styled.p`
  padding-left: 50px;
  margin: 20px 0 20px 0;
  color: white;
  text-align: left;
  font-weight: bold;
`;

const Title = styled(Text)`
  font-size: 45px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.span`
  width: 480px;
  color: white;
  text-align: left;
`;

const Right = styled.span`
  margin-right: 50px;
  color: red;
  text-align: left;
`;

const H4 = styled(Text)`
  font-size: 20px;
  font-weight: revert;
`;

const ContentDetailLeft = styled(Left.withComponent("div"))`
  width: 600px;
  color: white;
  text-align: left;
  font-size: 18px;
`;

const ContentDetailRight = styled(Right.withComponent("div"))`
  margin-left: 50px;
  color: white;
  font-size: 18px;
`;

const PlayBtn = styled.div`
  width: 152px;
  height: 57px;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 2.4rem;
  background-color: rgb(255, 255, 255);
  text-align: center;
  border-radius: 3%;
  margin-right: 30px;
  padding-top: 10px;
`;

const PlayIcon = styled.i`
  margin-right: 10px;
`;


const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  color: #141414;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`;
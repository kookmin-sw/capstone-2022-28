import React, {useState, useEffect} from "react";

import { Modal, Alert, Container } from "react-bootstrap";
import img from "../../components/Image/img.png";
import styles from "./LoginModal.module.css";
import QRCode from "qrcode.react";
import axios from "axios";
import {
  getBalance,
  readCount,
  setCount,
  fetchCardsOf,
} from "../../api/UserCaver";
import * as KlipAPI from "../../api/UserKlip";
import * as CaverAPI from "../../api/UserCaver";
import { Button } from "antd";

const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x0000000000000000000000000000000000000000";

function WalletModal(props) {
  // State Data
  const [nfts, setNfts] = useState([]); // {Id: '101', Uri: ''}
  const [myBalance, setMyBalance] = useState("120");
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);

  // UI
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [tab, setTab] = useState("MINT"); // Market, Mint, Wallet
  const [mintImageUrl, setMintImageUrl] = useState("");

  const getUserData = () => {
    KlipAPI.getAddress(setQrvalue, async (address) => {
      await setMyAddress(address);
      const _balance = await getBalance(address);
      setMyBalance(_balance);
    });
  };

  const onClickgetAddress = () => {
    KlipAPI.getAddress(setQrvalue);
  };

  return (
    <Modal
      {...props}
      size="1g"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={styles.modal_header}>
        Klip 지갑 가져오기
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
          <QRCode value={qrvalue} size={256} style={{ margin: "auto" }} />
      </Modal.Body>
      <Modal.Footer className={styles.loginBtn}>
        <Button onClick={getUserData}>
          주소 가져오기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WalletModal;

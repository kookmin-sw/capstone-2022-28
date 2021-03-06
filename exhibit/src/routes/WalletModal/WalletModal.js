import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";
import img from "../../components/Image/img.png";
import styles from "./LoginModal.module.css";
import QRCode from "qrcode.react";
import { getBalance } from "../../api/UserCaver";
import * as KlipAPI from "../../api/UserKlip";

export let balanceW = 0;
let addressW = "0X00000000000000000000000000";

const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0X00000000000000000000000000";

function WalletModal(props) {
  // State Data
  const [myBalance, setMyBalance] = useState("120");
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);

  // UI
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [qrhide, setQrhide] = useState(false);
  const [hide, setHide] = useState(false);

  function setBal(bal) {
    setMyBalance(bal);
  }

  const getUserData = () => {
    KlipAPI.getAddress(setQrvalue, async (address) => {
      await setMyAddress(address);
      const _balance = await getBalance(address);
      balanceW = _balance;
      addressW = address;
      localStorage.setItem("addressW", addressW);
      localStorage.setItem("balance", _balance);
      setMyBalance(_balance);
      setQrhide(false);
      setHide(true);
    });
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
        {qrhide ? (
          <QRCode value={qrvalue} size={256} style={{ margin: "auto" }} />
        ) : (
          <img src={img} />
        )}
      </Modal.Body>
      <Modal.Footer className={styles.loginBtn}>
        <div className="adba"></div>
        {hide ? (
          <div>
            <p>{myAddress}</p>
            <h3>{myBalance} KLAY</h3>
          </div>
        ) : null}
        <Button
          onClick={() => {
            getUserData();
            setQrhide(true);
          }}
        >
          주소 가져오기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WalletModal;

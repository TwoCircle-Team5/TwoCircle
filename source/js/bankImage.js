import shinhan from "/image/shinhanbank_logo.png";
import kBank from "/image/Kbank_logo.png";
import KBbank from "/image/KBbank_logo.png";
import kakaoBank from "/image/kakaobank_logo.png";
import NHBank from "/image/NHbank_logo.png";
import hanaBank from "/image/hanabank_logo.png";
import wooriBank from "/image/wooribank_logo.png";
import whiteKbBank from "/image/kbbank_logo.svg"
import whiteShinhan from "/image/shinhanbank_logo.svg"
import whiteWoori from "/image/wooribank_logo.svg"
import whiteHana from "/image/hanabank_logo.svg"
import whiteKbank from "/image/Kbank_logo.svg"
import whiteKakao from "/image/kakaobank_logo.svg"
import whiteNH from "/image/NHbank_logo.svg"

export let bankLogo = [
    { name: "KB국민은행", src: KBbank, card:"#6E6053",svg:whiteKbBank},
    { name: "신한은행", src: shinhan, card: "#2661FF" , svg: whiteShinhan},
    { name: "우리은행", src: wooriBank, card:"#0028A0", svg: whiteWoori },
    { name: "하나은행", src: hanaBank, card:"#008485", svg: whiteHana},
    { name: "케이뱅크", src: kBank, card:"#080060", svg: whiteKbank },
    { name: "카카오뱅크", src: kakaoBank, card:"#fae319", svg:whiteKakao },
    { name: "NH농협은행", src: NHBank, card:"#03A64A", svg:whiteNH },
  ];

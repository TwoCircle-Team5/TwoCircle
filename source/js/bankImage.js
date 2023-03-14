import shinhan from "../../static/image/shinhanbank_logo.png";
import kBank from "../../static/image/Kbank_logo.png";
import KBbank from "../../static/image/KBbank_logo.png";
import kakaoBank from "../../static/image/kakaobank_logo.png";
import NHBank from "../../static/image/NHbank_logo.png";
import hanaBank from "../../static/image/hanaBank_logo.png";
import wooriBank from "../../static/image/wooriBank_logo.png";
import whiteKbBank from "../../static/image/KBbank_logo.svg"
import whiteShinhan from "../../static/image/shinhanbank_logo.svg"
import whiteWoori from "../../static/image/wooribank_logo.svg"
import whiteHana from "../../static/image/hanabank_logo.svg"
import whiteKbank from "../../static/image/Kbank_logo.svg"
import whiteKakao from "../../static/image/kakaobank_logo.svg"
import whiteNH from "../../static/image/NHbank_logo.svg"

export let bankLogo = [
    { name: "KB국민은행", src: KBbank, card:"#6E6053",svg:whiteKbBank},
    { name: "신한은행", src: shinhan, card: "#2661FF" , svg: whiteShinhan},
    { name: "우리은행", src: wooriBank, card:"#0028A0", svg: whiteWoori },
    { name: "하나은행", src: hanaBank, card:"#008485", svg: whiteHana},
    { name: "케이뱅크", src: kBank, card:"#080060", svg: whiteKbank },
    { name: "카카오뱅크", src: kakaoBank, card:"#fae319", svg:whiteKakao },
    { name: "NH농협은행", src: NHBank, card:"#03A64A", svg:whiteNH },
  ];

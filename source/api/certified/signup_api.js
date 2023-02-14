import {url, headers} from "../requests"

// 회원가입
export async function signUp(method, data){
  const res = await fetch(url + "/auth/signup",{
    method,
    headers,
    body : JSON.stringify(data)
  })
  const json = await res.json()
  console.log(json)
  if(res.status===401){
    alert("이미 존재하는 이메일 입니다.")
  }else if(res.status === 400){
    alert("옳바른 정보를 입력해주세요.")
  }else if(res.status === 200){
    alert("TwoCircle 회원이 되신 것을 환영합니다!")
  }
}



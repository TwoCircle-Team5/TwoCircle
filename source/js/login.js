import { login } from "../../source/api/certified/login_api"
// 로그인 기능 
export function loginHandler(){
  const loginForm = document.querySelector(".login_form")

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const body = {
      email: e.target[0].value,
      password: e.target[1].value
    }
    await login("POST", body)
  })
}
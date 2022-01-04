// id, pw 둘다 입력시 로그인 버튼 활성화
const loginEmail = document.querySelector(".input-email");
const loginPw = document.querySelector(".input-pw");
const loginBtn = document.querySelector(".login-btn");
const input = document.querySelectorAll(".input");
const errorTxt = document.querySelector(".error-txt");

function activeColorBtn() {
  if (loginEmail.value && loginPw.value) {
    loginBtn.removeAttribute("disabled");
    loginBtn.style.backgroundColor = "#F26E22";
  } else {
    loginBtn.style.backgroundColor = "#FFC7A7";
    loginBtn.setAttribute("disabled", "disabled");
  }
}

input.forEach((value) => {
  value.addEventListener("keyup", activeColorBtn);
});

async function login() {
  const url = "http://146.56.183.55:5050";
  try {
    const res = await fetch(url + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: loginEmail.value,
          password: loginPw.value,
        },
      }),
    });
    const resJson = await res.json();
    console.log(resJson);
    const pwInput = document.querySelector(".email-pw");

    // 서버에 일치하는 로그인 정보가 없다면
    if (resJson.message != undefined) {
      pwInput.classList.add("error");
      errorTxt.innerText = `*${resJson.message}`;
    } else {
      pwInput.classList.remove("error");
      // home 페이지로
    }
  } catch (err) {}
}

loginBtn.addEventListener("click", login);

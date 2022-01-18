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
    console.log("크라라", resJson);
    const pwInput = document.querySelector(".email-pw");
    if (resJson.message) {
      errorTxt.innerText = `*${resJson.message}`;
      pwInput.classList.add("error");
    } else {
      pwInput.classList.remove("error");
      window.location.href = "/src/pages/home.html";
    }

    // 토큰과 accountname을 로컬스토리지에 저장
    if (resJson.user.token) {
      localStorage.setItem("accountname", resJson.user.accountname);
      localStorage.setItem("accessToken", resJson.user.token);
      localStorage.setItem("refreshToken", resJson.user.refreshToken);
      localStorage.setItem("profileImage", resJson.user.image);
      localStorage.setItem("userId", resJson.user._id);
    }
  } catch (err) {}
}

loginBtn.addEventListener("click", login);

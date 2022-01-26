// id, pw 둘다 입력시 로그인 버튼 활성화
const loginEmail = document.querySelector(".input-email");
const loginPw = document.querySelector(".input-pw");
const loginBtn = document.querySelector(".login-btn");
const input = document.querySelectorAll(".input");
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
  const url = "https://api.mandarin.cf";
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
    printError(resJson);
    setLocalUserinfo(resJson);
  } catch (err) {
    if (res.status == 401) {
      alert("인증이 만료 되었습니다, 다시 로그인해주세요.");
      location.href = "./login.html";
    } else {
      alert("죄송합니다, 서버관리자에게 문의하거나 잠시 후 다시 시도해주세요");
      location.href = "./home.html";
    }
  }
}

loginBtn.addEventListener("click", login);

function printError(error) {
  const pwInput = document.querySelector(".email-pw");
  const errorTxt = document.querySelector(".error-txt");
  if (error.message) {
    errorTxt.innerText = `*${error.message}`;
    pwInput.classList.add("error");
  } else {
    pwInput.classList.remove("error");
    window.location.href = "../pages/home.html";
  }
}

function setLocalUserinfo(userInfo) {
  if (userInfo.user.token) {
    localStorage.setItem("accountname", userInfo.user.accountname);
    localStorage.setItem("accessToken", userInfo.user.token);
    localStorage.setItem("refreshToken", userInfo.user.refreshToken);
    localStorage.setItem("profileImage", userInfo.user.image);
    localStorage.setItem("userId", userInfo.user._id);
  }
}

const emailPw = document.querySelector("#login-email-wrap");
const emailInputs = emailPw.querySelectorAll("input");
const emailError = document.querySelector("#email-error");
const emailInput = document.querySelector("#login-id")
const passwordInput = document.querySelector("#login-pw")
const emailPwBtn = document.querySelector(".next-btn")
const profile = document.querySelector("#join-profile-wrap");
const profileInput = profile.querySelectorAll("input")
const imagePre = document.querySelector(".basic-profile-img")
const submitBtn = document.querySelector(".start-btn")

//이메일, 패스워드의 인풋 값이 모두 들어와 있으면 다음 버튼활성화
function able() {
    if (emailInput.value && passwordInput.value) {
        emailPwBtn.removeAttribute("disabled");
        emailPwBtn.style.backgroundColor = "#F26E22";
    } else {
        emailPwBtn.style.backgroundColor = "#FFC7A7";
        emailPwBtn.setAttribute("disabled", "disabled");
    }
}
emailInputs.forEach((value) => {
    value.addEventListener("keyup", able);
});


async function checkEmailValid(email) {
    const url = "http://146.56.183.55:5050";
    const res = await fetch(url + '/user/emailValid', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user": {
                "email": email
            }
        }),
    })
    const json = await res.json()
    if (json.message !== "사용 가능한 이메일 입니다.") {
        emailError.textContent = json.message;
        emailError.classList.remove("hidden");
        emailInput.value = "";
        emailPwBtn.disabled = true;
    }
}

emailInput.addEventListener("change", () => {
    checkEmailValid(emailInput.value);
});

//email 유효성 검사
let emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z].{2,3}$/i;
// /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
emailInput.addEventListener("change", () => {
    let emailVal = emailInput.value;
    if (emailVal.match(emailRegExp) == null) {
        emailError.textContent = "이메일 형식이 맞지 않습니다.";
        emailInput.value = "";
        emailError.classList.remove("hidden");
    } else {
        emailError.classList.add("hidden");
    }
});

//비밀번호 6자리 이상. 유효성검사
const passwordError = document.querySelector("#password-error")
passwordInput.addEventListener("change", () => {
    if (passwordInput.value.length >= 6) {
        passwordError.classList.add("hidden");
    } else {
        passwordInput.value = "";
        const passwordError = document.querySelector("#password-error");
        passwordError.classList.remove("hidden");
    }
});

emailPwBtn.addEventListener("click", async () => {
    emailPw.style.display = "none";
    profile.style.display = "flex";
});


async function imageUpload(files) {
    const formData = new FormData();
    formData.append("image", files[0]);//formData.append("키이름","값")
    const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
        method: "POST",
        body: formData
    })
    const data = await res.json()
    const productImgName = data["filename"];
    return productImgName
}

//프로필 설정 화면

async function profileImage(e) {
    const files = e.target.files
    const result = await imageUpload(files)
    imagePre.src = "http://146.56.183.55:5050/" + result
    console.log(result)
}
document.querySelector("#upload-image").addEventListener("change", profileImage)

// 프로필설정 계정 ID 정규표현식
const accountInput = document.querySelector("#user-id")
accountInput.addEventListener("change", () => {
    let accountRegExp = /^[a-zA-Z0-9._]+$/;
    // let accountRegExp = /^(?=.*[a-zA-Z0-9._]).{1,15}$/;
    // let accountRegExp =  /^(?=.*[a-zA-Z])(?=.*[._])(?=.*[0-9])$/;
    // let accountVal = account.value;
    const accOnly = document.querySelector("#id-error");
    if (accountInput.value.match(accountRegExp) == null) {
        accOnly.classList.remove("hidden");
    } else {
        accOnly.classList.add("hidden");
    }
});

// 회원가입 버튼 활성화
const userName = document.querySelector("#user-name").value;
const userId = document.querySelector("#user-id").value;
const intro = document.querySelector("#user-desc").value;
function submitAble() {
    if (userName && userId && intro) {
        submitBtn.removeAttribute("disabled");
        submitBtn.style.backgroundColor = "#F26E22";
    } else {
        submitBtn.style.backgroundColor = "#FFC7A7";
        submitBtn.setAttribute("disabled", "disabled");
    }
}
profileInput.forEach((value) => {
    value.addEventListener("keyup", submitAble);
});

async function join() {
    const email = document.querySelector("#login-id").value;
    const password = document.querySelector("#login-pw").value;
    const userName = document.querySelector("#user-name").value;
    const userId = document.querySelector("#user-id").value;
    const intro = document.querySelector("#user-desc").value;
    const imageUrl = document.querySelector(".basic-profile-img").src
    try {
        const res = await fetch("http://146.56.183.55:5050/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user": {
                    "email": email,
                    "password": password,
                    "username": userName,
                    "accountname": userId,
                    "intro": intro,
                    "image": imageUrl,
                }
            })
        })
        console.log(res)
        const json = await res.json()
        const message = json.message
        // if(message=="회원가입 성공"){
        if (res.status == 200) {
            location.href = "../pages/login.html"
        }
        else {
            console.log(json)
        }
    } catch (err) {
        alert(err)
    }
}
submitBtn.addEventListener("click", join)
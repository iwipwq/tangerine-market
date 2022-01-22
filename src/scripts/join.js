const emailPw = document.querySelector("#login-email-wrap");
const emailInputs = emailPw.querySelectorAll("input");
const emailError = document.querySelector("#email-error");
const emailInput = document.querySelector("#login-id")
const passwordInput = document.querySelector("#login-pw")
const emailPwBtn = document.querySelector(".next-btn")
const profile = document.querySelector("#join-profile-wrap");
const imagePre = document.querySelector(".basic-profile-img")
const submitBtn = document.querySelector(".start-btn")

//이메일, 패스워드의 인풋 값이 모두 들어와 있으면 다음 버튼활성화
function able() {
    let check = 0;
    for (let i = 0; i < emailInputs.length; i++) {
        if (emailInputs[i].value !== "") {
            check += 1;
        }
    }
    if (check === emailInputs.length) {
        emailPwBtn.disabled = false;
        emailPwBtn.style.backgroundColor = "#f26e22"
    } else {
        emailPwBtn.disabled = true;
    }
}
emailPw.addEventListener("keyup", able);

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


async function profileImage(e) {
    const files = e.target.files
    const result = await imageUpload(files)
    imagePre.src = "http://146.56.183.55:5050/" + result
    console.log(result)
}
document.querySelector("#upload-image").addEventListener("change", profileImage)

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
            location.href = "./index.html"
        }
        else {
            console.log(json)
        }
    } catch (err) {
        alert(err)
    }
}
submitBtn.addEventListener("click", join)
const emailPw = document.querySelector("#login-email-wrap");
const profile = document.querySelector("#join-profile-wrap");
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
    return json.message == "사용 가능한 이메일 입니다." ? true : false
}
const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", async () => {
    const email = document.querySelector("#login-id").value;
    const pw = document.querySelector("#login-pw").value;
    if (pw.length > 5) {
        const emailValid = await checkEmailValid(email)
        if (emailValid) {
            emailPw.style.display = "none";
            profile.style.display = "block";
        } else {
            alert("비밀번호를 다시 입력하세요.")
        }
    } else { alert("비밀번호가 잘못되었습니다.") }
})
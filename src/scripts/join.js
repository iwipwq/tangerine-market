const emailPw = document.querySelector("#login-email-wrap");
const profile = document.querySelector("#join-profile-wrap");
const imagePre = document.querySelector(".basic-profile-img")
const submitBtn = document.querySelector(".start-btn")
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
            profile.style.display = "flex";
        } else {
            alert("비밀번호를 다시 입력하세요.")
        }
    } else { alert("비밀번호가 잘못되었습니다.") }
})
async function imageUpload(files){
    const formData = new FormData();
    formData.append("image", files[0]);//formData.append("키이름","값")
    const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
        method: "POST",
        body : formData
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
document.querySelector("#upload-image").addEventListener("change",profileImage)

async function join(){
    const email = document.querySelector("#login-id").value;
    const password = document.querySelector("#login-pw").value;
    const userName = document.querySelector("#user-name").value;
    const userId = document.querySelector("#user-id").value;
    const intro = document.querySelector("#user-desc").value;
    const imageUrl = document.querySelector(".basic-profile-img").src
    try{
        const res = await fetch("http://146.56.183.55:5050/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
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
        if(res.status==200){
            location.href = "./index.html"
        }
        else{
            console.log(json)
        }
    }catch(err){
        alert(err)
    }
}
submitBtn.addEventListener("click",join)
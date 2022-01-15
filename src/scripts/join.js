const $emailPw = document.querySelector("#login-email-wrap")
const $profile = document.querySelector("#join-profile-wrap")
const $imagePre = document.querySelector(".basic-profile-img")
const $submitBtn = document.querySelector(".start-btn")

//이메일 중복체크하는 함수
async function checkEmailValid(email) {
    const res = await fetch("http://146.56.183.55:5050/user/emailvalid", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            "user": {
                "email":email
            }
        })
    })
    const json = await res.json()
    return json.message == "사용 가능한 이메일 입니다" ? true : false
    //return이 메일을 사용가능한지 체크한다.
}
document.querySelector(".next-btn").addEventListener("click",async ()=>{
    const email = document.querySelector("#login-input").value
    const pw = document.querySelector("#login-pw").value
    // 이메일 패스워드 유효성 검사
    if(pw.length>5){
        const emailValid = await checkEmailValid(email)
        if (emailValid) {
            $emailPw.style.display = "none"
            $profile.style.display = "block"
        }else{
            alert("중복된 이메일입니다.")
        }
    }else{alert("비밀번호 길이가 맞지 않습니다.")}
})
// async function imageUpload(files){
//     const formData = new FormData();
//     formData.append("image", files[0]);//formData.append("키이름","값")
//     const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
//         method: "POST",
//         body : formData
//     })
//     const data = await res.json()
//     const productImgName = data["filename"];
//     return productImgName
// }


// async function profileImage(e) {
//     const files = e.target.files
//     const result = await imageUpload(files)
//     $imagePre.src = localStorage.getItem("url")+"/"+result
//     console.log(result)
// }
// document.querySelector("#profileImg").addEventListener("change",profileImage)

// async function join(){
//     const email = document.querySelector("#emailInput").value;
//     const password = document.querySelector("#passwordInput").value;
//     const userName = document.querySelector("#userNameInput").value;
//     const userId = document.querySelector("#userIdInput").value;
//     const intro = document.querySelector("#userIntroInput").value;
//     const imageUrl = document.querySelector("#imagePre").src
//     try{
//         const res = await fetch("http://146.56.183.55:5050/user", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body : JSON.stringify({
//                 "user": {
//                     "email": email,
//                     "password": password,
//                     "username": userName,
//                     "accountname": userId,
//                     "intro": intro,
//                     "image": imageUrl,
//                 }
//             })
//         })
//         console.log(res)
//         const json = await res.json()
//         const message = json.message
//         // if(message=="회원가입 성공"){
//         if(res.status==200){
//             location.href = "./index.html"
//         }
//         else{
//             console.log(json)
//         }
//     }catch(err){
//         alert(err)
//     }
// }
// $submitBtn.addEventListener("click",join)
const token = localStorage.getItem("accessToken");
const accountname = localStorage.getItem("accountname");
const saveBtn = document.querySelector(".btn-save");
let profileOrigin = "";

//내 프로필 정보 가져오기
async function getMyProfile() {
  const url = "http://146.56.183.55:5050";
  try {
    const res = await fetch(url + "/profile/" + accountname, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myProfile = await res.json();
    console.log("내프로필정보", myProfile);
    const profile = myProfile.profile;
    const username = profile.username;
    const myAccountname = profile.accountname;
    const intro = profile.intro;
    const profileImage = profile.image;
    console.log(profileImage);

    const inputUsername = document.querySelector(".profile-user-name");
    const inputAccountname = document.querySelector(".profile-account-name");
    const inputIntro = document.querySelector(".profile-intro");
    const inputImage = document.querySelector(".profile-mod-img");
    inputUsername.value = username;
    inputAccountname.value = myAccountname;
    if (!intro) {
      inputIntro.value = "";
    } else {
      inputIntro.value = intro;
    }
    inputImage.src = profileImage;
    profileOrigin = inputImage.src;
  } catch (err) {
    console.log("요청실패");
  }
}
getMyProfile();

//업로드할 프로필 이미지 미리 보기
function readImage(input) {
  console.log(input.files);
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const inputImage = document.querySelector(".profile-mod-img");
      inputImage.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

const imgUpload = document.getElementById("img-upload");
imgUpload.addEventListener("change", (e) => {
  readImage(e.target);
});

//이미지 파일네임 받기
async function fileUpload(files, index) {
  const url = "http://146.56.183.55:5050";
  let formData = new FormData();
  console.log("files[index]로그", files[index]);
  formData.append("image", files[index]);
  const res = await fetch(url + "/image/uploadfile", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  console.log("fileUpload응답받은data", data);
  const productImgName = data["filename"];
  console.log(productImgName);
  return productImgName;
}

//account네임 유효성검사

function checkValidation() {
  let userName = document.querySelector(".profile-user-name");
  let account = document.querySelector(".profile-account-name");
  let userError = document.querySelector(".error-text-username");
  let accountError = document.querySelector(".error-text-account");
  let check = /[^\w_.]/g;
  userError.innerText = "";
  console.log("하하하", userName.value);
  if (userName.value.length < 2) {
    userError.innerText = "2자~10자 이내여야 합니다.";
  } else if (userName.value.length > 10) {
    userError.innerText = "2자~10자 이내여야 합니다.";
  } else {
    userError.innerText = "";
  }
  console.log("유저네임", userName.value);
  console.log("어카운드", account.value);

  if (check.test(account.value)) {
    accountError.innerText = "영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.";
  } else {
    accountError.innerText = "";
  }
  if (accountError.innerText == "" && userError.innerText == "") {
    saveBtn.removeAttribute("disabled");
    saveBtn.style.backgroundColor = "#F26E22";
  } else {
    saveBtn.setAttribute("disabled", "disabled");
    saveBtn.style.backgroundColor = "#FFC7A7";
  }
}
const inputEvent = document.querySelectorAll("input");
const inputImage = document.querySelector("#img-upload");
inputEvent.forEach((value) => {
  value.addEventListener("keyup", checkValidation);
});
inputImage.addEventListener("change", checkValidation);
//내 프로필 수정
async function modifyMyProfile() {
  const url = "http://146.56.183.55:5050";
  const files = imgUpload.files;
  const inputUsername = document.querySelector(".profile-user-name");
  const inputAccountname = document.querySelector(".profile-account-name");
  const inputIntro = document.querySelector(".profile-intro");
  console.log(imgUpload.files);
  if (files.length == 1) {
    let index = 0;
    const imgurl = await fileUpload(files, index);
    console.log("json하하", url + "/" + imgurl);
    console.log("con-imageUrls", imgurl);
    const res = await fetch(url + "/user", {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: inputUsername.value,
          accountname: inputAccountname.value,
          intro: inputIntro.value,
          image: url + "/" + imgurl,
        },
      }),
    });
    const json = await res.json();
    const errorTxt = document.querySelector(".error-text-account");
    if (json.message) {
      errorTxt.innerText = `*${json.message}`;
    } else {
      errorTxt.innerText = "";
    }
    localStorage.setItem("accountname", json.user.accountname);
  } else if (files.length == 0) {
    const res = await fetch(url + "/user", {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: inputUsername.value,
          accountname: inputAccountname.value,
          intro: inputIntro.value,
          image: profileOrigin,
        },
      }),
    });
    const json = await res.json();
    const errorTxt = document.querySelector(".error-text-account");
    if (json.message) {
      errorTxt.innerText = `*${json.message}`;
    } else {
      errorTxt.innerText = "";
    }
    localStorage.setItem("accountname", json.user.accountname);
  }
}
saveBtn.addEventListener("click", modifyMyProfile);

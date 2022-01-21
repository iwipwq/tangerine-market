//게시글 작성
const postId = "61ea3d62458f1ddd2e2c0c4c";
const token = localStorage.getItem("accessToken");
const profileImage = localStorage.getItem("profileImage");
console.log("포스트아이디", postId);

let text = document.querySelector("textarea");

const imageInput = document.querySelector("#image");
const uploadBtn = document.querySelector('button[type="button"]');
const imageBtn = document.querySelector(".upload-photo");
let imageUrls = [];

// 미리보기이미지 임시 저장소1
let imgArray = 0;
// 업로드용 이미지 임시 저장소2 //나중에 합쳐서 다시 짜기
let tempImgArray = [];

// x 축으로 스크롤하기
const scrollContainer = document.querySelector(".img-preview-wrap");

scrollContainer.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaY;
});
// 포스트 정보 받아 오기
async function getPost() {
  const url = "http://146.56.183.55:5050";
  const res = await fetch(url + "/post/" + postId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  printPost(data);
  console.log("정보출력", data);
  function printPost(data) {
    console.log("받은정보", data.post.image.split(","));
    text.value = data.post.content;
    const myProfileImg = document.querySelector(".basic-profile-img");
    myProfileImg.src = profileImage;
    const img = data.post.image.split(",");
    if (img && img[0]) {
      img.forEach((src) => {
        console.log("src", src);
        document.querySelector(".img-preview-wrap").innerHTML += `
            <li class="list-preview-img">
              <img src="${src}" alt="포스트사진" class="img-preview">
              <button type="button" class="delete-btn">
              </button>
            </li>
            `;
        tempImgArray.push(src);
        imageUrls.push(src);
        imgArray = imgArray + 1;
      });
    }

    if (img.length > 1 && img.length <= 3) {
      const previewImg = document.querySelectorAll(".img-preview-wrap img");
      previewImg.forEach((img) => {
        img.classList.replace("img-preview", "img-preview-triple");
      });
    }
  }
}

let deletepost = document.querySelectorAll(".delete-btn");
const previewWrap = document.querySelector(".img-preview-wrap");
let previewImage = document.querySelectorAll(".list-preview-img img");
let previewList = document.querySelectorAll(".list-preview-img");

let observer = new MutationObserver(function (mutations) {
  deletepost = document.querySelectorAll(".delete-btn");
  previewImage = document.querySelectorAll(".list-preview-img img");
  // tempImgArray = [];
  // for (let i = 0; i < previewImage.length; i++) {
  //   tempImgArray.push(previewImage[i].getAttribute("src"));
  // }
  imgArray = previewImage.length;
  // tempImgArray = imageUrls;
  makeFormdata();
  console.log("변경감시temp", tempImgArray);
  console.log("변경감시url", imageUrls);
  console.log("변경 imgArray", imgArray);
  deletepost.forEach((del) => {
    del.addEventListener("click", (e) => {
      const removeOne = e.target.parentElement;
      const index = imageUrls.indexOf(e.target.previousElementSibling.src);
      removeOne.remove();
      console.log("변경감시버튼url", imageUrls);
      imgArray = previewImage.length;
      imageUrls.splice(index, 1);
      tempImgArray = imageUrls;
      console.log("del변경감시temp", tempImgArray);
      console.log("del변경감시url", imageUrls);
      console.log("이타겟", e.target.previousElementSibling.src);
      const images = document.querySelectorAll(".list-preview-img img");
      if (imgArray > 2 && imgArray <= 3) {
        console.log("동작안해");
        images.forEach((img) => {
          img.classList.replace("img-preview", "img-preview-triple");
        });
      } else if (imgArray <= 2) {
        console.log("동작안해하니");

        images.forEach((img) => {
          img.classList.replace("img-preview-triple", "img-preview");
        });
      }
    });
  });
});

let config = { childList: true };
observer.observe(previewWrap, config);
console.log("버튼 감지후후", deletepost);

function makeFormdata() {
  let newImage = tempImgArray.filter(function (n) {
    return "string" != typeof n;
  });
  console.log("tempImgArray1", tempImgArray);
  console.log("tempImgArray[0]", tempImgArray[0]);
  console.log("tempImgArray[1]", tempImgArray[1]);
  console.log("tempImgArray[2]", tempImgArray[2]);
  console.log("newImage1", newImage);
  if (tempImgArray.length <= 3) {
    // 새 빈 폼데이터 만들기
    let formData = new FormData();
    // 폼 데이터에 tempImgArray에 저장되있던 file데이터 append로 집어넣기
    if (newImage.length == 1) {
      formData.append("image", newImage[0]);
    } else if (newImage.length == 2) {
      formData.append("image", newImage[1]);
    } else if (newImage.length == 3) {
      formData.append("image", newImage[2]);
    }
    // for (let index = 0; index < newImage.length; index++) {
    //   formData.append("image", newImage[index]);
    // }
    imageUpload(formData);
  }
}
uploadBtn.addEventListener("click", () => {
  console.log("url", imageUrls);
  updatePost();
});

getPost();
console.log("업로드용", tempImgArray);

async function imageUpload(formData) {
  console.log("폼데이터", formData);
  const url = "http://146.56.183.55:5050";
  const res = await fetch(url + "/image/uploadfiles", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  console.log("폼데이터리스폰스", data);
  for (let index = 0; index < data.length; index++) {
    imageUrls.push(url + "/" + data[index].filename);
  }

  console.log("맨아래변경감시", imageUrls);
}

// 이미지미리보기와 한장이상 넣으면 업로드버튼 활성화
imageInput.addEventListener("change", function () {
  if (tempImgArray.length < 3) {
    tempImgArray.push(imageInput.files[0]);
  } else {
    alert("이미지는 3개까지 등록가능 합니다!");
  }
  imgArray = imgArray + 1;
  if (imgArray == 1) {
    document.querySelector(".img-preview-wrap").innerHTML += `
        <li class="list-preview-img">
          <img src="${URL.createObjectURL(
            this.files[0]
          )}" alt="포스트사진" class="img-preview">
          <button type="button" class="delete-btn"></button>
        </li>
        `;
  } else if (imgArray > 1 && imgArray <= 3) {
    document.querySelector(".img-preview-wrap").innerHTML += `
        <li class="list-preview-img">
          <img src="${URL.createObjectURL(
            this.files[0]
          )}" alt="포스트사진" class="img-preview-triple">
          <button type="button" class="delete-btn"></button>
        </li>
        `;
    document
      .querySelector(".img-preview-wrap img")
      .classList.replace("img-preview", "img-preview-triple");
  } else if (imgArray > 3) {
    alert("이미지는 3개까지 등록가능 합니다!");
  }
});

async function updatePost(_e) {
  const url = "http://146.56.183.55:5050";
  const token = localStorage.getItem("accessToken");
  let textValue = text.value;

  const res = await fetch(url + "/post/" + postId, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post: {
        content: textValue,
        image: imageUrls + "", //"imageurl1", "imageurl2" 형식으로
      },
    }),
  });
  const json = await res.json();
  console.log(json);
  //window.location.href = "/profile.html" 업로드 후 프로필로 돌아가기
}

//버튼활성화

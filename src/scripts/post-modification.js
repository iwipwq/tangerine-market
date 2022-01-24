//게시글 작성
const postId = localStorage.getItem("postId");
const token = localStorage.getItem("accessToken");
const profileImage = localStorage.getItem("profileImage");
let text = document.querySelector("textarea");
const imageInput = document.querySelector("#image");
const uploadBtn = document.querySelector('button[type="button"]');
const imageBtn = document.querySelector(".upload-photo");
let imageUrls = [];
let imgArray = 0;
let tempImgArray = [];
text.addEventListener("keyup", function () {
  uploadBtn.removeAttribute("disabled", "disabled");
  uploadBtn.style.backgroundColor = "#F26E22";
});

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
  function printPost(data) {
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

function makeFormdata() {
  let formData = new FormData();
  formData.append("image", tempImgArray);
  imageUpload(formData);
}
uploadBtn.addEventListener("click", () => {
  updatePost();
});

getPost();

async function imageUpload(formData) {
  const url = "http://146.56.183.55:5050";
  const res = await fetch(url + "/image/uploadfiles", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  for (let index = 0; index < data.length; index++) {
    imageUrls.push(url + "/" + data[index].filename);
  }
}

function readImage(input) {
  console.log(input.files);
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.querySelector(".img-preview-wrap").innerHTML += `
              <li class="list-preview-img">
                <img src="${e.target.result}" alt="포스트사진" class="img-preview">
                <button type="button" class="delete-btn"></button>
              </li>
              `;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

imageInput.addEventListener("change", function (e) {
  tempImgArray = imageInput.files[0];
  readImage(e.target);
  makeFormdata();
  uploadBtn.removeAttribute("disabled", "disabled");
  uploadBtn.style.backgroundColor = "#F26E22";
  e.target.value = "";
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
        image: imageUrls + "",
      },
    }),
  });
  const json = await res.json();
  location.reload();
}

let observer = new MutationObserver(function (mutations) {
  deletepost = document.querySelectorAll(".delete-btn");
  previewImage = document.querySelectorAll(".list-preview-img img");
  if (previewImage.length > 1 && previewImage.length <= 3) {
    previewImage.forEach((img) => {
      img.classList.replace("img-preview", "img-preview-triple");
    });
  }

  imgArray = previewImage.length;
  deletepost.forEach((del) => {
    del.addEventListener("click", (e) => {
      const removeOne = e.target.parentElement;
      removeOne.remove();
      uploadBtn.removeAttribute("disabled", "disabled");
      uploadBtn.style.backgroundColor = "#F26E22";
      imgArray = previewImage.length;
      previewImage.forEach((item, index) => {
        item.src = imageUrls[index];
      });
      imageUrls = imageUrls.filter(function (data) {
        return data != e.target.previousElementSibling.src;
      });
      const images = document.querySelectorAll(".list-preview-img img");
      if (imgArray > 2 && imgArray <= 3) {
        images.forEach((img) => {
          img.classList.replace("img-preview", "img-preview-triple");
        });
      } else if (imgArray <= 2) {
        images.forEach((img) => {
          img.classList.replace("img-preview-triple", "img-preview");
        });
      }
    });
  });
});

let config = { childList: true };
observer.observe(previewWrap, config);

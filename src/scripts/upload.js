//게시글 작성

let text = document.querySelector("textarea");

const imageInput = document.querySelector('input[type="file"]')
const uploadBtn = document.querySelector('button[type="button"]')
const imageBtn = document.querySelector(".upload-photo")

// 미리보기이미지 임시 저장소
const imgArray = [];

// x 축으로 스크롤하기
const scrollContainer = document.querySelector(".img-preview-wrap");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

async function imageUpload(formData) {
    const url = "https://mandarin.api.weniv.co.kr";
    const res = await fetch(url+"/image/uploadfiles", {
        method: "POST",
        body: formData
    })
    const data = await res.json();
    console.log('imageUpload응답받은data',data);
    for (let index = 0; index < data.length; index++) {
        imageUrls.push(url + '/' + data[index].filename)
        console.log('응답받은 데이터의 파일네임',data[index].filename);
        console.log('파일네임을 넣은 url모음string',imageUrls);
    }
    console.log('반복해서 받은 이미지이름들 값',imageUrls);
    return imageUrls;
}
async function createPost(_e) {
    const url = "https://mandarin.api.weniv.co.kr";
    const token = localStorage.getItem("accessToken");
    let textValue = text.value;
    if(imgArray.length <= 3) {
        imageUrls= [];
        let formData = new FormData();
        for (let index = 0; index < imgArray.length; index++) {
            formData.append("image",imgArray[index])
            console.log('for문속index값',index);            
        }
        await imageUpload(formData);
        console.log('imageUrls배열',imageUrls);
        const res = await fetch(url+"/post", {
            method:"POST",
            headers:{
                "Authorization" : "Bearer " + token,
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                "post": {
                    "content": textValue,
                    "image": imageUrls+'',
                }
            })
        })
        const json = await res.json()
        console.log(json)
        window.location.href = "../pages/my-profile.html"
    } else {
        alert("이미지는 3개 까지만 넣어주세요!")
    }
}
// 이미지미리보기와 한장이상 넣으면 업로드버튼 활성화
imageInput.addEventListener('change', function() {
    if (0 <= imgArray.length && imgArray.length <= 2) {
        console.log('this.file',this.files,'this.files[0]',this.files[0],'filelist',FileList,FileReader)
        console.log('파일0번 url만들기',URL.createObjectURL(this.files[0]))
        document.querySelector(".img-preview-wrap").innerHTML += `
            <li class="data">
                <img src="${URL.createObjectURL(this.files[0])}" alt="업로드 이미지 미리보기" class="img-preview">
                <button type="button" class="x-delete-button num"><img src="../../img/x.svg" alt="이미지 등록해제 버튼"></button>
            </li>
        `
        setTimeout(()=> {
            document.querySelector('li:last-child').setAttribute('fileName',this.files[0].name);
            document.querySelectorAll('li').forEach ((element,index) => {
                element.addEventListener('click', (e) => {
                    imgArray.forEach( (file,fileIndex) => {
                        if(file.name === e.currentTarget.getAttribute('fileName')){
                            return imgArray.splice(fileIndex, 1);
                        }
                    })
                    e.currentTarget.remove();
                })
            })
        },200)
        imgArray.push(this.files[0]);
        if(document.querySelector(".img-preview-wrap").innerHTML.length > 100) {
            uploadBtn.classList.replace("Ms-Disabled-button","Ms-button")
        } else {
            uploadBtn.classList.replace("Ms-button","Ms-Disabled-button");
        }
        
    } else if(imgArray.length >= 3 ){
        alert("이미지는 3개까지 등록가능 합니다!")
    }
});

// 텍스트인풋 참/거짓
text.addEventListener("input", (e) => {
  if(e.target.value.length == 0 && tempImgArray.length == 0) {
    if(uploadBtn.classList.contains("Ms-button")){
      uploadBtn.classList.replace("Ms-button","Ms-Disabled-button")
      
    }
  }
  else {
    uploadBtn.classList.replace("Ms-Disabled-button","Ms-button")
  }
})

//프로필 이미지 확인
if(localStorage.getItem('profileImage')){
  document.querySelector('.basic-profile-img').src = localStorage.getItem('profileImage');
}

//업로드 런쳐
uploadBtn.addEventListener('click', (e) => {
    if (e.currentTarget.classList.value === 'Ms-button') {
        createPost();
        console.log('업로드 성공!')
    }
    else if (e.currentTarget.classList.value === 'Ms-Disabled-button') {
        console.log('양식을 완성해주세요')
    }
});

// 뒤로가기 버튼

let btnBack = document.querySelector('.upload-header .top-upload-nav a')
btnBack.addEventListener('click', () => {
    // 나중에 홈페이지주소넣기
    if (document.referrer.includes('127.0.0.1:5502')) {
      console.log('true')
      window.history.back();
    }
    else {
      window.location.href = "home.html";
    }
});         
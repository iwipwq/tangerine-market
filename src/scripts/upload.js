//게시글 작성

let text = document.querySelector("textarea");

const imageInput = document.querySelector('input[type="file"]')
const uploadBtn = document.querySelector('button[type="button"]')
const imageBtn = document.querySelector(".upload-photo")
// 미리보기이미지 임시 저장소1
const imgArray = [];
// 업로드용 이미지 임시 저장소2 //나중에 합쳐서 다시 짜기
const tempImgArray = [];
// imageInput.addEventListener('change', () => {
//     console.log('파일리스트',e.target.FileList);
//     tempImgArray.push(imageInput.files[0])
//     console.log(tempImgArray);
// }) 
// x 축으로 스크롤하기
const scrollContainer = document.querySelector(".img-preview-wrap");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

async function imageUpload(formData) {
    const url = "http://146.56.183.55:5050";
    const res = await fetch(url+"/image/uploadfiles", {
        method: "POST",
        body: formData
    })
    const data = await res.json();
    console.log('imageUpload응답받은data',data);
    for (let index = 0; index < data.length; index++) {
        // imageUrls = imageUrls + data[index].filename +',';
        imageUrls.push(url + '/' + data[index].filename)
        console.log('응답받은 데이터의 파일네임',data[index].filename);
        console.log('파일네임을 넣은 url모음string',imageUrls);
    }
    console.log('반복해서 받은 이미지이름들 값',imageUrls);
    return imageUrls;
}
async function createPost(_e) {
    const url = "http://146.56.183.55:5050";
    const token = localStorage.getItem("accessToken");
    let textValue = text.value;
    if(imgArray.length <= 3) {
        imageUrls= [];
        // 새 빈 폼데이터 만들기
        let formData = new FormData();
        // 폼 데이터에 tempImgArray에 저장되있던 file데이터 append로 집어넣기
        for (let index = 0; index < imgArray.length; index++) {
            formData.append("image",imgArray[index])
            console.log('for문속index값',index);            
        }
        // 만들어진 formdata를 imageUplad함수에 전달해주고 실행
        // const imgurl = await imageUpload(formData);
        await imageUpload(formData);
        // console.log('imageUpload를 변수로 선언한 값',imgurl)
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
                    "image": imageUrls+'', //"imageurl1", "imageurl2" 형식으로 
                }
            })
        })
        const json = await res.json()
        console.log(json)
        //window.location.href = "/profile.html" 업로드 후 프로필로 돌아가기
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
                <button type="button" class="x-delete-button num"><img src="/img/x.svg" alt="이미지 등록해제 버튼"></button>
            </li>
        `
        setTimeout(()=> {
            // console.log('셋타임아웃 돌입 후 imgArray.lenght',imgArray.length)
            // console.log('셋타임아웃 돌입 후 요소찾기',document.querySelector(`.data${imgArray.length - 1} .x-delete-button`))
            // console.log('셋타임아웃 돌입 후 요소찾기2',document.querySelector(`.x-delete-button`))
            console.log('number',`.x-delete-button.num${imgArray.length - 1}`);
            // document.querySelector(`.x-delete-button.num${imgArray.length - 1}`).addEventListener('click', (e) => {
            //     console.log('지금 이벤트 타겟',e.currentTarget)
            //     console.log('삭제버튼작동!')
            // })
            console.log('파일가지고오기',this.files[0].name)
            document.querySelector('li:last-child').setAttribute('fileName',this.files[0].name);
            document.querySelectorAll('li').forEach ((element,index) => {
                element.addEventListener('click', (e) => {
                    console.log('현재이벤트타겟',e.currentTarget);
                    console.log('삭제버튼실행')
                    console.log(e.currentTarget)
                    console.log('타입',typeof(e.currentTarget))
                    console.log(e.currentTarget.className.replace('data',''));
                    console.log(e.currentTarget.getAttribute('fileName'))
                    imgArray.forEach( (file,fileIndex) => {
                        console.log('imgArrforEach',file.name);
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
        
    // } else if ( tempImgArray.length == 1 || tempImgArray.length == 2 ) {
    //     document.querySelector(".img-preview-wrap").innerHTML += `
    //     <img src="${URL.createObjectURL(this.files[0])}" alt="sample" class="img-preview-triple">
    //     `
    //     imgArray.push(this.files[0]);
    //     document.querySelector(".img-preview-wrap img").classList.replace("img-preview","img-preview-triple");
    } else if(imgArray.length >= 3 ){
        alert("이미지는 3개까지 등록가능 합니다!")
    }
});

// uploadBtn.addEventListener('click', createPost)
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
        console.log('어허 이렇게 올리면 못써')
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
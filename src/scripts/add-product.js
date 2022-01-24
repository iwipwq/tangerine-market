let productInput = document.getElementById("product-name");
let productInputValue = "";
let textValid = false;
productInput.addEventListener("input", (e) => {
    console.log(e.target.value);
    productInputValue = e.target.value;
    console.log(textValid);
    if (15 >= productInputValue.length && productInputValue.length >= 2) {
        textValid = true;
        console.log(textValid);
    } else {
        textValid = false;
        console.log(textValid);
    }
});
let numValid = false;
let priceInput = document.getElementById("product-price");
let priceInputValue = "";
priceInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/,/g,'');
    console.log('input입력시벨류',e.target.value);
    priceInputValue = e.target.value;
    if (/^[0-9]+$/.test(priceInputValue)) {
        numValid = true;
        console.log(numValid);
    } else {
        numValid = false;
        console.log(numValid);
    }
});
priceInput.addEventListener("blur",(e) => {
    console.log('focusOut');
    console.log(priceInputValue.toLocaleString());
    if (isNaN(e.target.value)) {
        console.log('isNaN')
        e.target.value = '';
    }
    else if (!e.target.value.includes(',')){
        if (e.target.value =='')
            e.target.value = '';
        else {
            e.target.value = parseInt(document.getElementById('product-price').value).toLocaleString();
        }
    }
})


let urlValid = false;
let linkInput = document.getElementById("product-link");
let linkInputValue = "";
linkInput.addEventListener("input", (e) => {
    console.log(e.target.value);
    linkInputValue = e.target.value;
    if(/^(ftp|http|https):\/\/[^ "]+$/.test(linkInputValue)) {
        urlValid = true;
        console.log(urlValid);
    } else {
        urlValid = false;
        console.log(urlValid);
    }
});

const imageInput = document.querySelector('#image-input');
const submitBtn = document.querySelector('button[type=button]');

function previewFile() {
    let preview = document.querySelector('.user-product-img');
    let file = document.querySelector('#image-input').files[0];
    let reader = new FileReader();

    reader.addEventListener("load", () => {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
    
    if(!preview.classList.contains("img-visible")){
            preview.classList.add("img-visible")
        }
}

document.querySelector('#image-input').addEventListener('change',()=>{
    previewFile();
})

async function fileUpload(files,index){
    const url = "http://146.56.183.55:5050";
    let formData = new FormData();
    console.log('files[index]로그',files[index])
    formData.append("image",files[index])
    const res = await fetch(url+"/image/uploadfile", {
        method: "POST",
        body: formData
    })
    const data = await res.json();
    console.log('fileUpload응답받은data',data);
    const productImgName = data["filename"];
    console.log(productImgName);
    return productImgName
}
async function createProduct() {
    const url = "http://146.56.183.55:5050"
    const token = localStorage.getItem("accessToken")
    const files = imageInput.files
    console.log(imageInput.files)
    if (files.length == 1) {
        let index = 0;
        const imgurl = await fileUpload(files,index);
        console.log('con-imageUrls',imgurl);
        const res = await fetch(url+"/product",{
            method:"POST",
            headers:{
                        "Authorization" : `Bearer ${token}`,
                        "Content-type" : "application/json"
            },
            body:JSON.stringify({
                "product":{
                        "itemName": productInputValue,
                        "price": parseInt(priceInputValue),
                        "link": linkInputValue,
                        "itemImage": url+'/'+imgurl
                }
            })
        })
        const json = await res.json()
        console.log(json)
        window.location.href = "./my-profile.html"
    }else{
        alert("이미지는 한 장만 첨부해주세요!")
    }
}

window.addEventListener('keyup', (e)=> {
    if( textValid && numValid && urlValid ){
        submitBtn.classList.replace('Ms-Disabled-button','Ms-button');
        // submitBtn.addEventListener('click',createProduct)
        //location.href('/profile')
    } else {
        if (submitBtn.className === 'Ms-button') {
        submitBtn.classList.replace('Ms-button','Ms-Disabled-button');
        } 
        // submitBtn.removeEventListener('click',createProduct)
    }
})

submitBtn.addEventListener('click', (e) => {
    console.log(e.currentTarget.classList.value == 'Ms-Disabled-button');
    if(e.currentTarget.classList.value === 'Ms-Disabled-button'){
        console.log('양식을 모두 채워주세요')
    } else if (e.currentTarget.classList.value === 'Ms-button'){
        createProduct();
    }
})

// 뒤로가기 버튼
let btnBack = document.querySelector('.top-upload-nav a')
btnBack.addEventListener('click', () => {
    // 나중에 홈페이지주소넣기
    if (document.referrer.includes('127.0.0.1:5502')) {
      console.log('true')
      window.history.back();
    }
    else {
      window.location.href = "home.html";
    }
})          

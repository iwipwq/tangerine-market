// 상품등록
// 상품명15자 이하 2자 이상
// let textValid = 15 >= productInputValue.length && productInputValue.length >= 2;
// 가격값이 숫자인지 확인 
// let numValid = new RegExp(/^[0-9]+$/).test(priceInputValue);
// url값이 ftp:// http:// https:// 로 시작하는지 확인
// let urlValid = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/).test(linkInputValue);

let productInput = document.getElementById("product-name");
let productInputValue = "";
// let textValid,numValid,urlValid = 0;
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
    console.log(e.target.value);
    priceInputValue = e.target.value;
    if (/^[0-9]+$/.test(priceInputValue)) {
        numValid = true;
        console.log(numValid);
    } else {
        numValid = false;
        console.log(numValid);
    }
});
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

// document.querySelector('#imageInput').addEventListener('change', function() {
//     if (this.files && this.files[0]) {
//         console.log('this.file',this.files,'this.files[0]',this.files[0],'filelist',FileList,FileReader)
//         let img = document.querySelector('.user-product-img');
//         img.onload = () => {
//             console.log(URL.revokeObjectURL(img.src));
//             URL.revokeObjectURL(img.src);  // no longer needed, free memory
//         }
//         if(!img.classList.contains("img-visible")){
//             img.classList.add("img-visible")
//         }
//         return img.src = URL.createObjectURL(this.files[0]); // set src to blob url
//         console.log(img.src)
//     }
// });

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
async function createProduct(_e) {
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
        //window.location.href = "/profile.html"
    }else{
        alert("이미지는 한 장만 첨부해주세요!")
    }
}

window.addEventListener('keydown', (e)=> {
    if( textValid && numValid && urlValid ){
        submitBtn.classList.replace('Ms-Disabled-button','Ms-button');
        submitBtn.addEventListener('click',createProduct)
        //location.href('/profile')
    } else {
        if (submitBtn.className === 'Ms-Button') {
        submitBtn.classList.replace('Ms-button','Ms-Disabled-button');
        } 
        submitBtn.removeEventListener('click',createProduct)
    }
})

        

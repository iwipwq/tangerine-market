// 상품등록
// let nameInput = document.getElementById('product-name');
// let handleInput = (e) => {
//     e.target.value;
//     // e.target.value.length;
//     console.log(e.target.value)
//     return inputValue = nameInput.value;
// };
// nameInput.oninput = handleInput;

let productInput = document.getElementById("product-name");
let productInputValue = "";
productInput.addEventListener("input", (e) => {
    console.log(e.target.value);
    productInputValue = e.target.value;
});

let priceInput = document.getElementById("product-price");
let priceInputValue = "";
priceInput.addEventListener("input", (e) => {
    console.log(e.target.value);
    priceInputValue = e.target.value;
});

let linkInput = document.getElementById("product-link");
let linkInputValue = "";
linkInput.addEventListener("input", (e) => {
    console.log(e.target.value);
    linkInputValue = e.target.value;
});

const $image = document.querySelector("#imageUp")
// const $content = document.querySelector("#content")
const $imageUploadBtn = document.querySelector(".user-product-upload")
const $submitBtn = document.querySelector(".Ms-Disabled-button")

async function imageUpload(files,index){
    const formData = new FormData();
    formData.append("image", files[index]);
    console.log(formData)
    const res = await fetch ("http://146.56.183.55:5050/image/uploadfile", {
        method: "POST",
        body: formData
    })
    console.log(data);
    const data = await res.json()
    const productImgName = data["filename"];
    console.log(productImgName)
    return productImgName
}

async function addProduct(e){
    const url = "http://146.56.183.55:5050"
    const myName = localStorage.getItem('accountname');
    const myToken = localStorage.getItem('accessToken');
    let imageUrls = []
    const files =$image.files
    if (files.length == 1) {
            const imgurl = await imageUpload(files,[index])
            console.log('imgurl',imgurl)
            imageUrls.push(url+imgurl)
            try {
                const response = await fetch(`${url}/product`, {
                    method : "POST",
                    headers : {
                        "Authorization" : `Bearer ${myToken}`,
                        "Content-type" : "application/json"
                    },
                    body : {
                        "product":{
                            "itemName": productInputValue,
                            "price": parseInt(priceInputValue),
                            "link": linkInputValue,
                            "itemImage": imageUrls
                        }
                    }
                })
                const json = response.json;
                console.log(json);
            } catch (error) {
                
            }
        } else {
            alert("이미지는 한 장만 등록해주세요")
        }
}
$imageUploadBtn.addEventListener('click', (e) => {
    if($image){
    $image.click();
    }
});
$image.addEventListener('change',(handleFiles) => {
    console.log(files);
    function handleFiles() {
        const fileList = this.files; /* 이제 파일 리스트로 작업할 수 있습니다 */
      }
    document.querySelector('.user-product-preview').innerHTML += `
    <img src="" alt="" class="user-product-img"/>
    `
    imageUpload();
})
$submitBtn.addEventListener('click', addProduct);
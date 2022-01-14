// 상품등록
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
const submitBtn = document.querySelector('.Ms-Disabled-button')

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
    }else{
        alert("이미지는 한 장만 첨부해주세요!")
    }
}
submitBtn.addEventListener('click',createProduct)
        

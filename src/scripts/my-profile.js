// 프로필 정보 받아와서 출력하기
async function getProfile(){
    try {
        const res = await fetch(`http://146.56.183.55:5050/profile/${localStorage.getItem('accountname')}`, {
        method: "GET", 
        headers:{
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-type" : "application/json"
        }
    });
    const json = await res.json();
    if(res.status == 200) {
    const myProfile = json.profile
    // console.log(myProfile);
    // console.log(myProfile.followingCount);
    // console.log(myProfile.accountname);
    // console.log(document.querySelector(".profile"));
    // console.log(document.querySelector(".profile").innerHTML);

    const userAccountname = myProfile.accountname;
    // const userFollower = myProfile.follower
    const userFollowerCount = myProfile.followerCount;
    // const userFollowing = myProfile.following
    const userFollowingCount = myProfile.followingCount;
    const userImage = myProfile.image;
    const userIntro = myProfile.intro;
    const userName = myProfile.username;
    // const userId = myProfile._id;

    document.querySelector(".profile").innerHTML += `
        <img src="${userImage}" alt="${userName} 프로필사진" class="basic-profile-img" />
        <strong class="profile-title">${userName}</strong>
        <p class="profile-email typography--12p14h">@ ${userAccountname}</p>
        <p class="profile-desc">${userIntro}</p>
    `;
    // console.log(document.querySelector(".follow"));
    document.querySelector(".follow").innerHTML += `
        <div class="followers">
            <p class="followers-num">${userFollowerCount}</p>
            <p class="followers-text">followers</p>
        </div>
        <div class="followings">
            <p class="followings-num">${userFollowingCount}</p>
            <p class="followings-text">followings</p>
        </div>
    `;
    }

  } catch (error) {
    if (res.status == 401) {
        alert("인증이 만료 되었습니다, 다시 로그인해주세요.")
        location.href = './login.html'
    } else {
        alert("죄송합니다, 서버관리자에게 문의하거나 잠시 후 다시 시도해주세요")
        location.href = './home.html'
    }
  }

}
getProfile();

//상품정보 받아와서 출력하기
async function getMyProduct(){
    const url = "http://146.56.183.55:5050"
    const myName = localStorage.getItem('accountname');
    const myToken = localStorage.getItem('accessToken')
    try {
        const res = await fetch(`${url}/product/${myName}`, {
            method: "GET",
            headers:{
                "Authorization" : `Bearer ${myToken}`,
                "Content-type" : "application/json"
            }
        });
        const json = await res.json();
        if(res.status === 200) {
            const productsAmount = json.data
            const products = json.product 
            // console.log('products',products);
            // console.log(document.querySelector('.product-ul').innerHTML);
            products.forEach( product => {

                // const id = product.id
                const itemImage = product.itemImage
                const itemName = product.itemName
                // const link = product.link
                const price = product.price.toLocaleString()
                // const updatedAt = product.updatedAt
                
                // id: "61dfa229cb4b3316dc267bee"
                // itemImage: "http://146.56.183.55:5050/1642045984961.png"
                // itemName: "안녕asff"
                // link: "https://brunch.co.kr/@ddangdol/5"
                // price: 214000
                // updatedAt: "2022-01-13T03:53:13.399Z"

                document.querySelector('.product-ul').innerHTML += `
                    <li class="product-li">
                        <img src="${itemImage}" alt="${itemName} 상품 사진" />
                        <p class="product-desc">${itemName}</p>
                        <p class="product-price">${price} 원</p>
                    </li>
                `
                });
            }
        } catch (error) {
            if (res.status == 401) {
                alert("인증이 만료 되었습니다, 다시 로그인해주세요.")
                location.href = './login.html'
            } else {
                alert("상품을 불러오는 도중 에러가 발생했습니다. 서버관리자에게 문의하거나 잠시 후 다시 시도해주세요")
                location.href = './home.html'
            }
            
        }
    }
    getMyProduct();
    
    
// 포스트 정보 받아와서 출력하기
async function getMyPost(){
    const res = await fetch(`http://146.56.183.55:5050/post/${localStorage.getItem('accountname')}/userpost`, {
        method: "GET",
        headers:{
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-type" : "application/json"
        }
    });
    const json = await res.json();
    const myPost = json.post
    // console.log('myPostObject',myPost);
    // console.log('typeof',typeof(myPost));
    // console.log('myPostObject-index0',myPost[0]);
    // console.log('author',myPost[0].author);
    // console.log('authorimage',myPost[0].author.image);
    // console.log('myPostImage',myPost[0].image);
    console.log (json.post)
    myPost.forEach((element, index, array) => {
        const authorImage = element.author.image
        // console.log(authorImage);
        const authorAccount = element.author.accountname
        const authorName = element.author.username
        const postCommentCount = element.commentCount
        const postContent = element.content
        const postHeartCount = element.heartCount
        const postHearted = element.hearted
        const postImageRaw = element.image
        const postImage = element.image.split(',')
        console.log('배열로 나눈 포스트이미지',postImage);
        console.log('문자열 그대로 포스트이미지',postImageRaw);
        const postCreateAt = element.createdAt.replace(/-/g,'')
        const postCreateAtYear = postCreateAt.slice(0,4);
        const postCreateAtMonth = postCreateAt.slice(4,6);
        const postCreateAtDay = postCreateAt.slice(6,8);
        console.log('forEach안에서 this',this);
        console.log('forEach안에서 postImage의this',this.postImageRaw);
        console.log('그냥element값',element);
        console.log('forEach-index값',index);
        console.log('forEach-array값',array);
        // let isHeart = "no"
        // if(hearted){
        //     isHeart = 'yes'
        // }
        if (postImageRaw) {
            if (postImage.length > 1){
                console.log("if if")
                document.querySelector('.home-post').innerHTML += `
                <div class="post-wrap _data${index}">
                    <h2 class="sr-only">${index + 1}번째 포스트 내용</h2>
                    <a class="user-profile"><img src="${authorImage}" alt="${authorName} 프로필 사진"
                            class="basic-profile-img" /></a>
                    <section class="post-section">
                        <h3>
                            <a href="profile/${authorAccount}" class="typography--h3">${authorName}</a>
                        </h3>
                        <a href="javascript:void(0)" class="post-more-vertical">
                            <img src="../../img/s-icon-more-vertical.svg" alt="" class="s-icon-more-vertical" />
                        </a>
                        <a class="post-author typography--12p14h">@ ${authorAccount}</a>
                        <p class="post-text typography--p">${postContent}</p>
                        <div class="post-img-slider">
                            <ul class="post-img-container"></ul>
                            <ul class="post-img-btn-container"></ul>
                        </div>
                        <button class="like" type="button">
                            <img src="../../img/icon-heart.svg" alt="좋아요" class="icon-heart" />
                            <span class="like-counter typography--12p12h">${postHeartCount}</span>
                        </button>
            
                        <button class="post-comment" type="button">
                            <img src="../../img/icon-message-circle-small.svg" alt="댓글"
                                class="icon-message-circle-small" />
                            <span class="comment-counter typography--12p12h">${postCommentCount}</span>
                        </button>
            
                        <small class="post-date">${postCreateAtYear}년 ${postCreateAtMonth}월 ${postCreateAtDay}일</small>
                    </section>
                </div>
                `
                // postImage.forEach(element => {
                //     console.log('post안 forEach문',element);
                //     document.querySelector('.post-section').children[4].innerHTML += `
                //     <li><img src="${element}" alt="유저 업로드 이미지"/></li>
                //     `
                // });
                
                console.log('포스트이미지 2개이상일때 배열',postImage)
                // gg = Object.assign(document.createElement('a'),{href:'http://someurl.com',innerText:"Bonus points?"});
                // let imgList = Object.assign(docuemnt.createElement("li"),{className:'post-img-list'});
                // let imgItem = Object.assign(docuemnt.createElement("img"),{className:'post-img-item'});
                // let imgList = document.createElement('li')
                // imgList.className = 'post-img-list';
                // let imgItem = document.createElement('img')
                // imgItem.className = 'post-img-item';

                // let imgCont = document.querySelector('.post-img-container')
                // imgCont.appendChild(li)
                // imgList.appendChild(imgItem)
                // imgItem.src = postImage[i]

                // for (let i = 0; i < postImage.length; i++){
                //     let imgList = document.createElement('li')
                //     imgList.className = 'post-img-list';
                //     let imgItem = document.createElement('img')
                //     imgItem.className = 'post-img-item';
                //     let imgCont = document.querySelector('.post-img-container')
                //     imgCont.appendChild(imgList)
                //     imgList.appendChild(imgItem)
                //     imgItem.src = postImage[i]
                // }
                

            } else {
                console.log("if if else")
            document.querySelector('.home-post').innerHTML += `
                <div class="post-wrap _data${index}">
                    <h2 class="sr-only">${index + 1}번째 포스트 내용</h2>
                    <a class="user-profile"><img src="${authorImage}" alt="${authorName} 프로필 사진"
                            class="basic-profile-img" /></a>
                    <section class="post-section">
                        <h3>
                            <a href="profile/${authorAccount}" class="typography--h3">${authorName}</a>
                        </h3>
                        <a href="javascript:void(0)" class="post-more-vertical">
                            <img src="../../img/s-icon-more-vertical.svg" alt="" class="s-icon-more-vertical" />
                        </a>
                        <a class="post-author typography--12p14h">@ ${authorAccount}</a>
                        <p class="post-text typography--p">${postContent}</p>
                        <img src="${postImage[0]}" alt="" class="post-img" />
                        <button class="like" type="button">
                            <img src="../../img/icon-heart.svg" alt="좋아요" class="icon-heart" />
                            <span class="like-counter typography--12p12h">${postHeartCount}</span>
                        </button>
            
                        <button class="post-comment" type="button">
                            <img src="../../img/icon-message-circle-small.svg" alt="댓글"
                                class="icon-message-circle-small" />
                            <span class="comment-counter typography--12p12h">${postCommentCount}</span>
                        </button>
            
                        <small class="post-date">${postCreateAtYear}년 ${postCreateAtMonth}월 ${postCreateAtDay}일</small>
                    </section>
                </div>
                `
                }
        } else if (!postImageRaw) {
            console.log("else if")
            document.querySelector('.home-post').innerHTML += `
            <div class="post-wrap _data${index}">
                <h2 class="sr-only">${index + 1}번째 포스트 내용</h2>
                <a class="user-profile"><img src="${authorImage}" alt="${authorName} 프로필 사진"
                        class="basic-profile-img" /></a>
                <section class="post-section">
                    <h3>
                        <a href="profile/${authorAccount}" class="typography--h3">${authorName}</a>
                    </h3>
                    <a href="javascript:void(0)" class="post-more-vertical">
                        <img src="../../img/s-icon-more-vertical.svg" alt="" class="s-icon-more-vertical" />
                    </a>
                    <a class="post-author typography--12p14h">@ ${authorAccount}</a>
                    <p class="post-text typography--p">${postContent}</p>
                    <button class="like" type="button">
                        <img src="../../img/icon-heart.svg" alt="좋아요" class="icon-heart" />
                        <span class="like-counter typography--12p12h">${postHeartCount}</span>
                    </button>
        
                    <button class="post-comment" type="button">
                        <img src="../../img/icon-message-circle-small.svg" alt="댓글"
                            class="icon-message-circle-small" />
                        <span class="comment-counter typography--12p12h">${postCommentCount}</span>
                    </button>
        
                    <small class="post-date">${postCreateAtYear}년 ${postCreateAtMonth}월 ${postCreateAtDay}일</small>
                </section>
            </div>

        `} else {
            console.log("else")
            document.querySelector(".post-area").classList.add("post-empty")
        }
        console.log('포스트에 내용을 준 뒤 postImageRaw',postImageRaw);
    });
    console.log('return하기 전 myPost',myPost);
    return myPost;
}
// getMyPost()
    
// 하단 모달창 토글
let iconMoreVertical = document.querySelector(".call-bottom-modal");
let bottomModal = document.querySelector(".icon-post-modal");
let screenOverlay = document.querySelector(".screen-overlay");

iconMoreVertical.addEventListener("click", ()=> {
    let overlayCheck = deleteAlert.classList.contains("on")
    if(!overlayCheck) {
    bottomModal.classList.toggle("modal-popup");
    screenOverlay.classList.toggle("overlay-on");
    }
})

screenOverlay.addEventListener("click", () => {
    let overlayCheck = deleteAlert.classList.contains("on")
    if(!overlayCheck) {
    bottomModal.classList.toggle("modal-popup");
    screenOverlay.classList.toggle("overlay-on");
    }
})

// 로그아웃 모달 토글
let iconPostLogOut = document.querySelector(".icon-post-modal ul li:nth-child(2)")
let deleteAlert = document.querySelector(".delete-alert");
iconPostLogOut.addEventListener("click", () => {
    deleteAlert.classList.toggle("on");
})

// 로그아웃 모달 로그아웃기능
let btnCancle = document.querySelector(".btn-alert button");
let btnDelete = document.querySelector(".btn-delete");

btnCancle.addEventListener("click", () => {
    deleteAlert.classList.remove("on");
})

btnDelete.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    window.location.href = "../pages/login.html";
})

// 리스트보기, 앨범보기 토글
let btnListView = document.querySelector(".btn-list-on");
let btnAlbumView = document.querySelector(".btn-album-on");
let homePost = document.querySelectorAll(".home-post");

btnListView.addEventListener("click",()=> {
    if (homePost[1].className === "home-post-album") {
    homePost.forEach(element => {
        element.className ="home-post"
    });
    let albumOff = btnAlbumView.innerHTML.replace(/-on/g,'-off');
    btnAlbumView.innerHTML = albumOff;
    let listOn = btnListView.innerHTML.replace(/-off/g,'-on');
    btnListView.innerHTML = listOn;
    }
})

btnAlbumView.addEventListener("click",()=> {
    if (homePost[0].className === "home-post") {
    homePost.forEach(element => {
        element.className = "home-post-album"
    });
    }
    let listOff = btnListView.innerHTML.replace(/-on/g,'-off');
    btnListView.innerHTML =listOff;
    let albumOn = btnAlbumView.innerHTML.replace(/-off/g,'-on');
    btnAlbumView.innerHTML =albumOn;
})

// x 축으로 스크롤하기
const scrollContainer = document.querySelector(".product-ul");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

    // 페이지 로딩 후 할 작업들
async function loadPage() {
    const takeOutPost = await getMyPost();
    console.log('takeOut길이',takeOutPost.length)
    for (let postIndex=0; postIndex < takeOutPost.length; postIndex++){
        let postImage = takeOutPost[postIndex].image.split(',');
        console.log(postImage);
        if(postImage[0] !== '') {
            for (let i = 0; i < postImage.length; i++){
                
                let imgList = document.createElement('li')
                imgList.className = 'post-img-list';
                let imgItem = document.createElement('img')
                imgItem.className = 'post-img-item';
                let imgCont = document.querySelector(`._data${postIndex} .post-img-container`)
                
                imgCont.appendChild(imgList)
                imgList.appendChild(imgItem)
                imgItem.src = postImage[i]

                let imgBtn = document.createElement('li')
                imgBtn.className =`post-img-btn _index${i}`;
                
                let imgBtnCont = document.querySelector(`._data${postIndex} .post-img-btn-container`)
                
                imgBtn.addEventListener('click',(e)=>{
                    // e.currentTarget.parentElement.children.classList.remove('btn-on')
                    // e.currentTarget.parentElement.firstElementChild.classList.remove(':first-child')
                    // e.currentTarget.classList.toggle('btn-on')
                    e.currentTarget.parentElement.previousElementSibling.style.transitionDuration = ".3s";
                    e.currentTarget.parentElement.previousElementSibling.style.right = `${302* i}px`;
                })
                imgBtnCont.appendChild(imgBtn)

            }

            
                
                
            
        } else if (postImage[0] =='') {
            console.log('이미지없음')
        }

    }

    console.log(takeOutPost);

}
loadPage();
    
    
// 뒤로가기 버튼

let btnBack = document.querySelector('#profile-nav a')
btnBack.addEventListener('click', () => {
    // 나중에 홈페이지주소넣기
    if (!document.referrer.indexOf('127.0.0.1:5502') == false ) {
        window.location.href = "home.html";
    }
    else {
        window.history.back();
    }
})



                
                    

// 프로필 정보 받아와서 출력하기
async function getProfile(){
    const res = await fetch(`https://api.mandarin.cf/profile/${localStorage.getItem('yourAccountId')}`, {
        method: "GET", 
        headers:{
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-type" : "application/json"
        }
    });
    const json = await res.json();
    const myProfile = json.profile
    const userAccountname = myProfile.accountname;
    // const userFollower = myProfile.follower
    const userFollowerCount = myProfile.followerCount;
    // const userFollowing = myProfile.following
    const userFollowingCount = myProfile.followingCount;
    let userImage = myProfile.image;
    const userIntro = myProfile.intro;
    const userName = myProfile.username;
    // const userId = myProfile._id;
    const userIsfollow = myProfile.isfollow

    if (userImage.includes("127.0.0.1")) {
        userImage = "../../img/basic-profile-img-.png";
    }

    document.querySelector(".profile").innerHTML += `
        <img src="${userImage}" alt="${userName} 프로필사진" class="basic-profile-img" />
        <strong class="profile-title">${userName}</strong>
        <p class="profile-email typography--12p14h">@ ${userAccountname}</p>
        <p class="profile-desc">${userIntro}</p>
    `;
    document.querySelector(".follow").innerHTML += `
        <a href="./followers.html" class="followers">
            <p class="followers-num">${userFollowerCount}</p>
            <p class="followers-text">followers</p>
        </a>
        <a href="./followings.html" class="followings">
            <p class="followings-num">${userFollowingCount}</p>
            <p class="followings-text">followings</p>
        </a>
    `;
    if(userIsfollow) {
        document.querySelector('#your-profile-wrap .M-button').classList.add('followed')
        document.querySelector('#your-profile-wrap .M-button.followed').innerText = '언팔로우'
    }
    return userIsfollow;
}
getProfile();

//상품정보 받아와서 출력하기
async function getMyProduct(){
    const url = "https://api.mandarin.cf"
    const myName = localStorage.getItem('yourAccountId');
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
            console.log(res.status);
            const productsAmount = json.data
            const products = json.product 
            if(json.product == '') {
                document.querySelector('.product-area').style.display = 'none';
            } else {
                products.forEach( product => {
                    const itemImage = product.itemImage
                    const itemName = product.itemName
                    const price = product.price.toLocaleString()

                    document.querySelector('.product-ul').innerHTML += `
                        <li class="product-li">
                            <img src="${itemImage}" alt="${itemName} 상품 사진" />
                            <p class="product-desc">${itemName}</p>
                            <p class="product-price">${price} 원</p>
                        </li>
                    `
                    });
            }
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
    const res = await fetch(`https://api.mandarin.cf/post/${localStorage.getItem('yourAccountId')}/userpost`, {
        method: "GET",
        headers:{
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-type" : "application/json"
        }
    });
    const json = await res.json();
    const myPost = json.post
    console.log(myPost);
    myPost.forEach((element, index, array) => {
        let authorImage = element.author.image
        const authorAccount = element.author.accountname
        const authorName = element.author.username
        const postCommentCount = element.commentCount
        const postContent = element.content
        const postHeartCount = element.heartCount
        const postHearted = element.hearted
        const postImageRaw = element.image
        console.log(postImageRaw);
        
        const postCreateAt = element.createdAt.replace(/-/g,'')
        const postCreateAtYear = postCreateAt.slice(0,4);
        const postCreateAtMonth = postCreateAt.slice(4,6);
        const postCreateAtDay = postCreateAt.slice(6,8);
        const postId = element.author._id
        let heartSrc = '../../img/icon-heart.svg'
        if(postHearted) {
            heartSrc = '../../img/icon-heart-fill.svg'
        }

        if (authorImage.includes("127.0.0.1")) {
            authorImage = "../../img/basic-profile-img-.png";
        }
        console.log('postImageRaw===undefined?',postImageRaw === undefined)
        if (postImageRaw == undefined) {
            console.log('undefined일경우')
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
                            <img src="${heartSrc}" alt="좋아요" class="icon-heart" />
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
        } else if (postImageRaw) {
            let postImage
            console.log(index,'번째',element.image.includes('undefined'))
            console.log(index,'번째',element.image)
            if (element.image.includes('undefined')){
                element.image = '';
            }
            postImage = element.image;
            console.log(index,'번째나누기전',postImage)
            if (element.image !== '') {
                postImage = element.image.split(',')
            }
            console.log(index,'번째',postImage)
            console.log(index,'번 포스트0번째',postImage[0])
            // console.log(index,'번째 길이',postImage.length)
            if (postImage[0] == '') {
                console.log("postImage0일때")
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
                                <img src="${heartSrc}" alt="좋아요" class="icon-heart" />
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
            } else if (postImage[0] === undefined){
                console.log("postImage undefined일때")
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
                                <img src="${heartSrc}" alt="좋아요" class="icon-heart" />
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
            } else if (postImage.length > 1){
                console.log("2장 이상 이미지")
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
                            <img src="${heartSrc}" alt="좋아요" class="icon-heart" />
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
                
                console.log('포스트이미지 2개이상일때 배열',postImage)
                document.querySelector('.post-album-view').innerHTML += `
                <li class="post-album-item"><img src="${postImage[0]}" alt="사용자 업로드 이미지" class="upload-img-album"><img src="../../img/iccon-img-layers.svg" alt="${postImage.length - 1}장의 사진 더보기" class="icon-img-layers"></li>
                ` 
            } else {
                console.log("이미지가 한장일때")
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
                                <img src="${heartSrc}" alt="좋아요" class="icon-heart" />
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

                    document.querySelector('.post-album-view').innerHTML += `
                    <li class="post-album-item"><img src="${postImage[0]}" alt="사용자 업로드 이미지" class="upload-img-album"></li>
                    `

                }
        } else if (!postImageRaw) {
            console.log("이미지가 없는 글")
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
                        <img src="${heartSrc}" alt="좋아요" class="icon-heart" />
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
            console.log("빈 포스트일때")
            document.querySelector(".post-area").classList.add("post-empty")
        }
    });
    return myPost;
}

// 리스트보기, 앨범보기 토글
let btnListView = document.querySelector(".btn-list-on");
let btnAlbumView = document.querySelector(".btn-album-on");
let homePost = document.querySelectorAll(".home-post");

btnListView.addEventListener("click",()=> {
    if (homePost[1].className === "home-post-album") {
    homePost.forEach(element => {
        element.className ="home-post"
        element.removeAttribute('style');
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
        element.style.height = `${parseInt(getComputedStyle(document.querySelector('.post-album-view')).height) + 130}px`;
        // element.style.height = `300px`;
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
    console.log(takeOutPost)
    // 그림 나눠주기
    for (let postIndex=0; postIndex < takeOutPost.length; postIndex++){
        let postImage;
        if(takeOutPost[postIndex].image) {
            
            if (takeOutPost[postIndex].image.includes('undefined')){
                takeOutPost[postIndex].image = '';
            }
            
            if (takeOutPost[postIndex].image !== []){
                postImage = takeOutPost[postIndex].image.split(',');
            }
            document.querySelector(`.post-wrap._data${postIndex}`).setAttribute('postId',takeOutPost[postIndex].id)
            document.querySelector(`.post-wrap._data${postIndex} .post-comment`).addEventListener("click", (e) => {
                getComment(e)
            })
        
            console.log(postIndex,'번째 순회',postImage[0]);
            if(postImage[0] !== '') {
                for (let i = 0; i < postImage.length; i++){
                    
                    let imgList = document.createElement('li')
                    imgList.className = 'post-img-list';
                    let imgItem = document.createElement('img')
                    imgItem.className = 'post-img-item';
                    let imgCont = document.querySelector(`._data${postIndex} .post-img-container`)
                    
                    setTimeout(() => {
                        imgCont.appendChild(imgList)
                        imgList.appendChild(imgItem)
                        imgItem.src = postImage[i]
    
                        let imgBtn = document.createElement('li')
                        imgBtn.className =`post-img-btn`;
                        
                        let imgBtnCont = document.querySelector(`._data${postIndex} .post-img-btn-container`)
                        
                        imgBtn.addEventListener('click',(e)=>{
                            e.currentTarget.parentElement.childNodes.forEach(child => {
                                if(child.className.includes('abled')) {
                                    child.classList.remove('abled');
                                }
                                e.currentTarget.classList.add('abled');
                            })
                            e.currentTarget.parentElement.previousElementSibling.style.transitionDuration = ".3s";
                            e.currentTarget.parentElement.previousElementSibling.scrollTo({
                                        left: parseInt(getComputedStyle(e.currentTarget.parentElement.parentElement).width) * i ,
                                        behavior: 'smooth'
                                    })
                        })
                        imgBtnCont.appendChild(imgBtn)
                        document.querySelectorAll('.post-img-btn:first-child').forEach(element => {
                            element.classList.add('abled');
                            })
                    }, 150);
                }
            } else if (postImage[0] =='') {
                console.log('이미지없음')
            }
        }

    }

    console.log(takeOutPost);
  

}
loadPage();

//모달 관련
function loadModal() {
    let navMoreBtn = document.querySelector(".call-bottom-modal");
    let bottomModal = document.querySelector(".icon-post-modal");
    let screenOverlay = document.querySelector(".screen-overlay");
    let postMoreBtn = document.getElementsByClassName("post-more-vertical")
    
    console.log(postMoreBtn);
    function toggleModal(e) {
        if(e.currentTarget === document.querySelectorAll(".post-more-vertical")[e.currentTarget.index]){
            idBox.pop();
            idBox.push(document.querySelector(`._data${e.currentTarget.index}`).getAttribute('postId'));
        }
        let overlayCheck = deleteAlert.classList.contains("on")
        if(!overlayCheck) {
        bottomModal.classList.toggle("modal-popup");
        screenOverlay.classList.toggle("overlay-on");
            if(e.currentTarget == document.querySelectorAll(".post-more-vertical")[e.currentTarget.index]) {
                document.querySelector(".icon-post-modal ul").children[0].style.display = 'none'
                document.querySelector(".icon-post-modal ul").children[1].innerText = '신고'
                document.querySelector(".delete-alert p").innerText ='게시글을 신고할까요?'
            } else if (e.currentTarget == navMoreBtn) {
                document.querySelector(".icon-post-modal ul").children[0].style.display = 'block'
                document.querySelector(".icon-post-modal ul").children[0].innerText = '설정 및 개인정보'
                document.querySelector(".icon-post-modal ul").children[1].innerText = '로그아웃'
                document.querySelector(".delete-alert p").innerText ='로그아웃 하시겠어요?'
            }
        }
    }

    navMoreBtn.addEventListener("click", (e) => toggleModal(e));
    screenOverlay.addEventListener("click", (e) => toggleModal(e));

    // 하단 모달 토글
    let iconPostFirstBtn = document.querySelector(".icon-post-modal ul li:nth-child(1)")
    let iconPostSecondBtn = document.querySelector(".icon-post-modal ul li:nth-child(2)")
    let deleteAlert = document.querySelector(".delete-alert");
    
    iconPostSecondBtn.addEventListener("click", (e) => {
        if(e.currentTarget.innerText === '신고') {
            console.log('신고모달on');
            localStorage.setItem('postId', idBox[0]);
            btnDelete.innerText = '신고'
            deleteAlert.classList.toggle("on");
        } else if (e.currentTarget.innerText === '로그아웃') {
            deleteAlert.classList.toggle("on");
        }
    })
    
    iconPostFirstBtn.addEventListener("click", (e) => {
        if(e.currentTarget.innerText === '삭제') {
            deleteAlert.classList.toggle("on");
            btnDelete.innerText = '삭제'
        } else if (e.currentTarget.innerText === '설정 및 개인정보') {
            window.location.href = "../pages/profile-modification.html"
        }
    })

    // 두번째 모달 - 글삭제,취소 / 로그아웃,취소 분기
    let btnCancle = document.querySelector(".btn-alert button");
    let btnDelete = document.querySelector(".btn-delete");

    btnCancle.addEventListener("click", () => {
        deleteAlert.classList.remove("on");
    })

    btnDelete.addEventListener("click", (e) => {
        switch (document.querySelector(".icon-post-modal ul").children[1].innerText) {
            case '신고': 
                reportPost();
                break;
            
            case '로그아웃' : 
                localStorage.clear();
                window.location.href = "../pages/login.html";
                break;
            default:
                break;
        }
        
    })

    // 포스트 삭제/수정 모달 토글
    setTimeout(()=>{
        
        for(i=0; i < postMoreBtn.length; i++) {
            postMoreBtn[i].index = i;
            postMoreBtn[i].addEventListener("click", (e) => toggleModal(e))
            
            document.querySelectorAll('.icon-heart')[i].addEventListener("click",(e) => {
                //좋아요/좋아요취소 부터 정하고 서버에 값 업데이트하기
                if(!e.currentTarget.src.includes('heart-fill.svg')){
                    like(e);
                }
                else if(e.currentTarget.src.includes('heart-fill.svg')){
                    dislike(e);
                }
            })
        }

    },200)
}
loadModal();

// 뒤로가기 버튼
function goBackward() {
    let btnBack = document.querySelector('#profile-nav a')
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
}
goBackward();

//신고함수
async function reportPost() {
    console.log('신고함수실행됨')
    const url = "https://api.mandarin.cf"
    const myToken = localStorage.getItem('accessToken')
    try {
        const res = await fetch(url+'/post/'+idBox[0]+'/report', {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${myToken}`,
                "Content-type" : "application/json"
            }
    
        });
        const result = await res.json();
        console.log(result);
        alert('정상적으로 신고되었습니다.');
        window.location.reload();
        
    } catch (error) {
        console.log(res);
        console.log('오류발생,존재하지 않는 글 입니다.');
    }
}

//포스트아이디 임시보관소
let idBox = [];

//댓글함수
async function getComment(e) {
    localStorage.setItem('postId', e.currentTarget.parentElement.parentElement.getAttribute('postId'));
    window.location.href = "./post.html"
}

async function love(e) {
    //좋아요 값 다시 받아서 뿌려주기
    const res = await fetch(`https://api.mandarin.cf/post/${localStorage.getItem('yourAccountId')}/userpost`, {
        method: "GET",
        headers:{
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-type" : "application/json"
        }
    });
    const json = await res.json();
    const heartCheck = json.post
    heartCheck.forEach((element, index) => {
        const HeartCount = element.heartCount
        const Hearted = element.hearted
        let heartSrc = '../../img/icon-heart.svg'
        if(Hearted) {
            heartSrc = '../../img/icon-heart-fill.svg'
        }
        document.querySelectorAll(".icon-heart")[index].src = heartSrc;
        document.querySelectorAll(".like-counter")[index].innerText = HeartCount;
    })
}

//좋아요함수
async function like(e) {
    console.log('좋아요함수실행됨')
    const url = "https://api.mandarin.cf"
    const myToken = localStorage.getItem('accessToken')
    const postId = e.currentTarget.parentElement.parentElement.parentElement.getAttribute('postId');
    try {
        const res = await fetch(url+'/post/'+postId+'/heart', {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${myToken}`,
                "Content-type" : "application/json"
            }
        })
        const result = res.json();
        love(e);
    }
    catch(error) {
        console.log(res);
        console.log('오류발생, 존재하지 않는 사용자입니다.')
    }
}

//좋아요취소함수
async function dislike(e) {
    const url = "https://api.mandarin.cf"
    const myToken = localStorage.getItem('accessToken')
    const postId = e.currentTarget.parentElement.parentElement.parentElement.getAttribute('postid');
    try {
        const res = await fetch(url+'/post/'+postId+'/unheart', {
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${myToken}`,
                "Content-type" : "application/json"
            }
        })
        const result = res.json();
        love(e);
    }
    catch(error) {
        if(res.status == 400){
            console.log(res.message);
        }
        console.log(res);
        console.log('오류발생, 존재하지 않는 사용자입니다.')
    }
}

//팔로우함수
async function follow(e) {
    console.log('팔로우함수실행됨')
    const url = "https://api.mandarin.cf"
    const myToken = localStorage.getItem('accessToken')
    try {
        const res = await fetch(url+`/profile/`+localStorage.getItem('yourAccountId')+`/follow`, {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${myToken}`,
                "Content-type" : "application/json"
            }
    
        });
        const result = await res.json();
        console.log(result);
        document.querySelector('#your-profile-wrap .M-button').classList.add('followed')
        document.querySelector('#your-profile-wrap .M-button').innerText = '언팔로우'
        
    } catch (error) {
        console.log(res);
        console.log('오류발생,존재하지 않는 사용자입니다.');
    }
}

//언팔로우함수
async function unfollow(e) {
    console.log('언팔로우함수실행됨')
    const url = "https://api.mandarin.cf"
    const myToken = localStorage.getItem('accessToken')
    try {
        const res = await fetch(url+`/profile/`+localStorage.getItem('yourAccountId')+`/unfollow`, {
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${myToken}`,
                "Content-type" : "application/json"
            }
    
        });
        const result = await res.json();
        console.log(result);
        document.querySelector('#your-profile-wrap .M-button').classList.remove('followed')
        document.querySelector('#your-profile-wrap .M-button').innerText = '팔로우'
        
    } catch (error) {
        console.log(res);
        console.log('오류발생,존재하지 않는 사용자입니다..');
    }
}

document.querySelector('.M-button').addEventListener('click', async(e) => {
    const res = await fetch(`https://api.mandarin.cf/profile/${localStorage.getItem('yourAccountId')}`, {
        method: "GET", 
        headers:{
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-type" : "application/json"
        }
    });
    const json = await res.json();
    const myProfile = json.profile
    // const userId = myProfile._id;
    const userIsfollow = myProfile.isfollow
    
    if(userIsfollow) {
        unfollow();
    }
    else if (!userIsfollow) {
        follow();
    }
})

document.querySelector('.tab-menu a:last-child').style.color = '#767676'
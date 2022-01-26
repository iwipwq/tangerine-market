// 프로필 정보 받아와서 출력하기
async function getProfile(){
    try {
        const res = await fetch(`https://api.mandarin.cf/profile/${localStorage.getItem('accountname')}`, {
        method: "GET", 
        headers:{
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-type" : "application/json"
        }
    });
    const json = await res.json();
    if(res.status == 200) {
    const myProfile = json.profile
    const userAccountname = myProfile.accountname;
    const userFollowerCount = myProfile.followerCount;
    const userFollowingCount = myProfile.followingCount;
    let userImage = myProfile.image;
    const userIntro = myProfile.intro;
    const userName = myProfile.username;

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
        <a href= "./followers.html"class="followers">
            <p class="followers-num">${userFollowerCount}</p>
            <p class="followers-text">followers</p>
        </a>
        <a href= "./followings.html" class="followings">
            <p class="followings-num">${userFollowingCount}</p>
            <p class="followings-text">followings</p>
        </a>
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
    const url = "https://api.mandarin.cf"
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
    const res = await fetch(`https://api.mandarin.cf/post/${localStorage.getItem('accountname')}/userpost`, {
        method: "GET",
        headers:{
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-type" : "application/json"
        }
    });
    const json = await res.json();
    const myPost = json.post
    console.log (json.post)
    myPost.forEach((element, index, array) => {
        let authorImage = element.author.image
        const authorAccount = element.author.accountname
        const authorName = element.author.username
        const postCommentCount = element.commentCount
        const postContent = element.content
        const postHeartCount = element.heartCount
        const postHearted = element.hearted
        const postImageRaw = element.image
        const postImage = element.image.split(',');
        const postCreateAt = element.createdAt.replace(/-/g,'')
        const postCreateAtYear = postCreateAt.slice(0,4);
        const postCreateAtMonth = postCreateAt.slice(4,6);
        const postCreateAtDay = postCreateAt.slice(6,8);
        const postId = element.author._id
        
        if (authorImage.includes("127.0.0.1")) {
            authorImage = "../../img/basic-profile-img-.png";
        }

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
                
                console.log('포스트이미지 2개이상일때 배열',postImage)
                
                document.querySelector('.post-album-view').innerHTML += `
                <li class="post-album-item"><img src="${postImage[0]}" alt="사용자 업로드 이미지" class="upload-img-album"><img src="../../img/iccon-img-layers.svg" alt="${postImage.length - 1}장의 사진 더보기" class="icon-img-layers"></li>
                `

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

                document.querySelector('.post-album-view').innerHTML += `
                <li class="post-album-item"><img src="${postImage[0]}" alt="사용자 업로드 이미지" class="upload-img-album"></li>
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
    console.log('takeOut길이',takeOutPost.length)
    console.log('takeOutPost값',takeOutPost)
    // 그림 나눠주기
    for (let postIndex=0; postIndex < takeOutPost.length; postIndex++){
        let postImage = takeOutPost[postIndex].image.split(',');
        console.log('loadPage안 if문 돌기 전 postImage',postImage);
        console.log('postIndex',postIndex);
        console.log('takeOutPost[postIndex].id값',takeOutPost[postIndex].id);
        document.querySelector(`.post-wrap._data${postIndex}`).setAttribute('postId',takeOutPost[postIndex].id)
        document.querySelector(`.post-wrap._data${postIndex} .post-comment`).addEventListener("click", (e) => {
            getComment(e)
            console.log('현재이벤트타겟',e.currentTarget);
        })
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
                        console.log("버튼 이벤트리스너 호출됨")
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

    console.log(takeOutPost);
  
         
}
loadPage();

// 모달함수
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
                document.querySelector(".icon-post-modal ul").children[0].innerText = '삭제'
                document.querySelector(".icon-post-modal ul").children[1].innerText = '수정'
                document.querySelector(".delete-alert p").innerText ='게시글을 삭제할까요?'
            } else if (e.currentTarget == navMoreBtn) {
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
        if(e.currentTarget.innerText === '수정') {
            console.log('수정페이지실행');
            localStorage.setItem('postId', idBox[0]);
            window.location.href = "../pages/post-modification.html";
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
            case '수정': 
                deletePost();
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

//글삭함수
async function deletePost() {
    const url = "https://api.mandarin.cf"
    const myName = localStorage.getItem('accountname');
    const myToken = localStorage.getItem('accessToken')
    try {
        const res = await fetch(url+'/post/'+idBox[0], {
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${myToken}`,
                "Content-type" : "application/json"
            }
    
        });
        const result = await res.json();
        alert(result.message);
        window.location.reload();
        
    } catch (error) {
        console.log(res);
        console.log('에러발생');
    }
}
//포스트아이디 임시보관소
let idBox = [];

//댓글함수
async function getComment(e) {
    localStorage.setItem('postId', e.currentTarget.parentElement.parentElement.getAttribute('postId'));
    window.location.href = "./post.html"
    const postId = e.currentTarget.parentElement.parentElement.getAttribute('postId');
    console.log(postId);
    const url = "https://api.mandarin.cf";
    const myName = localStorage.getItem('accountname');
    const myToken = localStorage.getItem('accessToken');
    try {
        const res = await fetch(url+'/post/'+postId+'/comments', {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${myToken}`,
                "Content-type" : "application/json"
            }
        })
        const comments = await res.json();
        console.log('받은 코멘트 목록',comments);
    } catch (error) {
        console.log('에러발생')
    }
}


                
                    

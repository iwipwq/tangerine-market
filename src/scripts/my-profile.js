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
                    <li>
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
    
        myPost.forEach( element => {
            const authorImage = element.author.image
            // console.log(authorImage);
            const authorAccount = element.author.accountname
            const authorName = element.author.username
            const postCommentCount = element.commentCount
            const postContent = element.content
            const postHeartCount = element.heartCount
            const postHearted = element.hearted
            const postImage = element.image
            const postCreateAt = element.createdAt.replace(/-/g,'')
            const postCreateAtYear = postCreateAt.slice(0,4);
            const postCreateAtMonth = postCreateAt.slice(4,6);
            const postCreateAtDay = postCreateAt.slice(6,8);
            // let isHeart = "no"
            // if(hearted){
            //     isHeart = 'yes'
            // }
    
        document.querySelector('.home-post').innerHTML += `
            <div class="post-wrap">
                <h2 class="sr-only">포스트 내용</h2>
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
                    <img src="${postImage}" alt="" class="post-img" />
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
        });
    }
    getMyPost()
    
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
    

                
                    

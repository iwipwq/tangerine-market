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
            console.log(res.status);
            const productsAmount = json.data
            const products = json.product 
            console.log('products',products);
            // console.log(document.querySelector('.product-ul').innerHTML);
            if(json.product == '') {
                document.querySelector('.product-area').style.display = 'none';
            } else {
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
        const postImage = element.image.split(',');
        console.log('배열로 나눈 포스트이미지',postImage);
        console.log('문자열 그대로 포스트이미지',postImageRaw);
        const postCreateAt = element.createdAt.replace(/-/g,'')
        const postCreateAtYear = postCreateAt.slice(0,4);
        const postCreateAtMonth = postCreateAt.slice(4,6);
        const postCreateAtDay = postCreateAt.slice(6,8);
        const postId = element.author._id
        console.log('id값',postId)
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
                //     console.log('1순회당 이미지',postImage[i])
                //     console.log('순회',i)
                //     console.log('this i는 뭐임',this.i)
                //     console.log('this getMyPost는 뭐임',this.getMyPost)
                //     console.log('순회당 imgCont내용물',imgCont)
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
    


// 포스트 삭제/수정 모달 토글
// let postMoreBtn = document.querySelector(".post-more-vertical")
// document.querySelector(".post-more-vertical").addEventListener("click", toggleModal)

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
    // await getMyPost();
    const takeOutPost = await getMyPost();
    console.log('takeOut길이',takeOutPost.length)
    console.log('takeOutPost값',takeOutPost)
    // 그림 나눠주기
    for (let postIndex=0; postIndex < takeOutPost.length; postIndex++){
        // document.querySelector(`._data${postIndex}`).setAttribute(name,value)
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
                
                // setTimeout(() => {console.log("this is the first message")}, 5000);
                setTimeout(() => {
                    console.log("setTimeOut 150시작")
                    imgCont.appendChild(imgList)
                    imgList.appendChild(imgItem)
                    imgItem.src = postImage[i]
                    console.log(i,'번재 순회 이미지',postImage[i])
                    console.log(i,'순회째')
                    console.log(postImage)
                    console.log('this i는 뭐임',this.i)
                    console.log('this getMyPost는 뭐임',this.getMyPost)
                    console.log(i,'번째 순회 imgCont내용물',imgCont)

                    let imgBtn = document.createElement('li')
                    imgBtn.className =`post-img-btn _index${i}`;
                    
                    let imgBtnCont = document.querySelector(`._data${postIndex} .post-img-btn-container`)
                    
                    // function scrollCont() {
                    //     document.querySelector(`._data${postIndex} .post-img-btn-container`).scrollTo({
                    //         left: 304 * i ,
                    //         behavior: 'smooth'
                    //     })
                    //     console.log('스크롤함수호출됨')
                    // }
                    imgBtn.addEventListener('click',(e)=>{
                        console.log("버튼 이벤트리스너 호출됨")
                        // e.currentTarget.parentElement.children.classList.remove('btn-on')
                        // e.currentTarget.parentElement.firstElementChild.classList.remove(':first-child')
                        // e.currentTarget.classList.toggle('btn-on')
                        // e.currentTarget.parentElement.parentElement.parentElement.parentElement.clientWidth

                        e.currentTarget.parentElement.previousElementSibling.style.transitionDuration = ".3s";
                        // e.currentTarget.parentElement.previousElementSibling.style.right = `${304* i}px`;
                        e.currentTarget.parentElement.previousElementSibling.scrollTo({
                                    left: parseInt(getComputedStyle(e.currentTarget.parentElement.parentElement).width) * i ,
                                    behavior: 'smooth'
                                })
                                
                        console.log('이벤트리스너 안의 i값',i)
                        console.log('imgBtn의 currentTarget의 부모의첫번째형제 ',e.currentTarget.parentElement.previousElementSibling);
                        console.log('스크롤함수호출됨')
                    })
                    imgBtnCont.appendChild(imgBtn)
                    console.log('setTimeOut150 끝')
                }, 150);
                
            }

        } else if (postImage[0] =='') {
            console.log('이미지없음')
        }

        
    }

    console.log(takeOutPost);
    // if (document.querySelector('post-img-container').innerHTML == '')
    // imgIndex = document.querySelector(".post-img-container");
    // console.log(imgIndex)
    // scrollBtn = document.querySelector(".post-img-btn");
    // console.log(scrollBtn)
    
    
    // scrollBtn.addEventListener("click", (e) => {
    //     imgIndex.cloneNode
    // })

    //--------------------------모달관련------------------------------

    // if(e.currentTarget == postMoreBtn) {
    //     let newLi = document.createElement("li");
    //     newLi.innerText = "웹 사이트에서 상품 보기"
    //     document.querySelector(".icon-post-modal ul").children[0].innerText = ''
    //     document.querySelector(".icon-post-modal ul").children[1].innerText = ''
    //     insertAfter(document.createElement("li"), document.querySelector(".icon-post-modal ul").lastElementChild)
    // }

    //utility
    function insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }

    // function modalSelector(){
    //     // 하단 모달창 토글
    //     let navMoreBtn = document.querySelector(".call-bottom-modal");
    //     let bottomModal = document.querySelector(".icon-post-modal");
    //     let screenOverlay = document.querySelector(".screen-overlay");
    //     let existigNode = inserAfter(newNode, existingNode);

        
    //         let newLi = document.createElement("li");
    //         document.querySelector(".icon-post-modal ul").children[0].innerText = '삭제'
    //         document.querySelector(".icon-post-modal ul").children[1].innerText = '수정'
                
    // }   

    // 하단 모달창 토글
    
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
        console.log('this.target로그',e.currentTarget);
        console.log('postMoreBtn[i]값',postMoreBtn[i]);
        console.log('커런트타겟 postMoreBtn이랑 같은지',e.currentTarget == document.querySelectorAll(".post-more-vertical")[e.currentTarget.index]);
        console.log('e.currenttarget.nodeIndex',e.currentTarget.index,)
            if(e.currentTarget == document.querySelectorAll(".post-more-vertical")[e.currentTarget.index]) {
                console.log('this.target로그',e.currentTarget);
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
            console.log('설정 및 개인정보 ->프로필수정페이지로')
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
                console.log('삭제실행');
                console.log('삭제모달 현재타겟',e.currentTarget)
                deletePost();
                
                break;
            
            case '로그아웃' : 
                localStorage.removeItem("accessToken");
                window.location.href = "../pages/login.html";
                break;
            default:
                break;
        }
        
    })
    
    // 포스트 삭제/수정 모달 토글
    setTimeout(()=>{
        console.log('셋타임200시작')
        
        for(i=0; i < postMoreBtn.length; i++) {
            console.log('index값',i)
            console.log('postMoreBtn[index]값',postMoreBtn[i]) 
            postMoreBtn[i].index = i;
            postMoreBtn[i].addEventListener("click", (e) => toggleModal(e))
        }
        console.log('셋타임200종료')
    },200)

    //--------------------------모달관련 끝------------------------------

    // 뒤로가기 버튼

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
loadPage();

// scrollBtn("click", (e) => {
// imgIndex.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
// })

//글삭함수
async function deletePost() {
    const url = "http://146.56.183.55:5050"
    const myName = localStorage.getItem('accountname');
    const myToken = localStorage.getItem('accessToken')
    console.log('내 토큰 잘 들어왔나',myToken);
    try {
        const res = await fetch(url+'/post/'+idBox[0], {
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${myToken}`,
                "Content-type" : "application/json"
            }
    
        });
        const result = await res.json();
        console.log(res);
        console.log(result);
        console.log(result.message);
        alert(result.message);
        window.location.reload();
        //DELETE /post/:post_id
        
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
    const url = "http://146.56.183.55:5050";
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
    //GET /post/:post_id/comments
}


                
                    

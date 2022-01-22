const token = localStorage.getItem("accessToken");
const postId = localStorage.getItem("postId");
const userId = localStorage.getItem("userId");

console.log("id", userId);
//토큰 확인
function checkToken() {
  if (!token) {
    window.location.href = "/src/pages/login.html";
  }
}
checkToken();

//포스트 작성
async function getPost() {
  const url = "http://146.56.183.55:5050";
  try {
    const res = await fetch(`${url}/post/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const resJson = await res.json();
    const post = resJson.post;
    let authorImage = post.author.image;
    const authorAccount = post.author.accountname;
    const authorName = post.author.username;
    const commentCount = post.commentCount;
    const content = post.content;
    const heartCount = post.heartCount;
    const postImage = post.image.split(",")[0];
    const createDate = post.createdAt;
    const date = new Date(createDate);
    const getYear = date.getFullYear();
    const getMonth = date.getMonth() + 1;
    const getDate = date.getDate();
    const hearted = likeHeart(post.hearted);
    const myProfileImage = localStorage.getItem("profileImage");

    if (authorImage != "1641803765586.png") {
      authorImage = post.author.image;
    } else {
      //기본이미지
      authorImage = "http://146.56.183.55:5050/1641803765586.png";
    }

    document.querySelector(".post-main .home").innerHTML += `
    <article class="home-post">
      <h2 class="sr-only">포스트섹션</h2>
      <a class="user-profile"
        ><img
          src="${authorImage}"
          alt="프로필 사진"
          class="basic-profile-img"
      /></a>
      <section class="post-section">
        <h3>
          <a href="javascript:void(0)" class="typography--h3"
            >${authorName}</a
          >
        </h3>
        <a href="javascript:vold(0)" class="post-more-vertical">
          <img
            src="../../img/s-icon-more-vertical.svg"
            alt=""
            class="s-icon-more-vertical"
          />
        </a>
        <a class="post-author typography--a">${authorAccount}</a>
        <p class="post-text typography--p">
          ${content}
        </p>
  
        <img
          src="${postImage}"
          onerror="this.style.display='none'"
          alt="포스트 이미지"
          class="post-img"
        />
        <button class="like" type="button">
          <img
            src="${hearted}"
            alt="좋아요"
            class="icon-heart"
          />
        </button>
        <span class="like-counter typography--a1">${heartCount}</span>
        <a href="post.html" class="post-comment">
          <img
            src="../../img/icon-message-circle-small.svg"
            alt="댓글달기"
            class="icon-message-circle-small"
          />
        </a>
        <span class="comment-counter typography--a1">${commentCount}</span>
        <small class="post-date">${getYear}년 ${getMonth}월 ${getDate}일</small>
      </section>
    </article>
  `;
    document.querySelector(".comment .basic-profile").src = myProfileImage;
  } catch (err) {
    console.log("요청실패");
  }
}

function likeHeart(value) {
  if (value) {
    console.log("하트있음");
    return "../../img/icon-heart-fill.svg";
  } else {
    console.log("하트없음");
    return "../../img/icon-heart.svg";
  }
}

getPost();

//댓글 리스트 작성
async function getComment() {
  const url = "http://146.56.183.55:5050";
  try {
    const res = await fetch(`${url}/post/${postId}/comments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const resJson = await res.json();
    console.log("댓글리스트", resJson);
    const comments = resJson.comments;
    comments.forEach((comment) => {
      const authorName = comment.author.username;
      let authorProfileImg = comment.author.image;
      const content = comment.content;
      const day = comment.createdAt;
      const writeDay = timeForToday(day);
      let commentId = comment.id;
      let authorId = comment.author._id;
      console.log("코멘트id", commentId);
      if (authorProfileImg != "1641803765586.png") {
        authorProfileImg = comment.author.image;
      } else {
        authorImage = "http://146.56.183.55:5050/1641803765586.png";
      }
      document.querySelector(".comment-box").innerHTML += `
      <ul>
      <li class="comment-list" >
        <div class="user-comment">
          <div class="tit-comment">
            <img
              src="${authorProfileImg}"
              alt="유저 프로필 사진"
              class = "basic-profile-img"
            />
            <strong class="txt-username">${authorName}</strong>
            <span class="txt-time">${writeDay}</span>
          </div>
          <button type="button" class="btn-more">
            <img
              src="../../img/s-icon-more-vertical.svg"
              alt="댓글옵션보기"
              class="img-more modal-btn"
              data-id="${commentId}"
              data-user="${authorId}"
            />
          </button>
        </div>
        <p class="txt-comment">${content}</p>
      </li>
    </ul>
    `;
    });

    ///내 댓글이 아닌 경우 신고 모달
    // 댓글 삭제 모달창
    const modalBtn = document.querySelectorAll(".modal-btn");
    let deleteModal = document.querySelector(".comment-delete-modal");
    let declarationModal = document.querySelector(".comment-Declaration-modal");
    let screenOverlay = document.querySelector(".screen-overlay");
    let deleteAlert = document.querySelector(".delete-alert");

    modalBtn.forEach((modal) => {
      const id = modal.getAttribute("data-id");
      const author = modal.getAttribute("data-user");
      modal.addEventListener("click", () => {
        // let overlayCheck = deleteAlert.classList.contains("on");
        if (author == userId) {
          commentId = id;
          deleteModal.classList.add("modal-popup");
          screenOverlay.classList.add("overlay-on");
        } else {
          screenOverlay.classList.add("overlay-on");
          declarationModal.classList.add("modal-popup");
          console.log("당신것이 아닙니다.");
        }
      });
    });

    screenOverlay.addEventListener("click", () => {
      deleteModal.classList.remove("modal-popup");
      declarationModal.classList.remove("modal-popup");
      screenOverlay.classList.remove("overlay-on");
    });

    // 댓글 삭제 모달 토글
    let deleteCommentModal = document.querySelector(
      ".comment-delete-modal ul li"
    );
    deleteCommentModal.addEventListener("click", () => {
      deleteAlert.classList.toggle("on");
      const screenCheck = screenOverlay.classList.contains("overlay-on");
      if (screenCheck) {
        screenOverlay.style.pointerEvents = "none";
      }
    });

    let btnCancle = document.querySelector(".btn-alert button");
    let btnDelete = document.querySelector(".btn-delete");

    btnCancle.addEventListener("click", () => {
      deleteAlert.classList.remove("on");
      screenOverlay.style.pointerEvents = "auto";
    });

    btnDelete.addEventListener("click", () => {
      deleteComment(commentId);
    });
  } catch (err) {
    console.log("요청실패");
  }
}
getComment();

// 댓글 작성 시기 몇분전, 시간, 일, 년
function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

//버튼 활성화
function activePublishBtn() {
  if (inputComment.value) {
    publishBtn.style.color = "#F26E22";
    publishBtn.removeAttribute("disabled");
  } else {
    publishBtn.style.color = "#C4C4C4";
    publishBtn.setAttribute("disabled", "disabled");
  }
}
let inputComment = document.querySelector(".input-comment");
let publishBtn = document.querySelector(".publish-btn");
inputComment.addEventListener("keyup", activePublishBtn);
publishBtn.addEventListener("click", writeComment);

//댓글 게시
async function writeComment() {
  const url = "http://146.56.183.55:5050";
  try {
    const res = await fetch(`${url}/post/${postId}/comments`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        comment: {
          content: inputComment.value,
        },
      }),
    });
  } catch (err) {
    console.log("요청실패");
  }
  location.reload();
}

//댓글 삭제
async function deleteComment(data) {
  const url = "http://146.56.183.55:5050";
  try {
    const res = await fetch(`${url}/post/${postId}/comments/${data}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (err) {
    console.log("요청실패");
  }
  location.reload();
}

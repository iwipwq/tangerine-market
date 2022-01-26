let token = localStorage.getItem("accessToken");

function checkToken() {
  if (!token) {
    window.location.href = "../pages/login.html";
  }
}
checkToken();

//좋아요함수

async function getFollowingFeed() {
  const url = "https://api.mandarin.cf";
  try {
    const res = await fetch(url + "/post/feed", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const resJson = await res.json();

    if (resJson.posts.length != 0) {
      printFeed(resJson.posts);
    } else {
      printNoFeed();
    }

    appearModal();
    savePostId();
    saveYourAccountId();
    likeChange();
  } catch (err) {
    if (res.status == 401) {
      alert("인증이 만료 되었습니다, 다시 로그인해주세요.");
      location.href = "./login.html";
    } else {
      alert("죄송합니다, 서버관리자에게 문의하거나 잠시 후 다시 시도해주세요");
      location.href = "./home.html";
    }
  }
}
getFollowingFeed();

function printNoFeed() {
  const postCont = document.querySelector(".post");
  postCont.classList.add("on");
  postCont.innerHTML += `
  <h2 class="sr-only">포스트섹션</h2>
  <div class="nofeed-search">
    <img src="../../img/symbol-logo-gray.png" alt="감귤마켓로고" />
    <strong>유저를 검색해 팔로우 해보세요!</strong>
    <a href="search.html">검색하기</a>
  </div>
  `;
}

function printFeed(posts) {
  posts.forEach((post) => {
    const hearted = likeHeart(post.hearted);
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
    if (authorImage.includes("127.0.0.1")) {
      authorImage = "../../img/basic-profile.png";
    } else if (authorImage.includes("http")) {
      authorImage = post.author.image;
    } else {
      authorImage = "../../img/basic-profile.png";
    }
    document.querySelector(".post").innerHTML += `
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
        <a href="your-profile.html" class="typography--h3 your-link" data-account="${authorAccount}"
          >${authorName}</a
        >
        </h3>
        <a href="your-profile.html" class="post-author typography--a your-link" data-account="${authorAccount}">${authorAccount}</a>
      <a href="#none" class="post-more-vertical">
        <img
          src="../../img/s-icon-more-vertical.svg"
          alt="포스트 신고 버튼"
          class="s-icon-more-vertical modal-btn"
        />
      </a>
      <p class="post-text typography--p">
        ${content}
      </p>

      <img
        src="${postImage}"
        onerror="this.style.display='none'"
        alt="포스트 이미지"
        class="post-img"
      />
      <button class="like" type="button" data-post="${post.id}" data-heart="${post.hearted}">
        <img
          src="${hearted}"
          alt="좋아요"
          class="icon-heart"
        />
      </button>
      <span class="like-counter typography--a1">${heartCount}</span>
      <a href="post.html" class="post-comment" data-post="${post.id}">
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
  });
}

function savePostId() {
  const commentBtn = document.querySelectorAll(".post-comment");
  commentBtn.forEach((comment) => {
    const postId = comment.getAttribute("data-post");
    comment.addEventListener("click", () => {
      localStorage.setItem("postId", postId);
    });
  });
}

function saveYourAccountId() {
  const linkProfile = document.querySelectorAll(".your-link");
  linkProfile.forEach((link) => {
    const yourAccountId = link.getAttribute("data-account");
    link.addEventListener("click", () => {
      localStorage.setItem("yourAccountId", yourAccountId);
    });
  });
}

function likeHeart(value) {
  if (value) {
    return "../../img/icon-heart-fill.svg";
  } else {
    return "../../img/icon-heart.svg";
  }
}

function appearModal() {
  const iconMoreVertical = document.querySelectorAll(".modal-btn");
  const bottomModal = document.querySelector(".icon-post-modal");
  const screenOverlay = document.querySelector(".screen-overlay");

  iconMoreVertical.forEach((btn) => {
    btn.addEventListener("click", () => {
      bottomModal.classList.toggle("modal-popup");
      screenOverlay.classList.toggle("overlay-on");
    });
  });
  screenOverlay.addEventListener("click", () => {
    bottomModal.classList.toggle("modal-popup");
    screenOverlay.classList.toggle("overlay-on");
  });
}

function likeChange() {
  const likeBtn = document.querySelectorAll(".like");
  likeBtn.forEach((like) => {
    const postId = like.getAttribute("data-post");
    like.addEventListener("click", () => {
      if (like.childNodes[1].src.includes("heart-fill")) {
        dislike(postId);
        like.nextElementSibling.innerText =
          like.nextElementSibling.innerText - 1;
        like.childNodes[1].setAttribute("src", "../../img/icon-heart.svg");
      } else {
        likes(postId);
        like.nextElementSibling.innerText =
          Number(like.nextElementSibling.innerText) + 1;
        like.childNodes[1].setAttribute("src", "../../img/icon-heart-fill.svg");
      }
    });
  });
}

async function likes(postId) {
  const url = "https://api.mandarin.cf";
  try {
    const res = await fetch(url + "/post/" + postId + "/heart", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    const result = res.json();
    // love();
  } catch (error) {}
}

//좋아요취소함수
async function dislike(postId) {
  const url = "https://api.mandarin.cf";

  try {
    const res = await fetch(url + "/post/" + postId + "/unheart", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    const result = res.json();
    // love();
  } catch (error) {
    if (res.status == 400) {
    }
  }
}

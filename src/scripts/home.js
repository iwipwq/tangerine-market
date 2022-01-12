let token = localStorage.getItem("accessToken");

function checkToken() {
  if (!token) {
    window.location.href = "/src/pages/login.html";
  }
}
checkToken();

async function getFollowingFeed() {
  const url = "http://146.56.183.55:5050";
  try {
    const res = await fetch(url + "/post/feed", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const resJson = await res.json();
    const posts = resJson.posts;
    posts.forEach((post) => {
      const authorImage = post.author.image;
      const authorAccount = post.author.accountname;
      const authorName = post.author.username;
      const commentCount = post.commentCount;
      const content = post.content;
      const heartCount = post.heartCount;
      const postImage = post.image;
      const createDate = post.createdAt;
      const date = new Date(createDate);
      const getYear = date.getFullYear();
      const getMonth = date.getMonth() + 1;
      const getDate = date.getDate();

      // const hearted = post.hearted;
      // let isHeart = "no";
      // if (hearted) {
      //   isHeart = "yes";
      // }
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
                  src="../../img/icon-heart.svg"
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
      const likeBtn = document.querySelector(".like");
      const iconHeart = likeBtn.querySelector(".icon-heart");
      function likeUpDown() {
        if (iconHeart.classList.contains("on")) {
          iconHeart.classList.remove("on");
          iconHeart.src = "../../img/icon-heart.svg";
        } else {
          iconHeart.classList.add("on");
          iconHeart.src = "../../img/icon-heart-fill.svg";
        }
      }

      likeBtn.addEventListener("click", likeUpDown);
    });
  } catch (err) {
    console.log("요청실패");
  }
}
getFollowingFeed();

//좋아요 기능 ui만

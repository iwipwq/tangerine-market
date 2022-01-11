const likeBtn = document.querySelector(".like");
const iconHeart = likeBtn.querySelector(".icon-heart");
const likeCounter = document.querySelector(".like-counter");

//좋아요 기능 ui만
function likeUpDown() {
  if (iconHeart.classList.contains("on")) {
    iconHeart.classList.remove("on");
    iconHeart.src = "../../img/icon-heart.svg";
    likeCounter.innerText = parseInt(likeCounter.innerText) - 1;
  } else {
    iconHeart.classList.add("on");
    iconHeart.src = "../../img/icon-heart-fill.svg";
    likeCounter.innerText = parseInt(likeCounter.innerText) + 1;
  }
}

likeBtn.addEventListener("click", likeUpDown);

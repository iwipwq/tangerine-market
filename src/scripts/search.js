let token = localStorage.getItem("accessToken");

function checkToken() {
  if (!token) {
    window.location.href = "../pages/login.html";
  }
}
checkToken();

const searchInput = document.querySelector(".serch-user");
searchInput.addEventListener("keyup", () => {
  const userList = document.querySelector(".user-list");
  if (searchInput.value) {
    userList.innerHTML = "";
    getUserList(searchInput.value);
  } else {
    userList.innerHTML = "";
  }
});
async function getUserList(word) {
  const url = "https://api.mandarin.cf";
  try {
    const res = await fetch(url + `/user/searchuser/?keyword=${word}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const resJson = await res.json();
    console.log(resJson);
    const userList = document.querySelector(".user-list");
    resJson.forEach((res) => {
      userList.innerHTML += `
    <li class="user-search">
      <a href="your-profile.html" class="user-list-link" data-account="${res.accountname}">
          <img
            src="${res.image}"
            alt="프로필 사진"
            class="user-search-img"
          />
          <div class="user-name">
            <p class="user-name-title">${res.username}</p>
            <p class="user-name-sub">@ ${res.accountname}</p>
          </div>
      </a>
    </li>
    `;
    });
    const listLink = document.querySelectorAll(".user-list-link");
    console.log("리스트링크", listLink);
    listLink.forEach((item) => {
      const yourAccountId = item.getAttribute("data-account");
      console.log(yourAccountId);
      item.addEventListener("click", () => {
        localStorage.setItem("yourAccountId", yourAccountId);
      });
    });
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

getUserList();

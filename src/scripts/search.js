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
    printUserList(resJson);
    getAccountId();
    wordHighlight(word);
  } catch (err) {}
}

function printUserList(userInfo) {
  const userList = document.querySelector(".user-list");

  userInfo.forEach((user) => {
    if (user.image.includes("127.0.0.1")) {
      user.image = "../../img/basic-profile.png";
    }
    userList.innerHTML += `
  <li class="user-search">
    <a href="your-profile.html" class="user-list-link" data-account="${user.accountname}">
        <img
          src="${user.image}"
          alt="프로필 사진"
          class="user-search-img"
        />
        <div class="user-name">
          <p class="user-name-title">${user.username}</p>
          <p class="user-name-sub">@ ${user.accountname}</p>
        </div>
    </a>
  </li>
  `;
  });
}

function getAccountId() {
  const listLink = document.querySelectorAll(".user-list-link");
  listLink.forEach((item) => {
    const yourAccountId = item.getAttribute("data-account");
    item.addEventListener("click", () => {
      localStorage.setItem("yourAccountId", yourAccountId);
    });
  });
}

function wordHighlight(word) {
  const regex = new RegExp(word, "g");
  const userName = document.querySelectorAll(".user-name-title");
  userName.forEach((e) => {
    e.innerHTML = e.innerHTML.replace(
      regex,
      "<span class='highlight'>" + word + "</span>"
    );
  });
}

getUserList();

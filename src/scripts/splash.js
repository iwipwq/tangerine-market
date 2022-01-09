let token = localStorage.getItem("accessToken");

function checkToken() {
  if (token) {
    window.location.href = "/src/pages/home.html";
  } else {
    window.location.href = "/src/pages/login.html";
  }
}

setTimeout(checkToken, 500);

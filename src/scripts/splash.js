let token = localStorage.getItem("accessToken");

function checkToken() {
  if (token) {
    window.location.href = "../pages/home.html";
  } else {
    window.location.href = "../pages/login.html";
  }
}

setTimeout(checkToken, 500);

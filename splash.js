let token = localStorage.getItem("accessToken");

function checkToken() {
  if (token) {
    window.location.href = "/home.html";
  } else {
    window.location.href = "/login.html";
  }
}

setTimeout(checkToken, 500);

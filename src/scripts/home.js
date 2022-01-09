let token = localStorage.getItem("accessToken");

function checkToken() {
  if (!token) {
    window.location.href = "/login.html";
  }
}
checkToken();

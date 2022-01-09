let token = localStorage.getItem("accessToken");

function checkToken() {
  if (!token) {
    window.location.href = "/src/pages/login.html";
  }
}
checkToken();

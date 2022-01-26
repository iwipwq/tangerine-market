let token = localStorage.getItem("accessToken");

function splash() {
  if (token) {
    window.location.href = "../pages/home.html";
  }
}

setTimeout(splash, 1000);

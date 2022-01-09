let token = localStorage.getItem("accessToken");

function splash() {
  if (token) {
    window.location.href = "/home.html";
  }
}

setTimeout(splash, 1000);

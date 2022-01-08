let token = localStorage.getItem("accessToken");

function splash() {
  if (token) {
    window.location.href = "/home.html";
  } else {
    // window.location.href = "/login.html";
  }
}

setTimeout(splash, 1000);

// 하단 모달창 토글
let iconMoreVertical = document.querySelector(".call-bottom-modal");
let bottomModal = document.querySelector(".icon-post-modal");
let screenOverlay = document.querySelector(".screen-overlay");

iconMoreVertical.addEventListener("click", ()=> {
    let overlayCheck = deleteAlert.classList.contains("on")
    if(!overlayCheck) {
    bottomModal.classList.toggle("modal-popup");
    screenOverlay.classList.toggle("overlay-on");
    }
})

screenOverlay.addEventListener("click", () => {
    let overlayCheck = deleteAlert.classList.contains("on")
    if(!overlayCheck) {
    bottomModal.classList.toggle("modal-popup");
    screenOverlay.classList.toggle("overlay-on");
    }
})

// 로그아웃 모달 토글
let iconPostLogOut = document.querySelector(".icon-post-modal ul li:nth-child(2)")
let deleteAlert = document.querySelector(".delete-alert");
iconPostLogOut.addEventListener("click", () => {
    deleteAlert.classList.toggle("on");
})

// 로그아웃 모달 로그아웃기능
let btnCancle = document.querySelector(".btn-alert button");
let btnDelete = document.querySelector(".btn-delete");

btnCancle.addEventListener("click", () => {
    deleteAlert.classList.remove("on");
})

btnDelete.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login.html";
})

// 리스트보기, 앨범보기 토글
let btnListView = document.querySelector(".btn-list-on");
let btnAlbumView = document.querySelector(".btn-album-on");
let homePost = document.querySelectorAll(".home-post");

btnListView.addEventListener("click",()=> {
    if (homePost[1].className === "home-post-album") {
    homePost.forEach(element => {
        element.className ="home-post"
    });
    let albumOff = btnAlbumView.innerHTML.replace(/-on/g,'-off');
    btnAlbumView.innerHTML = albumOff;
    let listOn = btnListView.innerHTML.replace(/-off/g,'-on');
    btnListView.innerHTML = listOn;
    }
})

btnAlbumView.addEventListener("click",()=> {
    if (homePost[0].className === "home-post") {
    homePost.forEach(element => {
        element.className = "home-post-album"
    });
    }
    let listOff = btnListView.innerHTML.replace(/-on/g,'-off');
    btnListView.innerHTML =listOff;
    let albumOn = btnAlbumView.innerHTML.replace(/-off/g,'-on');
    btnAlbumView.innerHTML =albumOn;
})


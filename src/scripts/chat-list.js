// 뒤로가기 버튼

let btnBack = document.querySelector('.chat-list-header .top-basic-nav a')
btnBack.addEventListener('click', () => {
    // 나중에 홈페이지주소넣기
    if (document.referrer.includes('127.0.0.1:5502')) {
      console.log('true')
      window.history.back();
    }
    else {
      window.location.href = "home.html";
    }
})         
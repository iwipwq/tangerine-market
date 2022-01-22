let token = localStorage.getItem("accessToken");

function checkToken() {
  if (token) {
    window.location.href = "/src/pages/login.html";
  }
}

setTimeout(checkToken, 500);

let keyword = document.getElementById("input-search")


//GET /user/searchuser/?keyword=keyword

const url = "http://146.56.183.55:5050/"
try{

	const res = await fetch(url+"/user/searchuser/?keyword="+keyword, {
                    headers: {
                        "Authorization" : token,
                        "Content-Type": "application/json",
                    },
                })
	const resJson = await res.json()
	console.log(resJson)
}catch(err){
}
//팔로워 정보 가져오기
const token = localStorage.getItem("token"); 
async function getFollowers() {
    const url = `http://146.56.183.55:5050/profile/${username}/follower`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        }
    })
    const json = await res.json();
    // console.log(json);
    json.forEach(follower => {
        document.querySelector('.followers-list').innerHTML += `<div class="user-follow">
                            <img src="${follower.image}" alt="" class="user-search-img" />
                            <div class="user-name">
                                <p class="user-name-title">"${follower.username}"</p>
                                <p class="user-name-sub">"${follower.intro}"</p>
                            </div>
                            <button class="S-button">팔로우</button>
                        </div>`
    })
}


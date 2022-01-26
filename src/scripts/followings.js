//팔로잉 정보 가져오기
const username = localStorage.getItem("accountname")
const token = localStorage.getItem("accessToken"); 
async function getFollowings() {
    const url = `https://api.mandarin.cf/profile/${username}/following`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        }
    })
    const json = await res.json();
    console.log(json);
    json.forEach(follower => {
        document.querySelector('.followers-list').innerHTML += `<div class="user-follow">
                            <img src="${follower.image}" alt="" class="user-search-img f-image" />
                            <div class="f-user-name">
                                <p class="user-name-title">${follower.username}</p>
                                <p class="user-name-sub">${follower.intro}</p>
                            </div>
                            <button class="S-button">팔로우</button>
                        </div>`
    })
}
getFollowings();


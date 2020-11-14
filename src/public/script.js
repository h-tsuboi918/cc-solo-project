const register = async () => {
    const username = document.getElementById("username").value;
    const user = await fetch("http://localhost:5000/api/users", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: username }) })
        .then((res) => res.json())
        .catch((err) => console.error(err));
    document.cookie = "userid=" + user.id;
    let userInput = document.getElementById("user-input");
    let tweetInput = document.getElementById("tweet-input");
    if (user !== undefined) {
        userInput.hidden = true;
        tweetInput.hidden = false;
    } else {
        userInput.hidden = false;
        tweetInput.hidden = true;
    }
};

const addTweet = async () => {
    const user = checkuser();
    const tweetText = document.getElementById("tweet").value;
    const tweet = await fetch("http://localhost:5000/api/users/" + user.value + "/tweets",
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: tweetText })
        })
        .then((res) => res.json())
        .catch((err) => console.error(err));
    console.log(tweet);
    await loadTweet();
};

const checkuser = () => {
    const cookies = document.cookie.split(";").map((cookie) => {
        c = cookie.split("=");
        return {
            key: c[0],
            value: c[1]
        }
    });
    return cookies.find((cookie) => cookie.key == "userid");
};


const loadTweet = async () => {
    const tweetList = await fetch("http://localhost:5000/api/tweets", { method: "GET" })
        .then((res) => res.json())
        .catch((err) => console.error(err));
    console.log(tweetList);
    let tweetDisplay = document.getElementById("tweet-display");
    tweetDisplay.innerHTML = "";
    for (let tw of tweetList) {
        console.log(tw);
        let dt = document.createElement('dt');
        dt.textContent = tw.user.username;
        let dd = document.createElement('dd');
        dd.textContent = tw.text;
        let div = document.createElement('div');
        div.appendChild(dt);
        div.appendChild(dd);
        tweetDisplay.prepend(div);
    }
};

window.onload = async () => {
    const user = checkuser();
    let userInput = document.getElementById("user-input");
    let tweetInput = document.getElementById("tweet-input");
    if (user !== undefined) {
        userInput.hidden = true;
        tweetInput.hidden = false;
    } else {
        userInput.hidden = false;
        tweetInput.hidden = true;
    }
    loadTweet();
};


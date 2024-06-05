(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {type, value, videoId} = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        } else if (type=== "PLAY") {
            youtubePlayer.currentTime = value;
        }
    });

    //current video has bookmarks?
    const fetchBookmarks = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([currentVideo], (obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            })
        })
    }
     
    const newVideoLoaded = async () => {
        const bookmarkBtnExists = document.getElementByClassName("bookmark-btn")[0]
        currentVideoBookmarks = await fetchBookmarks();

        if (!bookmarkBtnExists) {
            //create element bookmark element for html page
            const bookmarkBtn = document.createElement("img")

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png")
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0]
            youtubePlayer = document.getElementsByClassName("video-stream")[0]

            //add the bookmarkBtn icon
            youtubeLeftControls.appendChild(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);

        }
    }

    const addNewBookmarkEventHandler = async () => {
        const currentTime = yotuubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
        }

        currentvideoBookmarks = await fetchBookmarks();

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        })
    }
})();

const gettime = t => {
    var date = newDate(0);
    date.setSeconds(t);

    return date.toISOString().substr(11, 8)
}
document.addEventListener("DOMContentLoaded", () => {
    let counter = document.getElementById('counter');
    let count = 0;
    let intervalId;
    let likes = {};
    let isPaused = false;

    function startTimer() {
        intervalId = setInterval(() => {
            count++;
            counter.innerText = count;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(intervalId);
    }

    function updateCounter(value) {
        count += value;
        counter.innerText = count;
    }

    function likeNumber() {
        if (likes[count]) {
            likes[count]++;
        } else {
            likes[count] = 1;
        }
        displayLikes();
    }

    function displayLikes() {
        let likesList = document.querySelector('.likes');
        likesList.innerHTML = ''; 
        for (let num in likes) {
            let li = document.createElement('li');
            li.innerText = `${num} has been liked ${likes[num]} times`;
            likesList.appendChild(li);
        }
    }

    function togglePause() {
        if (isPaused) {
            startTimer();
            document.getElementById('pause').innerText = "pause";
        } else {
            stopTimer();
            document.getElementById('pause').innerText = "resume";
        }
        isPaused = !isPaused;
    }

    function addComment(event) {
        event.preventDefault();
        let commentInput = document.getElementById('comment-input');
        let commentText = commentInput.value;

        if (commentText !== '') {
            let commentList = document.getElementById('list');
            let newComment = document.createElement('p');
            newComment.innerText = commentText;
            commentList.appendChild(newComment);
            commentInput.value = ''; 
        }
    }

    startTimer();

    document.getElementById('plus').addEventListener('click', () => {
        updateCounter(1);
    });

    document.getElementById('minus').addEventListener('click', () => {
        updateCounter(-1);
    });

    document.getElementById('heart').addEventListener('click', likeNumber);

    document.getElementById('pause').addEventListener('click', togglePause);

    document.getElementById('comment-form').addEventListener('submit', addComment);
});

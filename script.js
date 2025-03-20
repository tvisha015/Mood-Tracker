document.addEventListener("DOMContentLoaded", () => {
    loadMoods();
});

function selectMood(mood) {
    let now = new Date();
    let formattedDate = now.toLocaleDateString("en-GB"); 
    let formattedTime = now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true }); 

    const moodNames = {
        "😊": "Happy",
        "😐": "Neutral",
        "😢": "Sad",
        "😡": "Angry",
        "😆": "Excited"
    };

    const moodMessages = {
        "😊": "Spread more happiness! 🎉",
        "😐": "It okay not to be okay, buddy! ❤️‍🩹",
        "😢": "Someone bring ice cream, please! 🍦",
        "😡": "Take a chill pill!",
        "😆": "Laughing makes you healthier! "
    };

    let moodEntry = {
        mood: mood,
        moodName: moodNames[mood] || "Unknown",
        message: moodMessages[mood] || "Feeling something..",
        time: formattedTime,
        date: formattedDate
    };

    let moods = JSON.parse(localStorage.getItem("moods")) || [];
    moods.push(moodEntry);
    localStorage.setItem("moods", JSON.stringify(moods));

    loadMoods();
}

function loadMoods() {
    let logs = document.getElementById("moodLogs");
    logs.innerHTML = "";

    let moods = JSON.parse(localStorage.getItem("moods")) || [];

    moods.forEach((entry, index) => {
        let moodCard = document.createElement("div");
        moodCard.classList.add("mood-card");

        moodCard.innerHTML = `
            <div class="mood-info">
                <div class="mood-details">
                    <span class="emoji">${entry.mood}</span>
                    <span class="mood-name">${entry.moodName}</span> - 
                    <span>${entry.message}</span>
                </div>
                <button class="delete-btn" onclick="deleteMood(${index})">X</button>
            </div>
            <div class="mood-time">${entry.date}, ${entry.time}</div>
        `;

        logs.appendChild(moodCard);
    });
}

function deleteMood(index) {
    let moods = JSON.parse(localStorage.getItem("moods")) || [];
    moods.splice(index, 1);
    localStorage.setItem("moods", JSON.stringify(moods));
    loadMoods();
}

document.getElementById("clearLogs").addEventListener("click", () => {
    localStorage.removeItem("moods");
    loadMoods();
});

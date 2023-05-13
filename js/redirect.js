loadGame();
if (typeof playerName !== 'undefined') window.location.href = "main.html";

const nameInput = document.getElementById("nameInput");
    nameInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      setName();
    }
});

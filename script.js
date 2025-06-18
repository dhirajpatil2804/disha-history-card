const API_URL = "https://script.google.com/macros/s/PASTE_YOUR_SCRIPT_URL/exec"; // Replace with your actual URL

function submitCard() {
  const name = document.getElementById("name").value.trim();
  const history = document.getElementById("history").value.trim();
  const msg = document.getElementById("msg");

  if (!name || !history) {
    msg.textContent = "Please fill all fields!";
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ name, history }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(data => {
    msg.textContent = "Submitted successfully!";
    document.getElementById("name").value = "";
    document.getElementById("history").value = "";
  })
  .catch(() => msg.textContent = "Error submitting.");
}

function viewCards() {
  const password = document.getElementById("tpass").value.trim();
  const list = document.getElementById("submissions");
  list.innerHTML = "";

  fetch(`${API_URL}?password=${password}`)
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        data.forEach(entry => {
          const li = document.createElement("li");
          li.textContent = `${entry.date} - ${entry.name}: ${entry.history}`;
          list.appendChild(li);
        });
      } else {
        list.innerHTML = "<li>Unauthorized or no data</li>";
      }
    })
    .catch(() => {
      list.innerHTML = "<li>Error loading data</li>";
    });
}

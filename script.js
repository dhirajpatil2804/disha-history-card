const API_URL = "https://script.google.com/macros/s/AKfycbwIJ0xTCBVSAgyE9XAy-hFUj_FGGCQuZRFaa05XPlQ/dev";

let student = {
  name: "",
  mobile: ""s
};

function studentLogin() {
  const name = document.getElementById("studentName").value.trim();
  const mobile = document.getElementById("mobile").value.trim();

  if (!name || !mobile) {
    alert("Please enter both name and mobile.");
    return;
  }

  student.name = name;
  student.mobile = mobile;

  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("historyForm").classList.remove("hidden");

  loadMyHistory();
}

function submitHistory() {
  const history = document.getElementById("historyCard").value.trim();
  if (!history) {
    alert("Please enter your history card.");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      name: student.name,
      mobile: student.mobile,
      history: history
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.text())
    .then(() => {
      document.getElementById("studentMsg").textContent = "Submitted successfully!";
      document.getElementById("historyCard").value = "";
      loadMyHistory();
    });
}

function loadMyHistory() {
  fetch(`${API_URL}?mobile=${student.mobile}`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("myHistoryList");
      list.innerHTML = "";
      data.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.date} - ${entry.history}`;
        list.appendChild(li);
      });
    });
}

function loadAll() {
  const pass = document.getElementById("teacherPass").value.trim();
  fetch(`${API_URL}?password=${pass}`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("allSubmissions");
      list.innerHTML = "";
      data.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.date} - ${entry.name} (${entry.mobile}): ${entry.history}`;
        list.appendChild(li);
      });
    }).catch(() => {
      alert("Invalid password or error loading data.");
    });
}

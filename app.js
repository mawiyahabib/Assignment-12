// =====================
// Task 1: Signup Form
// =====================
const signupForm = document.getElementById("signupForm");
const signupResult = document.getElementById("signupResult");

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("suName").value.trim();
  const email = document.getElementById("suEmail").value.trim();
  const password = document.getElementById("suPassword").value.trim();

  signupResult.classList.remove("hidden");
  signupResult.innerHTML = `
    <h3>Submitted Data</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Password:</b> ${"*".repeat(password.length)}</p>
  `;

  signupForm.reset();
});

// =====================
// Task 2: Read More
// =====================
const readMoreBtn = document.getElementById("readMoreBtn");
const moreText = document.getElementById("moreText");

readMoreBtn.addEventListener("click", function () {
  const isHidden = moreText.classList.contains("hidden");

  if (isHidden) {
    moreText.classList.remove("hidden");
    readMoreBtn.textContent = "Read less";
  } else {
    moreText.classList.add("hidden");
    readMoreBtn.textContent = "Read more";
  }
});

// =====================
// Task 3: Student Table (Add/Edit/Delete)
// =====================
const studentForm = document.getElementById("studentForm");
const studentTbody = document.getElementById("studentTbody");

// Edit form elements
const editBox = document.getElementById("editBox");
const editForm = document.getElementById("editForm");
const cancelEdit = document.getElementById("cancelEdit");

const edName = document.getElementById("edName");
const edRoll = document.getElementById("edRoll");
const edClass = document.getElementById("edClass");

let editingRow = null; // store the row being edited

function updateSerialNumbers() {
  const rows = studentTbody.querySelectorAll("tr");
  rows.forEach((row, index) => {
    row.children[0].textContent = index + 1;
  });
}

studentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("stName").value.trim();
  const roll = document.getElementById("stRoll").value.trim();
  const cls = document.getElementById("stClass").value.trim();

  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td></td>
    <td>${name}</td>
    <td>${roll}</td>
    <td>${cls}</td>
    <td>
      <div class="action-btns">
        <button class="btn small" type="button" data-action="edit">Edit</button>
        <button class="btn btn-outline small" type="button" data-action="delete">Delete</button>
      </div>
    </td>
  `;

  studentTbody.appendChild(tr);
  updateSerialNumbers();
  studentForm.reset();
});

// Event Delegation for Edit/Delete
studentTbody.addEventListener("click", function (e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.getAttribute("data-action");
  const row = btn.closest("tr");

  if (action === "delete") {
    row.remove();
    updateSerialNumbers();

    // if deleted row was being edited, close edit box
    if (editingRow === row) {
      editingRow = null;
      editBox.classList.add("hidden");
      editForm.reset();
    }
  }

  if (action === "edit") {
    editingRow = row;

    // Fill edit form with row data
    edName.value = row.children[1].textContent;
    edRoll.value = row.children[2].textContent;
    edClass.value = row.children[3].textContent;

    // Show edit box
    editBox.classList.remove("hidden");
    window.scrollTo({ top: editBox.offsetTop - 10, behavior: "smooth" });
  }
});

// Update edited row
editForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!editingRow) return;

  editingRow.children[1].textContent = edName.value.trim();
  editingRow.children[2].textContent = edRoll.value.trim();
  editingRow.children[3].textContent = edClass.value.trim();

  // hide edit form after update
  editingRow = null;
  editBox.classList.add("hidden");
  editForm.reset();
});

// Cancel edit
cancelEdit.addEventListener("click", function () {
  editingRow = null;
  editBox.classList.add("hidden");
  editForm.reset();
});

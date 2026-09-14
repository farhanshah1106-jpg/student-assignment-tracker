if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}
const logoutBtn = document.getElementById("logoutBtn");
const welcomeUser = document.getElementById("welcomeUser");
const assignmentForm = document.getElementById("assignmentForm");
const assignmentList = document.getElementById("assignmentList");
const totalAssignments = document.getElementById("totalAssignments");
const completedAssignments = document.getElementById("completedAssignments");
const pendingAssignments = document.getElementById("pendingAssignments");
const overdueAssignments = document.getElementById("overdueAssignments");
const studentName = localStorage.getItem("studentName");
if (studentName && welcomeUser) {
    welcomeUser.textContent =
        `Welcome, ${studentName}! 👋`;
}
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("studentName");
        alert("Logged out successfully!");
        window.location.href = "index.html";
    });
}
let assignments = JSON.parse(
    localStorage.getItem("assignments")
) || [];
function displayAssignments() {
    assignmentList.innerHTML = "";
    let filteredAssignments = assignments;
    if (currentFilter === "pending") {
        filteredAssignments = assignments.filter(
            assignment => !assignment.completed
        );
    }
    if (currentFilter === "completed") {
        filteredAssignments = assignments.filter(
            assignment => assignment.completed
        );
    }
    if (currentFilter === "overdue") {
        const today = new Date()
            .toISOString()
            .split("T")[0];
        filteredAssignments = assignments.filter(
            assignment =>
                !assignment.completed &&
                assignment.dueDate < today
        );
    }
    if (filteredAssignments.length === 0) {
        assignmentList.innerHTML = `
            <p class="empty-message">
                No assignments found.
            </p>
        `;
        return;
    }
    filteredAssignments.forEach((assignment) => {
        const assignmentCard =
            document.createElement("div");
        assignmentCard.classList.add("assignment-card");
        assignmentCard.innerHTML = `
            <h3>${assignment.title}</h3>
            <p><strong>Subject:</strong> ${assignment.subject}</p>
            <p><strong>Due Date:</strong> ${assignment.dueDate}</p>
            <p><strong>Priority:</strong> ${assignment.priority}</p>
            <p>
                <strong>Status:</strong>
                ${assignment.completed ? "Completed" : "Pending"}
            </p>
            <button
                class="complete-btn"
                onclick="completeAssignment(${assignment.id})">
                ${assignment.completed
                    ? "Completed"
                    : "Mark as Completed"}
            </button>
            <button
                class="delete-btn"
                onclick="deleteAssignment(${assignment.id})">
                Delete
            </button>
        `;
        if (assignment.completed) {
            assignmentCard.classList.add("completed");
        }
        assignmentList.appendChild(assignmentCard);
    });
}
function completeAssignment(id) {
    assignments = assignments.map(
        (assignment) => {
            if (assignment.id === id) {
                return {
                    ...assignment,
                    completed:!assignment.completed
                };
            }
            return assignment;
        }
    );
    saveAssignments();
    displayAssignments();
}
function deleteAssignment(id) {
    const confirmDelete =
        confirm(
            "Are you sure you want to delete this assignment?"
        );
    if (!confirmDelete) {
        return;
    }
    assignments = assignments.filter((assignment) =>
                assignment.id !== id
        );
    saveAssignments();
    displayAssignments();

}

function saveAssignments() {
    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );
}

function updateCounts() {
    const total = assignments.length;
    const completed = assignments.filter(
        (assignment) => assignment.completed === true
    ).length;
    const pending = assignments.filter(
        (assignment) => assignment.completed === false
    ).length;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayDate = `${year}-${month}-${day}`;
    const overdue = assignments.filter(
        (assignment) =>
            assignment.completed === false &&
            assignment.dueDate < todayDate
    ).length;
    totalAssignments.textContent = total;
    completedAssignments.textContent = completed;
    pendingAssignments.textContent = pending;
    overdueAssignments.textContent = overdue;
}

function filterAssignments(filter) {
    currentFilter = filter;
    displayAssignments();
}
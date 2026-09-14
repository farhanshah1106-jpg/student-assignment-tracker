const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const getStartedBtn = document.getElementById("getStarted");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});
loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});
getStartedBtn.addEventListener("click", () => {
    container.classList.add("active");
});
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword =
        document.getElementById("signupConfirmPassword").value;
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    const user = {
        name: name,
        email: email,
        password: password
    };
    localStorage.setItem(
        "studentUser",
        JSON.stringify(user)
    );
    alert("Account created successfully!");
    signupForm.reset();
    container.classList.remove("active");
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const savedUser = JSON.parse(
        localStorage.getItem("studentUser")
    );
    if (!savedUser) {
        alert("No account found. Please Sign Up first.");
        return;
    }
    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem(
            "studentName",
            savedUser.name
        );
        alert("Login successful!");

        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password!");
    }
});
const welcomeUser = document.getElementById("welcomeUser");
const logoutBtn = document.getElementById("logoutBtn");

const studentName = localStorage.getItem("studentName");
if (studentName) {
    welcomeUser.textContent = `Welcome, ${studentName}`;
}
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("studentName");
    alert("Logged out successfully!");
    window.location.href = "index.html";
});
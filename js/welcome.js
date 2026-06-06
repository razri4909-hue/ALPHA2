document.addEventListener("DOMContentLoaded", function () {

    function goLogin() {
        window.location.href = "login/index.html";
    }

    function logout() {
        localStorage.removeItem("username");
        location.reload();
    }

    const user = localStorage.getItem("username");

    if (user) {

        const info = document.getElementById("userinfo");
        const auth = document.getElementById("authArea");

        if (info) {
            info.innerText = "Halo, " + user;
        }

        if (auth) {
            auth.innerHTML = `
                <button onclick="logout()" class="login-btn">
                    LOGOUT
                </button>
            `;
        }
    }

    window.goLogin = goLogin;
    window.logout = logout;

});

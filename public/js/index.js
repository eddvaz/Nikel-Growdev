const myModal = new bootstrap.Modal("#register-modal")
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

// Login

document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAcc(email);

    if(!account) {
        alert("Verifique o usuario ou a senha.")
        return;
    }

    if(account) {
        if(account.password !== password){
            alert("Verifique o usuario ou a senha.")
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }
})

//Criar conta
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    // console.table(email, password);

    saveAcc({
        login: email,
        password,
        transactions: []
    })

    myModal.hide();
    alert("Conta criada com sucesso!");
});

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
       saveSession(logged, session);
       window.location.href = "home.html";
    }
}


function saveAcc(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}


function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAcc(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}


const LOGINFORM = document.querySelector("#login");
const URL = "http://127.0.0.1:5000/";

submit = LOGINFORM.querySelector("#confirm_btn");
user = LOGINFORM.querySelector("#user");
pass = LOGINFORM.querySelector("#pass");
rememberMe = LOGINFORM.querySelector("#remember_me")
userWarning = LOGINFORM.querySelector("#user_warning");
passWarning = LOGINFORM.querySelector("#pass_warning");

userWarning.style.visibility = "hidden";
passWarning.style.visibility = "hidden";

submit.addEventListener('click', function() {
    fetch(URL + 'user_account/login?user_name=' + encodeURIComponent(user.value))

    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(error);
        }
    })

    .then(function(data) {
        if (user.value != data.user_name && user.value != data.mail) {
            userWarning.style.visibility = 'visible';
            userWarning.innerHTML = 'Usuario no encontrado';
            return false
        }

        if (pass.value != data.pass) {
            passWarning.style.visibility = 'visible';
            passWarning.innerHTML = 'La contraseña y el usuario no coinciden';
            return false
        }

        if (rememberMe.vale) {
            localStorage.setItem('userName', user.vale);
            localStorage.setItem('password', pass.value);
            localStorage.setItem('profilePic', data.profile_pic);
        } else {
            sessionStorage.setItem('userName', user.value);
            sessionStorage.setItem('password', pass.value);
            sessionStorage.setItem('profilePic', data.profile_pic);
        }

        window.location.href = 'index.html';
    })
    .catch(function(error) {
        alert('Error al ingresar usuario');
        console.log(error);
    });
})
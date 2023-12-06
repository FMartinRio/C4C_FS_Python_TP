const URL = "https://krawling.pythonanywhere.com/";

submit = document.querySelector("#confirm_btn");
user = document.querySelector("#user");
pass = document.querySelector("#pass");
rememberMe = document.querySelector("#remember_me")
userWarning = document.querySelector("#user_warning");
passWarning = document.querySelector("#pass_warning");

userWarning.style.visibility = "hidden";
passWarning.style.visibility = "hidden";

submit.addEventListener('click', function() {
    fetch(URL + 'user_account/login?user_name=' + encodeURIComponent(user.value))

    .then(function(response) {
        if (response.ok) {
            userWarning.style.visibility = 'hidden';
            return response.json();
        } else {
            userWarning.style.visibility = 'visible';
            userWarning.innerHTML = 'Usuario no encontrado';
            throw new Error('Usuario no encontrado');
        }
    })

    .then(function(data) {
        if (data.pass != pass.value) {
            passWarning.style.visibility = 'visible';
            passWarning.innerHTML = 'La contraseña y el usuario no coinciden';
            return false;
        }

        if (rememberMe.value) {
            localStorage.setItem('userName', user.value);
            localStorage.setItem('password', pass.value);
            localStorage.setItem('profilePic', data.profile_pic);
        }

        sessionStorage.setItem('userName', user.value);
        sessionStorage.setItem('password', pass.value);
        sessionStorage.setItem('profilePic', data.profile_pic);

        window.location.href = 'index.html';
    });
});
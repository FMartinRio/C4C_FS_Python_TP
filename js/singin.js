const SIGNINFORM = document.querySelector("#signin");
const URL = "http://krawling.pythonanywhere.com/";

form = SIGNINFORM.querySelector("#form");
send = SIGNINFORM.querySelector("#confirm_btn");
user = SIGNINFORM.querySelector("#user");
mail = SIGNINFORM.querySelector("#mail");
pass = SIGNINFORM.querySelector("#pass");
dpass = SIGNINFORM.querySelector("#dpass");
birth = SIGNINFORM.querySelector("#birth");
profilePic = SIGNINFORM.querySelector("#profile_pic");

userWarning = SIGNINFORM.querySelector("#user_warning");
mailWarning = SIGNINFORM.querySelector("#mail_warning");
passWarning = SIGNINFORM.querySelector("#pass_warning");
dpassWarning = SIGNINFORM.querySelector("#dpass_warning");
birthDateWarning = SIGNINFORM.querySelector("#birth_date_warning");
formWarning = SIGNINFORM.querySelector("#form_warning");

userWarning.style.visibility = "hidden";
mailWarning.style.visibility = "hidden";
passWarning.style.visibility = "hidden";
dpassWarning.style.visibility = "hidden";
birthDateWarning.style.visibility = "hidden";
formWarning.style.visibility = "hidden";

validUser = false;
validMail = false;
validPass = false;
validDPass = false;
validDate = false;

user.addEventListener("blur", function(event) {
    validUser = /^[A-Za-z0-9]{4,20}$/.test(user.value);

    if (!validUser) {
        userWarning.style.visibility = "visible";
        userWarning.innerHTML = 'Nombre invalido (entre 4 y 20 letras)';
        user.style.borderBottom = "3px solid red";
    } else {
        userWarning.style.visibility = "hidden";
        user.style.borderBottom = "3px solid green";
    }
});

mail.addEventListener("blur", function(event) {
    validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value);

    if (!validMail) {
        mailWarning.style.visibility = "visible";
        mailWarning.innerHTML = 'Mail invalido (mail@mail.com)';
        mail.style.borderBottom = "3px solid red";
    } else {
        mailWarning.style.visibility = "hidden";
        mail.style.borderBottom = "3px solid green";
    }
});

pass.addEventListener("blur", function(event) {
    validPass = /^[A-Za-z0-9]{6,16}$/.test(pass.value);

    if (!validPass) {
        passWarning.style.visibility = "visible";
        pass.style.borderBottom = "3px solid red";
    } else {
        passWarning.style.visibility = "hidden";
        pass.style.borderBottom = "3px solid green";
    }
});

dpass.addEventListener("blur", function(event) {
    validDPass = dpass.value == pass.value;

    if (!validDPass) {
        dpassWarning.style.visibility = "visible";
        dpass.style.borderBottom = "3px solid red";
    } else {
        dpassWarning.style.visibility = "hidden";
        dpass.style.borderBottom = "3px solid green";
    }
});

birth.addEventListener("blur", function(event) {
    birthDate = birth.value.split("-");
    date = new Date();
    age = date.getFullYear() - birthDate[0];
    validDate = (age >= 18) ? true : false;

    if (!validDate) {
        birthDateWarning.style.visibility = "visible";
        birth.style.borderBottom = "3px solid red";
    } else {
        birthDateWarning.style.visibility = "hidden";
        birth.style.borderBottom = "3px solid green";
    }
});

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!validUser || !validMail || !validPass || !validDPass || !validDate) {
        formWarning.style.visibility = "visible";
        formWarning.innerHTML = 'Hay campos invalidos';
        return
    }

    formData = new FormData();

    formData.append('user', user.value);
    formData.append('mail', mail.value);
    formData.append('password', pass.value);
    formData.append('birthDate', birth.value);
    formData.append('profilePic',
    profilePic.files[0]);

    fetch(URL + 'user_account/signin', {
        method: 'POST',
        body: formData
    })

    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            let data = response.json();
            formWarning.style.visibility = 'visible';
            formWarning.innerHTML = 'El usuario ya existe';

            if (data.user_name == user.value) {
                userWarning.style.visibility = 'visible';
                userWarning.innerHTML = 'El usuario ya existe.';
                user.style.borderBottom = '3px solid red';
            }

            if (data.mail == mail.value) {
                mailWarning.style.visibility = 'visible';
                mailWarning.innerHTML = 'El mail ya existe.';
                mail.style.borderBottom = '3px solid red';
            }
            throw new Error('El usuario ya existe');
        }
    })
    
    .then(function () {
        window.location.href = 'login.html';
        alert('Registro exitoso.');
    })
    .catch(function (error) {
        alert('El usuario o mail ya esta en uso.')
        console.error('Error:', error);
    });
});
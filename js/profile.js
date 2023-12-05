const URL = "http://127.0.0.1:5000/";
const profilePicPath = 'img/users/pictures/';

loginedUser = localStorage.getItem('userName');
if (!loginedUser) {
    loginedUser = sessionStorage.getItem('userName');
    if (!loginedUser) {
        alert('No se encontro una cuenta logeada.');
        window.location.href = 'login.html';
    }
}

userName = document.querySelector('#user_name');
editUser = document.querySelector('#edit_user');
newUser = document.querySelector('#new_user');
confirmNewUser = document.querySelector('#confirm_new_user');
newUser.style.display = 'none';
confirmNewUser.style.display = 'none';

userMail = document.querySelector('#user_mail');
editMail = document.querySelector('#edit_mail');
newMail = document.querySelector('#new_mail');
confirmNewMail = document.querySelector('#confirm_new_mail');
newMail.style.display = 'none';
confirmNewMail.style.display = 'none';

userWallet = document.querySelector('#user_wallet');
userPic = document.querySelector('#user_pic');
closeSession = document.querySelector('#close_session');
deleteUser = document.querySelector('#delete_account');
confirmDelete = document.querySelector('#confirm_delete');
confirmDelete.style.display = 'none';

fetch(URL + 'user_account/login?user_name=' + encodeURIComponent(loginedUser))

.then(function(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(error);
    }
})

.then(function(data) {
    pic = profilePicPath + data.profile_pic;
    userName.textContent = data.user_name;
    userMail.textContent = data.mail;
    userWallet.textContent = `\$ ${data.wallet}`;
    userPic.src = pic;

    currentUser = data.user_name;
    currentMail = data.mail;
})
.catch(function(error) {
    alert('Error al obtener el perfil');
    console.log(error);
});


editUser.addEventListener('click', function() {
    userName.style.display = 'none';
    editUser.style.display = 'none';
    newUser.style.display = 'block';
    confirmNewUser.style.display = 'block';

    newUser.focus();
});

confirmNewUser.addEventListener('click', function() {
    if (newUser.value == '') {
        userName.style.display = 'block';
        editUser.style.display = 'block';
        newUser.style.display = 'none';
        confirmNewUser.style.display = 'none';
        return
    }

    fetch(URL + 'user_account/change_user?user=' + encodeURIComponent(currentUser)
            + '&newUser=' + encodeURIComponent(newUser.value), {
                method: 'PUT'
            })

    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Usuario en uso');
        }
    })

    .then(function () {
        alert('Cambio de nombre exitoso.');
        if (localStorage.getItem('userName')) 
            localStorage.setItem('userName', newUser.value);
        sessionStorage.setItem('userName', newUser.value);
        window.location.reload();
    })
    .catch(function (error) {
        console.error('Error:', error);
        alert('El nombre de usuario ya existe.');
    });
});

editMail.addEventListener('click', function() {
    userMail.style.display = 'none';
    editMail.style.display = 'none';
    newMail.style.display = 'block';
    confirmNewMail.style.display = 'block';

    newMail.focus();
});

confirmNewMail.addEventListener('click', function() {
    if (newMail.value == '') {
        userMail.style.display = 'block';
        editMail.style.display = 'block';
        newMail.style.display = 'none';
        confirmNewMail.style.display = 'none';
        return
    }
    validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value);
    if (!validMail) {
        alert('Mail invalido "ejemplo@mail.com"')
        return
    }

    fetch(URL + 'user_account/change_mail?mail=' + encodeURIComponent(currentMail)
            + '&newMail=' + encodeURIComponent(newMail.value), {
                method: 'PUT'
            })

    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Mail en uso');
        }
    })

    .then(function () {
        alert('Cambio de mail exitoso.');
        window.location.reload();
    })
    .catch(function (error) {
        console.error('Error:', error);
        alert('El mail ya esta en uso.');
    });
});

closeSession.addEventListener('click', function() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'index.html';
});

deleteUser.addEventListener('click', function() {
    deleteUser.style.display = 'none';
    confirmDelete.style.display = 'block';
});

confirmDelete.addEventListener('click', function() {
    fetch(URL + 'user_account/delete?user=' + encodeURIComponent(currentUser), {
        method: 'DELETE'
    })

    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al eliminar usuario.');
        }
    })

    .then(function () {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = 'index.html';
        alert('Usuario eliminado correctamente.');
    })
    .catch(function (error) {
        console.error('Error:', error);
        alert('Error al eliminar usuario.');
    });
});

// newUser.addEventListener('blur', function() {
//     newUser.value = '';
//     userName.style.display = 'block';
//     editUser.style.display = 'block';
//     newUser.style.display = 'none';
//     confirmNewUser.style.display = 'none';
// })
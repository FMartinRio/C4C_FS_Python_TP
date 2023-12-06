const URL = "https://krawling.pythonanywhere.com/";
const profilePicPath = 'https://www.pythonanywhere.com/user/KrawLing/files/home/KrawLing/mysite/static/img/';

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
addFounds = document.querySelector('#add_founds');
cardNumber = document.querySelector('#card');
amount = document.querySelector('#amount');
confirmImport = document.querySelector('#confirm_import');
cardNumber.style.display = 'none';
amount.style.display = 'none';
confirmImport.style.display = 'none';

userPic = document.querySelector('#user_pic');
closeSession = document.querySelector('#close_session');
deleteUser = document.querySelector('#delete_account');
confirmDelete = document.querySelector('#confirm_delete');
confirmDelete.style.display = 'none';

flightsDisplay = document.querySelector('#flights_display');

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

let flightTemplate;
fetch(URL + 'user_account/flight_tickets?user_name=' + encodeURIComponent(loginedUser))

.then(function(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('No se ningun pasaje.');
    }
})

.then(function(data) {
    console.log(data)
    for(let ticket of data) {
        newFlight = document.createElement('div');
        flightTemplate = 
        `
        <div id='flight_header'>
            <h4>ID: ${ticket.flight_id}</h4>
            <h4>Fecha: ${ticket.takeoff_date}</h4>
            <h4>Pasajes: ${ticket.quantity}</h4>
        </div>
        <div id='flight_body'>
            <h4>Despegue: ${ticket.takeoff_location}</h4>
            <h4>Destino: ${ticket.destination}</h4>
        </div>
        `;
        newFlight.innerHTML = flightTemplate;
        flightsDisplay.appendChild(newFlight);
    }
})
.catch(function() {
    newFlight = document.createElement('div');
    flightTemplate = 'No se encontro ningun pasaje';
    newFlight.innerHTML = flightTemplate;
    flightsDisplay.appendChild(newFlight);
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

addFounds.addEventListener('click', function(){
    cardNumber.style.display = 'block';
    amount.style.display = 'block';
    confirmImport.style.display = 'block';
});

confirmImport.addEventListener('click', function(){
    validateCard = cardNumber.value.replace(/[^0-9]/g, '');
    if (!/^[0-9]{16}$/.test(validateCard)){
        cardNumber.value = 'Tarjeta invalida';
        cardNumber.style.color = 'red';
        return
    }

    if (amount.value < 1) {
        amount.value = 0;
        amount.style.color = 'red';
        return
    }

    fetch(URL + 'user_account/add_founds?user_name=' + encodeURIComponent(currentUser)
            + '&amount=' + encodeURIComponent(amount.value), {
                method: 'PUT'
            })

    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('No se encontro la cuenta de usuario.');
        }
    })

    .then(function () {
        alert('Importe exitoso.');
        window.location.reload();
    })
    .catch(function (error) {
        console.error('Error:', error);
        alert('Error al realizar importe.');
    });
});

cardNumber.addEventListener('focus', function() {
    cardNumber.style.color = 'black';
});

amount.addEventListener('focus', function() {
    amount.style.color = 'black';
});


// newUser.addEventListener('blur', function() {
//     newUser.value = '';
//     userName.style.display = 'block';
//     editUser.style.display = 'block';
//     newUser.style.display = 'none';
//     confirmNewUser.style.display = 'none';
// })
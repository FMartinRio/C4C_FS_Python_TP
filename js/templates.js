navProfilePic = 'img/icons/login.png';
login = 'login.html';

if (localStorage.getItem('userName')) {
    navProfilePic = 'https://www.pythonanywhere.com/user/KrawLing/files/home/KrawLing/mysite/static/img/' + localStorage.getItem('profilePic');
    login = 'profile.html';
}

if (sessionStorage.getItem('userName')) {
    navProfilePic = 'https://www.pythonanywhere.com/user/KrawLing/files/home/KrawLing/mysite/static/img/' + sessionStorage.getItem('profilePic');
    login = 'profile.html';
}

let navTemplate = `
<div class="nav_logo">
    <a href="index.html">
        <img src="img/icons/logo2.png" alt="site_logo">
    </a>
</div>
<div class="login_icon">
    <a href=${login}>
        <img src=${navProfilePic} alt="login">
    </a>
</div>
<ul id="desk_nav_list">
    <a id="destinations_dropdown" href="index.html"><li>Destinos</li></a>
    <ul id="destinations_dropdown_content">
        <a href="argentina.html"><li>Argentina</li></a>
        <a href="brasil.html"><li>Brasil</li></a>
        <a href="uruguay.html"><li>Uruguay</li></a>
    </ul>
    <a href="contact.html">
        <li>Contacto</li>
    </a>
    <a href="vuelos.html">
        <li>Vuelos</li>
    </a>
</ul>
<div class="nav_search_bar">
    <input type="text" name="search" placeholder="Buscar...">
    <img src="img/icons/search_icon.svg" alt="search_img">
</div>
<div id="hb_menu" class="nav_hb_menu_dropdown" tabindex="3">
    <img src="img/icons/hamburger_menu.png" alt="hamburger_menu">
    <ul id="nav_list">
        <a href="argentina.html">
            <li>Argentina</li>
        </a>
        <a href="brasil.html">
            <li>Brasil</li>
        </a>
        <a href="uruguay.html">
            <li>Uruguay</li>
        </a>
        
        <a href="contact.html">
            <li>Contacto</li>
        </a>
        <a href="vuelos.html">
            <li>Vuelos</li>
        </a>
    </ul>
</div>
`

document.querySelector("nav").innerHTML = navTemplate;

let asideTemplate = `
<div class="aside_expand" tabindex="4">
    <i class="fa-solid fa-arrow-right"></i>
</div>
<ul class="aside_links">
    <a href="argentina.html"><li><strong>Argentina</strong>
        <a href="cordoba.html"><li><strong>Cordoba</strong>
            <ul>
                <a href="cordoba_capital.html"><li><b>Capital</b>
                    <ul>
                        <a href="cordoba_capital.html#stop_2"><li>Parque Kempes</li></a>
                        <a href="cordoba_capital.html#stop_3"><li>Iglesias
                            <ul>
                                <a href="cordoba_capital.html#stop_4"><li>Los Capuchinos</li></a>
                                <a href="cordoba_capital.html#stop_5"><li>Catedral</li></a>
                                <a href="cordoba_capital.html#stop_6"><li>Basílica de San Francisco</li></a>
                            </ul>
                        </li></a>
                        <a href="cordoba_capital.html#stop_7"><li>Vinos y Naturaleza</li></a>
                    </ul>
                </li></a>
                <a href="calamuchita.html"><li><b>Calamuchita</b>
                    <ul>
                        <a href="calamuchita.html#stop_1"><li>Paseo Cultural Rio Sauces</li></a>
                        <a href="calamuchita.html#stop_2"><li>Sendero Cerro Wank</li></a>
                        <a href="calamuchita.html#stop_3"><li>Reartes</li></a>
                    </ul>
                </li></a>
                <a href="ansenuza.html"><li><b>Ansenuza</b>
                    <ul>
                        <a href="ansenuza.html#stop_1"><li>Pedaleando el Miramar</li></a>
                        <a href="ansenuza.html#stop_2"><li>Fiestas Rurales</li></a>
                        <a href="ansenuza.html#stop_3"><li>Mar de Ansenuza</li></a>
                    </ul>
                </li></a>
            </ul>
        </li></a>

        <a href="bariloche.html"><li><strong>Bariloche</strong>
            <ul>
                <li><b>Temporada de Invierno</b>
                    <ul>
                        <a href="cerro_catedral.html"><li>Cerro Catedral</li></a>
                        
                        <a href="cerro_otto.html"><li>Cerro Otto</li></a>
                        <ul>
                            <a href="cerro_otto.html#stop1"><li>Winter Park</li></a>
                            <a href="cerro_otto.html#stop2"><li>Piedras Blancas</li></a>
                            <a href="cerro_otto.html#stop3"><li>EUCA</li></a>
                            <a href="cerro_otto.html#stop4"><li>Refugio Berghof</li></a>
                            <a href="cerro_otto.html#stop5"><li>Centro de Esquí Nórdico</li></a>
                        </ul>
                    </ul>
                </li>
                <li><b>Temporada de Verano</b>
                    <ul>
                        <a href="lago_nahuel_huapi.html"><li>Lago Nahuel Huapi</li></a>
                        
                        <a href="lago_guillelmo.html"><li>Lago Guillelmo</li></a>
                    </ul>
                </li>
                <li><b>Aventuras en Bariloche</b></li>
                <ul>
                    <a href="aventura.html#stop1"><li>Cabalgatas</li></a>
                    <a href="aventura.html#stop2"><li>Escaladas</li></a>
                    <a href="aventura.html#stop3"><li>Mountain Bike</li></a>
                    <a href="aventura.html#stop4"><li>Parapente</li></a>
                </ul>
            </ul>
        </li></a>
    </li></a>

    <a href="brasil.html"><li><strong>Brasil</strong>
        <ul>
            <a href="buzios.html"><li>Buzios</li></a>
            <a href="parque_nacional_iguazu.html"><li>Parque Nacional Iguazu</li></a>
            <a href="recife.html"><li>Recife</li></a>
            <a href="rio_de_janeiro.html"><li>Rio de Janeiro</li></a>
            <a href="salvador_de_bahia.html"><li>Salvador de Bahia</li></a>
        </ul>
    </li></a>

    <a href="uruguay.html"><li><strong>Uruguay</strong>
        <ul>
            <a href="montevideo.html"><li>Montevideo</li></a>
        </ul>
    </li></a>
</ul>
`

const ASIDE = document.querySelector("aside");
if(ASIDE != null)
    ASIDE.innerHTML = asideTemplate;

let footerTemplate = `
<div class="social_links">
    <a href="facebook" target="_blank"><img src="img/icons/facebook.png" alt="facebook"> Facebook</a>
    <a href="twitter" target="_blank"><img src="img/icons/gorjeo.png" alt="twitter"> Twitter</a>
    <a href="instagram" target="_blank"><img src="img/icons/instagram.png" alt="instagram"> Instagram</a>
</div>
<div class="contact">
    <a href="contact.html">Contacto</a>
</div>
<div class="source_links">
    <a href="references.html">Puedes encontrar los links de referencia aqui</a>
</div>
`

document.querySelector("footer").innerHTML = footerTemplate;
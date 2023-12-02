window.addEventListener('DOMContentLoaded', () => {
    const HBMENU = document.getElementById("hb_menu");
    const CONTAINER = document.getElementById("nav_list");
    const ASIDEEXP = document.querySelector(".aside_expand");
    const ASIDE = document.querySelector("aside");
    const NAVBAR = document.querySelector("nav");
    const SIDEMAPS = document.getElementById("sidemaps");
    const SIDEMAPSEXP = document.getElementById("sidemaps_expand");
    const LOGINFORM = document.querySelector("#login");

    let lastVPosition = window.scrollY;
    let mobile = window.matchMedia("(max-width: 425px)")

    if (mobile.matches) {
        if (ASIDE) ASIDE.style.left = "-80vw";

        window.onscroll = function adjustNavBar() {
            if(!ASIDE || parseInt(ASIDE.style.left) < 0) {
                if (mobile.matches) {
                    if (window.scrollY > lastVPosition) {
                        NAVBAR.style.top = "-100px";
                    } else {
                        NAVBAR.style.top = "0px";
                    }
                    lastVPosition = window.scrollY;
                }
            }
            hideHBDropdownContent();
        };
    } 

    if (HBMENU) {
        HBMENU.onblur = hideHBDropdownContent;

        HBMENU.onclick = function displayHBMenu() {
            if (parseInt(CONTAINER.style.maxWidth) > 0) {
                hideHBDropdownContent();
            } else {
                CONTAINER.style.maxWidth = "50vw";
                CONTAINER.style.maxHeight = "40rem";
                CONTAINER.style.backgroundColor = "var(--navitem-bg-hover-color)";
                HBMENU.style.backgroundColor = "var(--navitem-bg-hover-color)";
            }
        };
    }

    if (ASIDEEXP) {
        ASIDEEXP.onclick = function displayAside() {
            let icon = ASIDEEXP.querySelector("i");
            if (parseInt(ASIDE.style.left) >= 0) {
                ASIDE.style.left = "-80vw";
                ASIDEEXP.style.left = "0px";
                icon.style.transform = "scaleX(1)";
            } else {
                NAVBAR.style.top = "0px";
                ASIDE.style.left = "0px";
                ASIDEEXP.style.left = "80vw";
                icon.style.transform = "scaleX(-1)";
            }
        };
    }

    if (SIDEMAPSEXP) {
        SIDEMAPSEXP.onclick = function displaySideMaps() {
            if (parseInt(SIDEMAPS.style.right) >= 0) {
                SIDEMAPS.style.right = "-40vw";
            } else {
                SIDEMAPS.style.right = "0px";
            }
        };
    }

    function hideHBDropdownContent() {
        CONTAINER.style.maxWidth = "0px";
        CONTAINER.style.maxHeight = "0px";
        CONTAINER.style.backgroundColor = "var(--bg-dark-color)";
        HBMENU.style.backgroundColor = "var(--bg-dark-color)";
    }

    // function showScrollBar() {
    //     const MAIN = document.querySelector("main");
    //     const SCROLLBAR = MAIN.querySelector("scrollbar");
    // }

    // #region Index Carousel
    let carousel = document.querySelector("#hot_spots_carousel");

    if (carousel) {
        let carouselItems = carousel.querySelectorAll(".hot_spot_item");
        let leftSlider = carousel.querySelector("#left_arrow");
        let rightSlider = carousel.querySelector("#right_arrow");
        let carouselLen = carouselItems.length;
        let offset;
        let slideInterval;

        setSlider();
        slideInterval = setInterval(moveSLidesRight, 5000);

        leftSlider.addEventListener("click", moveSLidesRight);
        rightSlider.addEventListener("click", moveSlidesLeft);

        function setSlider() {
            offset = 100;
            
            for (let i = 0; i < carouselLen; i++) {
                carouselItems[i].style.left = offset * i + "%";
            }
        }

        function moveSlidesLeft() {
            let max = parseInt(carouselItems[carouselLen - 1].style.left);
            let min = parseInt(carouselItems[0].style.left);
            for (let i = 0; i < carouselLen; i++) {
                let currentOffset = parseInt(carouselItems[i].style.left);
                if (min >= 0) {
                    offset = currentOffset - max;
                } else {
                    offset = currentOffset + 100;
                }
                carouselItems[i].style.left = offset + "%";
            }
            clearInterval(slideInterval);
            slideInterval = setInterval(moveSLidesRight, 5000);
        }

        function moveSLidesRight() {
            let max = parseInt(carouselItems[carouselLen - 1].style.left);
            let min = parseInt(carouselItems[0].style.left);
            for (let i = 0; i < carouselLen; i++) {
                let currentOffset = parseInt(carouselItems[i].style.left);
                if (max <= 0) {
                    offset = currentOffset - min;
                } else {
                    offset = currentOffset - 100;
                }
                carouselItems[i].style.left = offset + "%";
            }
            clearInterval(slideInterval);
            slideInterval = setInterval(moveSLidesRight, 5000);
        }
    }
    // #endregion

    // #region Fooling around
    const scContainers = document.getElementsByClassName("showcase_container");
    if (scContainers) {
        let containerCount = scContainers.length;
        let slicesTop = [];
        let slicesBottom = [];
        let offsetTop = 0;
        let offsetBottom = 0;
    
        for (let i = 1; i <= containerCount; i++) {
            offsetTop = (100 / containerCount * i) + 5;
            offsetBottom = (100 / containerCount * i) - 5;
            slicesTop.push(offsetTop);
            slicesBottom.push(offsetBottom);
        }
        
        for (let i = 1; i <= containerCount; i++) {
            const container = scContainers[i - 1];
            if (i == 1) {
                container.style.clipPath = `polygon(0 0, ${slicesTop[i - 1]}% 0, ${slicesBottom[i - 1]}% 100%, 0 100%)`;
            } else if (i == containerCount) {
                container.style.clipPath = `polygon(${slicesTop[i - 2]}% 0, 100% 0, 100% 100%, ${slicesBottom[i - 2]}% 100%)`;
            } else {
                container.style.clipPath = `polygon(${slicesTop[i - 2]}% 0, ${slicesTop[i - 1]}% 0, ${slicesBottom[i - 1]}% 100%, ${slicesBottom[i - 2]}% 100%)`;
            }
        }
    }
});



// #Validacion .contact
document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector("#formulario");
    
    if (formulario) {
        formulario.addEventListener("submit", function(event) {
            event.preventDefault();
        
            const nombre = document.getElementById("Nombre").value;
            const apellido = document.getElementById("Apellido").value;
            const fechaNacimiento = document.getElementById("FechaNacimiento").value;
            const telefono = document.getElementById("Telefono").value;
            const correo = document.getElementById("Correo").value;
            const consulta = document.getElementById("Consulta").value;
        
            // Validar nombre y apellido solo con letras y espacios
            const nombreValido = /^[A-Za-z\s]+$/.test(nombre);
            const apellidoValido = /^[A-Za-z\s]+$/.test(apellido);
        
            // Validar teléfono con formato argentino
            const telefonoValido = /^[0-9]{2}[0-9]{8}$/.test(telefono);
        
            // Validar correo electrónico
            const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
        
            if (nombreValido && apellidoValido && telefonoValido && correoValido) {
                // Si todos los campos son válidos, se puede enviar el formulario
                formulario.submit();
            } else {
                // Si hay campos inválidos, mostrar un mensaje de error
                alert("Por favor, complete los campos correctamente.");
            }
        });
    }
});
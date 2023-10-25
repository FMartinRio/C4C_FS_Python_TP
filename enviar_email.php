<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["Nombre"];
    $apellido = $_POST["Apellido"];
    $fechaNacimiento = $_POST["FechaNacimiento"];
    $telefono = $_POST["Telefono"];
    $correo = $_POST["Correo"];
    $consulta = $_POST["Consulta"];

    $destino = "christian_g_peralta@live.com.ar";
    $asunto = "Contacto";

    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Apellido: $apellido\n";
    $cuerpo .= "Fecha de Nacimiento: $fechaNacimiento\n";
    $cuerpo .= "Teléfono: $telefono\n";
    $cuerpo .= "Correo Electrónico: $correo\n";
    $cuerpo .= "Consulta:\n$consulta";

    // Envía el correo electrónico
    mail($destino, $asunto, $cuerpo);

    echo "¡Gracias! Tu mensaje ha sido enviado.";
} else {
    echo "Ha ocurrido un error. Por favor, intenta nuevamente.";
}
?>
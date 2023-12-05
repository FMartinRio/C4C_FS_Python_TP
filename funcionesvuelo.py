def agregar_vuelo(IDvuelo, destino, nombres, apellidos, cantidad_de_pasajes, fecha, pasaje_de_vuelta, forma_de_pago, precio_total):
    if consultar_vuelo(IDvuelo):
        return False

    nuevo_vuelo = {
        'IDvuelo': IDvuelo,
        'destino': destino,
        'nombres': nombres,
        'apellidos': apellidos,
        'cantidad_de_pasajes': cantidad_de_pasajes,
        'fecha': fecha,
        'pasaje_de_vuelta': pasaje_de_vuelta,
        'forma_de_pago': forma_de_pago,
        'precio_total': precio_total,
    }
    vuelos.append(nuevo_vuelo)
    return True

def consultar_vuelo(IDvuelo):
    for vuelo in vuelos:
        if vuelo['IDvuelo'] == IDvuelo:
            return vuelo
    return False

def listar_vuelos():
    print("-" * 50)
    if not vuelos:
        print("No hay vuelos almacenados.")
    else:
        for vuelo in vuelos:
            print(f"IDvuelo.....: {vuelo['IDvuelo']}")
            print(f"Destino.....: {vuelo['destino']}")
            print(f"Nombres.....: {vuelo['nombres']}")
            print(f"Apellidos...: {vuelo['apellidos']}")
            print(f"Cantidad de Pasajes: {vuelo['cantidad_de_pasajes']}")
            print(f"Fecha.......: {vuelo['fecha']}")
            print(f"Pasaje de Vuelta: {vuelo['pasaje_de_vuelta']}")
            print(f"Forma de Pago: {vuelo['forma_de_pago']}")
            print(f"Precio Total: {vuelo['precio_total']}")
            print("-" * 50)

def modificar_vuelo(IDvuelo, nuevo_destino, nuevo_nombres, nuevo_apellidos, nueva_cantidad_de_pasajes, nueva_fecha, nuevo_pasaje_de_vuelta, nueva_forma_de_pago, nuevo_precio_total):
    for vuelo in vuelos:
        if vuelo['IDvuelo'] == IDvuelo:
            vuelo['destino'] = nuevo_destino
            vuelo['nombres'] = nuevo_nombres
            vuelo['apellidos'] = nuevo_apellidos
            vuelo['cantidad_de_pasajes'] = nueva_cantidad_de_pasajes
            vuelo['fecha'] = nueva_fecha
            vuelo['pasaje_de_vuelta'] = nuevo_pasaje_de_vuelta
            vuelo['forma_de_pago'] = nueva_forma_de_pago
            vuelo['precio_total'] = nuevo_precio_total
            return True
    return False

def eliminar_vuelo(IDvuelo):
    for vuelo in vuelos:
        if vuelo['IDvuelo'] == IDvuelo:
            vuelos.remove(vuelo)
            return True
    return False




# Lista de diccionarios
vuelos = []

# Agregamos vuelos a la lista:
agregar_vuelo(1, 'Brasil', 'Jose', 'Enriquez', 2, '03/11/2023', True, 'Efectivo', 84.11892)
agregar_vuelo(2, 'Argentina', 'Ignacio', 'Mendez', 1, '02/12/2023', False, 'Visa', 47.02191)
agregar_vuelo(3, 'Uruguay', 'Pedro', 'Gomez', 3, '04/11/2023', True, 'Mercado Pago', 66.66666)

# Consultar un vuelo
# cod_vuelo = int(input("Ingrese un código de vuelo: "))
# vuelo_encontrado = consultar_vuelo(cod_vuelo)

# if vuelo_encontrado:
#     print(f"Vuelo encontrado - ID: {vuelo_encontrado['IDvuelo']}, Destino: {vuelo_encontrado['destino']}")
# else:
#     print(f"Vuelo {cod_vuelo} no encontrado")

# listar_vuelos()

# modifico vuelo
# modificar_vuelo(1, 'Bolivia', 'Jose', 'Enriquez', 2, '03/11/2023', True, 'Efectivo', 100000)
# listar_vuelos()


# Eliminar
# eliminar_vuelo(2)
# eliminar_vuelo(55)
# listar_vuelos()
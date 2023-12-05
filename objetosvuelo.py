class Vuelo:
    def __init__(self, IDvuelo, destino, nombres, apellidos, cantidad_de_pasajes, fecha, pasaje_de_vuelta, forma_de_pago, precio_total):
        self.IDvuelo = IDvuelo
        self.destino = destino
        self.nombres = nombres
        self.apellidos = apellidos
        self.cantidad_de_pasajes = cantidad_de_pasajes
        self.fecha = fecha
        self.pasaje_de_vuelta = pasaje_de_vuelta
        self.forma_de_pago = forma_de_pago
        self.precio_total = precio_total

    def __str__(self):
        return f"IDvuelo: {self.IDvuelo}, Destino: {self.destino}, Nombres: {self.nombres}, Apellidos: {self.apellidos}, Cantidad de Pasajes: {self.cantidad_de_pasajes}, Fecha: {self.fecha}, Pasaje de Vuelta: {self.pasaje_de_vuelta}, Forma de Pago: {self.forma_de_pago}, Precio Total: {self.precio_total}"

class GestorVuelos:
    def __init__(self):
        self.vuelos = []

    def agregar_vuelo(self, vuelo):
        if self.consultar_vuelo(vuelo.IDvuelo):
            return False
        self.vuelos.append(vuelo)
        return True

    def consultar_vuelo(self, IDvuelo):
        for vuelo in self.vuelos:
            if vuelo.IDvuelo == IDvuelo:
                return vuelo
        return None

    def listar_vuelos(self):
        print("-" * 50)
        if not self.vuelos:
            print("No hay vuelos almacenados.")
        else:
            for vuelo in self.vuelos:
                print(vuelo)
                print("-" * 50)

    def modificar_vuelo(self, IDvuelo, nuevo_destino, nuevo_nombres, nuevo_apellidos, nueva_cantidad_de_pasajes, nueva_fecha, nuevo_pasaje_de_vuelta, nueva_forma_de_pago, nuevo_precio_total):
        for vuelo in self.vuelos:
            if vuelo.IDvuelo == IDvuelo:
                vuelo.destino = nuevo_destino
                vuelo.nombres = nuevo_nombres
                vuelo.apellidos = nuevo_apellidos
                vuelo.cantidad_de_pasajes = nueva_cantidad_de_pasajes
                vuelo.fecha = nueva_fecha
                vuelo.pasaje_de_vuelta = nuevo_pasaje_de_vuelta
                vuelo.forma_de_pago = nueva_forma_de_pago
                vuelo.precio_total = nuevo_precio_total
                return True
        return False

    def eliminar_vuelo(self, IDvuelo):
        for vuelo in self.vuelos:
            if vuelo.IDvuelo == IDvuelo:
                self.vuelos.remove(vuelo)
                return True
        return False
    
    def consultar_vuelo_por_id(self, IDvuelo):
        vuelo = self.consultar_vuelo(IDvuelo)
        if vuelo:
            print("-" * 50)
            print(f"IDvuelo.....: {vuelo.IDvuelo}")
            print(f"Destino.....: {vuelo.destino}")
            print(f"Nombres.....: {vuelo.nombres}")
            print(f"Apellidos...: {vuelo.apellidos}")
            print(f"Cantidad de Pasajes: {vuelo.cantidad_de_pasajes}")
            print(f"Fecha.......: {vuelo.fecha}")
            print(f"Pasaje de Vuelta: {vuelo.pasaje_de_vuelta}")
            print(f"Forma de Pago: {vuelo.forma_de_pago}")
            print(f"Precio Total: {vuelo.precio_total}")
            print("-" * 50)
        else:
            print("Vuelo no encontrado.")


# Ejemplo de uso
gestor = GestorVuelos()
gestor.agregar_vuelo(Vuelo(1, 'Brasil', 'Jose', 'Enriquez', 2, '03/11/2023', True, 'Efectivo', 84.11892))
gestor.agregar_vuelo(Vuelo(2, 'Argentina', 'Ignacio', 'Mendez', 1, '02/12/2023', False, 'Visa', 47.02191))
gestor.agregar_vuelo(Vuelo(3, 'Uruguay', 'Pedro', 'Gomez', 3, '04/11/2023', True, 'Mercado Pago', 66.66666))

gestor.listar_vuelos()

id_a_consultar = 2
gestor.consultar_vuelo_por_id(id_a_consultar)
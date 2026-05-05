# Guía de Pruebas API Farmacia

Esta API permite gestionar Medicamentos, Compras y Ventas con control de acceso por roles (ADMIN, VENDEDOR, ALMACEN).

## 1. Configuración Previa
1. Asegúrate de tener una base de datos MySQL llamada `farmacia_db`.
2. Revisa el archivo `.env` y ajusta `DB_USER` y `DB_PASSWORD`.
3. Ejecuta `npm install` (si no lo has hecho).
4. Inicia el servidor con `npm run dev`.

## 2. Roles y Permisos
- **ADMIN**: Acceso total.
- **VENDEDOR**: 
  - `GET /api/medicamentos`
  - `POST /api/ventas`
  - `GET /api/ventas`
- **ALMACEN**:
  - `GET /api/medicamentos`
  - `POST /api/compras`
  - `GET /api/compras`

---

## 3. Ejemplos de Pruebas (Postman)

### A. Autenticación

**Registro de Usuario (POST)**
`URL: http://localhost:3000/api/auth/register`
```json
{
  "username": "admin_user",
  "password": "password123",
  "rol": "ADMIN"
}
```

**Login (POST)**
`URL: http://localhost:3000/api/auth/login`
```json
{
  "username": "admin_user",
  "password": "password123"
}
```
*Copia el `token` de la respuesta y úsalo en el Header `Authorization: Bearer <TOKEN>` para las siguientes rutas.*

---

### B. Gestión de Medicamentos (Solo ADMIN)

**Crear Medicamento (POST)**
`URL: http://localhost:3000/api/medicamentos`
```json
{
  "descripcionMed": "Paracetamol 500mg",
  "stock": 100,
  "precioVentaUni": 0.50
}
```

---

### C. Gestión de Ventas (ADMIN o VENDEDOR)

**Registrar Venta (POST)**
`URL: http://localhost:3000/api/ventas`
*Nota: Valida automáticamente que haya stock y lo descuenta.*
```json
{
  "detalles": [
    {
      "CodMedicamento": 1,
      "cantidad": 5,
      "precioUni": 0.50
    }
  ]
}
```

---

### D. Gestión de Compras (ADMIN o ALMACEN)

**Registrar Compra (POST)**
`URL: http://localhost:3000/api/compras`
*Nota: Aumenta automáticamente el stock del medicamento.*
```json
{
  "CodLab": 1,
  "detalles": [
    {
      "CodMedicamento": 1,
      "cantidad": 50,
      "precioCostoUni": 0.30
    }
  ]
}
```

---

## 4. Casos de Prueba Críticos para el Examen
1. **Intento de Venta sin Stock**: Intenta vender una cantidad mayor al `stock` actual. El sistema debe devolver un error 400 con el mensaje "Stock insuficiente".
2. **Acceso no autorizado**: Intenta crear un medicamento con un usuario de rol `VENDEDOR`. Debe fallar con error 403.
3. **Persistencia (Transacciones)**: Si una venta tiene varios productos y uno no tiene stock, **nada** de la venta debe registrarse (Rollback).

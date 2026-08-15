# Semana 4 — CSV con comas entre comillas

Solución de la práctica: el lector CSV debe conservar valores como `Marcador, Pilot Azul` en **una sola columna** cuando vienen entre comillas.

---

## Qué debes entregar (PDF)

El PDF debe incluir:

1. Nombre completo y número de carné
2. Enlace a tu repositorio personal (este repo)
3. Captura legible de `pnpm test --run` con **toda la suite en verde**
4. Explicación breve de por qué `split(',')` no sirve en este caso
5. Enlace a un video de **máximo 3 minutos** (sin video = 0 puntos)

---

## Cómo reproducir la solución

```bash
cd week-4-solucion   # o el nombre de tu carpeta
pnpm install
pnpm test --run
```

Debes ver **10 tests passed**.

---

## Resumen técnico (para el PDF y el video)

### Problema

El CSV `data/with_commas.csv` tiene filas como:

```csv
1,"Marcador, Pilot Azul",10
```

`split(',')` corta **todas** las comas, incluidas las que están dentro de las comillas. Resultado incorrecto:

| Columna 0 | Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|----------|
| `1` | `"Marcador` | ` Pilot Azul"` | `10` |

Se esperan **3 columnas**: `1` | `Marcador, Pilot Azul` | `10`.

### Solución

En `src/csv_reader.ts` se agregó `parseCsvLine`, que:

1. Recorre la línea carácter por carácter
2. Activa/desactiva un flag al encontrar `"`
3. Solo separa por `,` cuando **no** está dentro de comillas
4. Omite las comillas del valor final (no forman parte del dato)

La prueba `handles commas inside quoted values` usa la fixture `data/with_commas.csv` y valida: sin error, encabezados correctos y las tres filas con el producto completo en una columna.

---

## Guion del video (máx. 3 minutos)

> Tip: graba pantalla + voz. Habla despacio. Muestra el código y la terminal.

### 0:00 – 0:20 | Presentación

> “Hola, soy **[NOMBRE COMPLETO]**, carné **[NÚMERO]**.  
> En esta práctica corregí el lector CSV de la Semana 4 para que valores con comas entre comillas se lean como una sola columna.”

Muestra: tu nombre en pantalla o el README, y el enlace del repo (GitHub abierto).

### 0:20 – 0:50 | El problema (fixture + bug)

1. Abre `data/with_commas.csv` y señala la fila:
   `"Marcador, Pilot Azul"`.
2. Explica:
   > “Si usamos `split(',')`, la coma dentro del nombre parte el valor en dos columnas. Por eso la prueba fallaba.”
3. (Opcional, muy breve) Muestra en la terminal un ejemplo mental o el test fallando **antes** del fix, si lo grabaste en dos tomas.

### 0:50 – 1:30 | La prueba

1. Abre `tests/csv_reader.test.ts`.
2. Señala el test `handles commas inside quoted values` (ya no es `test.todo`).
3. Di:
   > “La prueba usa `data/with_commas.csv`. Comprueba que no hay error, que los headers son Codigo Producto, Producto y Precio, y que valores como Marcador, Pilot Azul quedan en una sola columna.”

### 1:30 – 2:20 | El cambio en producción

1. Abre `src/csv_reader.ts`.
2. Señala `parseCsvLine` y explica en 3 frases:
   > “Recorro la línea carácter por carácter.  
   > Cuando encuentro comillas, activo un flag.  
   > Solo separo por coma si no estoy dentro de comillas; así el valor completo se conserva.”
3. Menciona que **no** hardcodeaste las filas en la implementación: el parser es genérico.

### 2:20 – 2:50 | Resultado

1. En la terminal ejecuta:
   ```bash
   pnpm test --run
   ```
2. Muestra la salida: **Test Files 1 passed**, **Tests 10 passed**.
3. Di:
   > “Toda la suite queda aprobada; las pruebas anteriores no se rompieron.”

### 2:50 – 3:00 | Cierre

> “El repo está en **[URL de GitHub]**. Gracias.”

---

## Texto corto para pegar en el PDF

**¿Por qué `split(',')` no resuelve este caso?**

Porque trata todas las comas igual. En CSV, una coma dentro de un campo entre comillas dobles **no** es un separador de columnas; es parte del valor. Un `split(',')` ciego genera más columnas de las esperadas y rompe el alineamiento con los encabezados. Hace falta un parser que respete el estado “dentro/fuera de comillas”.

---

## Checklist antes de subir el PDF

- [ ] Repo personal público (o accesible al profesor) con commit y push
- [ ] No hay contraseñas ni tokens en el repo ni en el video
- [ ] No modificaste la fixture para quitar comillas/comas
- [ ] No deshabilitaste la prueba
- [ ] Video ≤ 3 minutos y el enlace funciona
- [ ] Captura de pantalla de la suite completa en verde

---

## Publicar en tu GitHub (pasos)

```bash
cd week-4-solucion
git init
git add src tests data package.json pnpm-lock.yaml tsconfig.json README.md .gitignore
git commit -m "fix: parse CSV quoted fields that contain commas"

# Crea un repo vacío en GitHub (sin README) y luego:
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

Si usas GitHub CLI:

```bash
gh repo create TU_REPO --public --source=. --remote=origin --push
```

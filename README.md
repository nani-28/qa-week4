# Week 4 — Lector CSV con comas entre comillas

Proyecto de pruebas unitarias con Vitest. El objetivo fue completar la prueba pendiente y corregir el parser CSV para que valores entre comillas que contienen comas se lean como una sola columna.

## Qué se hizo

1. Se reemplazó `test.todo('handles commas inside quoted values')` por una prueba ejecutable que usa la fixture `data/with_commas.csv`.
2. Se actualizó `src/csv_reader.ts` para parsear cada línea respetando las comillas dobles, en lugar de usar `split(',')` de forma directa.
3. Se verificó que toda la suite existente sigue pasando.

## Por qué no basta con `split(',')`

Una fila como:

```csv
1,"Marcador, Pilot Azul",10
```

tiene **tres** columnas. `split(',')` corta en **todas** las comas, incluidas las que van dentro de las comillas, y produce columnas de más (`"Marcador` y  `Pilot Azul"`). En CSV, esas comas internas no son separadores.

## Solución

Se implementó `parseCsvLine`, que recorre la línea carácter por carácter, activa un flag al entrar/salir de comillas y solo separa por coma cuando **no** está dentro de un valor entrecomillado. Así valores como `Marcador, Pilot Azul` quedan en una sola columna.

## Cómo ejecutar las pruebas

```bash
pnpm install
pnpm test --run
```

Resultado esperado: **10 tests passed**.
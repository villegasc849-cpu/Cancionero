# Cancionero Señor Cautivo

## Cómo abrir
1. Descomprime el ZIP completo.
2. Entra a la carpeta descomprimida.
3. Haz doble clic en `index.html`.

No abras el `index.html` directamente desde WinRAR/ZIP, porque puede fallar la carga de `style.css`, `script.js` o `canciones.js`.

## Cómo actualizar canciones
Abre `canciones.js` y edita solamente los datos:

```js
{
  "numero": "75",
  "titulo": "NUEVA CANCIÓN",
  "letra": "Letra aquí...",
  "youtube": "https://www.youtube.com/watch?v=CODIGO",
  "inicio": 0
}
```

## Imágenes de fondo
Si quieres que aparezcan las imágenes laterales como el diseño, coloca estas imágenes dentro de la carpeta `assets`:

- `cautivo.png`
- `santuario.png`

Si no las colocas, la página igual funciona.

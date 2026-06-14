const lista = document.getElementById('listaCanciones');
const buscador = document.getElementById('buscador');
const contador = document.getElementById('contador');
const btnCerrar = document.getElementById('btnCerrar');

function limpiarTexto(texto = '') {
  return texto
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ñ/g, 'n')
    .trim();
}

function crearLinkYoutube(cancion) {
  if (!cancion.youtube) return '';

  let url = cancion.youtube;
  const inicio = Number(cancion.inicio || 0);

  if (inicio > 0) {
    const separador = url.includes('?') ? '&' : '?';
    url = `${url}${separador}t=${inicio}s`;
  }

  return url;
}

function renderizar(filtro = '') {
  const busqueda = limpiarTexto(filtro);

  const filtradas = canciones.filter((cancion) => {
    const texto = limpiarTexto(`${cancion.numero} ${cancion.titulo} ${cancion.letra}`);
    return texto.includes(busqueda);
  });

  contador.textContent = busqueda
    ? `Mostrando ${filtradas.length} de ${canciones.length} canciones`
    : `${canciones.length} canciones disponibles`;

  if (filtradas.length === 0) {
    lista.innerHTML = `<div class="empty">No se encontraron canciones con esa búsqueda.</div>`;
    return;
  }

  lista.innerHTML = filtradas.map((cancion) => {
    const youtube = crearLinkYoutube(cancion);
    const audioHtml = youtube
      ? `<a class="play-link" href="${youtube}" target="_blank" rel="noopener">▶ Escuchar</a>`
      : `<span style="color:#7b6f62">Agregar audio luego</span>`;

    return `
      <article class="song" data-numero="${cancion.numero}">
        <button class="song-head" type="button" aria-expanded="false">
          <span class="song-title-wrap">
            <span class="badge">${Number(cancion.numero)}</span>
            <h2 class="song-title">${cancion.titulo}</h2>
          </span>
          <span class="chevron">⌄</span>
        </button>

        <div class="song-body">
          <p class="lyrics">${cancion.letra || 'Letra pendiente por agregar.'}</p>
          <div class="audio-box">
            <span class="audio-label">♫ Escuchar canción</span>
            ${audioHtml}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

lista.addEventListener('click', (evento) => {
  const boton = evento.target.closest('.song-head');
  if (!boton) return;

  const cancion = boton.closest('.song');
  const estaAbierta = cancion.classList.toggle('open');
  boton.setAttribute('aria-expanded', estaAbierta ? 'true' : 'false');
});

buscador.addEventListener('input', (evento) => {
  renderizar(evento.target.value);
});

btnCerrar.addEventListener('click', () => {
  document.querySelectorAll('.song.open').forEach((song) => {
    song.classList.remove('open');
    const boton = song.querySelector('.song-head');
    if (boton) boton.setAttribute('aria-expanded', 'false');
  });
});

renderizar();

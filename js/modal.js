// modal.js
document.addEventListener('DOMContentLoaded', () => {
console.log('modal.js cargado');

const openButtons = document.querySelectorAll('.viaje__boton');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

const modalImg = document.querySelector('.modal__img');
const modalTitle = document.querySelector('.modal__title');
const modalParagraph = document.querySelector('.modal__paragraph');
  const modalExtra = document.querySelector('.modal__extra'); // opcional

if (!modal) {
    console.error('No se encontró el elemento .modal en el DOM.');
    return;
}

if (openButtons.length === 0) {
    console.warn('No se encontraron .viaje__boton. Verificá la clase de los botones.');
}

openButtons.forEach(button => {
    button.addEventListener('click', (e) => {
    e.preventDefault();

      // Primero intento leer data-attributes
    let img = button.dataset.img || '';
    let title = button.dataset.title || '';
    let description = button.dataset.description || '';
    let extra = button.dataset.extra || '';

      // Si alguno falta, hago fallback leyendo del artículo (.viaje o .viaje_72)
    const card = button.closest('.viaje, .viaje_72');
    if (card) {
        if (!img) {
        const cardImg = card.querySelector('img');
        img = cardImg ? cardImg.src : '';
        }
        if (!title) {
        const cardTitle = card.querySelector('.viaje__titulo');
        title = cardTitle ? cardTitle.textContent.trim() : '';
        }
        if (!description) {
        const cardDesc = card.querySelector('.viaje__descripcion, .viaje__descripcion-72');
        description = cardDesc ? cardDesc.textContent.trim() : '';
        }
        // extra es opcional; si no existe se queda vacío
    }

      // Pongo los valores en el modal (si los elementos existen)
    if (modalImg && img) modalImg.src = img;
    if (modalTitle) modalTitle.textContent = title;
    if (modalParagraph) modalParagraph.textContent = description;
    if (modalExtra) modalExtra.textContent = extra;

    modal.classList.add('modal--show');
    });
});

  // cerrar con botón "x"
if (closeModal) {
    closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('modal--show');
    });
} else {
    console.warn('.modal__close no encontrado.');
}

  // cerrar al clickear fuera del container
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('modal--show');
});

  // cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('modal--show');
});
});

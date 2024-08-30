const cargarCarousel = () => {
    fetch("/assets/data/carousel.json")
    .then((resp) => resp.json())
    .then((data) => {
        mostrarCarousel(data);
    });    
};

const cargarGrupos = async () => {
    const resp = await fetch("/assets/data/grupos.json");
    const data = await resp.json();
    return data;
};

const cargarCategorias = async () => {
     const resp = await fetch("/assets/data/categorias.json");
     const data = await resp.json();
     return data;
};

const mostrarCarousel = (arrayCarousel) => {
    const carouselInner = document.querySelector("#carouselInner");
    let blnEsPrimero = true
    arrayCarousel.forEach(carouselItem => {
        const divCarouselItem = document.createElement("div");
        divCarouselItem.className = "carousel-item";
        if(blnEsPrimero){
            divCarouselItem.classList.add("active");
            blnEsPrimero = false;
        }
        divCarouselItem.innerHTML = `
            <img src="${carouselItem.image.url}" alt="${carouselItem.image.alt}" class="d-block w-100">
            <div class="carousel-caption d-none d-md-block carouselCaption">
                <h3>${carouselItem.nombre}</h3>
                <p>${carouselItem.descripcion}</p>
            </div>            
        `;
        carouselInner.append(divCarouselItem);
    });
};

const mostrarGrupos = async () => {
    const main = document.querySelector("#main");
    const arrayGrupos = await cargarGrupos();
    const arrayCategorias = await cargarCategorias();
    arrayGrupos.forEach(grupo => {

        const arrayCategoriasPorGrupo = arrayCategorias.filter(categoria => categoria.idGrupo === grupo.id);
        if(arrayCategoriasPorGrupo.length>0){
            const section = document.createElement("section");
            section.className = "mt-3";
            let html = `
                <h2 class="tituloCategoria">${grupo.nombre}</h2>
                <div class="row d-flex flex-row justify-content-center text-center">
            `;
            arrayCategoriasPorGrupo.forEach(({tag,image:{url,alt},nombre}) => {
                html += `
                    <article class="card cardProducto">
                        <a href="./pages/productos.html#${tag}"><img src="${url}" alt="${alt}" class="card-img-top p-2"></a>
                        <div class="card-body cardBodyProducto">
                            <h3 class="card-title cardTitleProducto">${nombre}</h3>
                        </div>
                    </article>
                `;
            });
            html += `
                </div>
            `;
            section.innerHTML = html;
            main.append(section);
        }

    });
};

cargarMenu();
cargarCarousel();
mostrarGrupos();
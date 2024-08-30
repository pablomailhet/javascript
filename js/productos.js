const arrayFiltroCategoria = JSON.parse(localStorage.getItem("filtrocategoria")) || [];
let scrollTo = true;

const cargarCategorias = async () => {
    const resp = await fetch("../assets/data/categorias.json");
    const data = await resp.json();
    return data;
};

const cargarProductos = async () => {
    const resp = await fetch("../assets/data/productos.json");
    const data = await resp.json();
    return data;
};

const mostrarFiltroCategorias = async () => {

    const arrayCategorias = await cargarCategorias();

    const sectionFiltroProductos = document.querySelector("#sectionFiltroProductos");

    const h2 = document.createElement("h2");
    h2.className = "tituloCategoria";
    h2.textContent = "Filtro Categorias";

    const h3 = document.createElement("h3");
    h3.id = "filtro";
    h3.className = "tituloCategoria";
    h3.textContent = "Todas";

    const div = document.createElement("div");
    div.className = "row d-flex flex-row justify-content-center text-center";

    arrayCategorias.forEach(({id,tag,image:{url,alt},nombre}) => {
        const article = document.createElement("article");
        article.id = id;
        article.className = "card cardCategoriaFiltro";
        article.setAttribute("data-options",`{\"nombre\":\"${nombre}\"}`);
        article.innerHTML = `
            <div class="card-body cardBodyCategoriaFiltro">
                <img src="../${url}" alt="${alt}" class="card-img-top p-2 imgFiltroCategorias">
                <h3 class="card-title cardTitleFiltroCategorias">${nombre}</h3>
            </div>     
        `;
        if(arrayFiltroCategoria.some(filtroCategoria => filtroCategoria.id === id)){
            article.classList.add("cardCategoriaFiltroSelect");
        }   
        article.addEventListener("click",()=>{
            actualizarFiltro(article);
        });
        div.append(article);
    });

    sectionFiltroProductos.append(h2);
    sectionFiltroProductos.append(h3);
    sectionFiltroProductos.append(div);

    actualizarTituloFiltro();    

};

const actualizarFiltro = (article) => {
    scrollTo = false;
    article.classList.toggle("cardCategoriaFiltroSelect");
    arrayFiltroCategoria.length = 0;
    const selects = document.querySelectorAll(".cardCategoriaFiltroSelect");
    selects.forEach(select => {
        const categoriaSelect = JSON.parse(select.dataset.options);
        arrayFiltroCategoria.push({
            id:parseInt(select.id),
            nombre:categoriaSelect.nombre
        });
    });
    localStorage.setItem("filtrocategoria",JSON.stringify(arrayFiltroCategoria));
    actualizarTituloFiltro();
    mostrarProductos();
};

const actualizarTituloFiltro = () => {
    const tituloFiltro = document.querySelector("#filtro");
    if(tituloFiltro){
        if(arrayFiltroCategoria.length>0){
            const categorias = arrayFiltroCategoria.reduce((nombre,categoria) => nombre + (nombre ? ", " : "") + categoria.nombre,'');
            tituloFiltro.textContent = categorias;
        }
        else{
            tituloFiltro.textContent = "Todas";
        }
    }
};

const mostrarProductos = async () => {

    let arrayCategorias = await cargarCategorias();
    
    const arrayProductos = await cargarProductos();

    const sectionProductos = document.querySelector("#sectionProductos");
    sectionProductos.innerHTML = "";

    if(arrayFiltroCategoria.length>0){
        arrayCategorias = arrayCategorias.filter(categoria => arrayFiltroCategoria.some(filtroCategoria => filtroCategoria.id === categoria.id));
    }

    arrayCategorias.forEach(categoria => {

        const arrayProductosPorCategoria = arrayProductos.filter(producto => producto.idCategoria === categoria.id);
        if(arrayProductosPorCategoria.length>0){
            const divCategoria = document.createElement("div");
            divCategoria.className = "mt-3";
            divCategoria.id = categoria.tag;
            const h2 = document.createElement("h2");
            h2.className = "tituloCategoria";
            h2.innerText = categoria.nombre;
            divCategoria.append(h2);            
            const divProductos = document.createElement("div");
            divProductos.className = "row d-flex flex-row justify-content-center";
            arrayProductosPorCategoria.forEach(producto => {
                const {image,nombre,descripcion,precio} = producto;
                const precioFormat = precio.toLocaleString('es-AR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                const article = document.createElement("article");
                article.className = "card cardProducto";
                article.innerHTML = `
                        <img src="${image.url}" alt="${image.alt}" class="card-img-top p-2">
                        <div class="card-body cardBodyProducto">
                            <h3 class="card-title cardTitleProducto">${nombre}</h3>
                            <p class="card-text cardTextProducto">${descripcion}</p>
                            <p class="card-text cardTextProducto">$${precioFormat}</p>
                        </div>
                `;
                const divCardFooter = document.createElement("div");
                divCardFooter.className = "card-footer";
                divCardFooter.innerHTML = `<span class="m-1">Cantidad:</span>`;
                const inputCantidad = document.createElement("input");
                inputCantidad.className = "m-1 carritoInput";
                inputCantidad.type = "number";
                inputCantidad.min = 1;
                inputCantidad.value = 1;
                divCardFooter.append(inputCantidad);

                const buttonAgregar = document.createElement("button");
                buttonAgregar.type = "submit";
                buttonAgregar.className = "btn btn-success m-1";
                buttonAgregar.innerText = "Agregar";
                buttonAgregar.addEventListener("click",()=>{
                    const cantidad = parseInt(inputCantidad.value);
                    if(cantidad>0){
                        agregarAlCarrito(categoria,producto,cantidad);
                        const spanCarrito = document.querySelector("#p" + producto.id);
                        if(spanCarrito){
                            const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
                            const productoCarrito = productosCarrito.find(prod => prod.id == producto.id);
                            spanCarrito.innerText = productoCarrito.cantidad;
                        }
                        else{
                            divCardFooter.append(createSpanCarrito(producto.id,inputCantidad.value));                             
                        }
                    }
                    else{
                        swalFireError("La cantidad debe ser mayor a 0");
                    }
                });
                divCardFooter.append(buttonAgregar);
                const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
                const productoCarrito = productosCarrito.find(prod => prod.id == producto.id);
                if(productoCarrito){
                    divCardFooter.append(createSpanCarrito(productoCarrito.id,productoCarrito.cantidad));                    
                }
                article.append(divCardFooter);
                divProductos.append(article);
            });
            divCategoria.append(divProductos);
            sectionProductos.append(divCategoria);
        }

    });

    scrollACategoriaSeleccionada();

};

const scrollACategoriaSeleccionada = () => {
    const hash = window.location.hash;
    if(hash && scrollTo){
        divCategoria = document.querySelector(hash);
        if(divCategoria){
            setTimeout(()=>{
                const headerOffset = 65;
                const elementPosition = divCategoria.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });                
            },10);
        }
    } 
};

const createSpanCarrito = (id,cantidad) => {
    const spanCarrito = document.createElement("span");
    spanCarrito.id = "p" + id;
    spanCarrito.className = "m-1 bi bi-cart spanCarritoProducto";
    spanCarrito.innerText = cantidad;    
    return spanCarrito;
};

const agregarAlCarrito = (categoria,producto,cantidad) => {
    const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let productoCarrito = productosCarrito.find(productoCarrito => productoCarrito.id == producto.id);
    if(productoCarrito){
        productoCarrito.cantidad += cantidad;
        productoCarrito.subTotal = productoCarrito.precio * productoCarrito.cantidad;
    }
    else{
        productoCarrito = {...producto,categoria:categoria,cantidad:cantidad,subTotal:producto.precio*cantidad};
        productosCarrito.push(productoCarrito);
    }
    localStorage.setItem("carrito",JSON.stringify(productosCarrito));
    showToast(productoCarrito.nombre + " se agregó al carrito.",productoCarrito.image.url,"","checkout.html");
    actualizarCart();
};

cargarMenu();
mostrarFiltroCategorias();
mostrarProductos();
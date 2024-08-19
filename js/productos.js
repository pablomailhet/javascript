const mostrarProductos = () => {
    const sectionProductos = document.querySelector("#sectionProductos");
    arrayCategorias.forEach(categoria => {
        const arrayProductosPorCategoria = arrayProductos.filter(producto => producto.idCategoria === categoria.id);
        if(arrayProductosPorCategoria.length>0){
            const divCategoria = document.createElement("div");
            divCategoria.className = "mt-3";
            divCategoria.id = categoria.tag;
            const h2 = document.createElement("h2");
            h2.className = "tituloCategoria";
            h2.innerText = categoria.nombre;
            const divProductos = document.createElement("div");
            divProductos.className = "row d-flex flex-row justify-content-center";
            arrayProductosPorCategoria.forEach(producto => {
                const {image,nombre,descripcion,precio} = producto;
                let precioFormat = precio.toLocaleString('es-AR', {
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
                const divCantidad = document.createElement("div");
                divCantidad.className = "card-footer";
                divCantidad.innerHTML = `<span class="m-1">Cantidad:</span>`;
                const inputCantidad = document.createElement("input");
                inputCantidad.className = "m-1";
                inputCantidad.type = "number";
                inputCantidad.min = 1;
                inputCantidad.max = 10;
                inputCantidad.value = 1;
                const buttonAgregar = document.createElement("button");
                buttonAgregar.type = "submit";
                buttonAgregar.className = "btn btn-success m-1";
                buttonAgregar.innerText = "Agregar";
                buttonAgregar.addEventListener("click",()=>{
                    let cantidad = parseInt(inputCantidad.value);
                    if(cantidad>0){
                        agregarAlCarrito(categoria,producto,cantidad);
                    }
                    else{
                        swalFireError("La cantidad debe ser mayor a 0");
                    }
                });
                divCantidad.append(inputCantidad);
                divCantidad.append(buttonAgregar);
                article.append(divCantidad);
                divProductos.append(article);
            });
            divCategoria.append(h2);
            divCategoria.append(divProductos);
            sectionProductos.append(divCategoria);
            
        }
    });
}

const agregarAlCarrito = (categoria,producto,cantidad) => {
    const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let productoCarrito = {}
    if(productosCarrito.some(productoCarrito => productoCarrito.id === producto.id)){
        const productoIndex = productosCarrito.findIndex(productoCarrito => productoCarrito.id === producto.id);
        productoCarrito = productosCarrito[productoIndex];
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
}

mostrarProductos();
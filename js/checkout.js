const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

const volverAProductos = (delay) => {
    setTimeout(()=>{
        window.location.href = "productos.html";
    }, delay ?? 1000);    
};

const quitarProductoDelCarrito = productoCarrito => {
    swalFireQuestion(
        "¿Está seguro que desea quitar del carrito al siguiente producto?",
        productoCarrito.nombre,
        ()=>{
            const itemIndex = productosCarrito.findIndex(prod => prod.id === productoCarrito.id);
            productosCarrito.splice(itemIndex, 1);
            showToast(productoCarrito.nombre + " se quitó del carrito.",productoCarrito.image.url,"red");
            actualizarCarrito();
            if(productosCarrito.length==0){
                volverAProductos(1000);
            }
        }
    );
};

const vaciarCarrito = () => {
    const cantidadCarrito = productosCarrito.reduce((cantTotal,productoCarrito) => cantTotal + productoCarrito.cantidad, 0);
    swalFireQuestion(
        "¿Está seguro que desea vaciar el carrito?",
        `Se quitarán ${cantidadCarrito} productos del carrito.`,
        ()=>{
            productosCarrito.splice(0, productosCarrito.length);
            showToast("Se vació el carrito.","","red");
            actualizarCarrito();
            volverAProductos(1000);       
        }
    );
};

const confirmarCompra = () => {
    const DateTime = luxon.DateTime;
    const now = DateTime.now();
    const numero = now.toFormat('yyyyMMddHHmmss');
    swalFireSuccess(
        `Gracias por adquirir nuestros productos.
        Tu número de pedido es: ${numero}`,
        `En breve te enviaremos un email con el detalle de tu pedido y link de pago.`,
        ()=>{
            volverAProductos(0);
        }
    );
    productosCarrito.splice(0, productosCarrito.length);
    actualizarCarrito();
};

const actualizarCarrito = () => {
    const carrito = document.querySelector("#carrito");
    const sectionDatosEnvio = document.querySelector("#sectionDatosEnvio");
    carrito.innerHTML = "";
    localStorage.setItem("carrito",JSON.stringify(productosCarrito));
    if(productosCarrito.length>0){

        const h2 = document.createElement("h2");
        h2.innerText = "Productos agregados al carrito";
        h2.className = "carrito";
        carrito.append(h2);

        productosCarrito.forEach(productoCarrito => {
            const divRow = document.createElement("div");
            divRow.className = "row flex-row justify-content-center p-1 carritoRow";

            const divColProducto = document.createElement("div");
            divColProducto.className = "col d-flex align-items-center justify-content-start";
            divColProducto.innerHTML = `
                <img src="${productoCarrito.image.url}" alt="${productoCarrito.image.alt}" class="imgCarrito">
                <span class="carritoTexto">${productoCarrito.nombre}</span>
            `;
            divRow.append(divColProducto);

            const divColCantidad = document.createElement("div");
            divColCantidad.className = "col d-flex align-items-center justify-content-end";
            const cantidadProducto = document.createElement("input");
            cantidadProducto.className = "carritoTexto carritoInput";
            cantidadProducto.type = "number";
            cantidadProducto.min = 1;
            cantidadProducto.value = productoCarrito.cantidad;
            cantidadProducto.addEventListener("change",()=>{
                let cantidad = parseInt(cantidadProducto.value);
                if(cantidad>0){
                    productoCarrito.cantidad = cantidad;
                    productoCarrito.subTotal = productoCarrito.precio * productoCarrito.cantidad;
                    actualizarCarrito();
                }
                else{
                    cantidadProducto.value = productoCarrito.cantidad;
                    swalFireError("La cantidad debe ser mayor a 0");
                }
            });
            divColCantidad.append(cantidadProducto);
            divRow.append(divColCantidad);

            const divColSubTotal = document.createElement("div");
            divColSubTotal.className = "col-3 d-flex align-items-center justify-content-end";
            const subTotal = productoCarrito.subTotal.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            divColSubTotal.innerHTML = `<span class="carritoTexto">$${subTotal}</span>`;
            divRow.append(divColSubTotal);

            const divColBtnQuitar = document.createElement("div");
            divColBtnQuitar.className = "col-1 d-flex align-items-center justify-content-center";
            const buttonQuitar = document.createElement("button");
            buttonQuitar.className = "btn btn-secondary carritoBtnQuitar";
            buttonQuitar.innerText = "X";
            buttonQuitar.addEventListener("click",()=>{
                quitarProductoDelCarrito(productoCarrito);
            });
            divColBtnQuitar.append(buttonQuitar);
            divRow.append(divColBtnQuitar);

            carrito.append(divRow);
        });

        const divRow = document.createElement("div");
        divRow.className = "row flex-row justify-content-center p-1 carritoRow carritoRowTotal";

        const divColProducto = document.createElement("div");
        divColProducto.className = "col d-flex align-items-center justify-content-start";
        divColProducto.innerHTML = `<span class="carritoTexto carritoTextoBold">Total del carrito</span>`;
        divRow.append(divColProducto);

        let totalCarrito = productosCarrito.reduce((total,productoCarrito) => total + productoCarrito.subTotal, 0);
        totalCarrito = totalCarrito.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        const divColSubTotal = document.createElement("div");
        divColSubTotal.className = "col-3 d-flex align-items-center justify-content-end";
        divColSubTotal.innerHTML = `<span class="carritoTexto carritoTextoBold">$${totalCarrito}</span>`;
        divRow.append(divColSubTotal);

        const divColBtnVaciar = document.createElement("div");
        divColBtnVaciar.className = "col-1 d-flex align-items-center justify-content-center";
        const buttonVaciar = document.createElement("button");
        buttonVaciar.className = "align-items-center justify-content-center btn btn-secondary carritoBtnQuitar";
        buttonVaciar.innerText = "X";
        buttonVaciar.addEventListener("click",()=>{
            vaciarCarrito();
        });
        divColBtnVaciar.append(buttonVaciar);
        divRow.append(divColBtnVaciar);

        carrito.append(divRow);
        
        sectionDatosEnvio.classList.remove("d-none");
        const frmCheckout = document.querySelector("#frmCheckout");
        frmCheckout.addEventListener("submit",(e)=>{
            e.preventDefault();
            const cantidadCarrito = productosCarrito.reduce((cantTotal,productoCarrito) => cantTotal + productoCarrito.cantidad, 0);
            let totalCarrito = productosCarrito.reduce((total,productoCarrito) => total + productoCarrito.subTotal, 0);
            totalCarrito = totalCarrito.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });            
            swalFireQuestion("¿Confirma realizar la compra?",
                `Tiene seleccionado ${cantidadCarrito} articulos, el monto total es de $${totalCarrito}`,
                confirmarCompra
            );            
        });

    }
    else{
        sectionDatosEnvio.classList.add("d-none");
    }
    actualizarCart();
};

cargarMenu();
actualizarCarrito();
if(productosCarrito.length==0){
    swalFireInfo(
        "El carrito está vacio.",
        "Agregue uno o mas productos.",
        ()=>{
            volverAProductos(0);
        }
    );
};
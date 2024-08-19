const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

const quitarProductoDelCarrito = productoCarrito => {
    swalFireQuestion("¿Está seguro que desea quitar del carrito al siguiente producto?",productoCarrito.nombre,()=>{
        const itemIndex = productosCarrito.findIndex(prod => prod.id === productoCarrito.id);
        productosCarrito.splice(itemIndex, 1);
        showToast(productoCarrito.nombre + " se quitó del carrito.",productoCarrito.image.url,"red");
        actualizarCarrito();        
    });
};

const vaciarCarrito = () => {
    swalFireQuestion("¿Está seguro que desea vaciar el carrito?","",()=>{
        productosCarrito.splice(0, productosCarrito.length);
        showToast("Se vació el carrito.","","red");
        actualizarCarrito();
        window.location.href = "productos.html";          
    });
}

const actualizarCarrito = () => {
    const carrito = document.querySelector("#carrito");
    carrito.innerHTML = "";
    localStorage.setItem("carrito",JSON.stringify(productosCarrito));
    if(productosCarrito.length>0){

        const h2 = document.createElement("h2");
        h2.innerText = "Productos agregados al carrito";
        h2.className = "carrito";
        carrito.append(h2);

        productosCarrito.forEach(productoCarrito => {
            const divRow = document.createElement("div");
            divRow.className = "row flex-row justify-content-center p-1";

            const divColProducto = document.createElement("div");
            divColProducto.className = "col-5 flex-column align-items-center justify-content-start";
            divColProducto.innerHTML = `
                <img src="${productoCarrito.image.url}" alt="${productoCarrito.image.alt}" class="imgCarrito">
                <span>${productoCarrito.nombre}</span>
            `;
            divRow.append(divColProducto);

            const divColCantidad = document.createElement("div");
            divColCantidad.className = "col-1 d-flex align-items-center justify-content-end";
            const cantidadProducto = document.createElement("input");
            cantidadProducto.className = "";
            cantidadProducto.type = "number";
            cantidadProducto.min = 1;
            cantidadProducto.max = 10;
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
            divColSubTotal.className = "col-2 d-flex align-items-center justify-content-end";
            const subTotal = productoCarrito.subTotal.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });            
            divColSubTotal.innerHTML = `<span>$${subTotal}</span>`;
            divRow.append(divColSubTotal);

            const divColBtnQuitar = document.createElement("div");
            divColBtnQuitar.className = "col-1 d-flex align-items-center justify-content-center";
            const buttonQuitar = document.createElement("button");
            buttonQuitar.className = "btn btn-secondary carritoBtnQuitar";
            buttonQuitar.innerText = "Quitar";
            buttonQuitar.addEventListener("click",()=>{
                quitarProductoDelCarrito(productoCarrito);
            });
            divColBtnQuitar.append(buttonQuitar);
            divRow.append(divColBtnQuitar);

            carrito.append(divRow);
        });

        const divRow = document.createElement("div");
        divRow.className = "row flex-row justify-content-center p-1";

        const divColProducto = document.createElement("div");
        divColProducto.className = "col-6 d-flex align-items-center justify-content-end";
        divColProducto.innerHTML = `<span>Total del carrito</span>`;
        divRow.append(divColProducto);

        let totalCarrito = productosCarrito.reduce((total,productoCarrito) => total + productoCarrito.subTotal, 0);
        totalCarrito = totalCarrito.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });         
        const divColSubTotal = document.createElement("div");
        divColSubTotal.className = "col-2 d-flex align-items-center justify-content-end";
        divColSubTotal.innerHTML = `<span>$${totalCarrito}</span>`;
        divRow.append(divColSubTotal);

        const divColBtnVaciar = document.createElement("div");
        divColBtnVaciar.className = "col-1 d-flex align-items-center justify-content-center";
        const buttonVaciar = document.createElement("button");
        buttonVaciar.className = "align-items-center justify-content-center btn btn-secondary carritoBtnQuitar";
        buttonVaciar.innerText = "Vaciar";
        buttonVaciar.addEventListener("click",()=>{
            vaciarCarrito();
        });
        divColBtnVaciar.append(buttonVaciar);
        divRow.append(divColBtnVaciar);

        carrito.append(divRow);        

        const divRowConfirmar = document.createElement("div");
        divRowConfirmar.className = "row flex-row justify-content-center p-1";        

        const divColConfirmar = document.createElement("div");
        divColConfirmar.className = "col-9 d-flex align-items-center justify-content-center";

        const buttonConfirmar = document.createElement("button");
        buttonConfirmar.className = "btn btn-success carritoBtnConfirmar";
        buttonConfirmar.innerText = "Confirmar carrito";
        buttonConfirmar.addEventListener("click",()=>{
            swalFireQuestion("¿Confirma realizar la compra?","",()=>{
                swalFireSuccess("Gracias por adquirir nuestros productos. Esperamos que tu experiencia con nosotros sea extraordinaria","En breve te enviaremos un email con el detalle de tu pedido.",()=>{
                    window.location.href = "productos.html"
                });
                productosCarrito.splice(0, productosCarrito.length);
                actualizarCarrito();
            })            
        });    
        divColConfirmar.append(buttonConfirmar);
        divRowConfirmar.append(divColConfirmar);
        carrito.append(divRowConfirmar);

    }
    actualizarCart();
}

actualizarCarrito();
if(productosCarrito.length==0){
    swalFireInfo("El carrito está vacio.","Agregue uno o mas productos.",()=>{
        window.location.href = "productos.html";
    });
}
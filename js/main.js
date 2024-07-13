const categorias = [
    {
        id:1,
        nombre:"Motores"
    },
    {
        id:2,
        nombre:"Variadores"
    },
    {
        id:3,
        nombre:"Helice"
    }
];

const productos = [
    {
        id:1,
        nombre:"Motor 5010 360KV",
        precio:10.30,
        idCategoria:1
    },
    {
        id:2,
        nombre:"Motor 3550 1200KV",
        precio:13.50,
        idCategoria:1
    },  
    {
        id:3,
        nombre:"Motor 2212 1400KV",
        precio:15.20,
        idCategoria:1
    },       
    {
        id:4,
        nombre:"ESC 3s 30amp",
        precio:20.50,
        idCategoria:2
    },
    {
        id:5,
        nombre:"ESC 4s 45amp",
        precio:22.40,
        idCategoria:2
    },   
    {
        id:6,
        nombre:"ESC 6s 60amp",
        precio:42.10,
        idCategoria:2
    },      
    {
        id:7,
        nombre:"Helice 8x4",
        precio:4.20,
        idCategoria:3
    },
    {
        id:8,
        nombre:"Helice 9x6",
        precio:5.60,
        idCategoria:3
    },         
    {
        id:9,
        nombre:"Helice 10x6",
        precio:6.30,
        idCategoria:3
    }    
];

let productosCarrito;

const iva = 10.5;

function obtenerCategoriaPorId(id){
    for(let i=0;i<categorias.length;i++){
        if(id===categorias[i].id){
            return categorias[i];
        }
    }
}

function obtenerProductoPorId(id,idCategoria){
    for(let i=0;i<productos.length;i++){
        if(id===productos[i].id && idCategoria===productos[i].idCategoria){
            return productos[i];
        }
    }
}

function obtenerProductosPorIdCategoria(idCategoria){
    let productosProCategoria = [];
    for(let i=0;i<productos.length;i++){
        if(idCategoria===productos[i].idCategoria){
            productosProCategoria.push(productos[i]);
        }
    }   
    return productosProCategoria;
}

function obtenerCategorias(){
    let strCategorias = "";
    for(let i=0; i<categorias.length;i++){
        strCategorias += categorias[i].id + " - " + categorias[i].nombre + "\n";
    }
    return strCategorias;
}

function obtenerProductos(productos){
    let strProductos = "";
    for(let i=0;i<productos.length;i++){
        strProductos += obtenerProducto(productos[i]);
    }     
    return strProductos;
}

function obtenerProducto(producto){
    return producto.id + " - " + producto.nombre + " $" + producto.precio + "\n";
}

function agregarAlCarrito(producto,cantidad){

    let existe = false;
    for(let i=0;i<productosCarrito.length;i++){
        if(productosCarrito[i].id === producto.id){
            existe = true;
            productosCarrito[i].cantidad += cantidad;
            productosCarrito[i].subtotal = productosCarrito[i].precio * productosCarrito[i].cantidad;
        }
    }
    if(!existe){
        let productoCarrito = {
            id: producto.id,
            nombre: producto.nombre,
            categoria: obtenerCategoriaPorId(producto.idCategoria).nombre,
            precio: producto.precio,
            cantidad: cantidad,
            subtotal: parseFloat(producto.precio) * cantidad
        };
        productosCarrito.push(productoCarrito);
    }

    console.log("----------------------------------Carrito-----------------------------------------");
    mostrarCarrito();    

}

function calcularTotal(){
    let total = 0;
    for(let i=0;i<productosCarrito.length;i++){
        total += productosCarrito[i].subtotal;
    }
    return total;
}

function mostrarCarrito(){
    for(let i=0;i<productosCarrito.length;i++){
        console.log(productosCarrito[i].categoria + " - " + productosCarrito[i].nombre + " - Precio: $" + productosCarrito[i].precio.toFixed(1) + " - Cant: " + productosCarrito[i].cantidad + " - Subtotal: $" + productosCarrito[i].subtotal.toFixed(1));
    }
}

function mostrarTotal(){
    if(productosCarrito.length>0){
        const totalSinIva = calcularTotal();
        const totalIva = (totalSinIva * iva)/100;
        const totalConIva = totalSinIva + totalIva;

        let strAlert = "------------------------------------------------------------------\n";
        strAlert +=    "DETALLE COMPRA:\n";
        strAlert +=    "------------------------------------------------------------------\n";
        for(let i=0;i<productosCarrito.length;i++){
            strAlert += productosCarrito[i].categoria + " - " + productosCarrito[i].nombre + " - Precio: $" + productosCarrito[i].precio.toFixed(1) + " - Cant: " + productosCarrito[i].cantidad + " - Subtotal: $" + productosCarrito[i].subtotal.toFixed(1) + "\n";
        }
        strAlert += "Total sin IVA: $" + totalSinIva.toFixed(1) + "\n";
        strAlert += "IVA: " + iva + "% $" + (totalIva.toFixed(1)) + "\n";
        strAlert += "Total con IVA: $" + totalConIva.toFixed(1) + "\n";

        console.log(strAlert);
        alert(strAlert);
    }
}

function iniciarCompra(){
    productosCarrito = [];

    const strCategorias = obtenerCategorias();
    let idCategoria;
    let categoria;
    do {
        idCategoria = parseInt(prompt("Ingrese el ID de una Categoria:\n" + strCategorias + "0 - Finalizar compra"));
        if(idCategoria===0){
            break;
        }
        categoria = obtenerCategoriaPorId(idCategoria);
        if(categoria!==undefined){
            let productosPorCategoria = obtenerProductosPorIdCategoria(idCategoria);
            const strProductos = obtenerProductos(productosPorCategoria);
            
            let idProducto;
            let producto;
            do{
                idProducto = parseInt(prompt(categoria.nombre + "\nIngrese el ID del Producto a comprar:\n" + strProductos + "0 - Volver a categorias."));
                if(idProducto===0){
                    break;
                }
                producto = obtenerProductoPorId(idProducto,idCategoria);
                if(producto!==undefined){

                    let cantidad;
                    do{
                        cantidad = parseInt(prompt(categoria.nombre + ":\n" + obtenerProducto(producto) + "Ingrese la cantidad a comprar:"));

                    } while(isNaN(cantidad) );

                    if(cantidad!==0){
                        agregarAlCarrito(producto,cantidad);
                    }

                }

            } while (producto===undefined || idProducto>0);

        }
    } while(categoria===undefined || idCategoria>0);

    mostrarTotal();

    if(confirm("Desea realizar otra comprar?")){
        iniciarCompra();
    }

}

iniciarCompra();

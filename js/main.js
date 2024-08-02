class Categoria{
    constructor(id,nombre){
        this.id = id;
        this.nombre = nombre;
    }
    toString(){
        return this.id + " - " + this.nombre;
    }
}

class Producto{
    constructor(id,nombre,precio,idCategoria){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.idCategoria = idCategoria;
    }
    toString(){
        return this.id + " - " + this.nombre + " $" + this.precio;
    }
}

class ProductoCarrito{
    constructor(id,nombre,precio,idCategoria,cantidad){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.idCategoria = idCategoria;
        this.cantidad = cantidad;
        this.categoria = obtenerCategoriaPorId(this.idCategoria).nombre;        
    }
    subtotal(){
        return parseFloat(this.precio) * this.cantidad;
    }
    toString(){
        return this.categoria + " - " + this.nombre + " - Precio: $" + this.precio.toFixed(1) + " - Cant: " + this.cantidad + " - Subtotal: $" + this.subtotal().toFixed(1);
    }    
}

const categorias = [
    new Categoria(1,"Motores"),
    new Categoria(2,"Variadores"),
    new Categoria(3,"Helice")
];

const productos = [
    new Producto(1,"Motor 5010 360KV",10.3,1),
    new Producto(2,"Motor 3550 1200KV",13.5,1),
    new Producto(3,"Motor 2212 1400KV",15.2,1),
    new Producto(4,"ESC 3s 30amp",20.5,2),
    new Producto(5,"ESC 4s 45amp",22.4,2),
    new Producto(6,"ESC 6s 60amp",42.1,2),
    new Producto(7,"Helice 8x4",4.2,3),
    new Producto(8,"Helice 9x6",5.6,3),
    new Producto(9,"Helice 10x6",6.3,3)
];

let productosCarrito = [];

const iva = 10.5;

function obtenerCategoriaPorId(id){
   return categorias.find(categoria => categoria.id === id);
}

function obtenerProductoPorIdProductoPorIdCategoria(id,idCategoria){
    return productos.find(producto => producto.id === id && producto.idCategoria === idCategoria);  
}

function obtenerProductosPorIdCategoria(idCategoria){
    return productos.filter(producto => producto.idCategoria === idCategoria);  
}

function obtenerCategorias(){
    return categorias.reduce((strCategoria,categoria) => strCategoria + categoria.toString() + "\n", "");
}

function obtenerProductos(productos){
    return productos.reduce((strProducto,producto) => strProducto + producto.toString() + "\n", "");
}

function agregarAlCarrito(producto,cantidad){

    if(productosCarrito.some(productoCarrito => productoCarrito.id === producto.id)){
        const itemIndex = productosCarrito.findIndex(productoCarrito => productoCarrito.id === producto.id);
        productosCarrito[itemIndex].cantidad += cantidad;
    }
    else{
        let productoCarrito = new ProductoCarrito(producto.id,producto.nombre,producto.precio,producto.idCategoria,cantidad);
        productosCarrito.push(productoCarrito);
    }

    mostrarCarrito();

}

function calcularTotal(){
    return productosCarrito.reduce((total,productoCarrito) => total + productoCarrito.subtotal(), 0);
}

function mostrarCarrito(){
    console.log("---------------------------Carrito----------------------------");
    for(let i=0;i<productosCarrito.length;i++){
        console.log(productosCarrito[i].toString());
    }
}

function mostrarTotal(){
    if(productosCarrito.length>0){
        const totalSinIva = calcularTotal();
        const totalIva = (totalSinIva * iva)/100;
        const totalConIva = totalSinIva + totalIva;

        let strAlert = "--------------------------------------------------------------\n";
        strAlert +=    "DETALLE COMPRA:\n";
        strAlert +=    "--------------------------------------------------------------\n";
        for(let i=0;i<productosCarrito.length;i++){
            strAlert += productosCarrito[i].toString() + "\n";
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
                producto = obtenerProductoPorIdProductoPorIdCategoria(idProducto,idCategoria);
                if(producto!==undefined){

                    let cantidad;
                    do{
                        cantidad = parseInt(prompt(categoria.nombre + ":\n" + producto.toString() + "\n" + "Ingrese la cantidad a comprar:"));

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

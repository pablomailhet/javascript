const actualizarCart = () => {
    const cart = document.querySelector("#cart");    
    const cartProductosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if(cartProductosCarrito.length>0){
        const cantidadCarrito = cartProductosCarrito.reduce((cantTotal,productoCarrito) => cantTotal + productoCarrito.cantidad, 0);
        cart.innerText = cantidadCarrito;
    }
    else{
        cart.innerText = "";
    }    
}
actualizarCart();
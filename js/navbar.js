const actualizarCart = () => {
    const cartProductosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cart = document.querySelector("#cart");    
    if(cart){
        if(cartProductosCarrito.length>0){
            const cantidadCarrito = cartProductosCarrito.reduce((cantTotal,productoCarrito) => cantTotal + productoCarrito.cantidad, 0);
            cart.innerText = cantidadCarrito;
        }
        else{
            cart.innerText = "";
        } 
    }
};

const cargarMenu = () => {
    const currentPath = document.location.pathname;
    let url = "assets/data/navbaritems.json";
    if(currentPath.indexOf('pages/')>-1){
        url = "../" + url;
    }
    else{
        url = "./" + url;
    }
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        mostrarMenu(data);
    });
};

const mostrarMenu = (arrMenu) => {
    const currentPath = document.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/')+1);
    const navbar = document.querySelector("#navbar-nav");
    arrMenu.forEach(({link,nombre}) => {
        const li = document.createElement("li");
        li.className = "nav-item";
        const a = document.createElement("a");
        a.className = "nav-link navLink";
        const file = link.substring(link.lastIndexOf('/')+1);
        let href = "";
        if(currentFile===file){
            href = "#";
            a.classList.add("navLinkActive");
        }
        else{
            if(currentPath.indexOf('pages/')>-1){
                href = "../" + link;
            }
            else{
                href = "./" + link;
            }
        }
        a.href = href;
        a.innerHTML = nombre;
        li.append(a);
        navbar.append(li);
    });
    actualizarCart();
};
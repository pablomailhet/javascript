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
    fetch("../assets/data/navbaritems.json")
    .then((resp) => resp.json())
    .then((data) => {
        mostrarMenu(data);
    });
};

const mostrarMenu = (arrMenu) => {
    const currentPath = document.location.pathname;
    const basePath = currentPath.substring(0,currentPath.lastIndexOf('/'));
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
            if(basePath===""){
                href = link.indexOf('/')>-1 ? "./" + link : link;
            }
            else{
                href = link.indexOf('/')>-1 ? "./" + file : "../" + link;
            }
        }
        a.href = href;
        a.innerHTML = nombre;
        li.append(a);
        navbar.append(li);
    });
    actualizarCart();
};
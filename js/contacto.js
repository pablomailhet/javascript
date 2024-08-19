const frmContacto = document.querySelector("#frmContacto");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const email = document.querySelector("#email");
frmContacto.addEventListener("submit",(e)=>{
    e.preventDefault();
    swalFireSuccess(`Estimado ${nombre.value} ${apellido.value}, recibimos su consuta.`,`En breve nos comunicaremos via email a su correo: ${email.value}`);
    frmContacto.reset();
});
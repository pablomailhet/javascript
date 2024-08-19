const swalFireError = msgError => {
    Swal.fire({
        icon: "error",
        title: msgError,
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-secondary',
        }                           
    });
}

const swalFireQuestion = (title,text,callBack) => {
    let swalFire = Swal.fire({
        icon: "question",
        title: title,
        text: text,
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        position: "center",
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-secondary',
        }        
    });    
    if(callBack){
        swalFire.then(result => {
            if (result.isConfirmed) {
                callBack();
            }
        });
    }
}

const swalFireInfo = (title,text,callBack) => {
    let swalFire = Swal.fire({
        icon: "info",
        title: title,
        text: text,
        confirmButtonText: "Aceptar",
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-secondary',
        }                        
    });
    if(callBack){
        swalFire.then(result => {
            if (result) {
                callBack();
            }
        });
    }
}

const swalFireSuccess = (title,text,callBack) => {
    let swalFire = Swal.fire({
        icon: "success",
        title: title,
        text: text,
        confirmButtonText: "Aceptar",
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-secondary',
        }                        
    });
    if(callBack){
        swalFire.then(result => {
            if (result) {
                callBack();
            }
        });
    }
}
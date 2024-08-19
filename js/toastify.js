const showToast = (text,avatar,color,urlOnClick) => {
    Toastify({
        text: text,
        duration: 3000,
        close: false,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: color || "green"
        },
        avatar: avatar,
        onClick: function() {
            if(urlOnClick){
                window.location.href = urlOnClick;
            }
        }
    }).showToast();
}
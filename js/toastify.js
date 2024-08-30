const showToast = (text,avatar,color,urlOnClick) => {
    Toastify({
        text: text,
        duration: 3000,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: color || "green"
        },
        avatar: avatar,
        destination: urlOnClick || "",
        offset:{
            x: 0,
            y: 40,
        }
    }).showToast();
};
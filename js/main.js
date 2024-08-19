const main = document.querySelector("#main");

const mostrarGrupos = () => {
    arrayGrupos.forEach(grupo => {
        const arrayCategoriasPorGrupo = arrayCategorias.filter(categoria => categoria.idGrupo === grupo.id);
        if(arrayCategoriasPorGrupo.length>0){
            const section = document.createElement("section");
            section.className = "mt-3";
            let html = `
                <h2 class="tituloCategoria">${grupo.nombre}</h2>
                <div class="row d-flex flex-row justify-content-center text-center">
            `;
            arrayCategoriasPorGrupo.forEach(({tag,image:{url,alt},nombre}) => {
                html += `
                    <article class="card cardProducto">
                        <a href="./pages/productos.html#${tag}"><img src="${url}" alt="${alt}" class="card-img-top p-2"></a>
                        <div class="card-body cardBodyProducto">
                            <h3 class="card-title cardTitleProducto">${nombre}</h3>
                        </div>
                    </article>
                `;
            });
            html += `
                </div>
            `;
            section.innerHTML = html;
            main.append(section);
        }
    });
};

mostrarGrupos();
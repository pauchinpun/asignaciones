


document.addEventListener('DOMContentLoaded', () => {
    obtenerHermanosBD();
    document.addEventListener('click', e => clickController(e.target))

})

// Controlador general de clicks
const clickController = (target) => {
    if (target.closest('table')) tableClickController(target)
}

// Controlador de clicks de la tabla
const tableClickController = (target) => {
    const table_row = target.closest('tr');
    const isButtonOptionsClicked = target.classList.contains('btn-options');
    const checkboxClicked = target.classList.contains('checkbox-row')
    const optionsShown = document.querySelectorAll('.options-parent>.options.show');
    const optionParent = target.closest('.options-parent')

    if (checkboxClicked) {
        checkboxClicked.checked = true;
        table_row.classList.add('active')
    }



    console.log("🚀 Table row:", table_row);
    console.log("🚀 isButtonOptionsClicked:", isButtonOptionsClicked)


    // si se clica al btn de opciones
    if (isButtonOptionsClicked) {
        if (optionsShown) optionsShown.forEach(elem => elem.classList.remove('show'))
        optionParent.querySelector('.options').classList.add('show');

    } else if (optionsShown) {
        optionsShown.forEach(elem => elem.classList.remove('show'))
    }


    // if  {
    //     document.querySelector('.options-parent>.options.show').classList.remove('show')
    // }
}

// Obtener y mostrar todos los hermanos 
const obtenerHermanosBD = async () => {
    try {
        const hermanos = await electronAPI.hermanosDB();
        const htmlHermanos = hermanos.reduce((acc, hmno) => {
            acc += `<tr class="table-row" id="${hmno.Id}">
                    <td><input type="checkbox" class="checkbox-row"></td>
                    <td>${hmno.Nombre}</td>
                    <td>${hmno.Hermano}</td>
                    <td>${hmno.Lectura}</td>
                    <td>${hmno.Conversacion}</td>
                    <td>${hmno.Revisita}</td>
                    <td>${hmno.Curso}</td>
                    <td>${hmno.Discurso}</td>
                    <td>
                        <div class="options-parent">
                            <button type="button" class="btn-options">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>

                            <div class="options">
                                <button type="button"><i class="fa-solid fa-pen"></i> Editar</button>
                                <button type="button"><i class="fa-solid fa-trash"></i> Borrar</button>
                            </div>
                        </div>

                    </td>
                </tr>`;

            return acc;
        }, '');

        document.querySelector('table > tbody').innerHTML = htmlHermanos;
    } catch (error) {
        // alert(error)
    }
}







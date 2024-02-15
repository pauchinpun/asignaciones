


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
    const mainCheckboxClicked = target.classList.contains('main-checkbox')
    const optionsShown = document.querySelectorAll('.options-parent>.options.show');
    const optionParent = target.closest('.options-parent')

    if (checkboxClicked) {
        if (!target.checked) {
            table_row.classList.remove('active')
        } else {
            table_row.classList.add('active')
        }
        checkIfShowDeleteButton();
    }

    if (mainCheckboxClicked) {
        if (!target.checked) {
            document.querySelectorAll('.checkbox-row')
                .forEach(elem => {
                    elem.checked = false
                    elem.closest('.table-row').remove('active')
                })
        } else {
            document.querySelectorAll('.checkbox-row')
                .forEach(elem => {
                    elem.checked = true
                    elem.closest('.table-row').classList.add('active')
                })
        }
    }

    // si se clica al btn de opciones
    if (isButtonOptionsClicked) {
        if (optionsShown) optionsShown.forEach(elem => elem.classList.remove('show'))
        optionParent.querySelector('.options').classList.add('show');

    } else if (optionsShown) {
        optionsShown.forEach(elem => elem.classList.remove('show'))
    }

}

const checkIfShowDeleteButton = () => {
    let activeTR = document.querySelector('table > tbody > tr.active');
    let toolbarButtons = document.querySelector('#toolbar .buttons');
    if (activeTR) {
        toolbarButtons.querySelector('.btn-danger').classList.remove('d-none')
        toolbarButtons.querySelector('.btn-primary').classList.add('d-none')
    } else {
        toolbarButtons.querySelector('.btn-danger').classList.add('d-none')
        toolbarButtons.querySelector('.btn-primary').classList.remove('d-none')
    }
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







let modalCreated = null;

document.querySelector('#header-table-modal').addEventListener('hidden.bs.modal', () => {
    let modalForm = document.querySelector('#header-table-modal form')
    modalForm.reset()
    modalForm.classList.remove('was-validated')
})

// ---------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    obtenerHermanosBD();
    document.addEventListener('click', e => clickController(e.target))
    formChecker()

})

const formChecker = () => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', async (event) => {

            event.preventDefault()
            event.stopPropagation()

            if (form.checkValidity()) {
                if (form.id == 'add-hermano-form') {
                    const inputValues = Array.from(form.querySelectorAll('input')).reduce((acc, input) => {
                        const key = input.type === 'text' ? 'nombre' : input.id.split('-').pop();
                        acc[key] = input.type === 'text' ? input.value : input.checked;
                        return acc;
                    }, {});

                    try {
                        await electronAPI.newHermano(inputValues);
                        obtenerHermanosBD();
                        modalCreated.hide()
                    } catch (error) {
                        alert(error)
                    }
                }
            }

            form.classList.add('was-validated')
        }, false)
    })
};

// Controlador general de clicks
const clickController = async (target) => {

    // Si se clica a algo de la tabla
    if (target.closest('table')) tableClickController(target)


    // Si se clica a Añadir hermano
    if (target.id == 'add-hermano') {

    }

    // Si se clica a Borrar hermano
    if (target.id == 'delete-hermano') {
        let mainCheck = document.querySelector('table > thead  input')
        let allHermanosChecked = document.querySelectorAll('table > tbody > tr.active')
        allHermanosChecked.forEach((async (hermano) => {
            await electronAPI.deleteHermano(hermano.id)
        }));

        if (mainCheck.checked) mainCheck.checked = false
        await obtenerHermanosBD();
        checkIfShowDeleteButton()
    }
}

// Controlador de clicks de la tabla
const tableClickController = async (target) => {
    const table_row = target.closest('tr');
    const isButtonOptionsClicked = target.classList.contains('btn-options');
    const checkboxClicked = target.classList.contains('checkbox-row')
    const mainCheckboxClicked = target.classList.contains('main-checkbox')
    const optionsShown = document.querySelectorAll('.options-parent>.options.show');
    const optionParent = target.closest('.options-parent')

    // Btn options >> btn edit / delete
    const btnEditSingleRow = target.classList.contains("btn-edit-single-row")
    const btnDeleteSingleRow = target.classList.contains("btn-delete-single-row")

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
                    elem.closest('.table-row').classList.remove('active')
                })
        } else {
            document.querySelectorAll('.checkbox-row')
                .forEach(elem => {
                    elem.checked = true
                    elem.closest('.table-row').classList.add('active')
                })
        }

        checkIfShowDeleteButton();
    }

    // si se clica al btn de opciones
    if (isButtonOptionsClicked) {
        if (optionsShown) optionsShown.forEach(elem => elem.classList.remove('show'))
        optionParent.querySelector('.options').classList.add('show');

    } else if (optionsShown) {
        optionsShown.forEach(elem => elem.classList.remove('show'))
    }

    if (btnDeleteSingleRow) {
        let trActive = target.closest('tr');
        await electronAPI.deleteHermano(trActive.id)
        await obtenerHermanosBD();
    }

}

const checkIfShowDeleteButton = () => {
    const activeTR = document.querySelector('table > tbody > tr.active');
    const toolbarButtons = document.querySelector('#toolbar .buttons');
    const btnDanger = toolbarButtons.querySelector('.btn-danger');
    const btnPrimary = toolbarButtons.querySelector('.btn-primary');

    if (activeTR) {
        btnDanger.classList.remove('d-none');
        btnPrimary.classList.add('d-none');
    } else {
        btnDanger.classList.add('d-none');
        btnPrimary.classList.remove('d-none');
    }
};


// Obtener y mostrar todos los hermanos 
const obtenerHermanosBD = async () => {
    try {
        const hermanos = await electronAPI.getAllhermanosDB();
        const htmlHermanos = hermanos.reduce((acc, hmno) => {
            acc += `<tr class="table-row" id="${hmno.Id}">
                        <td><input type="checkbox" class="checkbox-row"></td>
                        <td>${hmno.Nombre}</td>
                        <td>${hmno.Hermano ? 'Si' : 'No'}</td>
                        <td>${hmno.Lectura ? 'Si' : 'No'}</td>
                        <td>${hmno.Conversacion ? 'Si' : 'No'}</td>
                        <td>${hmno.Revisita ? 'Si' : 'No'}</td>
                        <td>${hmno.Curso ? 'Si' : 'No'}</td>
                        <td>${hmno.Discurso ? 'Si' : 'No'}</td>
                        <td>
                            <div class="options-parent">
                                <button type="button" class="btn-options">
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </button>

                                <div class="options">
                                    <button type="button" class="btn-edit-single-row"><i class="fa-solid fa-pen"></i> Editar</button>
                                    <button type="button" class="btn-delete-single-row"><i class="fa-solid fa-trash"></i> Borrar</button>
                                </div>
                            </div>

                        </td>
                    </tr>`;

            return acc;
        }, '');

        document.querySelector('table > tbody').innerHTML = htmlHermanos;
    } catch (error) {
        alert(error)
    }
}

const openModal = () => {
    let modal = document.querySelector('#header-table-modal')
    modalCreated = new bootstrap.Modal(modal, {})
    modalCreated.show()
}




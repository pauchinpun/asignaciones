// (async () => {
//     let hermanos = await electronAPI.hermanosDB();
//     let htmlTableCode = hermanos.reduce((prev, arrVal) => {
//         prev += `<tr id="hermano-${arrVal['Id']}">
//                     <td>${arrVal['Nombre']}</td>
//                     <td>${arrVal['Hermano'] ? 'Si' : 'No'}</td>
//                     <td>${arrVal['Lectura']? 'Si' : 'No'}</td>
//                     <td>${arrVal['Conversacion']? 'Si' : 'No'}</td>
//                     <td>${arrVal['Revisita']? 'Si' : 'No'}</td>
//                     <td>${arrVal['Curso']? 'Si' : 'No'}</td>
//                     <td>${arrVal['Discurso']? 'Si' : 'No'}</td>
//                 </tr>`
//         return prev;
//     }, '');

//     document.querySelector('tbody').innerHTML = htmlTableCode
// })();

document.querySelector('table')
    .addEventListener('click', e => switch_ClickController(e.target))

const switch_ClickController = (target) => {

    // si el click esta dentro de una table_row
    if (target.closest('tr')) {
        console.log("🚀 ~ target:", target)
        let table_row = target.closest('tr');
        let table_row_active = document.querySelector('table tr.active');
        let btnOptionsClicked = target.classList.contains('btn-options');

        // si se selecciona el table header, out
        if (table_row.querySelector('th')) return;

        // si existe una table_row activa, desactivarla
        if (table_row_active) {
            table_row_active.classList.remove('active');
            table_row_active.querySelector('input[type="checkbox"]').checked = false;
            if (table_row == table_row_active) return;
        }





        // si se clica al btn de opciones
        if (btnOptionsClicked) {
            const optionParent = target.closest('.options-parent')
            optionParent.querySelector('.options').classList.add('show');
        } else {
            if (document.querySelector('.options-parent>.options.show')) {
                document.querySelector('.options-parent>.options.show').classList.remove('show')
            }

        }


        // activar la fila clicada
        table_row.classList.add('active');
        table_row.querySelector('input[type="checkbox"]').checked = true
    }
}







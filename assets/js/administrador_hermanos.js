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

document.querySelector('table').addEventListener('click', e => {
    let target = e.target;
    console.log("🚀 ~ document.querySelector ~ target:", target)

    if (target.closest('.options-parent')) {
        const optionParent = target.closest('.options-parent')
        optionParent.querySelector('.options').classList.add('show');
    } else {
        document.querySelectorAll('.options-parent>.options').forEach(e => e.classList.remove('show'))
    }

})


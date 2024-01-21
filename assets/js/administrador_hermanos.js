(async () => {
    let hermanos = await electronAPI.hermanosDB();
    let htmlTableCode = hermanos.reduce((prev, arrVal) => {
        prev += `<tr id="hermano-${arrVal['Id']}">
                    <td>${arrVal['Nombre']}</td>
                    <td>${arrVal['Hermano'] ? 'Si' : 'No'}</td>
                    <td>${arrVal['Lectura']}</td>
                    <td>${arrVal['Conversacion']}</td>
                    <td>${arrVal['Revisita']}</td>
                    <td>${arrVal['Curso']}</td>
                    <td>${arrVal['Discurso']}</td>
                </tr>`
        return prev;
    }, '');

    document.querySelector('tbody').innerHTML = htmlTableCode
})()


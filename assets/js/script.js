const getDoc = (query) => document.querySelector(query);
const form = getDoc('form#asignacion');
const btn_generar_asignacion = getDoc('#generar-asignacion')

btn_generar_asignacion.addEventListener('click', e => {
    form.requestSubmit();
});

// Al enviar el formulario
form.addEventListener('submit', e => {
    e.preventDefault();

    let formElems = form.elements;

    //remove numeric entries
    formElems = Object.entries(formElems).reduce((acc, [key, value]) => {
        let otherValue = null;

        // if key is a number, remove it
        if (/^\d*$/.test(key) || key == "generar-asignacion" || /sala\w+$/.test(key)) return acc;

        if (key == "fecha") {
            let week = parseInt(value.value.split('W').pop());
            let day = (1 + week * 7) - 4; // 1st of January + 7 days for each week = Sunday - 4 = Wednesday
            let year = new Date().getFullYear();
            let wednesday = new Date(year, 0, day);

            otherValue = wednesday.getDate() + '/' + (wednesday.getMonth() + 1) + '/' + wednesday.getFullYear();
        }

        if (key == "sala") {
            key = value.value
            otherValue = 'Yes'
        }



        acc[key] = otherValue || value.value;
        return acc;
    }, {})

    console.log("🚀 ~ file: script.js:38 ~ formElems:", formElems)
    fillPDFForm(formElems)
})

const jsonData = {
    "Nombre": "Pau Muñoz Olivares",
    "Ayudante": "Aaron Bernal",
    "Fecha": "20/12/23",
    "Intervenci#C3#B3n": "2",
    "Sala Principal": "Yes"
}

async function fillPDFForm(jsonData) {
    // Fetch the PDF document
    const pdfUrl = './assets/pdf/plantilla.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());

    // Load the PDF document
    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

    // Get the form
    const form = pdfDoc.getForm();

    Object.entries(jsonData).forEach(function ([nombre, valor]) {
        try {
            form.getTextField(nombre).setText(valor);
        } catch {
            form.getRadioGroup(nombre).select(valor);
        }
    })
    // form.getTextField('lastName').setText('Doe');
    // form.getCheckBox('subscribe').check(); // Assuming there's a checkbox named 'subscribe'

    // Save the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();

    // Optionally, you can download the modified PDF
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'modified_document.pdf';
    link.click();
}


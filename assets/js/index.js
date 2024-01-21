const botones = document.querySelector('.botones');

botones.addEventListener('click', async (e) => {
    const target = e.target;

    const navigateTo = async (path) => {
        try {
            await electronAPI.goTo(path);
        } catch (err) {
            alert(err);
        }
    };

    switch (target.id) {
        case 'btn-generar':
            await navigateTo('/generar');
            break;

        case 'btn-hermanos':
            await navigateTo('/administracion');
            break;

        case 'btn-hoja':
            await navigateTo('/hoja');
            break;
    }
});

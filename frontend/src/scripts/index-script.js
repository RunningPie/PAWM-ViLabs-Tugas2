export function indexScript() {
    console.log("Script loaded");
        console.log("DomContentLoaded");

    // Ambil semua elemen img dalam class step
    const images = document.querySelectorAll('.steps-grid .step img');

    if (images.length === 0) {
        console.log("No images found.");
        return;
    }

    // Tambahkan event listener mouseover dan mouseout ke semua elemen img
    images.forEach(image => {

        image.addEventListener('mouseover', () => {
            let currentSrc = image.src;

            // ganti ext ke gif
            let newSrc = currentSrc.replace('.svg', '.gif');

            console.log("replacing " + currentSrc + " with " + newSrc)

            image.src = newSrc;
        });

        image.addEventListener('mouseout', () => {
            let currentSrc = image.src;

            // balikin lagi ke svg
            let originalSrc = currentSrc.replace('.gif', '.svg');

            image.src = originalSrc;
        });
    });
};
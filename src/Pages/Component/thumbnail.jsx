import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

export const loadThumbnail = async (url) => {
    const pdf = await pdfjs.getDocument(
        url
    ).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext("2d");
    const renderContext = {
        canvasContext: context,
        viewport: viewport,
    };

    await page.render(renderContext).promise;

    return canvas.toDataURL();
};

export const loadThumbnails = async (urls) => {
    let thumbnails = []
    await urls.forEach(async (url, index) => {
        console.log("lewat", index)
        console.log(url)
        const pdf = await pdfjs.getDocument(
            url
        ).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d");
        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };

        await page.render(renderContext).promise;

        // console.log(canvas.toDataURL())
        // try {
        // console.log(canvas.toDataURL())
        thumbnails.push(canvas.toDataURL());
        // return
        // }
        // catch (err) {
        // err
        // }
    })
    // console.log(thumbnails)
    return thumbnails;
}

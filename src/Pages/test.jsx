// PdfThumbnail.js
import React, { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

// Set the workerSrc for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();


const PdfThumbnail = () => {
    const [thumbnailUrl, setThumbnailUrl] = useState(null);

    useEffect(() => {
        const loadThumbnail = async () => {
            const pdf = await pdfjs.getDocument("http://localhost:5000/pdf/2f9d219ac88da3da098b31098a2fb831.pdf").promise;
            const page = await pdf.getPage(1);

            const viewport = page.getViewport({ scale: 1 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const context = canvas.getContext('2d');
            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            await page.render(renderContext).promise;
            setThumbnailUrl(canvas.toDataURL());
        };

        loadThumbnail();
    }, []);

    return (
        <div>
            {thumbnailUrl ? (
                <img src={thumbnailUrl} alt={`Thumbnail of page `} />
            ) : (
                <p>Loading thumbnail...</p>
            )}
        </div>
    );
};


export default PdfThumbnail
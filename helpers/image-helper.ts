export class ImageHelper {

    /**
     *
     * @param {string} url
     * @param {string} outputFormat The output format mime type. E.g.: 'image/jpeg'
     * @param {{maxWidth?: number, maxHeight?: number}} dimensions The output dimensions.
     * @returns {Promise<string>}
     */
    public static convertImgToBase64(url: string, outputFormat: string, dimensions: {maxWidth?: number, maxHeight?: number} = {}): Promise<string> {
        if (dimensions.maxWidth === undefined) dimensions.maxWidth = 0;
        if (dimensions.maxHeight === undefined) dimensions.maxHeight = 0;

        return new Promise((resolve, reject) => {
            let canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                img = new Image(),
                canvasCopy = document.createElement("canvas"),
                copyContext = canvasCopy.getContext("2d");

            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                let ratio = 1,
                    dataUrl;

                if(dimensions.maxWidth > 0 && img.width > dimensions.maxWidth)
                    ratio = dimensions.maxWidth / img.width;
                else if(dimensions.maxHeight > 0 && img.height > dimensions.maxHeight)
                    ratio = dimensions.maxHeight / img.height;

                canvasCopy.width = img.width;
                canvasCopy.height = img.height;
                copyContext.drawImage(img, 0, 0);

                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);

                dataUrl = canvas.toDataURL(outputFormat);
                resolve(dataUrl);
                canvas = null;
                canvasCopy = null;
            };
            img.src = url;
        });
    }
}

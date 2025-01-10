const base64ToBlob = (base64, mime) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
};
const blobToFile = (blob, fileName) => {
    return new File([blob], fileName, { type: blob.type, lastModified: Date.now() });
};
export const base64ToFile = (base64, mime, fileName) => {
    const blob = base64ToBlob(base64, mime);
    return blobToFile(blob, fileName);
};

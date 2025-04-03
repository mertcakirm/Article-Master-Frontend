export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result.split(',')[1]; // "," sonrası veriyi al
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
    });
};
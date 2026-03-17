

export const makeFormData = (data: Object): FormData => {


    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (value instanceof File) {
            formData.set(key, value);
        } else if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, v));
        } else if (typeof value === "object") {
            formData.set(key, JSON.stringify(value));
        } else {
            formData.set(key, String(value));
        }
        // formData.set(key, value);
    });

    // for (const key in data) {
    //     formData.append(key, data[key]);
    // }
    return formData;
}



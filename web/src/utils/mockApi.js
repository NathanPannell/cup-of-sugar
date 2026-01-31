export const uploadCSV = (file) => {
    return new Promise((resolve, reject) => {
        if (!file.name.endsWith('.csv')) {
            setTimeout(() => reject(new Error('Invalid file type. Please upload a CSV.')), 1000);
            return;
        }
        setTimeout(() => {
            resolve({ success: true, message: 'File uploaded successfully!', data: { filename: file.name, size: file.size } });
        }, 2500); // Simulate upload delay
    });
};

export const submitPrompt = (text) => {
    return new Promise((resolve, reject) => {
        if (!text.trim()) {
            setTimeout(() => reject(new Error('Prompt cannot be empty.')), 500);
            return;
        }
        setTimeout(() => {
            resolve({ success: true, message: 'Prompt received successfully!', data: { textLength: text.length } });
        }, 2000); // Simulate processing delay
    });
};

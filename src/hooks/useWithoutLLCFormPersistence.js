import { useState, useEffect } from 'react';

const useWithoutLLCFormPersistence = (key = 'withoutLLCFormData') => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load data on mount
    useEffect(() => {
        try {
            const savedData = localStorage.getItem(key);
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                setData(parsedData);
            }
        } catch (error) {
            console.error('Error loading without-LLC form data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [key]);

    // Save data to localStorage
    const saveData = (formData) => {
        try {
            const dataToSave = {
                ...formData,
                timestamp: Date.now()
            };
            localStorage.setItem(key, JSON.stringify(dataToSave));
            setData(dataToSave);
        } catch (error) {
            console.error('Error saving without-LLC form data:', error);
        }
    };

    // Clear data from localStorage
    const clearData = () => {
        try {
            localStorage.removeItem(key);
            setData(null);
        } catch (error) {
            console.error('Error clearing without-LLC form data:', error);
        }
    };

    // Update specific fields
    const updateData = (updates) => {
        try {
            const currentData = data || {};
            const updatedData = {
                ...currentData,
                ...updates,
                timestamp: Date.now()
            };
            localStorage.setItem(key, JSON.stringify(updatedData));
            setData(updatedData);
        } catch (error) {
            console.error('Error updating without-LLC form data:', error);
        }
    };

    // Check if data is recent (within specified minutes)
    const isDataRecent = (minutes = 30) => {
        if (!data || !data.timestamp) return false;
        const now = Date.now();
        const dataAge = now - data.timestamp;
        const maxAge = minutes * 60 * 1000; // Convert minutes to milliseconds
        return dataAge < maxAge;
    };

    // Get clean data without timestamp
    const getCleanData = () => {
        if (!data) return null;
        const { timestamp, ...cleanData } = data;
        return cleanData;
    };

    // Check if there's saved data
    const hasData = () => {
        return data !== null;
    };

    return {
        data: getCleanData(),
        isLoading,
        saveData,
        clearData,
        updateData,
        isDataRecent,
        hasData
    };
};

export default useWithoutLLCFormPersistence; 
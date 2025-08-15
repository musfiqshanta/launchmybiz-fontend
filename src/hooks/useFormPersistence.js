import { useState, useEffect, useCallback } from 'react';

const useFormPersistence = (key, initialData = null) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(true);

    // Load data from localStorage on mount
    useEffect(() => {
        try {
            const savedData = localStorage.getItem(key);
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                setData(parsedData);
            }
        } catch (error) {
            console.error(`Error loading data from localStorage for key "${key}":`, error);
        } finally {
            setIsLoading(false);
        }
    }, [key]);

    // Save data to localStorage
    const saveData = useCallback((newData) => {
        try {
            const dataToSave = {
                ...newData,
                timestamp: Date.now(),
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem(key, JSON.stringify(dataToSave));
            setData(dataToSave);
            return true;
        } catch (error) {
            console.error(`Error saving data to localStorage for key "${key}":`, error);
            return false;
        }
    }, [key]);

    // Clear data from localStorage
    const clearData = useCallback(() => {
        try {
            localStorage.removeItem(key);
            setData(null);
            return true;
        } catch (error) {
            console.error(`Error clearing data from localStorage for key "${key}":`, error);
            return false;
        }
    }, [key]);

    // Update specific fields in the data
    const updateData = useCallback((updates) => {
        const updatedData = { ...data, ...updates };
        return saveData(updatedData);
    }, [data, saveData]);

    // Check if data exists and is recent (within specified time)
    const isDataRecent = useCallback((maxAgeMinutes = 60) => {
        if (!data || !data.timestamp) return false;
        const maxAge = maxAgeMinutes * 60 * 1000; // Convert to milliseconds
        return (Date.now() - data.timestamp) < maxAge;
    }, [data]);

    // Get data without timestamp and metadata
    const getCleanData = useCallback(() => {
        if (!data) return null;
        const { timestamp, lastUpdated, ...cleanData } = data;
        return cleanData;
    }, [data]);

    return {
        data,
        cleanData: getCleanData(),
        isLoading,
        saveData,
        clearData,
        updateData,
        isDataRecent,
        hasData: !!data
    };
};

export default useFormPersistence; 
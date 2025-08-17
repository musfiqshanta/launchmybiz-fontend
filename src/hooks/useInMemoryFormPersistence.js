import { useState, useEffect, useRef } from 'react';

const useInMemoryFormPersistence = (key = 'formData') => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    // Use a ref to store data in memory that persists across re-renders
    const dataRef = useRef(null);
    const timestampRef = useRef(null);

    // Load data on mount
    useEffect(() => {
        setIsLoading(true);
        try {
            // Check if we have data in memory
            if (dataRef.current && timestampRef.current) {
                setData(dataRef.current);
            }
        } catch (error) {
            console.error('Error loading form data from memory:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save data to memory
    const saveData = (formData) => {
        try {
            const dataToSave = {
                ...formData,
                timestamp: Date.now()
            };
            
            // Store in memory
            dataRef.current = dataToSave;
            timestampRef.current = Date.now();
            
            // Update state
            setData(dataToSave);
            
         //   console.log('Form data saved to memory:', dataToSave);
        } catch (error) {
            console.error('Error saving form data to memory:', error);
        }
    };

    // Clear data from memory
    const clearData = () => {
        try {
            // Clear from memory
            dataRef.current = null;
            timestampRef.current = null;
            
            // Update state
            setData(null);
            
        
        } catch (error) {
            console.error('Error clearing form data from memory:', error);
        }
    };

    // Update specific fields
    const updateData = (updates) => {
        try {
            const currentData = dataRef.current || {};
            const updatedData = {
                ...currentData,
                ...updates,
                timestamp: Date.now()
            };
            
            // Store in memory
            dataRef.current = updatedData;
            timestampRef.current = Date.now();
            
            // Update state
            setData(updatedData);
            
          //  console.log('Form data updated in memory:', updatedData);
        } catch (error) {
            console.error('Error updating form data in memory:', error);
        }
    };

    // Check if data is recent (within specified minutes)
    const isDataRecent = (minutes = 30) => {
        if (!timestampRef.current) return false;
        const now = Date.now();
        const dataAge = now - timestampRef.current;
        const maxAge = minutes * 60 * 1000; // Convert minutes to milliseconds
        return dataAge < maxAge;
    };

    // Get clean data without timestamp
    const getCleanData = () => {
        if (!dataRef.current) return null;
        const { timestamp, ...cleanData } = dataRef.current;
        return cleanData;
    };

    // Check if there's saved data
    const hasData = () => {
        return dataRef.current !== null;
    };

    // Get data with timestamp
    const getDataWithTimestamp = () => {
        return dataRef.current;
    };

    return {
        data: getCleanData(),
        isLoading,
        saveData,
        clearData,
        updateData,
        isDataRecent,
        hasData,
        getDataWithTimestamp
    };
};

export default useInMemoryFormPersistence; 
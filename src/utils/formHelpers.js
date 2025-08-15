// Helper functions for BusinessForm

export const isCurrentTabComplete = (activeTab, values) => {
    switch(activeTab) {
        case 0:
            return (
                values.companyName.trim() !== '' &&
                values.companyAltName.trim() !== '' &&
                values.category !== '' &&
                values.description.trim() !== ''
            );
        case 1:
            // Email validation
            const emailRegex = /\S+@\S+\.\S+/;
            const isValidEmail = emailRegex.test(values.email);
            
            // Phone validation (numbers only, 10-15 digits)
            const phoneRegex = /^[0-9]+$/;
            const isValidPhone = phoneRegex.test(values.phone) && values.phone.length >= 10 && values.phone.length <= 15;
            
            // SSN validation (if hasSSN is true)
            const isValidSSN = !values.hasSSN || (values.hasSSN && /^[0-9]{9}$/.test(values.ssn));
            
            return (
                values.firstName.trim() !== '' &&
                values.lastName.trim() !== '' &&
                values.title !== '' &&
                values.email.trim() !== '' &&
                isValidEmail &&
                values.phone.trim() !== '' &&
                isValidPhone &&
                isValidSSN
            );
        case 2:
            // Zip code validation (exactly 5 digits)
            const zipRegex = /^[0-9]{5}$/;
            const isValidZip = zipRegex.test(values.zipCode);
            
            return (
                values.address.trim() !== '' &&
                values.city.trim() !== '' &&
                values.state !== '' &&
                values.country !== '' &&
                values.zipCode.trim() !== '' &&
                isValidZip
            );
        case 3:
            // Zip code validation for participants
            const participantZipRegex = /^[0-9]{5}$/;
            
            return values.participants.length > 0 && 
                values.participants.every(participant => {
                    // Ownership validation (number, max 3 digits, not greater than 100)
                    const ownership = parseFloat(participant.ownership);
                    const isValidOwnership = !isNaN(ownership) && 
                                           ownership >= 0 && 
                                           ownership <= 100 && 
                                           participant.ownership.toString().length <= 3;
                    
                    // ContributerMarketValue validation (positive number)
                    const marketValue = parseFloat(participant.ContributerMarketValue);
                    const isValidMarketValue = !isNaN(marketValue) && marketValue > 0;
                    
                    // Zip code validation
                    const isValidParticipantZip = participantZipRegex.test(participant.zipCode);
                    
                    return (
                        participant.firstName.trim() !== '' &&
                        participant.lastName.trim() !== '' &&
                        participant.address.trim() !== '' &&
                        participant.city.trim() !== '' &&
                        participant.state !== '' &&
                        participant.country !== '' &&
                        participant.zipCode.trim() !== '' &&
                        isValidParticipantZip &&
                        participant.ownership !== '' &&
                        isValidOwnership &&
                        participant.ContributerMarketValue !== '' &&
                        isValidMarketValue
                    );
                });
        case 4:
            const basicFieldsComplete = values.filingSpeed !== '' && values.registeredAgentChoice !== '';
            
            // If user chose to provide their own registered agent, validate those fields too
            if (values.registeredAgentChoice === 'own') {
                // Registered agent zip code validation
                const registeredAgentZipRegex = /^[0-9]{5}$/;
                const isValidRegisteredAgentZip = registeredAgentZipRegex.test(values.registeredAgentZip);
                
                return basicFieldsComplete &&
                    values.registeredAgentFirstName.trim() !== '' &&
                    values.registeredAgentLastName.trim() !== '' &&
                    values.registeredAgentAddress1.trim() !== '' &&
                    values.registeredAgentCity.trim() !== '' &&
                    values.registeredAgentState !== '' &&
                    values.registeredAgentZip.trim() !== '' &&
                    isValidRegisteredAgentZip &&
                    values.registeredAgentCountry !== '';
            }
            
            return basicFieldsComplete;
        default:
            return false;
    }
};

export const getTabFields = () => ({
    0: ['companyName', 'companyAltName', 'category', 'description'],
    1: ['firstName', 'middleName', 'lastName', 'title', 'email', 'phone', 'hasSSN', 'ssn'],
    2: ['address', 'address2', 'city', 'state', 'country', 'zipCode'],
    3: ['participants'],
    4: ['filingSpeed', 'registeredAgentChoice', 'registeredAgentFirstName', 'registeredAgentLastName', 'registeredAgentAddress1', 'registeredAgentAddress2', 'registeredAgentCity', 'registeredAgentState', 'registeredAgentZip', 'registeredAgentCountry']
});

export const transformFormData = (values) => {
    return {
        filingSpeed: values.filingSpeed,
        BusinessStructureType: "LLC", // Always LLC
        BusinessStateInitial: values.state,
        contact: {
            contactEmail: "ray@launchmybiz.net",
            contactFirstName: "Ray",
            contactLastName: "Jones",
            contactPhone: "561-856-8593",
            contactEveningPhone: "561-856-8593"
        },
        ResponsibleParty: {
            ResponsibleParty: values.title,
            ResponsiblePartyStatus: values.hasSSN ? "Yes" : "No",
            ResponsiblePartySSN: values.hasSSN ? values.ssn : "",
            ResponsiblePartyEmail: values.email,
            ResponsiblePartyFirstName: values.firstName,
            ResponsiblePartyMiddleName: values.middleName || '',
            ResponsiblePartyLastName: values.lastName,
            ContactPhone: values.phone,
            
        },
        CompanyInfo: {
            CompanyDesiredName: values.companyName,
            CompanyAlternativeName: values.companyAltName,
            CompanyBusinessCategory: values.category,
            CompanyBusinessDescription: values.description
        },
        BusinessAddress: {
            BusinessAddressCountry: values.country,
            BusinessAddressAddress1: values.address,
            BusinessAddressAddress2: values.address2 || '',
            BusinessAddressCity: values.city,
            BusinessAddressState: values.state,
            BusinessAddressZip: values.zipCode
        },
        LlcOnly: values.participants.map((participant, index) => ({
            LlcOnlyIsMemberManaged: true,
            [`LlcOnlyMember${index + 1}InfoFirstName`]: participant.firstName,
            [`LlcOnlyMember${index + 1}InfoLastName`]: participant.lastName,
            [`LlcOnlyMember${index + 1}InfoCountry`]: participant.country,
            [`LlcOnlyMember${index + 1}InfoAddress1`]: participant.address,
            [`LlcOnlyMember${index + 1}InfoAddress2`]: participant.address2 || '',
            [`LlcOnlyMember${index + 1}InfoCity`]: participant.city,
            [`LlcOnlyMember${index + 1}InfoState`]: participant.state,
            [`LlcOnlyMember${index + 1}InfoZip`]: participant.zipCode,
            [`LlcOnlyMember${index + 1}InfoPercentageOwnership`]: participant.ownership,
            [`LlcOnlyMember${index + 1}InfoItemContributed`]: participant.Contributed || '',
            [`LlcOnlyMember${index + 1}InfoItemContributerMarketValue`]: participant.ContributerMarketValue || 0
        })),
        RegisterAgent: values.registeredAgentChoice === 'corpnet' ? {
            RegisteredAgentIsCorpnetAgent: true
        } : {
            RegisteredAgentIsCorpnetAgent: false,
            RegisteredAgentFirstName: values.registeredAgentFirstName,
            RegisteredAgentLastName: values.registeredAgentLastName,
            RegisteredAgentAddress1: values.registeredAgentAddress1,
            RegisteredAgentAddress2: values.registeredAgentAddress2 || '',
            RegisteredAgentCity: values.registeredAgentCity,
            RegisteredAgentState: values.registeredAgentState,
            RegisteredAgentZip: values.registeredAgentZip,
            RegisteredAgentCountry: values.registeredAgentCountry
        }
    };
};

export const getInitialValues = (user, cleanFormData) => {
    return cleanFormData || {
        companyName: '',
        companyAltName: '',
        category: '',
        description: '',
        firstName: '',
        middleName: '',
        lastName: '',
        title: '',
        email:  '',
        phone: '',
        hasSSN: false,
        ssn: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        country: 'US',
        zipCode: '',
        participants: [{
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            city: '',
            state: '',
            country: 'US',
            zipCode: '',
            ownership: '',
            Contributed: '',
            ContributerMarketValue: ''
        }],
        filingSpeed: 'standard',
        registeredAgentChoice: 'corpnet',
        registeredAgentFirstName: '',
        registeredAgentLastName: '',
        registeredAgentAddress1: '',
        registeredAgentAddress2: '',
        registeredAgentCity: '',
        registeredAgentState: '',
        registeredAgentZip: '',
        registeredAgentCountry: 'US',
        entityType: 'LLC'
    };
}; 
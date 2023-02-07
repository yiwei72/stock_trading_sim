import React, { createContext, useState } from 'react';

interface EmailData {
    email: string;
    updateEmail: (newEmail: string) => void;
}

const EmailContext = createContext<EmailData>({
    email: '',
    updateEmail: () => { }
});

const EmailProvider: React.FC = ({ children }) => {
    const [email, setEmailData] = useState<string>('');

    const updateEmail = (newEmail: string) => {
        setEmailData(newEmail);
    };

    return (
        <EmailContext.Provider value={{ email, updateEmail }}>
            {children}
        </EmailContext.Provider>
    );
};

export { EmailContext, EmailProvider };

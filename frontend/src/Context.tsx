import React, { createContext, useState } from "react";

interface EmailData {
  email: string;
  updateEmail: (newEmail: string) => void;
}

const EmailContext = createContext<EmailData>({
  email: "",
  updateEmail: () => {},
});

const EmailProvider: React.FC = ({ children }) => {
  const [email, setEmailData] = useState<string>("");

  const updateEmail = (newEmail: string) => {
    setEmailData(newEmail);
  };

  return (
    <EmailContext.Provider value={{ email, updateEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

interface UserAuthData {
  firstName: string;
  updateFirstName: (newFirstName: string) => void;
}

const UserAuthContext = createContext<UserAuthData>({
  firstName: "",
  updateFirstName: () => {},
});

const UserAuthProvider: React.FC = ({ children }) => {
  const [firstName, setFirstName] = useState<string>("");

  const updateFirstName = (newFirstName: string) => {
    setFirstName(newFirstName);
  };

  return (
    <UserAuthContext.Provider value={{ firstName, updateFirstName }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export { EmailContext, EmailProvider, UserAuthContext, UserAuthProvider };

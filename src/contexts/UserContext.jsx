import { createContext, useState } from 'react';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    const [users] = useState([
        { username: 'daniel', password: '9999' },
        { username: 'jose', password: '7777' }
    ]);

    //Nuevo estado para el usuario logueado
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ users, user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

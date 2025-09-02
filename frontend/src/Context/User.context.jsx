import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null); // user object or null




	return (
		<UserContext.Provider value={{ user, setUser}}>
			{children}
		</UserContext.Provider>
	);
};

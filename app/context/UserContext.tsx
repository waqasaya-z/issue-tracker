// "use client"
// import React, { createContext, useState, useContext, ReactNode } from "react";

// type UserType = {
//   id: String;
//   firstName: String;
//   lastName: String;
//   insId: String;
//   password: String;
//   isAdmin: Boolean;
// };

// const UserContext = createContext<UserType | undefined>(undefined);

// export const DataProvider = ({ children }: { children: ReactNode }) => {
//   const [userData, setUserData] = useState<UserType | undefined>();

//   const setUserDataAndStore = (data: UserType) => {
//     setUserData(data);
//     // Optionally, store data in localStorage or other storage mechanisms
//     // localStorage.setItem("userData", JSON.stringify(data));
//   };

//   return (
//     <UserContext.Provider value={{ userData, setUserDataAndStore }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useData = () => useContext(UserContext);

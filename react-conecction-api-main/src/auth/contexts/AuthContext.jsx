import { createContext, useState  } from 'react';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));


  console.log("Entroooo")

  function login(user) {
    setUser(user);
    setLoading(false)
  }

  const value = {
    user,
    setUser: login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
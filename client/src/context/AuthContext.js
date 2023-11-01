import { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    
  const [username, setUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }); // Initialize with null for unauthenticated state


 // Initialize with null for unauthenticated state


 


  const login = async (formData) => {
   const email= formData.email
   const password=formData.password
   const user={email,password}
    try {
      // Send a POST request to your backend API for user authentication
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data)
      if (response.status === 200) {
        // Authentication successful, get the user data from the response
        
        setUser(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
        // Set the user state
      } else {
        // Handle authentication error (e.g., show an error message)
        // You can also clear the user state if necessary
        console.log("error")
        setUser(null);
      }
    } catch (error) {
      // Handle network error or other exceptions
      // You can also clear the user state if necessary
      console.log(error)
      setUser(null);
    }
  };


  const adminlogin = async (formData) => {
    const email= formData.email
    const password=formData.password
    const user={email,password}
     try {
       // Send a POST request to your backend API for user authentication
       const response = await fetch('http://localhost:5000/admin/adminlogin', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(user),
       });
       const data = await response.json();
       console.log(data)
       if (response.status === 200) {
         // Authentication successful, get the user data from the response
         
         setUser(data);
         localStorage.setItem('currentUser', JSON.stringify(data));
         // Set the user state
       } else {
         // Handle authentication error (e.g., show an error message)
         // You can also clear the user state if necessary
         console.log("error")
         setUser(null);
       }
     } catch (error) {
       // Handle network error or other exceptions
       // You can also clear the user state if necessary
       console.log(error)
       setUser(null);
     }
   };

  const logout = () => {
    // Implement your logout logic here and set the user state to null
    setUser(null);
    localStorage.removeItem("currentUser");
    
  };

  return (
    <AuthContext.Provider value={{ username, adminlogin,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// src/api/api.js

export const signupUser = async ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      throw new Error("User already exists.");
    }
  
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  
    return { message: "User registered successfully." };
  };
  
  export const loginUser = async ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error("Invalid credentials.");
    }
  
    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token: "dummy-token", // just for simulation
    };
  };
  
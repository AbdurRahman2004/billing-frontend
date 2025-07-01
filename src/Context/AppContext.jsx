import React, { createContext, useEffect, useState } from 'react';
import { fetchCategories } from '../Service/CategoryService.jsx';

export const AppContext = createContext(null); // ✅ named export

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetchCategories();
      setCategories(response.data);
    }
    loadData();
  }, []);

  const contextValue = {
    categories,
    setCategories,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

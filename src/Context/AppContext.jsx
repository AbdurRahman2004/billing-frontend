import React, { createContext, useEffect, useState } from 'react';
import { fetchCategories } from '../Service/CategoryService.jsx';
import { fetchItems } from '../Service/ItemService.jsx';

export const AppContext = createContext(null); // ✅ named export

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const [auth , setAuth] = useState({token: null , role: null});


  useEffect(() => {
    async function loadData() {
      if(localStorage.getItem("token") && localStorage.getItem("role")){
        setAuthData(localStorage.getItem("token"),localStorage.getItem("role"))
      }
      const categoryResponse = await fetchCategories();
      const itemResponse = await fetchItems()
      setItems(itemResponse.data)
      setCategories(categoryResponse.data);
    }
    loadData();
  }, []);


  const setAuthData = (token , role) => {
     setAuth({token,role});
  }

  const contextValue = {
    categories,
    setCategories,
    setAuthData,
    auth,
    items,
    setItems
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

import React, { useContext, useState } from 'react'
import "./Explore.css"
import { AppContext } from '../../Context/AppContext.jsx'
import DisplayCategory from '../../components/DisplayCategory/DisplayCategory.jsx'
import DisplayItem from '../../components/DisplayItems/DisplayItem.jsx'
import CustomerForm from '../../components/CustomerForm/CustomerForm.jsx'
import CartItem from '../../components/CartItems/CartItem.jsx'
import CartSummary from '../../components/CartSummary/CartSummary.jsx'


const Explore = () => {

  const {categories} = useContext(AppContext);
  const [selectedCategory , setSelectedCategory] = useState("");

  return (
   <div className="explore-container text-light">
    <div className="left-column">
       <div className="first-row" style={{overflowY: 'auto'}}>
          <DisplayCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories} />
       </div>
       <hr className='horizontal-line'/>
       <div className="second-row" style={{overflowY: 'auto'}} >
          <DisplayItem selectedCategory={selectedCategory} />
       </div>
    </div>
    <div className="right-column d-flex flex-column">
      <div className="customer-form-container" style={{height: '15%'}}>
          <CustomerForm />
      </div>
      <hr className='my-3 text-light' />
      <div className="cart-items-container" style={{height: '55%' , overflowY: 'auto'}}>
        <CartItem /> 
      </div>
        <hr className='my-3 text-light' />
      <div className="cart-summary-conatiner" style={{height: '30%'}}>
         <CartSummary />
      </div>
    </div>
   </div>
  )
}

export default Explore
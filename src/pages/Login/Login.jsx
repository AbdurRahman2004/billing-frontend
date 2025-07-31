import { useContext, useState } from 'react';
import './Login.css';
import toast from 'react-hot-toast';
import { login } from '../../Service/AuthService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

const Login = () => {

    const navigate = useNavigate();
    const {setAuthData} = useContext(AppContext);
    
   
    const [loading , setLoading] = useState(false);

    const [data , setData] = useState({
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name);
        console.log(value);
        setData((data)=> ({...data,[name]: value}))
    }

    const OnSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log(data);
           const response = await login(data);
           if(response.status === 200){
            toast.success("Login Successfull");
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("role",response.data.role);
            setAuthData(response.data.token,response.data.role);
            navigate("/dashboard");
           }
        } catch (error) {
            console.log(error.message)
            toast.error("Email/Password Invalid");
        } finally{
            setLoading(false);
        }

    }







 return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100 login-background">
      <div className="card shadow-lg w-100 " style={{maxWidth: '480px'}}>
         <div className="card-body">
            <div className="text-center">
                <h1 className='card-title'>Sign In</h1>
                <p className='card-text text-muted'>
                    Sign in below to access your account
                </p>
            </div>
            <div className='mt-4'>
               <form onSubmit={OnSubmitHandler} >
                <div className="mb-4">
                       <label htmlFor="email" className='form-label text-muted'>
                        Email Address
                       </label>
                       <input type="text" name="email" id="email" placeholder='yourname@example.com' className='form-control' onChange={onChangeHandler} value={data.email}/>
                </div>
                <div className="mb-4">
                       <label htmlFor="password" className='form-label text-muted'>
                        Password
                       </label>
                       <input type="password" name="password" id="password" placeholder='*****' className='form-control' onChange={onChangeHandler} value={data.password}/>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-dark btn-lg" disabled={loading}>
                       {loading ? "Loading ... " :  "Sign in" }
                    </button>
                </div>
               </form>
            </div>
         </div>
      </div>
    </div>
        
        
 )
}

export default Login
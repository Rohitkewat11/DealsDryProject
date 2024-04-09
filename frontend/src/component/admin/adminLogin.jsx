import {Link, useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import axios from 'axios';
import { useState } from 'react';

export function AdminLogin(){

    const [errorMsg,setErrorMsg] = useState();
    let nevigate = useNavigate();


    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },

        onSubmit:(values)=>{
            console.log(values);
            axios.post('http://127.0.0.1:2200/adminLogin',values).then(res=>{
                if(res.data){
                    setErrorMsg("");
                    localStorage.setItem("token",res.data);  
                    nevigate("/adminDashboard");
                }else{
                    setErrorMsg(res.data);
                }
            }).catch(error=>{
                console.log(error);
            })
        }
    });

    return(
        <>
           <div className="d-flex justify-content-end me-5">
            <div className="w-25 border border-dark rounded mt-5">
                    <h3 className="bg-warning rounded p-1">Login</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="p-2">
                        <label className="form-label fw-semibold" htmlFor="" >E-mail</label>
                        <input onChange={formik.handleChange} className="form-control" type="text" name='email' placeholder="Email" />
                        <label className="form-label fw-semibold" htmlFor="" >Password</label>
                        <input onChange={formik.handleChange} className="form-control" type="text" name='password' placeholder="Password" />
                        <div className='text-danger'>{errorMsg}</div>
                    <button type='submit' className="btn btn-primary mt-3 form-control">Submit</button>
                    <p className='mt-2'>Haven't Account? <Link to="/addAdmin">Create.</Link></p>
                    </div>
                </form>
            </div>
           </div>
        </>
    )
};
import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import GoogleLoginBtn from '../../components/buttons/GoogleLoginBtn';
import { useForm } from "react-hook-form";
import { AuthContex } from '../../providers/AuthProvider';
import axios from 'axios';
import GoogleRegBtn from '../../components/buttons/GoogleRegBtn';

const Register = () => {
    const navigate = useNavigate()

    const [show, setShow] = useState(null);
    const { user, setUser, createUser, updateUser } = useContext(AuthContex)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(res => {
                updateUser(data.name, data.photourl)
                    .then(() => {
                        //profile updated
                        //send user data to DB for each successful regestatison
                        const userData = {
                            userName: data.name,
                            userEmail: data.email,
                            password: data.password
                        }
                        axios.post(`/user/email-reg?userEmail=${data.email}&newUser=true`, userData)
                            .then(response => {
                                localStorage.setItem('jwtAccessToken', response.headers.authorization)
                                setUser(response)

                            })
                            .catch(err => console.log(err))
                    })
                    .catch((err) => console.log(err))

                res.user.displayName = data.name;
                // res.user.photoURL = data.photourl;
                setUser(res.user)
                navigate('/')


            })
    }




    return (

        <div className='relative min-h-[100vh] flex justify-center bg-[url("https://images.unsplash.com/photo-1617634795446-b58c985ec639?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover'>
            <div className='mx-3 min-w-[300px] md:mx-auto my-auto p-5 md:px-10 md:py-6 text-slate-100 shadow-2xl rounded-xl  backdrop-blur-3xl border border-slate-600'>
                <form className='p-8' onSubmit={handleSubmit(onSubmit)}>

                    <input {...register("name", { required: true })} className='outline-none border rounded-md my-3 p-2 w-full md:mx-auto bg-inherit placeholder:text-slate-200 border-slate-600' type="name" name="name" id="name" placeholder='Enter name' /> <br />
                    {errors.name?.type === 'required' && <p className='text-red-600 -mt-3 pl-1'>Your name is required</p>}

                    <input {...register("email", { required: true })} className='outline-none border rounded-md my-3 p-2 w-full md:mx-auto bg-inherit placeholder:text-slate-200 border-slate-600' type="email" name="email" id="email" placeholder='Enter email' /> <br />
                    {errors.email?.type === 'required' && <p className='text-red-600 -mt-3 pl-1'>Your email is required</p>}

                    <input {...register("password", { required: true, minLength: 6, maxLength: 16, pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].)(?=.*[a-z])/ })} className='outline-none border rounded-md my-3 p-2 w-full md:mx-auto bg-inherit placeholder:text-slate-200 border-slate-600' type={show ? 'password' : 'text'} name="password" id="password" placeholder='Password' /> <br />
                    {errors.password?.type === "required" && <span className='text-red-500 -mt-3 pl-1'>Password is required</span>}
                    {errors.password?.type === "maxLength" && <span className='text-red-500 -mt-3 pl-1'>Maximum 8 cherecter</span>}
                    {errors.password?.type === "minLength" && <span className='text-red-500 -mt-3 pl-1'>Minimum 6 cherecter</span>}
                    {errors.password?.type === "pattern" && <span className='text-red-500 -mt-3 pl-1'>Weak password</span>}

                    <p onClick={() => { setShow(!show) }}>{show ? <span>Show password</span> : <span>Hide password</span>}</p>
                    <input {...register("cpassword", { required: true })} className='outline-none border rounded-md my-3 p-2 w-full md:mx-auto bg-inherit placeholder:text-slate-200 border-slate-600' type={show ? 'password' : 'text'} name="cpassword" id="cpassword" placeholder='Confirm password' /> <br />

                    {/* <input {...register("photourl", { required: true })} className='outline-none border rounded-md my-3 p-2 w-full md:mx-auto bg-inherit placeholder:text-slate-200' type="url" name="photourl" id="photourl" placeholder='Photo url' />
                    {errors.photourl?.type === 'required' && <p className='text-red-600 -mt-3 pl-1'>Photo url is required</p>} */}

                    <input disabled={watch('password') != watch('cpassword')} className=' border duration-700 text-white active:bg-blue-500 hover:bg-white hover:text-slate-800 cursor-pointer outline-none rounded-md my-3 w-full md:mx-auto py-2 font-semibold disabled:bg-red-600 border-slate-600' type="submit" name="submit" value="Register" />


                    <p>Already have an accounte ? <Link to='/loginas' className='text-green-300 font-semibold underline'>Login</Link></p>


                </form>
                <div className='px-8'>
                    <GoogleRegBtn>
                        <FcGoogle className='inline mx-2 text-xl'></FcGoogle>  Register with Google
                    </GoogleRegBtn>

                </div>
            </div>
        </div>

    );
};

export default Register;
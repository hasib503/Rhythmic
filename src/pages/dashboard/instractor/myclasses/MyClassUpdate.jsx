import React from 'react';
import useTitle from '../../../../hooks/useTitle';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContex } from '../../../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import SectionHeader from '../../../../components/sectionHeader/SectionHeader';
import { Ring } from 'react-awesome-spinners'
import { useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';


const MyClassUpdate = () =>{
    
    useTitle('Update class')
    const [ loadingRing, setLoadingRing ] = useState(false)
    const [aClass, setaClass] = useState([])
    const {user} = useContext(AuthContex)
    const params = useParams()
    const navigate = useNavigate()
        
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    useEffect(()=>{
        axios.get(`/instructor/aclass?id=${params.id}`)
        .then(response =>setaClass(response.data) )
        .catch(error => console.log(error))

    }, [])




    const onSubmit = data =>{

      swal("As a Guest you can't update!", {
        icon: "warning",
      });

        // setLoadingRing(true)
        // const formData = new FormData()
        // formData.append('image', data.image[0])

        // fetch(imgHostingUrl, {
        //   method : 'POST',
        //   body : formData
        // })
        // .then(response =>response.json())
        // .then(imgResponse =>{
        //   if(imgResponse.success){

        //     const classData ={
        //         approveStatus : 'panding',
        //         className : data.className,
        //         photoUrl : imgResponse.data.display_url,
        //         instractorName : user.displayName,
        //         email : user.email,
        //         totalSeat : data.totalSeat,
        //         enrolls : 0,
        //         feedback : '',
        //         price : data.price
        //     }

       
        //     axios.patch(`/updateclass?email=${user.email}&id=${params.id}`, classData)
        //     .then(response =>{

        //         console.log(response.data);

        //       if(response.data.acknowledged){
                
        //         setLoadingRing(false)
        //         //sweet alart 
        //         swal({
        //           title: "Success !",
        //           text: `You successfuly updated the class !`,
        //           icon: "success",
        //           buttons:  ["Add more", "See already added classes"],
        //           dangerMode: true,
        //         })
        //         .then((confirm) => {
        //           if (confirm) {
        //               navigate('/dashboard/myclasses')
        //           } else {
        //             navigate('/dashboard/addclass')
        //           }
        //         });


        //       }
        //     })
        //   }
        // })

    };
    
    return (
        <section className='conatiner '>
            <SectionHeader>Update Class</SectionHeader>
            <div className='text-center'>
              {loadingRing && <Ring></Ring>}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='p-10 my-auto mx-14'>
                {/* first row  */}
                <div className="grid my-4 md:grid-cols-2 md:gap-10">

                  <div className="relative z-0 w-full mb-6 group">
                    <input {...register("className", { required: true })} type="text" name="className" defaultValue={aClass.className} id="className" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    {errors.className?.type === 'required' && <p className='text-red-600 pl-1'>Class name is required</p>}

                    <label htmlFor="className" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Class Name</label>
                  </div>
                  {/* TODO: photo upload  */}
                  <div className="relative z-0 w-full mb-6 group">
                    <input {...register("image", { required: true })} type="file" name="image" id="image" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    {errors.image?.type === 'required' && <p className='text-red-600 pl-1'>You must select an image</p>}

                    <label htmlFor="photoUrl" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Photo URL</label>
                  </div>

                </div>

                {/* second row  */}
                <div className="grid my-4 md:grid-cols-2 md:gap-10">

                  <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="instractorName" id="instractorName" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={user.userName} disabled />
                    <label htmlFor="instractorName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Instractor Name</label>
                  </div>
                
                  <div className="relative z-0 w-full mb-6 group">
                    <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={user.userEmail} disabled  />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Instractor EmaiL</label>
                  </div>

                </div>

                {/* 3rd row    */}
                <div className="grid my-4 md:grid-cols-2 md:gap-10">

                  <div className="relative z-0 w-full mb-6 group">
                    <input {...register("totalSeat", { required: true, pattern: /^[0-9]+$/ })} type="text" defaultValue={aClass.totalSeat} name="totalSeat" id="totalSeat" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    {errors.totalSeat?.type==="pattern" && <span className='text-red-500 pl-1'>Must be number</span>}
                    {errors.totalSeat?.type === 'required' && <p className='text-red-600 pl-1'>Seat number is required</p>}

                    <label htmlFor="totalSeat" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Total Seat</label>
                  </div>

                  

                  <div className="relative z-0 w-full mb-6 group">
                    <input {...register("price", { required: true, pattern: /^[0-9]+$/ })} type="text" defaultValue={aClass.price} name="price" id="price" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    {errors.price?.type==="pattern" && <span className='text-red-500 pl-1'>Must be number</span>}
                    {errors.price?.type === 'required' && <p className='text-red-600 pl-1'>Price is required</p>}

                    <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Price ( $ )</label>
                  </div>
                 

                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Class</button>
                
            </form>

        </section>
    );
};


export default MyClassUpdate;
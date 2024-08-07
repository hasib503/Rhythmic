import React, { useState } from 'react';
import MyClassesRow from './MyClassesRow';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { AuthContex } from '../../../../providers/AuthProvider';
import SectionHeader from '../../../../components/sectionHeader/SectionHeader';
import useTitle from '../../../../hooks/useTitle';

const MyClasses = () => {
    useTitle('My classes')

    const {user} = useContext(AuthContex)

    // tenStack query to load my classes 
    const { isLoading, isError, refetch, data : classesArray = [], error } = useQuery({
        queryKey : ['myclasses', user?.email],
        queryFn : async () =>{
            const response = await axios.get(`/instructor/my-classes?userEmail=${user.userEmail}`)
            return response.data
        }
    })

    
    return (
        <section className='md:px-5 min-h-[50vh]'>
            <SectionHeader>My Classes</SectionHeader>
            <div className="container mx-auto my-10 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left bg-base-200">
                    <thead className="text-xs  uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sn
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Class Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Seats
                            </th>

                            <th scope="col" className="px-6 py-3 " >
                                Enrolls
                            </th>

                            <th scope="col" className="px-6 py-3 " >
                                Feedback
                            </th>

                            <th scope="col" className="px-6 py-3 " >
                                status
                            </th>
                            <th scope='col'>action</th>

                        </tr>
                    </thead>
                    <tbody>
                        
                        {!classesArray.length ? <tr><td colSpan={7} className='text-center py-36 font-semibold'>Not found</td></tr> : classesArray?.map((aClass, index, arry) =><MyClassesRow aClass={aClass} key={index} index={index} refetch={refetch}></MyClassesRow>)}

                    </tbody>
                </table>
            </div>

        </section>
    );
};

export default MyClasses;
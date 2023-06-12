import React from 'react';
import { AiFillAlert } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { MdOutlineDoNotDisturb } from 'react-icons/md';
import { LuLoader } from 'react-icons/lu';


const MyClassesRow = ({aClass, index}) => {


    return (
        <tr className="border-t border-slate-700 hover:bg-base-300 ">
            {/* serial  */}
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowra">
                {index + 1}
            </th>
            {/* name  */}
            <td className="px-6 py-4">
                {aClass.className}
            </td>
            {/* seats  */}
            <td className="px-6 py-4">
                {aClass.totalSeat}
            </td>
            {/* enrolls  */}
            <td className="px-6 py-4">
                
                {aClass.enrolls}
            </td>
            {/* feedback  */}
            <td className="px-6 py-4">
                {
                    aClass.feedback ? <div className='relative'>
                          <span class="animate-ping absolute inline-flex h-1 w-1 rounded-full bg-green-400 opacity-75"></span>
                          <span onClick={()=>window[aClass._id].showModal()} className='cursor-pointer'><AiFillAlert className='inline mr-2 text-green-600'></AiFillAlert>See feedback </span>
                    </div>  : <span><AiFillAlert className='inline mr-2'></AiFillAlert>No feedback </span>  
                }

                {/* Feedback Modal */}
                
                <dialog id={aClass._id} className="modal">
                  <form method="dialog" className="modal-box">
                    <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg">Feedback</h3>
                    <p className="py-4">{aClass.feedback}</p>
                  </form>
                </dialog>
               
                
            </td>
            {/* status  */}
            <td className="px-6 py-4">
                {
                    aClass.approveStatus==='denyed' ? <span> <MdOutlineDoNotDisturb className='mr-2 inline text-red-600'></MdOutlineDoNotDisturb>{aClass.approveStatus} </span> : <span>{aClass.approveStatus==='panding' ? <LuLoader className='mr-2 inline animate-spin'></LuLoader> : <MdDone className='mr-2 inline text-green-600'></MdDone> }{aClass.approveStatus}</span>
                }
                
                
            </td>
            {/* action  */}
            <td>
                action
            </td>
        </tr>
    );
};

export default MyClassesRow;
// Importing toastify module
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 



export const toastError=(message:string)=>
{
toast.error (message);
}
export const toastSuccess=(message:string)=>
{
toast.success (message);
}
export const toastWarning=(message:string)=>{
toast.warn (message);

}
 
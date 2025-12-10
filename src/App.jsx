import { createBrowserRouter, RouterProvider , createRoutesFromElements , Route  } from 'react-router-dom';
import MainLayout from './layouts/mainLayout';
import Homepage from './pages/homepage';
import Jobs from './pages/jobs';
import NotFound from './pages/notFound';
import JobSpecification from './pages/jobSpesification';
import { JobLoader } from './pages/jobSpesification';
import AddJob from './pages/Addjob';
import { collection, addDoc } from 'firebase/firestore';
import {db} from "./firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import SignupPage from './pages/signuppage';
import LoginPage from './pages/loginpage';
import {createContext, useState , useEffect} from 'react';
import { auth } from './firebase/firebase';
import { onAuthStateChanged , signOut } from 'firebase/auth';
import ProtectedRoute from "./ProtectedRoute";
import MyJobs from "./pages/MyJobs";
import EmployerProtectedRoute from "./EmployerProtectedRoute";

const app = ()=>{
    const addjobs = async (newjob)=>{
        
     try {
      await addDoc(collection(db, "jobs"), newjob);
      alert("Job added successfully!");
     
    } catch (error) {
      alert("Failed to add job: " + error.message);
    }


 return 
    }
        
    const deleteJobs = async (id) => {
        try {
            await deleteDoc(doc(db, "jobs", id));
            alert("Job deleted successfully!");
          } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete job: " + error.message);
          }
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route index element={<Homepage />} />
                <Route path='/jobs' element={<ProtectedRoute>
                  <Jobs />
                  </ProtectedRoute>} />
                <Route path='/add-job' element={
                  <EmployerProtectedRoute>
                  <AddJob addjobs={addjobs}/>
                  </EmployerProtectedRoute>
                  } />
                <Route path='/sign-up' element={<SignupPage/>} />
                <Route path='/log-in' element={<LoginPage/>} />
                <Route path='/jobs/:id' element={<JobSpecification deleteJobs={deleteJobs} />} loader={JobLoader} />
                <Route path='/my-jobs' element={
                  <EmployerProtectedRoute>
                    <MyJobs />
                  </EmployerProtectedRoute>
                } />
                 <Route path='*' element={<NotFound />} />
                
            </Route>    
        )
    );

    return (
       <RouterProvider router={router} />
    );

}
export default app;
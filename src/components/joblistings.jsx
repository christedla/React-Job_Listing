import { useEffect , useState } from 'react';
import Joblisting from './joblisting';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Joblistings = ( {isHome}) => {
    // If isHome is true, we only show the first 3 jobs
    // If isHome is false, we show all jobs
const [jobs , setJobs]= useState([]);

useEffect(()=>{
    async function fetchJobs() {
      const jobsCol = collection(db, 'jobs');
      const jobsSnapshot = await getDocs(jobsCol);
      const jobsList = jobsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobs(jobsList);
    }
    fetchJobs();
},[])
   let featuredJobs = [];
    let title = ""
    if (isHome){
        featuredJobs = jobs.slice(0,3);
        title = "Featured Jobs";

    }else{
        featuredJobs = jobs;
        title = "Browse Jobs";
    }
    
    return (
        <section className="job-section">
            <div className="container">
                <h2 className="section-title">{title}</h2>
                <div className="job-grid">
                    {featuredJobs.map((job, idx) => (
                        < Joblisting job={job} key={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Joblistings;
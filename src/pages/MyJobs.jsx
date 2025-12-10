import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setJobs([]);
      setLoading(false);
      return;
    }
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // assumes each job document has field createdBy set to uid
        const q = query(collection(db, "jobs"), where("createdBy", "==", user.uid));
        const snap = await getDocs(q);
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setJobs(list);
      } catch (err) {
        console.error("Failed to load my jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [user]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this job?");
    if (!confirmed) return;
    try {
      await deleteDoc(doc(db, "jobs", id));
      setJobs(prev => prev.filter(j => j.id !== id));
      alert("Job deleted");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete job");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in.</div>;

  return (
    <section className="container">
      <h2>My Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet. <Link to="/add-job">Add one</Link>.</p>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="job-type">{job.type}</div>
              <h3>{job.title}</h3>
              <p className="job-desc">{job.description?.slice(0,150)}</p>
              <div className="job-salary">{job.salary}</div>
              <div className="job-footer">
                <span className="location">{job.location}</span>
                <div style={{marginLeft: "auto", display: "flex", gap: "8px"}}>
                  <Link to={`/edit-job/${job.id}`} className="nav-btn">Edit</Link>
                  <button className="nav-btn nav-btn-login" onClick={() => handleDelete(job.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyJobs;
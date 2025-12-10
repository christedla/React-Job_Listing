import { useParams , useLoaderData , useNavigate, Link} from "react-router-dom";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
//import './sjob.css' 
const JobSpecification = ({ deleteJobs }) => {
    const job = useLoaderData();
    const navigate = useNavigate();
    const { user, role } = useContext(AuthContext);

    const handleDelete = () => {
        const confirmed = window.confirm("Are you sure you want to delete this job?");
        if (confirmed) {
             deleteJobs(job.id);
            navigate('/jobs');
        }
    };

    return ( 
        <div className="spec_body">
            <section>
              <div className="spec_container">
                <a href="/jobs.html" className="spec_back-link">
          <i className="spec_fas spec_fa-arrow-left"></i> Back to Job Listings
        </a>
      </div>
    </section>
    
    <section className="spec_job-section">
      <div className="spec_container spec_grid-container">
        <main>
          <div className="spec_job-card">
            <div className="spec_job-type">{job.type}</div>
            <h1 className="spec_job-title">{job.title}</h1>
            <div className="spec_job-location">
              <i className="spec_fa-solid fa-location-dot"></i>
              <span className="location"><i className="fa-solid fa-location-dot"></i> {job.location}</span>
            </div>
          </div>

          <div className="spec_job-description-card">
            <h3 className="spec_section-title">Job Description</h3>
            <p>
              We are seeking a talented Front-End Developer to join our team in
              {job.location}...
            </p>

            <h3 className="spec_section-title">Salary</h3>
            <p>{job.salary}</p>
          </div>
        </main>

       
        <aside>
          <div className="spec_sidebar-card">
            <h3 className="spec_section-title">Company Info</h3>
            <h2 className="spec_company-name">{job.company.name}</h2>
            <p className="spec_company-info">
             {job.company.description}
            </p>

            <hr />

            <h3 className="spec_contact-label">Contact Email:</h3>
            <p className="spec_contact-info">{job.company.contactEmail}</p>

            <h3 className="spec_contact-label">Contact Phone:</h3>
            <p className="spec_contact-info">{job.company.contactPhone}</p>
          </div>

          <div className="spec_sidebar-card">
            <h3 className="spec_section-title">Manage Job</h3>

            {/* only show edit/delete to employers who created the job */}
            {role === "employer" && user && user.uid === job.createdBy ? (
              <>
                <Link to={`/edit-job/${job.id}`} className="spec_btn spec_btn-edit">Edit Job</Link>
                <button onClick={handleDelete} className="spec_btn spec_btn-delete">Delete Job</button>
              </>
            ) : (
              <p className="muted">Only the employer who posted this job can edit or delete it.</p>
            )}
          </div>
        </aside>
      </div>
    </section>
          

           

        </div>
    )

}

const JobLoader = async ({ params }) => {
  const jobRef = doc(db, 'jobs', params.id);
  const jobSnap = await getDoc(jobRef);

  if (!jobSnap.exists()) {
    throw new Error('Job not found');
  }

  return { id: jobSnap.id, ...jobSnap.data() };
};

export { JobSpecification as default, JobLoader };
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Joblisting = ({ job, idx }) => {
  const { user, role } = useContext(AuthContext);

  const [showMore, setShowMore] = useState(false);
  let lessDescription;
  if (!showMore) {
    lessDescription = job.description.slice(0, 120) + "...";
  } else {
    lessDescription = job.description;
  }

  return (
    <div className="job-card" key={idx}>
      <div className="job-type">{job.type}</div>
      <h3>{job.title}</h3>
      <p className="job-desc">{lessDescription}</p>
      <button className="btn-toggle" onClick={() => setShowMore(!showMore)}>
        {showMore ? "Less" : "more"}
      </button>
      <div className="job-salary">{job.salary} /year</div>

      <div className="job-footer">
        <span className="location">
          <i className="fa-solid fa-location-dot"></i> {job.location}
        </span>
        <Link to={`/jobs/${job.id}`} className="btn-read">
          Read More
        </Link>

        {/* show Edit/Delete only to employers (optionally only if they created the job) */}
        {role === "employer" && user && user.uid === job.createdBy && (
          <div className="job-actions">
            <Link to={`/edit-job/${job.id}`} className="nav-btn">
              Edit
            </Link>
            <button
              className="nav-btn nav-btn-login"
              onClick={() => handleDelete(job.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Joblisting;
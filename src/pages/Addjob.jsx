// JSX Component (AddJob.jsx)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";     

const AddJob = () => {
    const [jobType, setJobType] = useState("Full-Time");
    const [jobTitle, setJobTitle] = useState("");
    const [description, setDescription] = useState(""); 
    const [salary, setSalary] = useState("Under $50K");
    const [location, setLocation] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");   
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");

   const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newJob = {
          type: jobType,
          title: jobTitle,
          description,
          salary,
          location,
          company: {
            name: companyName,
            description: companyDescription,
            contactEmail,
            contactPhone
          },
          createdBy: auth.currentUser ? auth.currentUser.uid : null, // store creator uid
          createdAt: new Date()
        };
        try {
          await addDoc(collection(db, "jobs"), newJob);
          alert("Job added");
          navigate("/my-jobs");
        } catch (err) {
          console.error(err);
          alert("Failed to add job");
        }
      };

  return (
    <>
      <div className="addbody">

      <section className = "add_form-section">
        <div className = "add_form-container">
          <div className = "add_form-card">

            <form onSubmit={handleSubmit}>
              <h2 className = "add_form-title">Add Job</h2>

              <div className = "add_form-group">
                <label htmlFor="type">Job Type</label>
                <select id="type" 
                name="type" 
                required
                value={jobType}
                onChange={(e)=>setJobType(e.target.value)}

                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className = "add_form-group">
                <label htmlFor="title">Job Listing Name</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="eg. senior Front-End Developer"
                  required
                  value={jobTitle}
                  onChange={(e)=>setJobTitle(e.target.value)}
                />
              </div>

              <div className = "add_form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  placeholder="Add job duties, expectations, etc."
                    required
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className = "add_form-group">
                <label htmlFor="salary">Salary</label>
                <select id="salary"
                 name="salary"
                  required
                  value={salary}
                  onChange={(e)=>setSalary(e.target.value)}
                >
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - 60K">$50K - $60K</option>
                  <option value="$60K - 70K">$60K - $70K</option>
                  <option value="$70K - 80K">$70K - $80K</option>
                  <option value="$80K - 90K">$80K - $90K</option>
                  <option value="$90K - 100K">$90K - $100K</option>
                  <option value="$100K - 125K">$100K - $125K</option>
                  <option value="$125K - 150K">$125K - $150K</option>
                  <option value="$150K - 175K">$150K - $175K</option>
                  <option value="$175K - 200K">$175K - $200K</option>
                  <option value="Over $200K">Over $200K</option>
                </select>
              </div>

              <div className = "add_form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Company Location"
                  required
                  value={location}
                  onChange={(e)=>setLocation(e.target.value)}
                />
              </div>

              <h3 className = "add_section-heading">Company Info</h3>

              <div className = "add_form-group">
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Company Name"
                    required
                    value={companyName}
                    onChange={(e)=>setCompanyName(e.target.value)}
                />
              </div>

              <div className = "add_form-group">
                <label htmlFor="company_description">Company Description</label>
                <textarea
                  id="company_description"
                  name="company_description"
                  rows="4"
                  placeholder="What does your company do?"
                  value={companyDescription}
                    onChange={(e)=>setCompanyDescription(e.target.value)}
                ></textarea>
              </div>

              <div className = "add_form-group">
                <label htmlFor="contact_email">Contact Email</label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  placeholder="Email address for applicants"
                  required
                    value={contactEmail}
                    onChange={(e)=>setContactEmail(e.target.value)}
                />
              </div>

              <div className = "add_form-group">
                <label htmlFor="contact_phone">Contact Phone</label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  placeholder="Optional phone for applicants"
                    value={contactPhone}
                    onChange={(e)=>setContactPhone(e.target.value)}
                />
              </div>

              <input type="submit" className = "add_submit-btn" value="Add Job" />
            </form>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default AddJob;

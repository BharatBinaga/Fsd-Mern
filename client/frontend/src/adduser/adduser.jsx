import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./adduser.css";

export default function AddUser() {
  const [user, setUser] = useState({ name: "", email: "", address: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:7000/api/user", user);
      navigate("/");
    } catch (requestError) {
      setError(
        requestError.response?.data?.errorMessage ??
          "Unable to save the user. Check that the server is running and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="addUserPage">
      <Link to="/" className="backLink">
        <span aria-hidden="true">←</span> Back to home
      </Link>
      <div className="addUserCard">
        <div className="formIntro">
          <span className="formAccent" aria-hidden="true">✳</span>
          <p className="eyebrow">MAKE ROOM FOR ONE MORE</p>
          <h1>Good people<br /><em>belong here.</em></h1>
          <p className="formDescription">Add someone to your directory. The best things start with an introduction.</p>
        </div>

        <form className="addUserForm" onSubmit={handleSubmit}>
          <div className="formField">
            <label htmlFor="name">Full name <span>*</span></label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Alex Morgan"
              autoComplete="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formField">
            <label htmlFor="email">Email address <span>*</span></label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="alex@company.com"
              autoComplete="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formField">
            <label htmlFor="address">Location <span>*</span></label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="City, Country"
              autoComplete="address-level2"
              value={user.address}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="addUserError" role="alert">{error}</p>}

          <div className="addUserActions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving your person..." : "Add to directory"}
              {!isSubmitting && <span aria-hidden="true">→</span>}
            </button>
            <p>They’ll be right where you left them.</p>
          </div>
        </form>
      </div>
      <p className="addUserFootnote">A better workspace is made together.</p>
    </section>
  );
}
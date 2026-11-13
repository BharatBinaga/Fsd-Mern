import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Update.css";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", address: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/users/${id}`);
        if (isMounted) {
          setUser({
            name: response.data.name ?? "",
            email: response.data.email ?? "",
            address: response.data.address ?? "",
          });
          setError("");
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError.response?.data?.errorMessage ??
              "This user could not be loaded. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (id) {
      fetchUser();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (event) => {
    setUser((currentUser) => ({
      ...currentUser,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await axios.put(`http://localhost:7000/api/users/${id}`, user);
      navigate("/");
    } catch (requestError) {
      setError(
        requestError.response?.data?.errorMessage ??
          "Unable to update the user. Check that the server is running and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="updatePage">
        <div className="updateCard loadingCard">
          <h1>Loading profile…</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="updatePage">
      <Link to="/" className="backLink">
        <span aria-hidden="true">←</span> Back to home
      </Link>

      <div className="updateCard">
        <div className="formIntro">
          <span className="formAccent" aria-hidden="true">✳</span>
          <p className="eyebrow">UPDATE PERSON</p>
          <h1>Freshen up<br /><em>their details.</em></h1>
          <p className="formDescription">Keep the directory accurate by updating their profile with the latest information.</p>
        </div>

        <form className="updateForm" onSubmit={handleSubmit}>
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

          {error && <p className="updateError" role="alert">{error}</p>}

          <div className="updateActions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving changes..." : "Save changes"}
              {!isSubmitting && <span aria-hidden="true">→</span>}
            </button>
            <Link to="/" className="cancelLink">
              Cancel
            </Link>
          </div>
        </form>
      </div>

      <p className="updateFootnote">Small updates keep the whole picture clear.</p>
    </section>
  );
}

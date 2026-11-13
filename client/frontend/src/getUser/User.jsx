import "../getUser/User.css";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

export default function User() {
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/users");
        if (isMounted) {
          setUser(response.data);
          setError("");
        }
      } catch {
        if (isMounted) {
          setError("We couldn't connect to the server. Check that it is running, then try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    const refreshInterval = setInterval(fetchData, 5000);

    return () => {
      isMounted = false;
      clearInterval(refreshInterval);
    };
  }, [refreshKey]);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return user;

    return user.filter(({ name, email, address }) =>
      [name, email, address].some((value) =>
        value?.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [query, user]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to remove this person from the directory?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:7000/api/delete/${id}`);
      setUser((currentUsers) => currentUsers.filter((person) => person._id !== id));
    } catch (requestError) {
      setError(requestError.response?.data?.errorMessage ?? "Unable to delete this user right now.");
    }
  };

  const getInitials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  return (
    <section className="directoryPage">
      <div className="pageIntro">
        <div>
          <p className="eyebrow"><span /> YOUR WORKSPACE</p>
          <h1>People, <span>in good company.</span></h1>
          <p className="pageDescription">
            A thoughtful place to keep the people you work with close.
          </p>
        </div>
        <Link to="/adduser" className="primaryButton">
          <span aria-hidden="true">+</span>
          Add a person
        </Link>
      </div>

      <div className="overviewStrip">
        <div className="overviewItem">
          <span className="overviewIcon peopleIcon" aria-hidden="true">✳</span>
          <div>
            <span className="overviewLabel">IN YOUR DIRECTORY</span>
            <strong>{user.length} <span>{user.length === 1 ? "person" : "people"}</span></strong>
          </div>
        </div>
        <div className="overviewDivider" />
        <div className="overviewItem">
          <span className="overviewIcon syncIcon" aria-hidden="true">↻</span>
          <div>
            <span className="overviewLabel">DATA IS UP TO DATE</span>
            <strong><span>Syncs automatically</span></strong>
          </div>
        </div>
        <span className="overviewNote">Just the way it should be.</span>
      </div>

      <section className="directoryCard" aria-labelledby="directory-title">
        <div className="directoryToolbar">
          <div>
            <h2 id="directory-title">Your people</h2>
            <p>A little easier to find, a little easier to know.</p>
          </div>
          <div className="directoryControls">
            <label className="searchBox">
              <span className="searchIcon" aria-hidden="true" />
              <span className="srOnly">Search people</span>
              <input
                type="search"
                placeholder="Search people..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && (
                <button
                  type="button"
                  className="clearSearch"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>
            <button
              type="button"
              className="refreshButton"
              onClick={() => {
                setIsLoading(true);
                setRefreshKey((key) => key + 1);
              }}
              disabled={isLoading}
              aria-label="Refresh directory"
              title="Refresh directory"
            >
              ↻
            </button>
          </div>
        </div>

        {error && (
          <div className="directoryAlert" role="alert">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => {
                setIsLoading(true);
                setRefreshKey((key) => key + 1);
              }}
            >
              Try again
            </button>
          </div>
        )}

        <div className="tableScroll">
          <table className="peopleTable">
            <thead>
              <tr>
                <th scope="col">PERSON</th>
                <th scope="col">EMAIL</th>
                <th scope="col">LOCATION</th>
                <th scope="col" className="contactHeading">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="tableMessage" colSpan="4">Bringing your people together…</td>
                </tr>
              ) : filteredUsers.length ? (
                filteredUsers.map((userData) => (
                  <tr key={userData._id}>
                    <td>
                      <div className="personCell">
                        <span className="personAvatar" aria-hidden="true">
                          {getInitials(userData.name)}
                        </span>
                        <span className="personName">{userData.name}</span>
                      </div>
                    </td>
                    <td className="emailCell">{userData.email}</td>
                    <td className="locationCell">{userData.address}</td>
                    <td className="actionCell">
                      <div className="actionButtons">
                        <Link to={`/update/${userData._id}`} className="actionButton editButton">
                          Edit
                        </Link>
                        <button type="button" onClick={() => handleDelete(userData._id)} className="actionButton deleteButton">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="tableMessage" colSpan="4">
                    <span className="emptyTitle">
                      {query ? "No one by that name just yet." : "Your directory starts here."}
                    </span>
                    <span className="emptyDescription">
                      {query
                        ? "Try another name, email, or location."
                        : "Add someone to make this space a little more useful."}
                    </span>
                    {!query && (
                      <Link to="/adduser" className="emptyAction">Add your first person <span aria-hidden="true">→</span></Link>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="directoryFooter">
          <span>
            Showing <strong>{filteredUsers.length}</strong> of <strong>{user.length}</strong> people
          </span>
          <span className="liveIndicator"><span /> LIVE DIRECTORY</span>
        </div>
      </section>

      <p className="pageFootnote">Good work starts with good people.</p>
    </section>
  );
}

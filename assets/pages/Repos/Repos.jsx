import React, { useState, useEffect } from "react";
import ModalFerie from "../../Components/modal/ModalFerie";
import TableLoader from "../../Components/loaders/TableLoader";
import Title from "../../Components/title/Title";
import moment from "moment";
import "./repos.css";
import { toast } from "react-toastify";
import ferieApi from "../../services/ferieApi";
const Repos = () => {
  const [search, setSearch] = useState("");
  const [depid, setDepid] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [type, setType] = useState("");
  const fetchRepos = async () => {
    try {
      const response = await ferieApi.findAll();
      setRepos(response);
      console.log(response);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement des données");
    }
  };
  useEffect(() => {
    fetchRepos();
  }, []);

  const handleSearch = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    // console.log(search);
  };
  const filteredBreak = repos.filter((p) =>
    p.nom.toLowerCase().includes(search)
  );

  return (
    <>
      <div className="repos d-flex-4">
        <div className="centre">
          <Title nomdepage="Dashboard" subname="Férié">
            <button
              onClick={() => {
                setIsModalOpened(true);
                setDepid(0);
                setType("AJOUTER_REPOS");
              }}
            >
              Ajouter un Férié
            </button>
          </Title>
          <div className="header-input">
            <input
              type="text"
              placeholder="ex AID"
              name="nom"
              onChange={handleSearch}
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {filteredBreak.map((repo) => (
                  <tr key={repo.id}>
                    <td>{repo.nom}</td>
                    <td>
                      {moment(repo.repos[0].startAt)
                        .lang("fr")
                        .format("MMM DD YY")}
                    </td>
                    <td>
                      <div className="form-group-button">
                        <button
                          onClick={() => {
                            setDepid(repo.id);
                            setIsModalOpened(true);
                            setType("AJOUTER_REPOS");
                          }}
                          id={repo.id}
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => {
                            setDepid(repo.id);
                            setIsModalOpened(true);
                            setType("SUPPRIMER_REPOS");
                          }}
                          id={repo.id}
                        >
                          Supprimer
                        </button>
                      </div>
                      <span></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {loading && <TableLoader />}
        </div>
      </div>
      <ModalFerie
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        Type={type}
        id={depid}
        tables={repos}
        setTables={setRepos}
        setDepid={setDepid}
      />
    </>
  );
};

export default Repos;

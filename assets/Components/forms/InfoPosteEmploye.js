import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { EMPLOYES_API } from "../../config";
import departementApi from "../../services/departementApi";
import postApi from "../../services/postApi";
import Select from "./Select";

const InfoPosteEmploye = ({ handleSubmit, user, handleChange, setUser }) => {
  const [departements, setDepartements] = useState([]);
  const [postes, setPostes] = useState([]);
  const [dep, setDep] = useState("");
  const [monposte, setMonPoste] = useState("");
  const fetchDepartements = async () => {
    try {
      const data = await departementApi.findAll();
      setDepartements(data);
      console.log(data);

      // if(!user.Departement)setUser({...user,Departement:data[0].id})
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchDepartements();
  }, []);
  const handleChoose = async (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setDep(value);
    console.log(value);
    if (value != 0) {
      const response = await postApi.findOneById(value);
      console.log(user.poste);
      console.log(response);
      setPostes(response);
    } else {
      setPostes([]);
    }
  };
  const handlePoste = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    console.log(value);
    setMonPoste(value);
  };
  const handleSendPoste = async (event) => {
    event.preventDefault();
    console.log(user);
    console.log(dep);
    try {
      const data = await axios
        .put(EMPLOYES_API + "/" + user.id, {
          poste: `api/postes/${monposte}`,
        })
        .then((response) => response.data.poste);
      toast.success("Modification reussie");
      setUser({
        ...user,
        ["poste"]: data.Designation,
        ["departement"]: data.departement.Nom,
      });
      console.log(data);
      //   setUser({...user,[poste]:})
      // user.poste.Designation="Salut" A AJOUTER
    } catch (error) {
      toast.error("Erreur lors de la modification");
    }
  };

  return (
    <>
      <form className="formulaire" onSubmit={handleSendPoste}>
        <div className="form-grap">
          <div className="form-group">
            <Select
              name="departement"
              label="Choisir un   département"
              onChange={handleChoose}
            >
              <option value="">--------------------------------</option>
              {departements.map((departement) => (
                <option key={departement.id} value={departement.id}>
                  {departement.Nom}
                </option>
              ))}
            </Select>
          </div>
          <div className="form-group">
            <div className="form-wrap sexe">
              {postes.length > 0 ? (
                <>
                  {" "}
                  <Select name="poste" label="Poste" onChange={handlePoste}>
                    <option value="">Choisissez un poste</option>
                    {postes.map((poste) => (
                      <option key={poste.id} value={poste.id}>
                        {poste.Designation}
                      </option>
                    ))}
                  </Select>
                </>
              ) : (
                <>
                  <p>Veuillez sélectionner un département ayant des postes</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="submit-section">
          <button className="form-first " type="submit">
            Modifier
          </button>
        </div>
      </form>
    </>
  );
};

export default InfoPosteEmploye;

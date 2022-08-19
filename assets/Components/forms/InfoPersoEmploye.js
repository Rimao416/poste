import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import authApi from "../../services/authApi";
import { country } from "../../services/country";
import Select from "./Select";
const InfoPersoEmploye = ({ handleSubmit, user, handleChange }) => {
  const [modifie, setModifie] = useState(true);
  useEffect(() => {
    const userInfo = authApi.getUserInfo();
    if (userInfo.includes("ROLE_AGENT") || userInfo.includes("ROLE_SUPER")) {
      setModifie(false);
    }
    
    if(jwtDecode(window.localStorage.getItem("authToken")).id===user.id){
      setModifie(true)
    }
    // console.log(user.)
  }, []);
  return (
    <>
      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="form-grap">
          <div className="form-group">
            <label htmlFor="cin" className="label-input">
              CIN
            </label>
            <input
              type="text"
              placeholder="ex. Mariem"
              disabled={modifie === false ? false : true}
              name="cin"
              defaultValue={user.cin}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="matricule" className="label-input">
              matricule
            </label>
            <input
              type="text"
              placeholder="ex. Omari"
              disabled={modifie === false ? false : true}
              name="matricule"
              onChange={handleChange}
              defaultValue={user.matricule}
            />
          </div>
        </div>

        <div className="form-grap">
          <div className="form-group">
            <Select name="statut" label="statut" onChange={handleChange}>
              <option value="">--------------------</option>
              <option value="Mariée">Mariée</option>
              <option value="Célibataire">Célibataire</option>
              <option value="Autre">Autre</option>
            </Select>
            <p>Statut Actuel {user.statut}</p>
          </div>
          <div className="form-group">
            <Select name="pays" label="pays" onChange={handleChange}>
              <option value="">----------------------</option>
              {country.map((pays) => (
                <option value={pays}>{pays}</option>
              ))}
            </Select>
            <p>Pays Actuel {user.pays}</p>
          </div>
        </div>
        <div className="form-grap">
          <div className="form-group">
            <Select name="sexe" label="Sexe" onChange={handleChange}>
              <option value="">---------------</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </Select>
            <p>Sexe Actuel {user.sexe}</p>
          </div>
          <div className="form-group">
            <label htmlFor="cin" className="label-input">
              Nombre d'enfants
            </label>
            <input
              type="number"
              name="enfant"
              defaultValue={user.enfant}
              onChange={handleChange}
            />
            <p>Nombre Actuel {user.enfant}</p>
          </div>
        </div>

        <div className="submit-section">
          <button className="form-first " type="submit">
            Modifier un Employé
          </button>
        </div>
      </form>
    </>
  );
};

export default InfoPersoEmploye;

import React from "react";
import Select from "./Select";

export default function ContratForm({ submitHandler, handleChange, types }) {
  return (
    <>
      <form className="formulaire" onSubmit={submitHandler}>
        <div className="form-grap">
          <div className="form-group">
            <Select
              name="type"
              label="Entrez le type de contrat"
              onChange={handleChange}
            >
              <option value="">-----------</option>
              {types.map((type_contrat) => (
                <option key={type_contrat.id} value={type_contrat.id}>
                  {type_contrat.nom}
                </option>
              ))}
            </Select>
          </div>
          <div className="form-group">
            <label htmlFor="date de debut" className="label-input">
              Date de Début
            </label>
            <input type="date" name="DateDebut" onChange={handleChange} required/>
          </div>
        </div>

        <div className="form-grap">
          <div className="form-group">
            <label htmlFor="date de fin" className="label-input">
              Date de fin
            </label>
            <input type="date" name="DateFin" onChange={handleChange} />
            
          </div>
          <div className="form-group">
            <label htmlFor="adresse" className="label-input">
              Salaire
            </label>
            <input type="text" name="salaire" onChange={handleChange} required/>
          </div>
        </div>

        <div className="submit-section">
          <button className="form-first " type="submit">
            ENREGISTRER
          </button>
        </div>
      </form>
    </>
  );
}

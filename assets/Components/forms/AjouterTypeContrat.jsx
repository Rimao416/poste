import React from "react";

export default function AjouterTypeContrat({
  handleSubmit,
  handleChange,
  errors,
  contrat,
  id,
}) {
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="departement" className="label-input">
          Entrer le Type de contrat
        </label>
        <input
          type="text"
          required
          //   className={errors.Nom.length > 0 ? "is-invalid" : ""}
          placeholder="ex.CDD"
          name="nom"
          defaultValue={contrat.nom}
          onChange={handleChange}
        />
        {/* {errors.Nom.length > 0 && <p className="error-input">{errors.Nom}</p>} */}
        <div className="submit-section">
          <button className="form-first " type="submit">
            {id > 0 ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
}

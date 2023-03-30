import React from "react";

function AjouterDemande({ handleSubmit, conge, handleChange, typeConge, id }) {
  return (
    <>
      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="form-grap">
          <div className="form-group">
            <label htmlFor="departement" className="label-input">
              Date de debut
            </label>
            <input
              type="date"
              defaultValue={conge.debutConge}
              required
              name="debutConge"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nom" className="label-input">
              Date de fin
            </label>
            <input
              type="date"
              defaultValue={conge.finConge}
              required
              name="finConge"
              onChange={handleChange}
            />
            {/* {errors.lastName && (
                      <p className="error-input">{errors.lastName}</p>
                    )} */}
          </div>
        </div>
        <div className="form-grap">
          <div className="form-group">
            <label htmlFor="departement" className="label-input">
              Motif
            </label>
            {id !=0 && <h6>Motif actuel {conge.raison}</h6> }
            <h6></h6>
            <select name="raison" onChange={handleChange}>
              <option value="">--------------------------------</option>
              <option value="Congé maladie">Congé maladie</option>
              <option value="Congé annuel">Congé annuel</option>
              <option value="Congé sans solde">Congé sans solde</option>
              <option value="Congé de maternité">Congé de maternité</option>
              <option value="Congé payé">Congé payé</option>
              <option value="Décès">Décès</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="nom" className="label-input">
            Explication
          </label>
          <textarea
            name="explication"
            id="monTextarea"
            cols="80"
            rows="10"
            value={conge.explication}
            onChange={handleChange}
          >{conge.explication}</textarea>
          {/* {errors.lastName && (
                      <p className="error-input">{errors.lastName}</p>
                    )} */}
        </div>
        <button type="submit">{id === 0 ? "Envoyer" : "Modifier"}</button>
      </form>
    </>
  );
}

export default AjouterDemande;

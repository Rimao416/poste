import React from "react";

const InfoEmploye = ({handleSubmit, user, handleChange}) => {
  return (
    <>
      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="form-grap">
          <div className="form-group">
            <label htmlFor="firstName" className="label-input">
              Nom de l'employé
            </label>
            <input
              type="text"
              placeholder="ex. Mariem"
              name="firstName"
              defaultValue={user.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="label-input">
              Prénom de l'employé
            </label>
            <input
              type="text"
              placeholder="ex. Omari"
              name="lastName"
              onChange={handleChange}
              defaultValue={user.lastName}
            />
          </div>
        </div>

        <div className="form-grap">
          <div className="form-group">
            <label htmlFor="email" className="label-input">
              Adresse Mail
            </label>
            <input
              type="email"
              placeholder="ex. johndoe@gmail.com"
              name="email"
              defaultValue={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adresse" className="label-input">
              Adresse d'habitation
            </label>
            <input
              type="text"
              placeholder="ex. Av. Hédi Nouira"
              name="adresse"
              defaultValue={user.adresse}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-grap">
          <div className="form-group">
            <label htmlFor="firstName" className="label-input">
              Téléphone
            </label>
            <input
              type="text"
              placeholder="ex. +21656609671"
              name="telephone"
              defaultValue={user.telephone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="label-input">
              Anniversaire
            </label>
            <input
              type="date"
              placeholder="ex. Omari"
              name="dateNaissance"
              defaultValue={user.dateNaissance}
              onChange={handleChange}
            />
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

export default InfoEmploye;

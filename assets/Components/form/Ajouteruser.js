import React from "react";

function Ajouteruser({ handleSubmit, errors, user, handleChange, id }) {
  return (
    <div>
      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="form-grap">
          <div className="form-group">
            <label htmlFor="firstName" className="label-input">
              Noms de l'employé
            </label>
            <input
              className={errors.firstName && "is-invalid"}
              type="text"
              placeholder="ex. Mariem"
              name="firstName"
              defaultValue={user.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="error-input">{errors.firstName}</p>
            )}
          </div>
          <div className="form-group">
                <label htmlFor="lastName" className="label-input">
                  Prénom de l'employé
                </label>
                <input
                  type="text"
                  placeholder="ex. Omari"
                  className={errors.lastName && "is-invalid"}
                  name="lastName"
                  defaultValue={user.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="error-input">{errors.lastName}</p>
                )}
              </div>
        </div>
        <div className="form-grap">
          <div className="form-group">
            <label htmlFor="firstName" className="label-input">
              Nom de l'employé
            </label>
            <input
              className={errors.firstName && "is-invalid"}
              type="text"
              placeholder="ex. Mariem"
              name="firstName"
              defaultValue={user.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="error-input">{errors.firstName}</p>
            )}
          </div>
          <div className="form-group">
                <label htmlFor="lastName" className="label-input">
                  Prénom de l'employé
                </label>
                <input
                  type="text"
                  placeholder="ex. Omari"
                  className={errors.lastName && "is-invalid"}
                  name="lastName"
                  defaultValue={user.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="error-input">{errors.lastName}</p>
                )}
              </div>
        </div>
      </form>
    </div>
  );
}

export default Ajouteruser;

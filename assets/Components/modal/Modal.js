import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./modal.css";
import { BiX } from "react-icons/bi";
import userApi from "../../services/userApi";
import Ajouteruser from "../form/AjouterUser";

import { toast } from "react-toastify";
import Supprimeuser from "../form/Supprimeuser";

const Modal = ({
  isOpened,
  onClose,
  Type,
  id,
  tables,
  setTables,
  setDepid,
}) => {
  console.log(tables);
  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    dateAnniversaire: "",
    nom: "",
    prenom: "",
    genre: "",
    contact: "",
  });
  const [title, setTitle] = useState("Ajouter un utilisateur");
  useEffect(() => {
    if (Type == "AJOUTER_UTILISATEUR" && id == 0) {
      setTitle("Ajouter un utilisateur");
    } else if (Type == "AJOUTER_UTILISATEUR" && id != 0) {
      setTitle("Modifier un utilisateur");
      console.log(tables);
      setUser({
        email:tables.email,
        nom:tables.firstName,
        prenom:tables.lastName,
        genre:tables.sexe,
        contact:tables.telephone
      })
    } else if (Type == "SUPPRIMER_UTILISATEUR" && id != 0) {
      setTitle("Modifier un utilisateur");
    }
  }, [id]);
 
  const [errors, setError] = useState({
    Nom: "",
  });

  if (!isOpened) {
    return null;
  }
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setUser({ ...user, [name]: value });
    setUser({
      ...user,
      [name]: value,
      photo: `https://avatars.dicebear.com/api/initials/${
        user.nom + " " + user.prenom
      }.svg`,
    });
    // setUser({
    //   ...user,
    //   [name]: value,
    // });
  };
  /*--------------------------------------------------------------MODIFICATION D'UN DEPARTEMENT------------------------------------*/
  const handleSubmit = async (event) => {
    toast.info("Traitement en cours");
    event.preventDefault();
    console.log(user);
    try {
      if (id == 0) {
        if (user.password !== user.passwordConfirm) {
          // apiError.passwordConfirm =
          //   "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
          // setErrors(apiError);
          toast.error("Les mots de passe doivent correspondre");
          return;
        } else {
          // apiError.passwordConfirm = "";
        }
      }
      if (id != 0) {
        console.log(tables)
        toast.success("Oui")
        await userApi.update(id, user.email,user.nom,user.prenom,user.adresse,user.genre,user.contact);
        toast.info("Utilisateur modifié");
        // tables.map((t) => {
        //   if (t.id == id) {
        //     t.firstName = user.nom;
        //     t.lastName=user.prenom,
        //     t.sexe=user.genre

        //   }
        // });
        //----------------------------------------------------- AJOUT DU DEPARTEMENT -----------------------------------------------------
        onClose()
      } else if (id == 0) {
        const response = await userApi.create(
          user.email,
          user.password,
          user.prenom,
          user.prenom,
          user.adresse,
          user.contact,
          user.genre,
          user.dateAnniversaire,
          user.photo
        );
        console.log(response);
        const { id, firstName, lastName, sexe, telephone, email } =
          response.data;
        console.log(tables);
        toast.success("Utilisateur ajouté avec Succès");
        tables.push({ id, firstName, lastName, sexe, telephone, email });
        setTables(tables);
        onClose();
      }

      setDepid(0);
      //   setDepartement({ Nom: "" });
    } catch (error) {
      console.log(error);
      // error.response.data.violations.forEach((violation) => {
      //   apiError[violation.propertyPath] = violation.message;
      // });
      // setError(apiError);
      toast.error("Erreur");
    }
    // if (Object.keys(apiError).length == 0) {
    //   onClose();
    //   setError({ Nom: "" });
    // }
  };

  //------------------------------------------------------------SUPPRESSION D'UN DEPARTEMENT-------------------------------------------------
  const onRemove = async (event) => {
    console.log(id);
    // const originalDepartements=[...departement]
    try {
      await userApi.delete(id);
      toast.success("La suppression est un succès");
      setTables(tables.filter((table) => table.id != id));
    } catch (error) {
      toast.warning(
        "Erreur de suppression"
      );
    }
    onClose();
    setDepid(0);
    // setDepartement({ Nom: "" });
  };
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
              setDepid(0);
              // setDepartement({ Nom: "" });
            }}
          />
        </span>

        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
        </div>
        <div className="modal-body">
          {Type == "AJOUTER_UTILISATEUR" ? (
            // <Ajouteruser
            //   handleSubmit={handleSubmit}
            //   errors={errors}
            //   user={user}
            //   handleChange={handleChange}
            //   id={id}
            // />

            <form className="formulaire" onSubmit={handleSubmit}>
              <div className="form-grap">
                <div className="form-group">
                  <label htmlFor="email" className="label-input">
                    Email de l'employé
                  </label>
                  <input
                    className={errors.firstName && "is-invalid"}
                    type="email"
                    placeholder="ex. Exaucé@gmail.com"
                    name="email"
                    defaultValue={user.email}
                    onChange={handleChange}
                  />
                  {/* {errors.firstName && (
                  <p className="error-input">{errors.firstName}</p>
                )} */}
                </div>
                <div className="form-group">
                  <label htmlFor="nom" className="label-input">
                    Nom de l'employé
                  </label>
                  <input
                    type="text"
                    placeholder="ex. Omari"
                    // className={errors.lastName && "is-invalid"}
                    name="nom"
                    defaultValue={ user.nom}
                    onChange={handleChange}
                  />
                  {/* {errors.lastName && (
                      <p className="error-input">{errors.lastName}</p>
                    )} */}
                </div>
              </div>
              <div className="form-grap">
                <div className="form-group">
                  <label htmlFor="prenom" className="label-input">
                    Prenom de l'employé
                  </label>
                  <input
                    // className={errors.firstName && "is-invalid"}
                    type="text"
                    placeholder="ex. Mariem"
                    name="prenom"
                    defaultValue={user.prenom}
                    onChange={handleChange}
                  />
                  {/* {errors.firstName && (
                  <p className="error-input">{errors.firstName}</p>
                )} */}
                </div>
                <div className="form-group">
                  <label htmlFor="genre" className="label-input">
                    Genre
                  </label>
                  <select name="genre" id="" onChange={handleChange}>
                    <option value="-----">Choisissez un genre</option>
                    <option value="Masculin">Masculin</option>
                    <option value="Féminin">Féminin</option>
                  </select>
                  {id != 0 && <p style={{fontSize:"15px"}}>Le genre actuel {tables.sexe}</p> }
                </div>
              </div>
              <div className="form-grap">
                <div className="form-group">
                  <label htmlFor="email" className="label-input">
                    Contact de l'employé
                  </label>
                  <input
                    // className={errors.firstName && "is-invalid"}
                    type="text"
                    placeholder="ex. +21656609671"
                    name="contact"
                    defaultValue={tables.telephone}
                    onChange={handleChange}
                  />
                  {/* {errors.firstName && (
                  <p className="error-input">{errors.firstName}</p>
                )} */}
                </div>
                <div className="form-group">
                  <label htmlFor="nom" className="label-input">
                    Adresse de l'employé
                  </label>
                  <input
                    type="text"
                    placeholder="ex. Ennasr Res La coupole"
                    // className={errors.lastName && "is-invalid"}
                    name="adresse"
                    defaultValue={tables.adresse}
                    onChange={handleChange}
                  />
                  {/* {errors.lastName && (
                      <p className="error-input">{errors.lastName}</p>
                    )} */}
                </div>
              </div>
              {id==0 && (
              <div className="form-grap">
                <div className="form-group">
                  <label htmlFor="password" className="label-input">
                    Mot de passe de l'employé
                  </label>
                  <input
                    // className={errors.firstName && "is-invalid"}
                    type="password"
                    placeholder="ex. +21656609671"
                    name="password"
                    defaultValue={user.password}
                    onChange={handleChange}
                  />
                  {/* {errors.firstName && (
                  <p className="error-input">{errors.firstName}</p>
                )} */}
                </div>
                <div className="form-group">
                  <label htmlFor="nom" className="label-input">
                    Confirmez le mot de passe
                  </label>
                  <input
                    type="password"
                    placeholder="ex. Ennasr Res La coupole"
                    // className={errors.lastName && "is-invalid"}
                    name="passwordConfirm"
                    defaultValue={user.passwordConfirm}
                    onChange={handleChange}
                  />
                  {/* {errors.lastName && (
                      <p className="error-input">{errors.lastName}</p>
                    )} */}
                </div>
              </div>
              )}
              <div className="form-grap">
                <div className="form-group">
                  <label htmlFor="password" className="label-input">
                    Date d'anniversaire
                  </label>
                  <input
                    required
                    // className={errors.firstName && "is-invalid"}
                    type="date"
                    name="dateAnniversaire"
                    // defaultValue={tables.dateAnniversaire}
                    
                    onChange={handleChange}
                    
                  />
                   {id != 0 && <p style={{fontSize:"15px"}}>L'anniversaire actuel {tables.dateAnniversaire}</p> }

                  {/* {errors.firstName && (
                  <p className="error-input">{errors.firstName}</p>
                )} */}
                </div>
              </div>
              <button type="submit">{id===0 ? "Envoyer":"Modifier"}</button>
            </form>
          ) : (
            // <Supprimerdep onClose={onClose} onRemove={onRemove} />
            // <>
            //   <h6>Voulez vous réellement supprimer cet élément</h6>
            //   <div className="form-flex-button">
            //     <button className="btn-info" onClick={() => onClose()}>
            //       Annuler
            //     </button>
            //     <button className="btn-danger" onClick={() => onRemove()}>
            //       Supprimer
            //     </button>
            //   </div>
            // </>
            <Supprimeuser onClose={onClose} onRemove={onRemove}/>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default Modal;

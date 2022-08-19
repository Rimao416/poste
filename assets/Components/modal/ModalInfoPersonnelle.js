import React, { useState, useEffect } from "react";
import { country } from "../../services/country";
import "./modal.css";
import Select from "../forms/Select";
import { createPortal } from "react-dom";
import { BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";
import { EMPLOYES_API } from "../../config";
const ModalInfoPersonnelle = ({ isOpened, onClose, user, setUser }) => {
  if (!isOpened) {
    return null;
  }
  const handleChange = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setUtilisateur({ ...utilisateur, [name]: value });
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(utilisateur);
    // console.log(user);
    try {
        await axios.put(EMPLOYES_API+'/'+user.id,{
          sexe:user.sexe,
          cin:user.cin,
          enfant:user.enfant,
          matricule:user.matricule,
          pays:user.pays,
          statut:user.statut
        })
      toast.success("Information modifiée avec succèes");
    } catch (error) {
      toast.error("Erreur lors de la modification");
    }
  };
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
            }}
          />
        </span>

        <div className="modal-header">
          <h5 className="modal-title">Ajouter un employé</h5>
        </div>
        <div className="modal-body">
          <form className="formulaire" onSubmit={handleSubmit}>
            <div className="form-grap">
              <div className="form-group">
                <label htmlFor="cin" className="label-input">
                  CIN
                </label>
                <input
                  type="text"
                  placeholder="ex. Mariem"
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
              </div>
              <div className="form-group">
                <Select name="pays" label="pays" onChange={handleChange}>
                  <option value="">----------------------</option>
                  {country.map((pays) => (
                    <option value={pays}>{pays}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="form-grap">
              <div className="form-group">
                <Select name="sexe" label="Sexe" onChange={handleChange}>
                  <option value="">---------------</option>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </Select>
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
              </div>
              
            </div>

            <div className="submit-section">
              <button className="form-first " type="submit">
                Modifier un Employé
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default ModalInfoPersonnelle;

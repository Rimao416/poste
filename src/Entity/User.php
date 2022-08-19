<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 * itemOperations={
 * "GET","PUT","DELETE","increment"={"method"="get","path"="/nombre/{matricule}/matricules","controller"="App\Controller\GetIdController"}
 * },
 * collectionOperations={"POST","GET",
 * "contrats"={"method"="get","path"="/users/{userid}/contrats","controller"="App\Controller\GetContratUser"}
 * },
 * normalizationContext={
 * "groups"={"users_read"}
 * },
 * denormalizationContext={"disable_type_enforcement"=true},
 * ),
 * 
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"users_read","postes_read","conges_read","pointage_read","contrat_read"})
     * @Groups({"users_read","postes_read","conges_read","pointage_read"})
     */
    private $id;    

    /**
     * 
     * @Assert\Email(message="Le mail est incorrecte")
     * @Assert\NotBlank(message="Le champ mail doit être remplie")
     * @Groups({"users_read","postes_read","conges_read","pointage_read"})
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;

    /**
     * @Groups({"users_read","postes_read","conges_read"})
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @Assert\NotBlank(message="Le mot de passe ne doit pas être vide")
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @Assert\NotBlank(message="Le nom ne doit pas être vide")
     * @Groups({"users_read","postes_read","conges_read","pointage_read","contrat_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $firstName;

    /**
     * @Assert\NotBlank(message="Le prenom ne doit pas être vide")
     * @Groups({"users_read","postes_read","conges_read","pointage_read","contrat_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $lastName;

    /**
     * @Groups({"users_read","postes_read","conges_read","pointage_read","contrat_read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $photo;

    /**
     * @Assert\NotBlank(message="L'adresse ne doit pas être vide")
     * @Groups({"users_read","postes_read","conges_read","pointage_read","contrat_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $adresse;

 

    /**
     * @Groups({"users_read","conges_read","pointage_read","contrat_read"})
     * @ORM\ManyToOne(targetEntity=Poste::class, inversedBy="users")
     * @ORM\JoinColumn(nullable=false)
     */
    private $poste;

    /**
     * @ORM\OneToMany(targetEntity=Pointage::class, mappedBy="user")
     */
    private $pointages;



    
    /**
     * @ORM\Column(type="integer",nullable=true,unique=true)
     * @Groups({"users_read","postes_read"})
     */
    private $matricule;

    /**
     * @ORM\OneToMany(targetEntity=Pointage::class, mappedBy="auteur")
     */
    private $pointes;

    /**
     * @ApiSubresource
     * @ORM\OneToMany(targetEntity=Conge::class, mappedBy="user")
     */
    private $conges;

    /**
     * @ORM\OneToMany(targetEntity=Notification::class, mappedBy="user")
     */
    private $notifications;

    /**
     * @ORM\OneToMany(targetEntity=Enregistrement::class, mappedBy="matricule")
     */
    private $enregistrements;

    /**
     * @Groups({"users_read","postes_read","conges_read","pointage_read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $sexe;

    /**
     * @Groups({"users_read","postes_read","conges_read","pointage_read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $cin;

    /**
     * @Groups({"users_read","postes_read","conges_read","pointage_read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $statut;

    /**
     * @Groups({"users_read","postes_read","conges_read","pointage_read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $pays;

    /**
     * @Groups({"users_read","postes_read","conges_read","pointage_read"})
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateNaissance;

    /**
     * @Groups({"users_read","postes_read","conges_read","pointage_read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $telephone;

    /**
     * @Groups({"users_read","postes_read","conges_read","pointage_read"})
     * @ORM\Column(type="integer", nullable=true)
     */
    private $enfant;

    /**
     * @Groups({"users_read","postes_read","conges_read","pointage_read"})
     * @ORM\Column(type="date", nullable=true)
     */
    private $cree;

    /**
     * @ORM\OneToMany(targetEntity=Contrat::class, mappedBy="user")
     */
    private $contrats;




    public function __construct()
    {
        $this->pointages = new ArrayCollection();
        $this->pointes = new ArrayCollection();
        $this->conges = new ArrayCollection();
        $this->notifications = new ArrayCollection();
        $this->enregistrements = new ArrayCollection();
        $this->contrats = new ArrayCollection();
       
     
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(?string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    // public function getComeAt(): ?\DateTimeInterface
    // {
    //     return $this->comeAt;
    // }

    // public function setComeAt($comeAt): self
    // {
    //     $this->comeAt = $comeAt;

    //     return $this;
    // }

    public function getPoste(): ?Poste
    {
        return $this->poste;
    }

    public function setPoste(?Poste $poste): self
    {
        $this->poste = $poste;

        return $this;
    }

    /**
     * @return Collection<int, Pointage>
     */
    public function getPointages(): Collection
    {
        return $this->pointages;
    }

    public function addPointage(Pointage $pointage): self
    {
        if (!$this->pointages->contains($pointage)) {
            $this->pointages[] = $pointage;
            $pointage->setUser($this);
        }

        return $this;
    }

    public function removePointage(Pointage $pointage): self
    {
        if ($this->pointages->removeElement($pointage)) {
            // set the owning side to null (unless already changed)
            if ($pointage->getUser() === $this) {
                $pointage->setUser(null);
            }
        }

        return $this;
    }

    public function getMatricule(): ?int
    {
        return $this->matricule;
    }

    public function setMatricule(?int $matricule): self
    {
        $this->matricule = $matricule;

        return $this;
    }

    /**
     * @return Collection<int, Pointage>
     */
    public function getPointes(): Collection
    {
        return $this->pointes;
    }

    public function addPointe(Pointage $pointe): self
    {
        if (!$this->pointes->contains($pointe)) {
            $this->pointes[] = $pointe;
            $pointe->setAuteur($this);
        }

        return $this;
    }

    public function removePointe(Pointage $pointe): self
    {
        if ($this->pointes->removeElement($pointe)) {
            // set the owning side to null (unless already changed)
            if ($pointe->getAuteur() === $this) {
                $pointe->setAuteur(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Conge>
     */
    public function getConges(): Collection
    {
        return $this->conges;
    }

    public function addConge(Conge $conge): self
    {
        if (!$this->conges->contains($conge)) {
            $this->conges[] = $conge;
            $conge->setUser($this);
        }

        return $this;
    }

    public function removeConge(Conge $conge): self
    {
        if ($this->conges->removeElement($conge)) {
            // set the owning side to null (unless already changed)
            if ($conge->getUser() === $this) {
                $conge->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Notification>
     */
    public function getNotifications(): Collection
    {
        return $this->notifications;
    }

    public function addNotification(Notification $notification): self
    {
        if (!$this->notifications->contains($notification)) {
            $this->notifications[] = $notification;
            $notification->setUser($this);
        }

        return $this;
    }

    public function removeNotification(Notification $notification): self
    {
        if ($this->notifications->removeElement($notification)) {
            // set the owning side to null (unless already changed)
            if ($notification->getUser() === $this) {
                $notification->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Enregistrement>
     */
    public function getEnregistrements(): Collection
    {
        return $this->enregistrements;
    }

    public function addEnregistrement(Enregistrement $enregistrement): self
    {
        if (!$this->enregistrements->contains($enregistrement)) {
            $this->enregistrements[] = $enregistrement;
            $enregistrement->setMatricule($this);
        }

        return $this;
    }

    public function removeEnregistrement(Enregistrement $enregistrement): self
    {
        if ($this->enregistrements->removeElement($enregistrement)) {
            // set the owning side to null (unless already changed)
            if ($enregistrement->getMatricule() === $this) {
                $enregistrement->setMatricule(null);
            }
        }

        return $this;
    }

    public function getSexe(): ?string
    {
        return $this->sexe;
    }

    public function setSexe(?string $sexe): self
    {
        $this->sexe = $sexe;

        return $this;
    }

    public function getCin(): ?string
    {
        return $this->cin;
    }

    public function setCin(?string $cin): self
    {
        $this->cin = $cin;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(?string $statut): self
    {
        $this->statut = $statut;

        return $this;
    }

    public function getPays(): ?string
    {
        return $this->pays;
    }

    public function setPays(?string $pays): self
    {
        $this->pays = $pays;

        return $this;
    }

    public function getDateNaissance(): ?\DateTimeInterface
    {
        return $this->dateNaissance;
    }

    public function setDateNaissance(?\DateTimeInterface $dateNaissance): self
    {
        $this->dateNaissance = $dateNaissance;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getEnfant(): ?int
    {
        return $this->enfant;
    }

    public function setEnfant(?int $enfant): self
    {
        $this->enfant = $enfant;

        return $this;
    }

    public function getCree(): ?\DateTimeInterface
    {
        return $this->cree;
    }

    public function setCree(?\DateTimeInterface $cree): self
    {
        $this->cree = $cree;

        return $this;
    }

    /**
     * @return Collection<int, Contrat>
     */
    public function getContrats(): Collection
    {
        return $this->contrats;
    }

    public function addContrat(Contrat $contrat): self
    {
        if (!$this->contrats->contains($contrat)) {
            $this->contrats[] = $contrat;
            $contrat->setUser($this);
        }

        return $this;
    }

    public function removeContrat(Contrat $contrat): self
    {
        if ($this->contrats->removeElement($contrat)) {
            // set the owning side to null (unless already changed)
            if ($contrat->getUser() === $this) {
                $contrat->setUser(null);
            }
        }

        return $this;
    }




}

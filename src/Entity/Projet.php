<?php

namespace App\Entity;

use App\Repository\ProjetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 * normalizationContext={
 * "groups"={"projets_read"}
 * }),
 * @ORM\Entity(repositoryClass=ProjetRepository::class)
 */
class Projet
{
    /**
     * @ORM\Id
     * @Groups({"users_read","projets_read"})
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"users_read","projets_read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $nom;

    /**
     * @Groups({"users_read","projets_read"})
     * @ORM\Column(type="date", nullable=true)
     */
    private $dateDebut;

    /**
     * @Groups({"users_read","projets_read"})
     * @ORM\Column(type="date", nullable=true)
     */
    private $dateSoumission;

    /**
     * @Groups({"users_read","projets_read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $statut;

    /**
     * @Groups({"users_read","projets_read"})
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="projets")
     */
    private $employe;

    public function __construct()
    {
        $this->employe = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(?string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->dateDebut;
    }

    public function setDateDebut(?\DateTimeInterface $dateDebut): self
    {
        $this->dateDebut = $dateDebut;

        return $this;
    }

    public function getDateSoumission(): ?\DateTimeInterface
    {
        return $this->dateSoumission;
    }

    public function setDateSoumission(?\DateTimeInterface $dateSoumission): self
    {
        $this->dateSoumission = $dateSoumission;

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

    /**
     * @return Collection<int, User>
     */
    public function getEmploye(): Collection
    {
        return $this->employe;
    }

    public function addEmploye(User $employe): self
    {
        if (!$this->employe->contains($employe)) {
            $this->employe[] = $employe;
        }

        return $this;
    }

    public function removeEmploye(User $employe): self
    {
        $this->employe->removeElement($employe);

        return $this;
    }
}

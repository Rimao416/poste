<?php

namespace App\Entity;

use App\Repository\ContratRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ApiResource(
 * normalizationContext={
 * "groups"={"contrat_read"}
 * }
 * )
 * @ORM\Entity(repositoryClass=ContratRepository::class)
 */
class Contrat
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @Groups({"contrat_read","users_read"})
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"contrat_read","users_read","salaire_read"})
     * @ORM\Column(type="date", nullable=true)
     */
    private $DateDebut;

    /**
     * @Groups({"contrat_read","users_read","salaire_read"})
     * @ORM\Column(type="date", nullable=true)
     */
    private $DateFin;

    /**
     * @Groups({"contrat_read","typecontrat_read","users_read"})
     * @ORM\ManyToOne(targetEntity=TypeContrat::class, inversedBy="contrats")
     */
    private $type;

    /**
     * @Groups({"contrat_read","users_read"})
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="contrats")
     */
    private $user;

    /**
     * @Groups({"salaire_read","users_read","contrat_read"})
     * @ORM\OneToMany(targetEntity=Salaire::class, mappedBy="contrat")
     */
    private $salaires;

    /**
     * @Groups({"contrat_read","typecontrat_read","users_read"})
     * @ORM\Column(type="date", nullable=true)
     */
    private $cree;

    public function __construct()
    {
        $this->salaires = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->DateDebut;
    }

    public function setDateDebut(?\DateTimeInterface $DateDebut): self
    {
        $this->DateDebut = $DateDebut;

        return $this;
    }

    public function getDateFin(): ?\DateTimeInterface
    {
        return $this->DateFin;
    }

    public function setDateFin(?\DateTimeInterface $DateFin): self
    {
        $this->DateFin = $DateFin;

        return $this;
    }

    public function getType(): ?TypeContrat
    {
        return $this->type;
    }

    public function setType(?TypeContrat $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Salaire>
     */
    public function getSalaires(): Collection
    {
        return $this->salaires;
    }

    public function addSalaire(Salaire $salaire): self
    {
        if (!$this->salaires->contains($salaire)) {
            $this->salaires[] = $salaire;
            $salaire->setContrat($this);
        }

        return $this;
    }

    public function removeSalaire(Salaire $salaire): self
    {
        if ($this->salaires->removeElement($salaire)) {
            // set the owning side to null (unless already changed)
            if ($salaire->getContrat() === $this) {
                $salaire->setContrat(null);
            }
        }

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
}

<?php

namespace App\Entity;

use App\Repository\SalaireRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 * normalizationContext={
 * "groups"={"salaire_read"}
 * }
 * )
 * @ORM\Entity(repositoryClass=SalaireRepository::class)
 */
class Salaire
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @Groups({"salaire_read","users_read","contrat_read"})
     * @ORM\Column(type="integer")
     * 
     */
    private $id;

    /**
     * @Groups({"salaire_read","users_read","contrat_read"})
     * @ORM\Column(type="float", nullable=true)
     */
    private $montant;

    /**
     * @Groups({"salaire_read","users_read"})
     * @ORM\ManyToOne(targetEntity=Contrat::class, inversedBy="salaires")
     */
    private $contrat;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMontant(): ?float
    {
        return $this->montant;
    }

    public function setMontant(?float $montant): self
    {
        $this->montant = $montant;

        return $this;
    }

    public function getContrat(): ?Contrat
    {
        return $this->contrat;
    }

    public function setContrat(?Contrat $contrat): self
    {
        $this->contrat = $contrat;

        return $this;
    }
}

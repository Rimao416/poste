<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CongeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 * normalizationContext={
 * "groups"={"conges_read"}
 * },
 * collectionOperations={"POST","GET","single"={
 * "method"="get",
 * "path"="/conges/single",
 * "controller"="App\Controller\SingleCongeController"
 * }}
 * )
 * @ORM\Entity(repositoryClass=CongeRepository::class)
 */
class Conge
{
    /**
     * @ORM\Id
     * @Groups({"conges_read","users_read"})
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"conges_read","users_read"})
     * @ORM\Column(type="date", nullable=true)
     */
    private $debutConge;

    /**
     * @Groups({"conges_read","users_read"})
     * @ORM\Column(type="date", nullable=true)
     */
    private $finConge;

    /**
     * @Groups({"conges_read","users_read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $raison;

    /**
     * @Groups({"conges_read","users_read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $statut;

    /**
     * @Groups({"conges_read","users_read"})    
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="conges")
     */
    private $user;

    /**
     * @Groups({"conges_read","users_read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $explication;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDebutConge(): ?\DateTimeInterface
    {
        return $this->debutConge;
    }

    public function setDebutConge(?\DateTimeInterface $debutConge): self
    {
        $this->debutConge = $debutConge;

        return $this;
    }

    public function getFinConge(): ?\DateTimeInterface
    {
        return $this->finConge;
    }

    public function setFinConge(?\DateTimeInterface $finConge): self
    {
        $this->finConge = $finConge;

        return $this;
    }

    public function getRaison(): ?string
    {
        return $this->raison;
    }

    public function setRaison(?string $raison): self
    {
        $this->raison = $raison;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getExplication(): ?string
    {
        return $this->explication;
    }

    public function setExplication(?string $explication): self
    {
        $this->explication = $explication;

        return $this;
    }
}

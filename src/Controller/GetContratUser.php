<?php 
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;

class GetContratUser{
    public function __invoke(EntityManagerInterface $manager, int $userid)
    {
        // $data=$contrat->findByUser($userid);
        $data=$manager->createQuery('SELECT c FROM App\Entity\Contrat c WHERE c.user = :val')
        ->setParameter('val',$userid)
        ->getResult();

     return $data;
    }
}
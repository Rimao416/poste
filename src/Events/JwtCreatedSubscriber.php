<?php 

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber{
    public function updateJwtData(JWTCreatedEvent $event){
        $user=$event->getUser();
        $data=$event->getData();
        $data['id']=$user->getId();
        $data['firstName']=$user->getFirstName();
        $event->setData($data);
    }
}
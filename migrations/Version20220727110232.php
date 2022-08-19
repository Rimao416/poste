<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220727110232 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE salaire ADD contrat_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE salaire ADD CONSTRAINT FK_3BCBBD111823061F FOREIGN KEY (contrat_id) REFERENCES contrat (id)');
        $this->addSql('CREATE INDEX IDX_3BCBBD111823061F ON salaire (contrat_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE salaire DROP FOREIGN KEY FK_3BCBBD111823061F');
        $this->addSql('DROP INDEX IDX_3BCBBD111823061F ON salaire');
        $this->addSql('ALTER TABLE salaire DROP contrat_id');
    }
}

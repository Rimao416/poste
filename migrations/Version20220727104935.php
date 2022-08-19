<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220727104935 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contrat ADD type_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE contrat ADD CONSTRAINT FK_60349993C54C8C93 FOREIGN KEY (type_id) REFERENCES type_contrat (id)');
        $this->addSql('CREATE INDEX IDX_60349993C54C8C93 ON contrat (type_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contrat DROP FOREIGN KEY FK_60349993C54C8C93');
        $this->addSql('DROP INDEX IDX_60349993C54C8C93 ON contrat');
        $this->addSql('ALTER TABLE contrat DROP type_id');
    }
}

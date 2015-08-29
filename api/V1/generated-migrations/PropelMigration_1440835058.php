<?php

/**
 * Data object containing the SQL and PHP code to migrate the database
 * up to version 1440835058.
 * Generated on 2015-08-29 03:57:38 by root
 */
class PropelMigration_1440835058
{
    public $comment = '';

    public function preUp($manager)
    {
        // add the pre-migration code here
    }

    public function postUp($manager)
    {
        // add the post-migration code here
    }

    public function preDown($manager)
    {
        // add the pre-migration code here
    }

    public function postDown($manager)
    {
        // add the post-migration code here
    }

    /**
     * Get the SQL statements for the Up migration
     *
     * @return array list of the SQL strings to execute for the Up migration
     *               the keys being the datasources
     */
    public function getUpSQL()
    {
        return array (
  'truckyeah' => '
ALTER TABLE "orders"

  ALTER COLUMN "open" SET DEFAULT \'t\'::boolean,

  ADD "charge_id" VARCHAR(255) NOT NULL,

  ADD "customer_id" VARCHAR(255) NOT NULL;
',
);
    }

    /**
     * Get the SQL statements for the Down migration
     *
     * @return array list of the SQL strings to execute for the Down migration
     *               the keys being the datasources
     */
    public function getDownSQL()
    {
        return array (
  'truckyeah' => '
ALTER TABLE "orders"

  ALTER COLUMN "open" SET DEFAULT \'t\',

  DROP COLUMN "charge_id",

  DROP COLUMN "customer_id";
',
);
    }

}
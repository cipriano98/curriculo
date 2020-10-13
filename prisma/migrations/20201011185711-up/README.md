# Migration `20201011185711-up`

This migration has been generated by Cipriano at 10/11/2020, 3:57:12 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "secret" text   ,
ALTER COLUMN "role" SET DEFAULT E'CANDIDATE'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200926141928-updates..20201011185711-up
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -22,12 +22,14 @@
 model User {
   id               Int      @default(autoincrement()) @id
   key              String   @default(uuid())
+  
+  secret           String?
   fullname         String
   email            String   @unique
   cpf              String   @unique
-  role             Role     @default(USER)
+  role             Role     @default(CANDIDATE)
   datebirth        String?
   nickname         String?  @unique
   preferencialname String?
   Profile          Profile?
```


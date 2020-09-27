# Migration `20200923131238-updates`

This migration has been generated by cipriano98 at 9/23/2020, 10:12:38 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TYPE "Role" ADD VALUE 'CANDIDATE';
ALTER TYPE "Role" ADD VALUE 'EMPLOYER'

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT E'CANDIDATE'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200923011632-updates..20200923131238-updates
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
@@ -12,9 +12,9 @@
 // * models
 model Profile {
   id        Int      @default(autoincrement()) @id
-  key        String   @default(uuid())
+  key       String   @default(uuid())
   bio       String?
   pseudonym String?
   User      User     @relation(fields: [userId], references: [id])
   userId    Int      @unique
@@ -31,15 +31,16 @@
   firstname  String
   middlename String?
   lastname   String
   nickname   String?
-  role       Role     @default(USER)
+  role       Role     @default(CANDIDATE)
   Profile    Profile?
   createdat  DateTime @default(now())
   updatedat  DateTime @updatedAt
 }
 enum Role {
   USER
+  CANDIDATE
+  EMPLOYER
   ADMIN
-
 }
```


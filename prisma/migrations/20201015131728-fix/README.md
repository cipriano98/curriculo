# Migration `20201015131728-fix`

This migration has been generated by cipriano98 at 10/15/2020, 10:17:29 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ALTER COLUMN "gender" DROP DEFAULT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201015131552-fix..20201015131728-fix
--- datamodel.dml
+++ datamodel.dml
@@ -1,9 +1,9 @@
 // https://www.meucurriculoperfeito.com.br/criar-curriculo/section/cntc
 // & https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/relations
 datasource db {
     provider = "postgresql"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
@@ -33,9 +33,9 @@
     role             Role    @default(CANDIDATE)
     datebirth        String?
     nickname         String? @unique
     preferencialname String?
-    gender           Gender  @default(OUTRO)
+    gender           Gender
     Profile    Profile?
     Address    Address[]
     Contact    Contact[]
```


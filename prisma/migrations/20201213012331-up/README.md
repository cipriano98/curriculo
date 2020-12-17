# Migration `20201213012331-up`

This migration has been generated by cipriano98 at 12/12/2020, 10:23:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Vacancy" ADD COLUMN     "avatar" TEXT,
ALTER COLUMN "office" DROP NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201213011645-up..20201213012331-up
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
     provider = "postgresql"
-    url = "***"
+    url = "***"
 }
 model Profile {
     id String @id @default(uuid())
@@ -148,13 +148,15 @@
     updatedat DateTime @updatedAt
 }
 model Vacancy {
-    codeVacancy Int    @id @default(autoincrement())
-    userid      Int
-    Interested  User[]
+    codeVacancy Int @id @default(autoincrement())
-    office      String
+    userid     Int
+    Interested User[]
+
+    avatar      String?
+    office      String?
     logo        String?
     description String?
 }
```


# Migration `20201214174226-up`

This migration has been generated by cipriano98 at 12/14/2020, 2:42:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Contact" ADD COLUMN     "talktotwo" TEXT DEFAULT E'me',
ADD COLUMN     "phonetwo" TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201214161750-up..20201214174226-up
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
@@ -68,8 +68,10 @@
     userid Int
     talkto String? @default("me")
     phone  String?
+    talktotwo String? @default("me")
+    phonetwo  String?
     User User @relation(fields: [userid], references: [id])
     createdat DateTime @default(now())
```



# Migration `20201211205200-up`

This migration has been generated by cipriano98 at 12/11/2020, 5:52:00 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."Gender" AS ENUM ('FEMININO', 'MASCULINO', 'OUTRO')

CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'CANDIDATE', 'EMPLOYER', 'VACANCYDISTRIBUTOR')

CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "bio" TEXT,
    "pseudonym" TEXT,
    "userid" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "User" (
"id" SERIAL,
    "authenticationkey" TEXT NOT NULL,
    "securitykey" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "avatar" TEXT DEFAULT E'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png',
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "datebirth" TEXT,
    "nickname" TEXT,
    "preferencialname" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "role" "Role" NOT NULL DEFAULT E'CANDIDATE',
    "gender" "Gender" NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "logradouro" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "cep" TEXT,
    "state" TEXT DEFAULT E'RS',
    "userid" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "userid" INTEGER NOT NULL,
    "talkto" TEXT DEFAULT E'me',
    "phone" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "AcademicData" (
    "id" TEXT NOT NULL,
    "curriculumId" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Experiences" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "curriculumId" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Curriculum" (
    "id" TEXT NOT NULL,
    "professionalprofile" TEXT,
    "intendedsalary" DECIMAL(65,30),
    "userid" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registrofederal" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'EMPLOYER',
    "site" TEXT,
    "links" TEXT[],
    "labellinks" TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Agency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registrofederal" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'VACANCYDISTRIBUTOR',
    "site" TEXT NOT NULL,
    "links" TEXT[],
    "labellinks" TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Vacancy" (
"codeVacancy" SERIAL,
    "userid" INTEGER NOT NULL,
    "office" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,

    PRIMARY KEY ("codeVacancy")
)

CREATE UNIQUE INDEX "Profile.userid_unique" ON "Profile"("userid")

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

CREATE UNIQUE INDEX "User.cpf_unique" ON "User"("cpf")

CREATE UNIQUE INDEX "User.nickname_unique" ON "User"("nickname")

CREATE UNIQUE INDEX "Curriculum.userid_unique" ON "Curriculum"("userid")

CREATE UNIQUE INDEX "Company.registrofederal_unique" ON "Company"("registrofederal")

CREATE UNIQUE INDEX "Company.site_unique" ON "Company"("site")

CREATE UNIQUE INDEX "Agency.registrofederal_unique" ON "Agency"("registrofederal")

CREATE UNIQUE INDEX "Agency.site_unique" ON "Agency"("site")

ALTER TABLE "Profile" ADD FOREIGN KEY("userid")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Address" ADD FOREIGN KEY("userid")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Contact" ADD FOREIGN KEY("userid")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "AcademicData" ADD FOREIGN KEY("curriculumId")REFERENCES "Curriculum"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "Experiences" ADD FOREIGN KEY("curriculumId")REFERENCES "Curriculum"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "Curriculum" ADD FOREIGN KEY("userid")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Vacancy" ADD FOREIGN KEY("userid")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201211150114-up..20201211205200-up
--- datamodel.dml
+++ datamodel.dml
@@ -3,18 +3,18 @@
 }
 datasource db {
     provider = "postgresql"
-    url = "***"
+    url = "***"
 }
 model Profile {
     id String @id @default(uuid())
     bio       String?
     pseudonym String?
-    userId    Int     @unique
-    User      User    @relation(fields: [userId], references: [id])
+    userid    Int     @unique
+    User      User    @relation(fields: [userid], references: [id])
     createdat DateTime @default(now())
     updatedat DateTime @updatedAt
 }
@@ -149,14 +149,15 @@
 model Vacancy {
     codeVacancy Int @id @default(autoincrement())
-    user User @relation(fields: [userId], references: [id])
+    userid      Int
+    user        User    @relation(fields: [userid], references: [id])
+    // interested  User[]
     office      String
     logo        String?
     description String?
-    userId      Int
 }
 enum Gender {
     FEMININO
```



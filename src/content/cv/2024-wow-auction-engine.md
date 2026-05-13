---
{
  "slug": "2024-wow-auction-engine",
  "employer": "Personal Project",
  "capacity": "hobby",
  "sourceLink": "https://github.com/ukon1990/wow-auction-engine",
  "startDate": "2024-01-01",
  "draft": false,
  "tech": ["kotlin", "spring-boot", "mariadb", "flyway", "aws", "s3", "aws-cognito", "dynamodb", "aws-ecr", "openapi", "angular", "angular-ssr", "typescript", "storybook", "bun", "docker", "github-actions", "testcontainers", "git"],
  "translations": {
    "no": {
      "title": "The Ethereal Exchange",
      "role": "Fullstackutvikler",
      "summary": "Arvtageren til WoW Auction Helper for innhenting, analyse og presentasjon av World of Warcraft-auksjonsdata, med regional utrulling og crafting-analyse."
    },
    "en": {
      "title": "The Ethereal Exchange",
      "role": "Fullstack Developer",
      "summary": "The successor to WoW Auction Helper for ingesting, analyzing and presenting World of Warcraft auction data, with regional deployment and crafting analytics."
    }
  }
}
---

:::no
## Prosjekt

The Ethereal Exchange er arvtageren til WoW Auction Helper.
Prosjektet henter og bearbeider auksjons-, `realm`-, `item`-, media-, profesjons- og oppskriftsdata fra Blizzard API-et, og gjør dataene tilgjengelige gjennom markeds- og crafting-visninger.

Motivasjonen for å migrere fra Serverless til Kotlin med Spring boot backend var todelt.
- Kostnadene ved Serverless var for uforutsigbare. Og i perioder hvor Blizzard hadde problemer med API-et, kunne det føre til store regninger, blant annet på grunn av lambda funksjoner som kjørte over lengre tid.
- Jeg ønsket å ha ett kotlin/spring boot prosjekt jeg kunne jobbe med på fritiden, når det ikke er for hektisk på jobb.

## Rolle og bidrag

- Kotlin og Spring Boot for backend med planlagte synkroniseringsjobber, REST-endepunkter, ressursserver-autentisering og integrasjoner mot Blizzard API-et.
- MariaDB og Flyway for skjemastyring, aktive auksjonssnapshots, time- og dagsstatistikk, varevarianter og query-optimaliserte markedsvisninger.
- AWS-basert lagring og utrulling med S3, DynamoDB, Cognito, EC2, Docker, CloudFormation, SSM, ECR og GitHub Actions.
- Angular SSR-frontend, med `realm`-valg, auksjonssøk, `crafting`søk, `item` detaljer, lokalisering og genererte OpenAPI-klienter.
- Testcontainers, integrasjonstester, OpenAPI-generering, Storybook/designsystem-komponenter og CI-jobber med endringsklassifisering.
:::

:::en
## Project

The Ethereal Exchange is the successor to WoW Auction Helper.
The project fetches and processes auction, `realm`, `item`, media, profession and recipe data from the Blizzard API, and makes the data available through market and crafting views.

The motivation for migrating from Serverless to a Kotlin backend with Spring Boot was twofold.
- Serverless costs were too unpredictable. During periods where Blizzard had issues with the API, this could lead to large bills, partly because Lambda functions kept running for longer periods of time.
- I wanted to have a Kotlin/Spring Boot project I could work on in my spare time when work is not too hectic.

## Role and contribution

- Kotlin and Spring Boot for the backend with scheduled sync jobs, REST endpoints, resource-server authentication and Blizzard API integrations.
- MariaDB and Flyway for schema management, active auction snapshots, hourly and daily statistics, item variants and query-optimized market views.
- AWS-based storage and deployment with S3, DynamoDB, Cognito, EC2, Docker, CloudFormation, SSM, ECR and GitHub Actions.
- Angular SSR frontend with `realm` selection, auction search, crafting search, `item` details, localization and generated OpenAPI clients.
- Testcontainers, integration tests, OpenAPI generation, Storybook/design-system components and CI jobs with change classification.
:::

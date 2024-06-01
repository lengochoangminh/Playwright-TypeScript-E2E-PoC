# Playwright POC - E2E test with IoT Dashboard

## Setup

- Clone the repo & Install Playwright + dependencies needed: `npm install --force`
- Run the front-end web "IoT Dashboard": `npm start `
- Open the site at http://localhost:4200/
  <img width="800" alt="Screenshot 2024-06-01 at 09 29 15" src="https://github.com/lengochoangminh/Playwright-TypeScript-E2E-PoC/assets/29770042/17230070-f498-4dd3-9e87-a197ead769ce">

## Execute Tests

- Run all tests under e2e folder: `env=dev npx playwright test`
- Run the tests by the specified tags: `npx playwright test --grep @High`
- Run the tests with Trace Viewer: `npx playwright test --trace on`
- Generate the HTML report: `npx playwright show-report`
- Generate the Allure Report: `npx allure serve allure-results`

## Feature Keywords

- Implemented the tests in the Page Object Model design pattern
  
- Run tests with Tags support like @High, @Medium or @Low

- Data management. Save the configurations, and secret token in .env files

- Added Annotations to elaborate on the test issues found. Simulated one test failed & added annotation to elaborate on the defect found
<img width="800" alt="Screenshot 2024-06-01 at 09 46 18" src="https://github.com/lengochoangminh/Playwright-TypeScript-E2E-PoC/assets/29770042/e3b7904c-f4ab-4ecf-9d55-aa45293621bd">

- Installed the Allure Report
<img width="900" alt="Screenshot 2024-06-01 at 09 35 01" src="https://github.com/lengochoangminh/Playwright-TypeScript-E2E-PoC/assets/29770042/4b332b81-b734-44ed-8572-cd1863b7cabc">

- Visual Comparison Testing.
  - Capture the snapshot called the base image. The subsequent run compares the base image if there is no difference test is passed, and if there is a difference, the test is considered as failed.
  - Notice that the 1st run will fail when there is no base image created.
  <img width="700" alt="Screenshot 2024-06-01 at 09 50 20" src="https://github.com/lengochoangminh/Playwright-TypeScript-E2E-PoC/assets/29770042/0266a6c4-7c72-44c6-aca8-02d399949fdf">

- GitHub Actions. Run the tests automatically when opening a new pull request to the main branch.

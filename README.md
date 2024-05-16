# Playwright POC - E2E test with IoT Dashboard

## Setup

- Clone the repo & Install Playwright + dependencies needed: `npm install --force`
- Launch IoT Dashboard runs locally: `npm start `
- Access the site at http://localhost:4200/

## Execute Tests

- Run all tests under e2e folder: `env=dev npx playwright test`
- Run the tests by the specified tags: `npx playwright test --grep @High`
- Run the tests with Trace Viewer: `npx playwright test --trace on`
- Generate the HTML report: `npx playwright show-report`
- Generate the Allure Report: `npx allure serve allure-results`

## Feature Keywords

- Implemented the tests in the Page Object Model design pattern
- Run tests with Tags support like @High, @Medium or @Low
- Data management. Save the configurations, secrect token in .env files
- Added Annotations to elaborate on the test issues found. Simulated one test failed & add annotation to elaborate on the defect found
- Installed the Allure Report
- Visual Comparison Testing.
  - Capture the snapshot called the base image. The subsequent run compares the base image if there is no difference test is passed, and if there is a difference, the test is considered as failed.
  - Notice that the 1st run will be failed when there is no base image created.
- GitHub Actions. Run the tests automatically when opening a new pull request to the main branch.

# cloudapp-challenge 
Add some code that tests the happy path and outside of the happy path.  
And does the following steps:
- Navigate to https://getcloudapp.com/
- Sign up
- Log out
- Log in
- Go to settings -> profile and update the avatar

# Setup Requirements
Install node from https://nodejs.org/en/download/
- v16.15.1 as of 07/2022

Manually installed Playwright as mentioned in the docs https://playwright.dev/docs/intro#manually
```
npm i -D @playwright/test
# install supported browsers
npx playwright install
```

# Running the tests

Please refer to playwright docs https://playwright.dev/docs/intro#command-line

Examples:

#### To run all tests in headed mode
`npx playwright test --headed`

#### To run all tests in headless mode
`npx playwright test`

#### To run a specific spec file (e.g. `avatar.spec.ts`) in headed mode
`npx playwright test tests/avatar.spec.ts --headed`

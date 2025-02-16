# E2E Dashboard

A frontend for a dashboard. Customers can monitor their software and view their test results on the dashboard. There are various charts that summarize the results. They can also view details such as screenshots or videos. Its worth mentioning, that this is just the frontend which displays mock data. One would ideally use this in the following way:
Automate E2E-tests of a software. Setup a server/pipeline etc which executes the tests frequently e.g. every 10 minutes. The test results are directly sent to a database which in turn has to be connected to the dashboard frontend. The dashboard would then display the results.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Demo

To see a demo of this, you can login with (Mail: demo@mail.de; PW: JZecn@ug$K) on a [deployed version](https://e2e-dashboard.netlify.app/) with some mock data.

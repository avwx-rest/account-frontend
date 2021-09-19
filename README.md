# account-frontend
AVWX account portal frontend

Replacement for existing [landing page](https://avwx.rest) when logged out and [account management site](https://account.avwx.rest) when logged in.

## Requirements

Integrates with the [account API](https://github.com/avwx-rest/account-backend) - [documentation](https://avwx-account-dev.azurewebsites.net/docs)

Website Features:
- Website/service landing page
- User registration
- Password reset
- Login and auth via JWT
- Update account profile information
- Portal and email notification view and preferences
- Change pricing plan and add-ons
- Add, view, update, and remove API tokens
- View API usage graphs
- Stripe Checkout integration

Must include documentation for self-maintenance.

## Desired

- Built with Vue.js but React or Angular would suffice
- A CSS framework using or similar to Bootstrap
- Integrate existing brand logos and color theme

It shouldn't be a copy of the existing landing page or account portal. These were my best attempts with no frontend design skills.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

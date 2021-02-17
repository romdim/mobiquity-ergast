# MobiquityErgast

This project's purpose was to create a SPA that presents a list with all the F1 World Champions starting from 2005 until 2015.
Navigation was required to check the winners of every race of a selected year. The row that contains the world champion of the year was to be highlighted.
The [Ergast API](https://ergast.com/mrd/) was used for this reason.

Various desicions were taken in terms of UI and UX. I tried to keep things simple by using a well-established design, Material.
Beyond the obvious I wanted to be coherent with the [Angular Styleguide](https://angular.io/guide/styleguide), create a Dockerfile for convenience, make the website a PWA
and let it cache responses.

As no certain kind of visitors were defined for this test, I assumed that the site would target people
that know eveything around F1 and want to learn even more, that's why it was essential to me to show
the most of the info I could get by the Ergast service. This is why I went with accordion and not grid
or cards, in order to show the most in a non-intrusive way. Also, photos of the drivers were
considered but was declined as it would make the site static, while it should get the data
dynamically. Cover photo was declined as well even though unsplash provides some very good, because
it would push all the data below the fold.
Google Maps was added as it shows the visitor the exact location of the race visualised.
Responsive layout was a must for all devices.

Angular was chosen as I've already worked with it, love Typescript and also wanted to test v6. I know version 6 may not be the most
stable one as it is less than a month old, but it was just fine for a simple app.

The website can be seen at https://romdim.nl/mobiquity-ergast. Github is kind enough to let projects host their services by using the gh-branch.

The first steps for scaffolding were:

```bash
npm i -g npm
npm i -g @angular/cli
ng new mobiquity-ergast --style=scss
ng g m app-routing --flat --module=app
ng g m shared
ng g s shared/ergast
ng g c champions
ng g c winners
```

npm and angular cli version is 6.0.1.
Sass was chosen for its reusability. (Haven't tried css variables yet)
--flat puts the file in src/app instead of its own folder.
--module=app tells the cli to register it in the imports array of the AppModule.

I then created 4 models: Champion, Constructor, Driver and Winner.
Basic test classes for them and a mock service.
Added API url and Google Maps key to environments. (it is restricted to be used only by this site)
Then I went on to install more dependencies.

```bash
npm install --save @angular/material @angular/cdk
npm install --save flag-icon-css
npm install --save i18n-iso-countries
npm install @agm/core rxjs-compat@6 --save
```

Finally, the page scores excellent in metrics: [GTMetrix](https://gtmetrix.com/reports/romdim.github.io/DYATSW4Y) 96% overall, with 2.3s Fully Loaded Time.

## Docker

You can use Docker so as not to install anything else than that.
After installing Docker you can run:

```bash
docker build . -t me
docker run -p 80:80 me
```

These commands build the project intended for production server and serve it for you.
So you can just go over to [localhost](http://localhost).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Contribution

The project is open for pull requests!

## Special thanks

Many thanks go to:

- [Angular](https://angular.io/) (and [styleguide](https://angular.io/guide/styleguide))
- [Angular Material](https://material.angular.io/)
- [Angular Google Maps](https://angular-maps.com/)
- [flag-icon-css](http://flag-icon-css.lip.is/)
- [i18n-iso-countries](https://github.com/michaelwittig/node-i18n-iso-countries)
- [Flaticon](https://www.flaticon.com/) for having free icons

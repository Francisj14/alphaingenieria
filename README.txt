Packages Requiered
npm i ng-gallery @angular/cdk
npm i hammerjs
npm bootstrap --save
npm jquery --save
npm popper.js --save

into > src/polyfills.ts
import 'hammerjs';


Build
Deployment


ng build --configuration production --aot
firebase deploy
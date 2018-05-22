---
path: "/blog/architecture-in-angular-projects"
date: "2018-05-21"
title: "Architecture in Angular projects"
tags: ["Angular", "Architecture"]
category: "Angular"
categoryColor: '#F3C610'
excerpt: "Since the advent of the modern web, performance has been a key consideration when designing a website or a web app. When a website requires no server interaction whatsoever, what is hosted on the web is served to a user as is, this is referred to as a static site."
coverImage: '/images/fpxoowbr6ls-matthew-henry.jpg'
sourceUrl: 'https://medium.com/@cyrilletuzi/architecture-in-angular-projects-242606567e40'
type: 'Post'
---

Architecture in Angular projects
================================

One year ago, I published [**Understanding Angular modules (NgModule)**](https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407) . This post was focused on a technical point: scope, to know when to import a NgModule. You should [read it first](https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407), but it didn’t explain how to organize your own modules.

Recently, I was challenged about **architecture in Angular projects**. Until now, I was mostly following what is suggested in Angular doc. But against big projects, several flaws appeared and something was wrong.

So I dove into [Angular documentation](https://angular.io/guide/ngmodules): there are now 12 long pages to explain how NgModules work, including a FAQ. But after reading all this stuff, I was more confused than before. Basic questions like “where is the good place to provide a service?” don’t have a clear answer, there are even sometimes contradictory suggestions.

So I took some time to rethink the whole thing and implement a decent **architecture for Angular apps**, with these goals in mind:

*   **consistency**: simplicity (for small apps) _and_ scalability (for big apps),
*   **reusability** in different projects,
*   **optimization** (consistent with or without lazy-loading),
*   **testability**.

[A French version of this post is available here.](https://formationjavascript.com/architecturer-un-projet-angular/)

### Angular modules

#### What is a NgModule?

The purpose of a NgModule is just to **group components and/or services which belongs together**. Nothing more or less.

So you can compare that to a Java package or a PHP / C# namespace.

The only question is: **how do you choose to group things together?**

#### Types of Angular modules

There are **3 main types of NgModules** you can do:

*   modules of **pages,**
*   modules of **global services,**
*   modules of **reusable components**.

You’ll at least do modules of pages (otherwise your app is just empty). The 2 other types of modules are optionals, but they will come soon if you want to reuse and optimize your code.

### Modules of pages

Modules of pages are **modules with routing**. They are here to separate and **organize the different areas of your application**. They are **loaded only once**, either in the AppModule or via [lazy-loading](https://angular.io/guide/router#milestone-6-asynchronous-routing).

For example, you could have an AccountModule for the register, login and logout pages; then a HeroesModule for the heroes list and hero details pages; and so on.

These modules contain 3 things:

*   **/shared**: services and interfaces,
*   **/pages**: routed components,
*   **/components**: pure presentation components.

#### Shared services for pages

To display a page, you need data first. Here come services.

		`@Injectable({ providedIn: 'root' })
			export class SomeService {
			constructor(protected http: HttpClient) {}
			getData() {
			return this.http.get<SomeData>('/path/to/api');
			}
			}`


Soon, several pages will need the same service. Thus the **shared** directory.

But **be sure your services for pages are specific to the module**, because if you opt for [lazy-loading](https://angular.io/guide/router#milestone-6-asynchronous-routing), they will just be available in this particular module (which is good), and not elsewhere in app.

Let’s take back the AccountModule as an example. The account service should just manage communication with the API (which says “yes” or “no” based on user credentials). The user connection status should not be stored here, because it may be not available elsewhere in the app. It will be managed by a module of global services (see below).

#### Pages: routed components

A page component just injects the service, and uses it to get the data.

You could display the data directly in the component template but you should _not_: **data should be transferred to another component** via an attribute.

		``@Component({
			template: `<app-presentation *ngIf="data" [data]="data"></app-presentation>`
			})
			export class PageComponent {
			data: SomeData;
			constructor(protected someService: SomeService) {}
			ngOnInit() {
			this.someService.getData().subscribe((data) => {
			this.data = data;
			});
			}
			}``


Each page component is associated to a **route**.

#### Presentation components

A presentation component just **retrieves the transferred data** with the [Input decorator](https://angular.io/guide/component-interaction#pass-data-from-parent-to-child-with-input-binding), and displays it in the template.

		``@Component({
			selector: 'app-presentation',
			template: `<h1>{{data.title}}</h1>`
			})
			export class PresentationComponent {
			@Input() data: SomeData;
			}``


#### Is this MVx?

On a theoretical level, no. But if you come from the back-end world and it helps you on a practical level, you can compare to it:

*   services would be the Models,
*   presentation components would be the Views,
*   pages components would be the Controllers / Presenters / ViewModels (pick the one you’re used to).

Even it’s not exactly the same concept, the goal is the same : **separation of concerns**. And why is this important?

*   **reusability**: presentation components can be reused in different pages,
*   **optimizability**: change detection of presentation components can be [optimized](https://angular.io/api/core/ChangeDetectionStrategy),
*   **testability**: unit tests are possible on presentation components (just forget tests if you didn’t separate concerns, it will just be a terrible mess).

#### Summary

Example of a module of pages:

		`@NgModule({
			imports: [CommonModule, MatCardModule, PagesRoutingModule],
			declarations: [PageComponent, PresentationComponent]
			})
			export class PagesModule {}`


### Modules of global services

Modules of global services are **modules with services you need through the whole app**. [As services have generally a global scope](https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407), these modules are **loaded only once** in the AppModule, and then services are accessible everywhere (including in lazy-loaded modules).

You certainly use at least one : the [HttpClient](https://angular.io/guide/http) module. And you’ll soon need your own. A very common case is an AuthModule to store the user connection status (as this data is needed everywhere in the app) and save the token.

Note: **since Angular 6, you don’t need a module anymore for services**, as they are auto-providing themselves. But it doesn’t change the architecture described here.

#### Reusability

Modules of global services are **reusable** through different projects if you take care to have no specific dependency in them (no UI or app specific code), and if you **separate each features in different modules** (do _not_ put every service in just one big global module).

As such a module will be used from outside, you should do an **entry point**, where you export the NgModule, the services and maybe interfaces and injection tokens.

		`export { SomeService } from './some.service';
			export { SomeModule } from './some.module';`


#### Should I do a CoreModule?

_Not necessary_. The documentation suggests to do a CoreModule for global services. You can surely group them in a /core/ _directory_, but as mentioned above, be sure to first **separate each feature**. You should _not_ put all your global services in just one CoreModule, otherwise you won’t be able to reuse just one feature in another project.

#### Summary

Example of a module of global services:

		`@NgModule({
			providers: [SomeService]
			})
			export class SomeModule {}`


Again, the module is not necessary since Angular 6.

### Modules of reusable components

Modules of reusable components are **modules of UI components you would like to reuse** in different projects. [As components have a local scope](https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407), these modules are imported **in each pages modules** where you need them.

You certainly use one, like [Material](https://material.angular.io/), [NgBootstrap](https://ng-bootstrap.github.io/) or [PrimeNg](https://www.primefaces.org/primeng/). You can do yours too.

#### How to get the data?

**UI components are pure presentation components**. So they work exactly the same as in modules of pages (see above): data should come from the [Input decorator](https://angular.io/guide/component-interaction#pass-data-from-parent-to-child-with-input-binding) (and sometimes from <ng-content> in advanced cases).

		`@Component({
			selector: 'ui-carousel'
			})
			export class CarouselComponent {
			@Input() delay = 5000;
			}`


You should _not_ rely on a service, because services are often specific to a particular app. Why? At least because of the API URL. Providing the data will be the role of pages component. The UI component just retrieves data passed by someone else.

#### Public and private components

[As components are in local scope](https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407), **do not forget to export them** in the NgModule. You just need to export _public_ ones, internal sub components can stay private.

#### Directives and pipes

An UI module can also be about directives or pipes. Same as components: they need to be exported if they are public.

#### Private services

Services inside UI modules can be relevant for data manipulation if they contain nothing specific. But then, be sure to **provide them in the component**, so they have a local/private scope, and certainly _not_ in the NgModule.

		`@Component({
			selector: 'some-ui',
			providers: [LocalService]
			})
			export class SomeUiComponent {}`


#### Public services

But what if your UI module also needs to provide public services, in relation to the component? It should be avoided as much as possible, but it is relevant in some cases.

You will then provide the public services in the NgModule. But as the module will be loaded several times because of the components scope, it will cause a problem for the services.

You then need **an extra code for each public service to prevent them to be loaded several times**. It would be too long to explain it here, but it’s a best practice (done in Material for example). Just replace SomeService by the name of your class:

		`export function SOME_SERVICE_FACTORY(parentService: SomeService) {
			return parentService || new SomeService();
			}
			@NgModule({
			providers: [{
			provide: SomeService,
			deps: [[new Optional(), new SkipSelf(), SomeService]],
			useFactory: SOME_SERVICE_FACTORY
			}]
			})
			export class UiModule {}`


#### Reusability

Modules of UI components are reusable through different projects. As it will be used from outside, you should do an **entry point**, where you export the NgModule, the public/exported components (and maybe directives, pipes, _public_ services, interfaces and injection tokens).

		`export { SomeUiComponent }  from './some-ui/some-ui.component';
			export { UiModule } from './ui.module';`


#### Should I do a SharedModule?

_No_. The documentation suggests to do a SharedModule, to factorize all modules of components inside one module. But I’ll go against the documentation on this one.

Problem is: each module in which you import the SharedModule becomes specific to your app and then will _not_ be reusable in another project.

It’s normal to have to import dependencies each time you need them. And with current tools like auto-imports in [VS Code](https://code.visualstudio.com/), it‘s not a burden anymore.

But you can surely group your modules of components inside a /ui/ _directory_ (don’t call it /shared/, it will be confusing with services which are shared also).

#### Summary

Example of a module of reusable UI components:

		`@NgModule({
			imports: [CommonModule],
			declarations: [PublicComponent, PrivateComponent],
			exports: [PublicComponent]
			})
			export class UiModule {}`


### Conclusion

If you follow those steps:

*   you’ll have a **consistent architecture**: in small or big apps, with or without lazy-loading,
*   your modules of global services and your modules of reusable components are **ready to be** [**packaged as libraries**](https://medium.com/@cyrilletuzi/how-to-build-and-publish-an-angular-module-7ad19c0b4464) , reusable in other projects,
*   you’ll be able to do **unit tests without crying**.

Here is an example of a real world architecture:

    `app/
        |- app.module.ts
        |- app-routing.module.ts
        |- core/
        |- auth/
            |- auth.module.ts (optional since Angular 6)
            |- auth.service.ts
            |- index.ts
        |- othermoduleofglobalservice/
        |- ui/
        |- carousel/
            |- carousel.module.ts
            |- index.ts
            |- carousel/
                |- carousel.component.ts
                |- carousel.component.css
            |- othermoduleofreusablecomponents/
        |- heroes/
        |- heroes.module.ts
        |- heroes-routing.module.ts
        |- shared/
            |- heroes.service.ts
            |- hero.ts
        |- pages/
            |- heroes/
                |- heroes.component.ts
                |- heroes.component.css
            |- hero/
                |- hero.component.ts
                |- hero.component.css
        |- components/
            |- heroes-list/
                |- heroes-list.component.ts
                |- heroes-list.component.css
            |- hero-details/
                |- hero-details.component.ts
                |- hero-details.component.css
        |- othermoduleofpages/"`

'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">IT documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-754bfdf0c6f5ec615b9d26a4d4ca064f"' : 'data-target="#xs-components-links-module-AppModule-754bfdf0c6f5ec615b9d26a4d4ca064f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-754bfdf0c6f5ec615b9d26a4d4ca064f"' :
                                            'id="xs-components-links-module-AppModule-754bfdf0c6f5ec615b9d26a4d4ca064f"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-754bfdf0c6f5ec615b9d26a4d4ca064f"' : 'data-target="#xs-injectables-links-module-AppModule-754bfdf0c6f5ec615b9d26a4d4ca064f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-754bfdf0c6f5ec615b9d26a4d4ca064f"' :
                                        'id="xs-injectables-links-module-AppModule-754bfdf0c6f5ec615b9d26a4d4ca064f"' }>
                                        <li class="link">
                                            <a href="injectables/AlertService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AlertService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BookstandService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BookstandService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BrandService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BrandService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ItemsNewValueHandlerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ItemsNewValueHandlerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ItemsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ItemsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoginService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LoginService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SessionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SessionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StorehousesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>StorehousesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserApiService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserApiService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BarcodePageModule.html" data-type="entity-link">BarcodePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BarcodePageModule-884f79aa48ce2c0c7e539a05b3f280b2"' : 'data-target="#xs-components-links-module-BarcodePageModule-884f79aa48ce2c0c7e539a05b3f280b2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BarcodePageModule-884f79aa48ce2c0c7e539a05b3f280b2"' :
                                            'id="xs-components-links-module-BarcodePageModule-884f79aa48ce2c0c7e539a05b3f280b2"' }>
                                            <li class="link">
                                                <a href="components/BarcodePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BarcodePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardPageModule.html" data-type="entity-link">DashboardPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardPageModule-0404281015c3749c264069cbdcac4c63"' : 'data-target="#xs-components-links-module-DashboardPageModule-0404281015c3749c264069cbdcac4c63"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardPageModule-0404281015c3749c264069cbdcac4c63"' :
                                            'id="xs-components-links-module-DashboardPageModule-0404281015c3749c264069cbdcac4c63"' }>
                                            <li class="link">
                                                <a href="components/DashboardPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link">HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomePageModule-4e13aab0e6bb13ec37b7eeb5ca59ac96"' : 'data-target="#xs-components-links-module-HomePageModule-4e13aab0e6bb13ec37b7eeb5ca59ac96"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-4e13aab0e6bb13ec37b7eeb5ca59ac96"' :
                                            'id="xs-components-links-module-HomePageModule-4e13aab0e6bb13ec37b7eeb5ca59ac96"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link">LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginPageModule-4144196129c7d8f182fc4679e3c9d036"' : 'data-target="#xs-components-links-module-LoginPageModule-4144196129c7d8f182fc4679e3c9d036"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-4144196129c7d8f182fc4679e3c9d036"' :
                                            'id="xs-components-links-module-LoginPageModule-4144196129c7d8f182fc4679e3c9d036"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MemberRoutingModule.html" data-type="entity-link">MemberRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageModule.html" data-type="entity-link">RegisterPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RegisterPageModule-70d2917e18ab4039998d6f6b3c57efe9"' : 'data-target="#xs-components-links-module-RegisterPageModule-70d2917e18ab4039998d6f6b3c57efe9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPageModule-70d2917e18ab4039998d6f6b3c57efe9"' :
                                            'id="xs-components-links-module-RegisterPageModule-70d2917e18ab4039998d6f6b3c57efe9"' }>
                                            <li class="link">
                                                <a href="components/RegisterPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BarcodeData.html" data-type="entity-link">BarcodeData</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClassDropdownMe.html" data-type="entity-link">ClassDropdownMe</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClassItems.html" data-type="entity-link">ClassItems</a>
                            </li>
                            <li class="link">
                                <a href="classes/Response.html" data-type="entity-link">Response</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlertService.html" data-type="entity-link">AlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookstandService.html" data-type="entity-link">BookstandService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BrandService.html" data-type="entity-link">BrandService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link">CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemsNewValueHandlerService.html" data-type="entity-link">ItemsNewValueHandlerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemsService.html" data-type="entity-link">ItemsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link">LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionService.html" data-type="entity-link">SessionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorehousesService.html" data-type="entity-link">StorehousesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserApiService.html" data-type="entity-link">UserApiService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Bookstand.html" data-type="entity-link">Bookstand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Brand.html" data-type="entity-link">Brand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Category.html" data-type="entity-link">Category</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropDownBookstand.html" data-type="entity-link">DropDownBookstand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropDownMe.html" data-type="entity-link">DropDownMe</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBarcode.html" data-type="entity-link">IBarcode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Items.html" data-type="entity-link">Items</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Storehouses.html" data-type="entity-link">Storehouses</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
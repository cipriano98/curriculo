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
                    <a href="index.html" data-type="index-link">Curriculo Único Doc</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Digite para pesquisar"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Começando</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Visão geral
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependências
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Módulos</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AgencyModule.html" data-type="entity-link">AgencyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AgencyModule-f74b2d630b10bee07614533ea524a472"' : 'data-target="#xs-controllers-links-module-AgencyModule-f74b2d630b10bee07614533ea524a472"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controladores</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AgencyModule-f74b2d630b10bee07614533ea524a472"' :
                                            'id="xs-controllers-links-module-AgencyModule-f74b2d630b10bee07614533ea524a472"' }>
                                            <li class="link">
                                                <a href="controllers/AgencyController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AgencyController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AgencyModule-f74b2d630b10bee07614533ea524a472"' : 'data-target="#xs-injectables-links-module-AgencyModule-f74b2d630b10bee07614533ea524a472"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injetáveis</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AgencyModule-f74b2d630b10bee07614533ea524a472"' :
                                        'id="xs-injectables-links-module-AgencyModule-f74b2d630b10bee07614533ea524a472"' }>
                                        <li class="link">
                                            <a href="injectables/AgencyService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AgencyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-d343478959d9f845498995f812db9c93"' : 'data-target="#xs-controllers-links-module-AppModule-d343478959d9f845498995f812db9c93"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controladores</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-d343478959d9f845498995f812db9c93"' :
                                            'id="xs-controllers-links-module-AppModule-d343478959d9f845498995f812db9c93"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-d343478959d9f845498995f812db9c93"' : 'data-target="#xs-injectables-links-module-AppModule-d343478959d9f845498995f812db9c93"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injetáveis</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d343478959d9f845498995f812db9c93"' :
                                        'id="xs-injectables-links-module-AppModule-d343478959d9f845498995f812db9c93"' }>
                                        <li class="link">
                                            <a href="injectables/AgencyService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AgencyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-408eb64e392a6ee81fdf2f0bf326faf7"' : 'data-target="#xs-controllers-links-module-UserModule-408eb64e392a6ee81fdf2f0bf326faf7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controladores</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-408eb64e392a6ee81fdf2f0bf326faf7"' :
                                            'id="xs-controllers-links-module-UserModule-408eb64e392a6ee81fdf2f0bf326faf7"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-408eb64e392a6ee81fdf2f0bf326faf7"' : 'data-target="#xs-injectables-links-module-UserModule-408eb64e392a6ee81fdf2f0bf326faf7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injetáveis</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-408eb64e392a6ee81fdf2f0bf326faf7"' :
                                        'id="xs-injectables-links-module-UserModule-408eb64e392a6ee81fdf2f0bf326faf7"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ValidatorModule.html" data-type="entity-link">ValidatorModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controladores</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AgencyController.html" data-type="entity-link">AgencyController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link">AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link">HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link">UserController</a>
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
                                <a href="classes/Server.html" data-type="entity-link">Server</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserValidator.html" data-type="entity-link">UserValidator</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injetáveis</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AgencyService.html" data-type="entity-link">AgencyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link">PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenMiddleware.html" data-type="entity-link">TokenMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UnlessMiddleware.html" data-type="entity-link">UnlessMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
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
                                <a href="interfaces/BadRequest.html" data-type="entity-link">BadRequest</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscelânea</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variáveis</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Cobertura da documentação</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentação gerada usando <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
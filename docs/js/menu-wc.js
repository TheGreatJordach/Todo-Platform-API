"use strict";

customElements.define(
  "compodoc-menu",
  class extends HTMLElement {
    constructor() {
      super();
      this.isNormalMode = this.getAttribute("mode") === "normal";
    }

    connectedCallback() {
      this.render(this.isNormalMode);
    }

    render(isNormalMode) {
      let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">todo-platform-api documentation</a>
                </li>

                <li class="divider"></li>
                ${isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : ""}
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
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
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#modules-links"'
                                : 'data-bs-target="#xs-modules-links"'
                            }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"'}>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigurationModule.html" data-type="entity-link" >ConfigurationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IamModule.html" data-type="entity-link" >IamModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"'
                                            : 'data-bs-target="#xs-controllers-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"'
                                            : 'id="xs-controllers-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/AuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"'
                                        : 'data-bs-target="#xs-injectables-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"'
                                        : 'id="xs-injectables-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PasswordModule.html" data-type="entity-link" >PasswordModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-PasswordModule-ce8bca3b1ed97c837e5f71fd14538a75820e1c0efebef6b83d822d8d4599d352da44f1e2ab72fe97bcd09eb801f373e268f9f6e572e76ac8e01e75639241191a"'
                                        : 'data-bs-target="#xs-injectables-links-module-PasswordModule-ce8bca3b1ed97c837e5f71fd14538a75820e1c0efebef6b83d822d8d4599d352da44f1e2ab72fe97bcd09eb801f373e268f9f6e572e76ac8e01e75639241191a"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-PasswordModule-ce8bca3b1ed97c837e5f71fd14538a75820e1c0efebef6b83d822d8d4599d352da44f1e2ab72fe97bcd09eb801f373e268f9f6e572e76ac8e01e75639241191a"'
                                        : 'id="xs-injectables-links-module-PasswordModule-ce8bca3b1ed97c837e5f71fd14538a75820e1c0efebef6b83d822d8d4599d352da44f1e2ab72fe97bcd09eb801f373e268f9f6e572e76ac8e01e75639241191a"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/PasswordService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TodoModule.html" data-type="entity-link" >TodoModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionsModule.html" data-type="entity-link" >TransactionsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-TransactionsModule-e76af2d48458ae586ea6892db5c09ab3a80575fef13698c7af4eb2229eb13486236d6baddeb27d2d6b6ae6356d7e780378fee7f892123c7703cf94f4231e1e5e"'
                                        : 'data-bs-target="#xs-injectables-links-module-TransactionsModule-e76af2d48458ae586ea6892db5c09ab3a80575fef13698c7af4eb2229eb13486236d6baddeb27d2d6b6ae6356d7e780378fee7f892123c7703cf94f4231e1e5e"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-TransactionsModule-e76af2d48458ae586ea6892db5c09ab3a80575fef13698c7af4eb2229eb13486236d6baddeb27d2d6b6ae6356d7e780378fee7f892123c7703cf94f4231e1e5e"'
                                        : 'id="xs-injectables-links-module-TransactionsModule-e76af2d48458ae586ea6892db5c09ab3a80575fef13698c7af4eb2229eb13486236d6baddeb27d2d6b6ae6356d7e780378fee7f892123c7703cf94f4231e1e5e"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/SharedTransactionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SharedTransactionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserTransactionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserTransactionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-UsersModule-1237c0ee736f0dfc393e8ab54c064fa8025e3d0c13525a9dea9cee5341e46c8016082b80978566fccadbe2e0a9fefc9a32b3826ea39f59e5b2fee7e17b112590"'
                                        : 'data-bs-target="#xs-injectables-links-module-UsersModule-1237c0ee736f0dfc393e8ab54c064fa8025e3d0c13525a9dea9cee5341e46c8016082b80978566fccadbe2e0a9fefc9a32b3826ea39f59e5b2fee7e17b112590"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-UsersModule-1237c0ee736f0dfc393e8ab54c064fa8025e3d0c13525a9dea9cee5341e46c8016082b80978566fccadbe2e0a9fefc9a32b3826ea39f59e5b2fee7e17b112590"'
                                        : 'id="xs-injectables-links-module-UsersModule-1237c0ee736f0dfc393e8ab54c064fa8025e3d0c13525a9dea9cee5341e46c8016082b80978566fccadbe2e0a9fefc9a32b3826ea39f59e5b2fee7e17b112590"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#controllers-links"'
                                : 'data-bs-target="#xs-controllers-links"'
                            }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"'}>
                                <li class="link">
                                    <a href="controllers/AuthenticationController.html" data-type="entity-link" >AuthenticationController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#entities-links"'
                                : 'data-bs-target="#xs-entities-links"'
                            }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"'}>
                                <li class="link">
                                    <a href="entities/Todo.html" data-type="entity-link" >Todo</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#classes-links"'
                            : 'data-bs-target="#xs-classes-links"'
                        }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"'}>
                            <li class="link">
                                <a href="classes/BasePublicUserDto.html" data-type="entity-link" >BasePublicUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseUserDto.html" data-type="entity-link" >BaseUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BcryptProvider.html" data-type="entity-link" >BcryptProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdDto.html" data-type="entity-link" >IdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PublicUserDTO.html" data-type="entity-link" >PublicUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidateEnvironment.html" data-type="entity-link" >ValidateEnvironment</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#injectables-links"'
                                : 'data-bs-target="#xs-injectables-links"'
                            }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"'}>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link" >AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PasswordService.html" data-type="entity-link" >PasswordService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedTransactionsService.html" data-type="entity-link" >SharedTransactionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TodoTransactionService.html" data-type="entity-link" >TodoTransactionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserTransactionService.html" data-type="entity-link" >UserTransactionService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#interfaces-links"'
                            : 'data-bs-target="#xs-interfaces-links"'
                        }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"'}>
                            <li class="link">
                                <a href="interfaces/HashAlgorithmInterface.html" data-type="entity-link" >HashAlgorithmInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"'
                        }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"'}>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
      this.innerHTML = tp.strings;
    }
  }
);

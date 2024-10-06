"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              "function" == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? "symbol"
              : typeof o;
          }),
    _typeof(o)
  );
}
function _classCallCheck(a, n) {
  if (!(a instanceof n))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    (o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      "value" in o && (o.writable = !0),
      Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return (
    r && _defineProperties(e.prototype, r),
    t && _defineProperties(e, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _callSuper(t, o, e) {
  return (
    (o = _getPrototypeOf(o)),
    _possibleConstructorReturn(
      t,
      _isNativeReflectConstruct()
        ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor)
        : o.apply(t, e)
    )
  );
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e)
    throw new TypeError("Super expression must either be null or a function");
  (t.prototype = Object.create(e && e.prototype, {
    constructor: { value: t, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(t, "prototype", { writable: !1 }),
    e && _setPrototypeOf(t, e);
}
function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? new Map() : void 0;
  return (
    (_wrapNativeSuper = function _wrapNativeSuper(t) {
      if (null === t || !_isNativeFunction(t)) return t;
      if ("function" != typeof t)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      if (void 0 !== r) {
        if (r.has(t)) return r.get(t);
        r.set(t, Wrapper);
      }
      function Wrapper() {
        return _construct(t, arguments, _getPrototypeOf(this).constructor);
      }
      return (
        (Wrapper.prototype = Object.create(t.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        _setPrototypeOf(Wrapper, t)
      );
    }),
    _wrapNativeSuper(t)
  );
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct())
    return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
function _setPrototypeOf(t, e) {
  return (
    (_setPrototypeOf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return (t.__proto__ = e), t;
        }),
    _setPrototypeOf(t, e)
  );
}
function _getPrototypeOf(t) {
  return (
    (_getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        }),
    _getPrototypeOf(t)
  );
}
customElements.define(
  "compodoc-menu",
  /*#__PURE__*/ (function (_HTMLElement) {
    function _class() {
      var _this;
      _classCallCheck(this, _class);
      _this = _callSuper(this, _class);
      _this.isNormalMode = _this.getAttribute("mode") === "normal";
      return _this;
    }
    _inherits(_class, _HTMLElement);
    return _createClass(_class, [
      {
        key: "connectedCallback",
        value: function connectedCallback() {
          this.render(this.isNormalMode);
        },
      },
      {
        key: "render",
        value: function render(isNormalMode) {
          var tp = lithtml.html(
            '\n        <nav>\n            <ul class="list">\n                <li class="title">\n                    <a href="index.html" data-type="index-link">todo-platform-api documentation</a>\n                </li>\n\n                <li class="divider"></li>\n                '
              .concat(
                isNormalMode
                  ? '<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>'
                  : "",
                '\n                <li class="chapter">\n                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>\n                    <ul class="links">\n                        <li class="link">\n                            <a href="overview.html" data-type="chapter-link">\n                                <span class="icon ion-ios-keypad"></span>Overview\n                            </a>\n                        </li>\n                        <li class="link">\n                            <a href="index.html" data-type="chapter-link">\n                                <span class="icon ion-ios-paper"></span>README\n                            </a>\n                        </li>\n                        <li class="link">\n                            <a href="license.html"  data-type="chapter-link">\n                                <span class="icon ion-ios-paper"></span>LICENSE\n                            </a>\n                        </li>\n                                <li class="link">\n                                    <a href="dependencies.html" data-type="chapter-link">\n                                        <span class="icon ion-ios-list"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class="link">\n                                    <a href="properties.html" data-type="chapter-link">\n                                        <span class="icon ion-ios-apps"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class="chapter modules">\n                        <a data-type="chapter-link" href="modules.html">\n                            <div class="menu-toggler linked" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#modules-links"'
                  : 'data-bs-target="#xs-modules-links"',
                '>\n                                <span class="icon ion-ios-archive"></span>\n                                <span class="link-name">Modules</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                        </a>\n                        <ul class="links collapse " '
              )
              .concat(
                isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"',
                '>\n                            <li class="link">\n                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>\n                            </li>\n                            <li class="link">\n                                <a href="modules/ConfigurationModule.html" data-type="entity-link" >ConfigurationModule</a>\n                            </li>\n                            <li class="link">\n                                <a href="modules/IamModule.html" data-type="entity-link" >IamModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"'
                  : 'data-bs-target="#xs-controllers-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" '
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"'
                  : 'id="xs-controllers-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/AuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"'
                  : 'data-bs-target="#xs-injectables-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" '
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"'
                  : 'id="xs-injectables-links-module-IamModule-a2a977cb3c2e7f47873209a94decaf99f51f5c6bae1ac62e25a61bf48818669b16efd2659a7595f8331f7e0bfcb804c4da815cce5fe0f2f04adaaec9187a3525"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/PasswordModule.html" data-type="entity-link" >PasswordModule</a>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-PasswordModule-ce8bca3b1ed97c837e5f71fd14538a75820e1c0efebef6b83d822d8d4599d352da44f1e2ab72fe97bcd09eb801f373e268f9f6e572e76ac8e01e75639241191a"'
                  : 'data-bs-target="#xs-injectables-links-module-PasswordModule-ce8bca3b1ed97c837e5f71fd14538a75820e1c0efebef6b83d822d8d4599d352da44f1e2ab72fe97bcd09eb801f373e268f9f6e572e76ac8e01e75639241191a"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" '
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-PasswordModule-ce8bca3b1ed97c837e5f71fd14538a75820e1c0efebef6b83d822d8d4599d352da44f1e2ab72fe97bcd09eb801f373e268f9f6e572e76ac8e01e75639241191a"'
                  : 'id="xs-injectables-links-module-PasswordModule-ce8bca3b1ed97c837e5f71fd14538a75820e1c0efebef6b83d822d8d4599d352da44f1e2ab72fe97bcd09eb801f373e268f9f6e572e76ac8e01e75639241191a"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/PasswordService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/TodoModule.html" data-type="entity-link" >TodoModule</a>\n                            </li>\n                            <li class="link">\n                                <a href="modules/TransactionsModule.html" data-type="entity-link" >TransactionsModule</a>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-TransactionsModule-bcf7157b6ed2278223d30961db0f4d1d0818b63a4574a9b2ae02e3228bc4fc19a21a23ccd4b7fd2424a287cecd295e189700928346f47ffa49cbffc6cc2d3893"'
                  : 'data-bs-target="#xs-injectables-links-module-TransactionsModule-bcf7157b6ed2278223d30961db0f4d1d0818b63a4574a9b2ae02e3228bc4fc19a21a23ccd4b7fd2424a287cecd295e189700928346f47ffa49cbffc6cc2d3893"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" '
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-TransactionsModule-bcf7157b6ed2278223d30961db0f4d1d0818b63a4574a9b2ae02e3228bc4fc19a21a23ccd4b7fd2424a287cecd295e189700928346f47ffa49cbffc6cc2d3893"'
                  : 'id="xs-injectables-links-module-TransactionsModule-bcf7157b6ed2278223d30961db0f4d1d0818b63a4574a9b2ae02e3228bc4fc19a21a23ccd4b7fd2424a287cecd295e189700928346f47ffa49cbffc6cc2d3893"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/TransactionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionsService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-UsersModule-1237c0ee736f0dfc393e8ab54c064fa8025e3d0c13525a9dea9cee5341e46c8016082b80978566fccadbe2e0a9fefc9a32b3826ea39f59e5b2fee7e17b112590"'
                  : 'data-bs-target="#xs-injectables-links-module-UsersModule-1237c0ee736f0dfc393e8ab54c064fa8025e3d0c13525a9dea9cee5341e46c8016082b80978566fccadbe2e0a9fefc9a32b3826ea39f59e5b2fee7e17b112590"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" '
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-UsersModule-1237c0ee736f0dfc393e8ab54c064fa8025e3d0c13525a9dea9cee5341e46c8016082b80978566fccadbe2e0a9fefc9a32b3826ea39f59e5b2fee7e17b112590"'
                  : 'id="xs-injectables-links-module-UsersModule-1237c0ee736f0dfc393e8ab54c064fa8025e3d0c13525a9dea9cee5341e46c8016082b80978566fccadbe2e0a9fefc9a32b3826ea39f59e5b2fee7e17b112590"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                </ul>\n                </li>\n                        <li class="chapter">\n                            <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links"'
                  : 'data-bs-target="#xs-controllers-links"',
                '>\n                                <span class="icon ion-md-swap"></span>\n                                <span>Controllers</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                            <ul class="links collapse " '
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links"'
                  : 'id="xs-controllers-links"',
                '>\n                                <li class="link">\n                                    <a href="controllers/AuthenticationController.html" data-type="entity-link" >AuthenticationController</a>\n                                </li>\n                            </ul>\n                        </li>\n                        <li class="chapter">\n                            <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#entities-links"'
                  : 'data-bs-target="#xs-entities-links"',
                '>\n                                <span class="icon ion-ios-apps"></span>\n                                <span>Entities</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                            <ul class="links collapse " '
              )
              .concat(
                isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"',
                '>\n                                <li class="link">\n                                    <a href="entities/Todo.html" data-type="entity-link" >Todo</a>\n                                </li>\n                                <li class="link">\n                                    <a href="entities/User.html" data-type="entity-link" >User</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class="chapter">\n                        <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#classes-links"'
                  : 'data-bs-target="#xs-classes-links"',
                '>\n                            <span class="icon ion-ios-paper"></span>\n                            <span>Classes</span>\n                            <span class="icon ion-ios-arrow-down"></span>\n                        </div>\n                        <ul class="links collapse " '
              )
              .concat(
                isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"',
                '>\n                            <li class="link">\n                                <a href="classes/BasePublicUserDto.html" data-type="entity-link" >BasePublicUserDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/BaseUserDto.html" data-type="entity-link" >BaseUserDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/BcryptProvider.html" data-type="entity-link" >BcryptProvider</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/PublicUserDTO.html" data-type="entity-link" >PublicUserDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/ValidateEnvironment.html" data-type="entity-link" >ValidateEnvironment</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class="chapter">\n                            <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links"'
                  : 'data-bs-target="#xs-injectables-links"',
                '>\n                                <span class="icon ion-md-arrow-round-down"></span>\n                                <span>Injectables</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                            <ul class="links collapse " '
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links"'
                  : 'id="xs-injectables-links"',
                '>\n                                <li class="link">\n                                    <a href="injectables/AuthenticationService.html" data-type="entity-link" >AuthenticationService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/PasswordService.html" data-type="entity-link" >PasswordService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/TransactionsService.html" data-type="entity-link" >TransactionsService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class="chapter">\n                        <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#interfaces-links"'
                  : 'data-bs-target="#xs-interfaces-links"',
                '>\n                            <span class="icon ion-md-information-circle-outline"></span>\n                            <span>Interfaces</span>\n                            <span class="icon ion-ios-arrow-down"></span>\n                        </div>\n                        <ul class="links collapse " '
              )
              .concat(
                isNormalMode
                  ? ' id="interfaces-links"'
                  : 'id="xs-interfaces-links"',
                '>\n                            <li class="link">\n                                <a href="interfaces/HashAlgorithmInterface.html" data-type="entity-link" >HashAlgorithmInterface</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class="chapter">\n                        <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#miscellaneous-links"'
                  : 'data-bs-target="#xs-miscellaneous-links"',
                '>\n                            <span class="icon ion-ios-cube"></span>\n                            <span>Miscellaneous</span>\n                            <span class="icon ion-ios-arrow-down"></span>\n                        </div>\n                        <ul class="links collapse " '
              )
              .concat(
                isNormalMode
                  ? 'id="miscellaneous-links"'
                  : 'id="xs-miscellaneous-links"',
                '>\n                            <li class="link">\n                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>\n                            </li>\n                            <li class="link">\n                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class="chapter">\n                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>\n                    </li>\n                    <li class="divider"></li>\n                    <li class="copyright">\n                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">\n                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        '
              )
          );
          this.innerHTML = tp.strings;
        },
      },
    ]);
  })(/*#__PURE__*/ _wrapNativeSuper(HTMLElement))
);

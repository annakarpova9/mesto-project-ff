(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"b8df9e7d-b568-40ba-8f5a-580c29dc72c3","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка в then: ".concat(e.status))}function n(n){return fetch("".concat(e.baseUrl,"/").concat(n.url),{method:"".concat(n.method),headers:e.headers,body:JSON.stringify(n.body)}).then(t)}function r(e){console.log("Ошибка в catch: ".concat(e))}var o=document.querySelector("#card-template").content;function c(e,t){var n=o.querySelector(".card").cloneNode(!0),r=n.querySelector(".card__image");r.src=e.card.link,r.alt=e.card.name,r.addEventListener("click",(function(){e.openModalFullImage(r,c)}));var c=n.querySelector(".card__title");c.textContent=e.card.name;var a=n.querySelector(".card__delete-button");e.card.owner._id!==t?a.remove():e.clickButtonDeleteCard(a,e.card,n);var i=n.querySelector(".card__like-button"),u=n.querySelector(".card__like-amount");return u.textContent=0===e.card.likes.length?"0":e.card.likes.length,e.card.likes.some((function(e){return e._id===t}))&&i.classList.add("card__like-button_is-active"),i.addEventListener("click",(function(){return e.likeCard(e.card,i,u)})),n}function a(e,t,o){t.classList.contains("card__like-button_is-active")?n({url:"cards/likes/".concat(e._id),method:"DELETE"}).then((function(e){t.classList.remove("card__like-button_is-active"),o.textContent=0===e.likes.length?"0":e.likes.length})).catch(r):n({url:"cards/likes/".concat(e._id),method:"PUT"}).then((function(e){t.classList.add("card__like-button_is-active"),o.textContent=0===e.likes.length?"0":e.likes.length})).catch(r)}function i(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l)}function l(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function s(e){e.target.classList.contains("popup")&&u(e.target)}function d(e){e.target.classList.contains("popup__close")&&u(e.target.closest(".popup"))}var p={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function f(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}function m(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(p.inputErrorClass),t.setCustomValidity(""),n.classList.remove(p.errorClass),n.textContent=" "}function v(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function y(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(t){return m(e,t)})),v(n,r,t)}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var h=document.querySelector(".places__list"),S=document.querySelectorAll(".popup"),b=document.querySelector(".popup_type_edit"),k=document.querySelector(".popup_type_new-card"),C=document.querySelector(".popup_type_image"),E=document.querySelector(".popup_type_avatar"),L=document.querySelector(".popup_type_delete-card"),g=document.querySelector(".profile__edit-button"),q=document.querySelector(".profile__add-button"),x=document.forms["edit-profile"],A=x.elements.name,w=x.elements.description,B=document.forms["new-place"],D=B.elements["place-name"],I=B.elements.link,T=document.forms["delete-card"],j=document.forms.avatar,M=j.elements["avatar-link"],O=document.querySelector(".profile__info"),P=document.querySelector(".profile__image"),U=O.querySelector(".profile__title"),F=O.querySelector(".profile__description"),V=C.querySelector(".popup__image"),G=C.querySelector(".popup__caption"),H="0";function N(e){O.dataset.userId=e._id,P.style.backgroundImage="url(".concat(e.avatar,")"),U.textContent=e.name,F.textContent=e.about}function z(e,t){V.src=e.src,V.alt=e.alt,G.textContent=t.textContent,i(C)}function J(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Сохранить";e.submitter.textContent=t}function $(e,t,n){e.addEventListener("click",(function(){H=t._id,n.id=H,i(L)}))}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){return e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);v(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?m(e,t):f(e,t,t.validationMessage,n)}(e,o,t),v(n,r,t)}))}))}(t,e)}))}(p),Promise.all([n({url:"cards",method:"GET"}),n({url:"users/me",method:"GET"})]).then((function(e){var t,n,r,o,i=(o=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(r,o)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(r,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=i[0],l=i[1];N(l),t=u,n=l._id,t.forEach((function(e){h.append(c({card:e,likeCard:a,openModalFullImage:z,clickButtonDeleteCard:$},n))}))})).catch(r),S.forEach((function(e){return e.classList.add("popup_is-animated")})),S.forEach((function(e){return e.addEventListener("mousedown",s)})),S.forEach((function(e){return e.addEventListener("click",d)})),g.addEventListener("click",(function(){i(b),A.value=U.textContent,w.value=F.textContent,y(x,p)})),q.addEventListener("click",(function(){B.reset(),i(k),y(B,p)})),P.addEventListener("click",(function(){j.reset(),i(E),y(E,p)})),x.addEventListener("submit",(function(e){e.preventDefault(),J(e,"Сохранение..."),n({url:"users/me",method:"PATCH",body:{name:A.value,about:w.value}}).then((function(e){N(e),u(b)})).catch((function(e){f(x,w,"Ошибка сервера: ".concat(e),p)})).finally((function(){return J(e)}))})),B.addEventListener("submit",(function(e){e.preventDefault(),J(e,"Сохранение..."),n({url:"cards",method:"POST",body:{name:D.value,link:I.value}}).then((function(e){h.prepend(c({card:e,likeCard:a,openModalFullImage:z,clickButtonDeleteCard:$},O.dataset.userId)),B.reset(),u(k)})).catch((function(e){f(B,I,"Ошибка сервера: ".concat(e),p)})).finally((function(){return J(e)}))})),j.addEventListener("submit",(function(e){e.preventDefault(),J(e,"Сохранение..."),n({url:"users/me/avatar",method:"PATCH",body:{avatar:M.value}}).then((function(e){N(e),u(E)})).catch((function(e){f(j,M,"Ошибка сервера: ".concat(e),p)})).finally((function(){return J(e)}))})),T.addEventListener("submit",(function(e){e.preventDefault(),J(e,"Удаление..."),n({url:"cards/".concat(H),method:"DELETE"}).then((function(e){document.getElementById(H).remove(),u(L)})).catch((function(e){var t=document.querySelector(".delete-card-error");t.textContent="Ошибка сервера: ".concat(e),t.classList.add(p.errorClass)})).finally((function(){return J(e,"Да")}))}))})();
//# sourceMappingURL=main.js.map
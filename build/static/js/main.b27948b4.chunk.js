(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){},16:function(e,n,t){e.exports=t(38)},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(15),c=t.n(o),u=t(4),l=t(2),i=t(3),s=t.n(i),m="/api/persons",f=function(){return s.a.get(m).then((function(e){return e.data}))},d=function(e){return s.a.post(m,e).then((function(e){return e.data}))},h=function(e){return s.a.delete("".concat(m,"/").concat(e))},p=function(e,n){return s.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},b=function(e){var n=e.person,t=e.handleClick;return r.a.createElement("button",{onClick:function(){return t(n)}}," delete ")},v=function(e){var n=e.person,t=e.handleDeleteButtonClick;return r.a.createElement(r.a.Fragment,null,r.a.createElement("li",null,n.name," ",n.phone,r.a.createElement(b,{person:n,handleClick:t})))},E=function(e){var n=e.persons,t=e.filter,a=e.handleDeleteButtonClick;return r.a.createElement("ul",null,n.filter((function(e){return e.name.toLocaleLowerCase().includes(t.toLocaleLowerCase())})).map((function(e){return r.a.createElement(v,{key:e.id,person:e,handleDeleteButtonClick:a})})))},w=function(e){var n=e.filter,t=e.changeFilter;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t}))},g=function(e){return r.a.createElement("form",{onSubmit:e.addNumber},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.changeNameInput})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newPhoneNumber,onChange:e.changePhoneInput})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"}," add ")))},k=function(e){var n=e.message,t=e.styleType;return null===n?null:r.a.createElement("div",{className:t},n)},C=(t(14),function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),s=i[0],m=i[1],b=Object(a.useState)(""),v=Object(l.a)(b,2),C=v[0],O=v[1],j=Object(a.useState)(""),y=Object(l.a)(j,2),L=y[0],N=y[1],S=Object(a.useState)(null),D=Object(l.a)(S,2),I=D[0],T=D[1],B=Object(a.useState)(null),P=Object(l.a)(B,2),x=P[0],F=P[1];Object(a.useEffect)((function(){f().then((function(e){return o(e)}))}),[]);var J=function(e){T(e),setTimeout((function(){return T(null)}),5e3)},A=function(e){F(e),setTimeout((function(){return F(null)}),5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(k,{message:I,styleType:"success"}),r.a.createElement(k,{message:x,styleType:"error"}),r.a.createElement(w,{filter:L,changeFilter:function(e){return N(e.target.value)}}),r.a.createElement("h3",null,"add a new person: "),r.a.createElement(g,{addNumber:function(e){if(e.preventDefault(),""===s||""===C)alert("You haven't filled all the fields yet.");else if(-1!==t.map((function(e){return e.name.toLocaleLowerCase()})).indexOf(s.toLocaleLowerCase())){var n=t.map((function(e){return e.name.toLocaleLowerCase()})).indexOf(s.toLocaleLowerCase());console.log(n);var a=Object(u.a)(Object(u.a)({},t[n]),{},{phone:C});window.confirm("".concat(s," is already present in phonebook, replace the old number with the new one?"))&&p(t[n].id,a).then((function(e){o(t.map((function(n){return n.id!==e.id?n:e}))),J("Changed ".concat(t[n].name,"'s phone to ").concat(a.phone))})).catch((function(e){e.response.data?A(e.response.data.error):(A("Information of ".concat(t[n].id," has already been removed from server")),o(t.filter((function(e){return e.id!==t[n].id}))))}))}else{var r={name:s,phone:C};d(r).then((function(e){o(t.concat(e)),m(""),O(""),J("Added ".concat(r.name," to the phonebook"))})).catch((function(e){return A(e.response.data.error)}))}},newName:s,changeNameInput:function(e){return m(e.target.value)},newPhoneNumber:C,changePhoneInput:function(e){return O(e.target.value)}}),r.a.createElement("h3",null," Numbers "),r.a.createElement(E,{persons:t,filter:L,handleDeleteButtonClick:function(e){window.confirm("Delete ".concat(e.name,"?"))&&h(e.id).then((function(){o(t.filter((function(n){return e.id!==n.id}))),J("".concat(e.name," has been removed from the phonebook"))})).catch((function(n){A("This person has already been deleted from phonebook"),o(t.filter((function(n){return n.id!==e.id})))}))}}))});c.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.b27948b4.chunk.js.map
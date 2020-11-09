(()=>{"use strict";const e=(e,t=[])=>({title:e,list:t}),t=(e,t,n,d,i=!1)=>({title:e,desc:t,dueDate:n,priority:d,status:i}),n=document.getElementById("submit"),d=document.getElementById("sidebar-submit"),i=(document.querySelector("main"),document.querySelector(".sidebar"),document.querySelector(".advButton")),l=document.querySelector(".advanced-options"),s=document.querySelector(".tasks-list"),a=document.querySelector(".project-names"),c=document.getElementById("task-form"),o=document.getElementById("sidebar-form"),r=[],u=document.querySelector(".done-list"),m=(e,t=null,n=null)=>{for(;s.firstChild;)s.removeChild(s.firstChild);for(;u.firstChild;)u.removeChild(u.firstChild);for(let d=0;d<e.list.length;d+=1){const i=document.createElement("div");i.classList.add("task-container");const l=document.createElement("div"),a=document.createElement("div"),c=document.createElement("h3"),o=document.createElement("div"),r=document.createElement("p"),m=document.createElement("p"),E=document.createElement("p"),f=v(o),L=C(e,d),g=y(e,d),k=p(e,d,i);c.textContent=e.list[d].title,r.textContent=e.list[d].desc,m.textContent=e.list[d].dueDate,E.textContent=e.list[d].priority,l.classList.add("main-info"),a.classList.add("additional-info"),g.classList.add("mr-3"),o.style.display="none",o.classList.add("details-container","mt-3"),l.appendChild(g),l.appendChild(c),a.appendChild(m),a.appendChild(E),a.appendChild(f),a.appendChild(L),a.appendChild(k),i.appendChild(l),i.appendChild(a),d===n&&i.appendChild(t),o.appendChild(r),i.appendChild(o),h(e,d,i,u,s)}},p=(e,t,n)=>{const d=document.createElement("span");return d.innerHTML="<i class='fas fa-edit'></i>",d.addEventListener("click",(()=>{const n=((e,t)=>{const n=document.createElement("form"),d=document.createElement("input"),i=document.createElement("input"),l=document.createElement("div"),s=document.createElement("input"),a=document.createElement("select"),c=document.createElement("input"),o=document.createElement("input");d.classList.add("form-control","mb-2"),i.classList.add("form-control","mb-2"),s.classList.add("form-control","mr-2"),a.classList.add("custom-select","custom-select-sm"),c.classList.add("btn","btn-secondary","button","ml-3"),o.classList.add("btn","btn-secondary","button","ml-3"),l.classList.add("extra-inputs"),d.type="text",i.type="text",s.type="date",c.type="submit",o.type="submit";const r=document.createElement("option"),u=document.createElement("option"),p=document.createElement("option");return r.value="high",u.value="medium",p.value="low",r.textContent="High",u.textContent="Medium",p.textContent="Low",c.value="Cancel",d.value=e.list[t].title,i.value=e.list[t].desc,s.value=e.list[t].dueDate,a.value=e.list[t].priority,a.appendChild(r),a.appendChild(u),a.appendChild(p),n.appendChild(d),n.appendChild(i),l.appendChild(s),l.appendChild(a),l.appendChild(c),l.appendChild(o),n.appendChild(l),o.addEventListener("click",(n=>{n.preventDefault(),((e,t,n,d)=>{if(""==e)modal("Name must be filled out")})(d),e.list[t].title=d.value,e.list[t].desc=i.value,e.list[t].dueDate=s.value,e.list[t].priority=a.value,m(e)})),n})(e,t);m(e,n,t)})),d},h=(e,t,n,d,i)=>{e.list[t].status?d.appendChild(n):i.appendChild(n)},v=e=>{const t=document.createElement("span");return t.innerHTML='<i class="fas fa-chevron-down"></i>',t.addEventListener("click",(t=>{t.preventDefault(),"block"===e.style.display?e.style.display="none":e.style.display="block"})),t},C=(e,t)=>{const n=document.createElement("span");return n.innerHTML="<i class='fas fa-trash-alt'></i>",n.addEventListener("click",(()=>{e.list.splice(t,1),m(e)})),n},y=(e,t)=>{const n=document.createElement("input");return n.type="checkbox",n.checked=e.list[t].status,n.addEventListener("change",(()=>{e.list[t].status=!!n.checked,m(e)})),n};n.addEventListener("click",(e=>{e.preventDefault();let n=document.querySelector(".active").firstChild.innerText,d=r.filter((e=>e.title===n))[0];(e=>{const n=document.getElementById("task-input").value,d=document.getElementById("task-desc-input").value,i=document.getElementById("task-date-input").value,l=document.getElementById("task-priority-input").value,s=t(n,d,i,l);c.reset(),e.list.unshift(s)})(d),m(d)}));const E=e=>{for(;a.firstChild;)a.removeChild(a.firstChild);for(let t=0;t<e.length;t+=1){const n=document.createElement("div"),d=document.createElement("h3"),i=f(e,t);n.classList.add("list-cont"),d.textContent=e[t].title,n.appendChild(d),n.appendChild(i),a.appendChild(n),e[0]&&0===t&&n.classList.add("active"),d.addEventListener("click",(d=>{d.preventDefault(),document.querySelector(".active").classList.remove("active"),n.classList.add("active"),m(e[t])}))}},f=(e,t)=>{const n=document.createElement("span");return n.innerHTML="<i class='fas fa-trash-alt'></i>",n.addEventListener("click",(()=>{e.splice(t,1),E(e),m(e[0])})),n};d.addEventListener("click",(t=>{t.preventDefault(),(t=>{const n=document.getElementById("sidebar-input").value,d=e(n);o.reset(),t.unshift(d)})(r),E(r),m(r[0])})),i.addEventListener("click",(e=>{"block"===l.style.display?(l.style.display="none",i.innerText="Advanced Options"):(l.style.display="block",i.textContent="Hide Options")})),(()=>{const n=t("The Winds of Winter","desc1","2020-12-12","high",!0),d=t("A Dream of Spring","desc1","2020-12-12","high"),i=t("A Clash of Kings","desc1","2020-12-12","high"),l=t("A Game of Thrones","desc1","2020-12-12","high"),s=e("A Song of Ice and Fire"),a=e("The Lord of the Rings"),c=t("The Two Towers","desc1","2020-12-12","high");s.list.push(n,d,i,l),a.list.push(c),r.push(s),r.push(a)})(),E(r),m(r[0])})();
import{a as S}from"./chunk-TC6CBDYL.js";import{a as U,b as Y,c as G,d as W}from"./chunk-3KZ5G2LR.js";import{a as Q}from"./chunk-TLTQ2BMO.js";import"./chunk-ZBTMF6FG.js";import{a as L}from"./chunk-YGK54RN3.js";import{i as $}from"./chunk-XC4KBJWX.js";import"./chunk-CEWKWK6U.js";import"./chunk-SP6S2HTI.js";import{f as z}from"./chunk-GS7ZRR4M.js";import{p as j,t as H}from"./chunk-WDQTWRWB.js";import{Ab as b,Eb as g,Fb as u,Jb as f,Kb as _,La as I,Lb as y,Nb as x,Ob as F,Pb as q,Ra as s,Sa as a,Vb as P,Wb as B,ba as C,bc as N,cc as V,hb as k,ka as h,la as m,lb as l,ob as R,qb as D,rb as O,sa as w,sb as M,tb as E,ub as d,vb as c,wa as A,wb as p}from"./chunk-IYQR6SBG.js";import"./chunk-DM275RSA.js";var et=["chartContainer"],K=(()=>{class r{constructor(t,e){this._CurrentQuestionsService=t,this._HistoryProtocolsService=e,this.actionTriggeredB=new w,this.currentQuestionArr=[],this.currentQuestionArrAppended=[],this.data=[],this.isChartRendered=!1,this.currentQuestion=null,this.isRendered=!0,this.currentChartsIdPrev=[],this.isHistoryBack=!1}getHistory(){this._HistoryProtocolsService.History.subscribe(t=>{if(!this.isHistoryBack&&t?.Historys?.length){let e=t?.Historys.map(i=>i.question);this.currentQuestionArr=e,console.log(this.currentQuestionArr.map(i=>i.id));let o=this.currentQuestionArr.map(i=>i.id);console.log(o,"================================"),o.sort((i,n)=>i-n).forEach((i,n)=>{n!==0&&(console.log(i),this.onNodeClick({id:i}))}),this.isHistoryBack=!0}})}ngOnInit(){this._CurrentQuestionsService.currentQuestions.subscribe({next:t=>{this.AllQuestions=t}}),this._CurrentQuestionsService.currentData.subscribe(t=>{this.currentQuestionArr=t,this.currentQuestionArr.length>0&&this.isRendered&&setTimeout(()=>{this.renderChart(),this.isRendered=!1,this.chart.fit()},1e3)})}ngOnDestroy(){this._CurrentQuestionsService.updateData([])}startNode(){this.currentQuestionArrAppended.push(this.AllQuestions[0]),this.data.push({id:"root",name:this.currentQuestionArr[0].charts[0].title,parentId:null,collapsed:!1,isNewNode:!1}),this.currentQuestionArr[0].choices.forEach(t=>{this.data.push({id:t.next_question_id.toString(),name:t.text,parentId:"root",collapsed:!1,isNewNode:!1})})}renderChart(){this.isChartRendered||(this.startNode(),this.chart=new G,this.isChartRendered=!0),this.chart.container(this.chartContainer.nativeElement).data(this.data).nodeWidth(t=>250).nodeHeight(t=>150).childrenMargin(t=>80).siblingsMargin(t=>80).nodeContent(t=>this.getCustomNodeHTML(t)).nodeButtonY(t=>10).onNodeClick(t=>this.onNodeClick(t)).linkYOffset(1).compact(!1).layout("top").render(),this.isChartRendered=!0,this.getHistory()}onNodeClick(t){console.log("Node clicked:",t),this.appendChildNode(t);let e=+this.currentChoiceId;this.currentChoiceId=+t.id;let o=document.querySelector(`[value="${e}"]`);o&&!o.checked&&o.click()}getCustomNodeHTML(t){return`
        <div data-attr="${t.data.id}" class="title__fonts__normal custom-node h-100 position-relative  d-flex justify-content-center align-items-center w-auto text-dark" 
        style="word-wrap: break-word;background-color:#e8f5fc;border-color:#409bd2;">
          <div>
            <label  class="node-header" style="font-weight:300;font-family: "Montserrat", sans-serif; ">${t.data.name}</label>
          </div>
        </div>
      `}appendChildNode(t){this.currentChoiceId=t.id;let e=this.currentQuestionArr.find(o=>o.id.toString()==t.id);if(this.currentQuestionArr.includes(e)){if(e&&e.choices)if(document.getElementById("copy")?.classList.add("d-none"),document.getElementById("responsive_copy")?.classList.add("d-none"),e.choices.length>0){let o=e.charts[0].id.toString();this.updateChart(o,e.charts[0].title,t.id.toString(),!0),e.choices.forEach(i=>{let n=t.id;this.updateChart(i.next_question_id.toString(),i.text,o,!1)})}else document.getElementById("copy")?.classList.remove("d-none"),document.getElementById("responsive_copy")?.classList.remove("d-none"),e.charts.forEach((o,i)=>{let n=e.charts.length,T=Math.floor(n/2)==i+1;this.updateChart(o.id.toString(),o.title,t.id,T)});this.chart.expandAll(),this.collapse(t)}}updateChart(t,e,o,i){this.chart.addNode({id:t,name:e,parentId:o,collapsed:!1,isNewNode:!0}).render(),i&&this.chart.setCentered(t)}collapse(t){let e=[];this.currentQuestionArr.forEach(o=>{o.charts.forEach(i=>{e.push(i.id),this.currentChartsIdPrev.push(i.id)})}),this.currentChartsIdPrev.forEach(o=>{e.includes(o)||(this.chart.removeNode(o),this.currentChartsIdPrev=e)})}static{this.\u0275fac=function(e){return new(e||r)(a(S),a(Q))}}static{this.\u0275cmp=C({type:r,selectors:[["app-protocol-hisotry-flow-charts"]],viewQuery:function(e,o){if(e&1&&f(et,7),e&2){let i;_(i=y())&&(o.chartContainer=i.first)}},outputs:{actionTriggeredB:"actionTriggeredB"},standalone:!0,features:[P],decls:2,vars:0,consts:[["chartContainer",""],[1,"chart-container","w-100"]],template:function(e,o){e&1&&p(0,"div",1,0)},styles:['.chart-container[_ngcontent-%COMP%]{width:100%;max-height:80vh;overflow-y:scroll;overflow:hidden}  .svg-chart-container{width:100%}  .custom-node{border:1px solid #ccc;border-radius:8px;box-shadow:0 4px 8px #0000001a;text-align:center;font-family:"Arial, sans-serif";fill:#e8f5fc;stroke:#409bd2;display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:10px;word-wrap:break-word;height:auto;position:relative}  .custom-node .node-header{font-weight:700;font-size:14px;cursor:pointer}  .custom-node .node-header::selection,   .custom-node .node-header *::selection{background-color:transparent}  .custom-node .node-subtitle{font-size:12px;color:#555;white-space:normal}  .custom-node .node-buttons{display:flex;justify-content:center;gap:10px;margin-top:auto}  .custom-node.active{border:2px solid #4caf50;background-color:#e8f5e9}  .node-button{padding:5px 10px;border:none;background-color:#4caf50;color:#fff;font-size:14px;border-radius:5px;cursor:pointer}  .node-button:hover{background-color:#45a049}  .orgchart .node .toggle{display:none}  .orgchart .node .toggle{pointer-events:none;opacity:.5}  ul{padding-left:10px}  .highlight-node{background-color:#ff0;border:2px solid red;transition:all .3s ease}  .highlight-path{stroke:red!important;stroke-width:4px!important;transition:stroke .3s ease}  .node-button-g{display:none}  .node-button-g{position:absolute;top:0;left:0}  .form-check-input:checked{background-color:#2490eb!important;box-shadow:none}  .form-check-input{border-radius:50%!important}  .org-path{stroke:#ccc;stroke-width:2;transition:stroke .3s ease}  path.link{fill:none;stroke:#ccc;stroke-width:2;position:relative}  .custom-node{position:relative}  .custom-node:before{content:"";position:absolute;right:50px;top:50%;transform:translateY(50%);border-radius:50%;width:16px;height:16px;border:1px solid #cccs}']})}}return r})();var ot=["Questions__Description"],it=["Question"];function rt(r,v){return this.currentQuestionArr}function nt(r,v){if(r&1){let t=b();d(0,"div",9)(1,"div",10)(2,"input",11),g("change",function(){let o=h(t).$implicit,i=u().$implicit,n=u(2);return n.onCheckPreviousQuestionCheck(i),n.onDisplayNextQuestionChange(o.next_question_id),n.updateChart(o.id,o.next_question_id),m(n.onChangeMoving())}),c(),d(3,"label",12),x(4),c()()()}if(r&2){let t=v.$implicit;s(2),l("id",t.id)("value",t.next_question_id)("name",t.question_id),s(),l("for",t.id),s(),F(t.text)}}function st(r,v){if(r&1&&(d(0,"div",4,1)(2,"div",5),p(3,"div",8),d(4,"form"),M(5,nt,5,5,"div",9,O),c()()()),r&2){let t=v.$implicit;s(3),l("innerHTML",t.description,I),s(2),E(t.choices)}}function ct(r,v){if(r&1&&(d(0,"div",2)(1,"div",3,0)(3,"div",4,1)(5,"div",5)(6,"div",6),p(7,"i",7),x(8),N(9,"date"),c(),p(10,"div",8),c()(),M(11,st,7,1,"div",4,rt,!0),c()()),r&2){let t=u();s(8),q(" last updated ",V(9,2,t.specificProtocol.protocol.updated_at)," "),s(2),l("innerHTML",t.specificProtocol.protocol.description,I),s(),E(t.currentQuestionArr)}}var Z=(()=>{class r{constructor(t,e,o){this._CurrentQuestionsService=t,this._HistoryProtocolsService=e,this._PLATFORM_ID=o,this.actionTriggeredA=new w,this.currentQuestionArr=[]}ngOnDestroy(){this._HistoryProtocolsService.History.next(null),localStorage.removeItem("PatientData")}ngOnInit(){H(this._PLATFORM_ID)&&(this.currentUserId=+localStorage.getItem("userId"))}displayFirstQuestion(){let t=this.specificProtocol.protocol.questions[0];this.currentQuestionArr.push(t)}onDisplayNextQuestionChange(t){let e=this.specificProtocol.protocol.questions.find(o=>o.id===t);e&&this.currentQuestionArr.push(e)}addToHistory(t){this._HistoryProtocolsService.addToHistory(t).subscribe({next:e=>{console.log(e)},error:e=>{console.log(e)}})}onCheckPreviousQuestionCheck(t){let e=this.currentQuestionArr.indexOf(t);e!==-1&&this.currentQuestionArr.splice(e+1)}updateChart(t,e){this._CurrentQuestionsService.updateData(this.currentQuestionArr),this.actionTriggeredA.emit({id:e}),this.addToHistory({user_id:this.currentUserId.toString(),id:t})}onChangeMoving(){setTimeout(()=>{console.log(this.Question.last.nativeElement),this.Question.last.nativeElement.scrollIntoView({behavior:"smooth",block:"nearest"})},0)}static{this.\u0275fac=function(e){return new(e||r)(a(S),a(Q),a(A))}}static{this.\u0275cmp=C({type:r,selectors:[["app-protocol-history-radio-button"]],viewQuery:function(e,o){if(e&1&&(f(ot,5),f(it,5)),e&2){let i;_(i=y())&&(o.Questions__Description=i.first),_(i=y())&&(o.Question=i)}},inputs:{currentQuestionArr:"currentQuestionArr",specificProtocol:"specificProtocol"},outputs:{actionTriggeredA:"actionTriggeredA"},standalone:!0,features:[P],decls:1,vars:1,consts:[["Questions__Description",""],["Question",""],["id","Questions__Container",1,"position-relative","z-1"],["id","Questions__Description"],[1,"card","mb-2"],[1,"card-body","rounded-0"],[1,"lastUpdated__text"],[1,"pi","pi-history"],[3,"innerHTML"],["id","Questions__Choices"],[1,"form-check"],["type","radio",1,"form-check-input",3,"change","id","value","name"],[1,"form-check-label",3,"for"]],template:function(e,o){e&1&&k(0,ct,13,4,"div",2),e&2&&D(0,o.specificProtocol?0:-1)},dependencies:[j],styles:["body{overflow-y:hidden}[_nghost-%COMP%]{height:calc(100% - 56px);overflow-y:auto}.lastUpdated__text[_ngcontent-%COMP%], .lastUpdated__text[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{text-align:right;font-size:14px;color:#757575;line-height:24px;margin-bottom:1rem}.card-body[_ngcontent-%COMP%]{background-color:#e8f5fc;border:2px solid #409bd2;padding:16px;position:relative}.card[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_Animation__Card 1s forwards}@keyframes _ngcontent-%COMP%_Animation__Card{0%{transform:translateY(10px);opacity:0}to{transform:translateY(0);opacity:1}}"]})}}return r})();var at=["componentB"],dt=["componentA"],lt=()=>({height:"90vh"}),pt=()=>[50,50];function ut(r,v){if(r&1){let t=b();d(0,"div",13)(1,"div")(2,"div",14)(3,"app-protocol-hisotry-flow-charts",15,1),g("actionTriggeredB",function(o){h(t);let i=u();return m(i.handleActionB(o))}),c()()()()}}function ht(r,v){if(r&1){let t=b();d(0,"div",6)(1,"div",7)(2,"div",8)(3,"app-protocol-history-radio-button",9,0),g("actionTriggeredA",function(o){h(t);let i=u();return m(i.handleActionA(o))}),c(),d(5,"div",10)(6,"button",16),g("click",function(){h(t);let o=u();return m(o.copy())}),p(7,"i",12),x(8," copy Assessment "),c()()()()()}if(r&2){let t=u();s(3),l("specificProtocol",t.specificProtocol)("currentQuestionArr",t.currentQuestionArr),s(3),l("disabled",t.isDisabled)}}var jt=(()=>{class r{constructor(t,e,o,i,n){this._ToastrService=t,this._PLATFORM_ID=e,this._ActivatedRoute=o,this._SpecificProtocolService=i,this._HistoryProtocolsService=n,this.isDisabled=!1,this.currentQuestionArr=[]}handleActionB(t){this.componentB.onCheckPreviousQuestionCheck(t.Question),this.componentB.onDisplayNextQuestionChange(t.Choice)}handleActionA(t){this.componentA.onNodeClick(t)}ngOnInit(){H(this._PLATFORM_ID)&&(this.currentUserId=+localStorage.getItem("userId")),this.handleGetCurrentCategoryId(),this.getCurrentCategory()}handleGetCurrentCategoryId(){this._ActivatedRoute.paramMap.subscribe({next:t=>{this.protocolId=t.get("id")}})}getCurrentCategory(){this._SpecificProtocolService.getSpecificProtocol(this.protocolId).subscribe({next:t=>{this.specificProtocol=t,this.getHistory(),console.log(this.specificProtocol)},error:t=>{console.log(t)}})}getHistory(){let t={user_id:+this.currentUserId,protocol_id:+this.protocolId};console.log(t),this._HistoryProtocolsService.getSpecificProtocolHistory(t).subscribe({next:e=>{console.log("=========== History Response =============="),this.History=e,this.filterHistory(),console.log(e),console.log("=========== History Response ==============")},error:e=>{console.log(e)}})}filterHistory(){this.currentQuestionArr=this.History.Historys.map(e=>e.question);let t=this.History.Historys.map(e=>e.question).map(e=>e.id);t.forEach(e=>{console.log(e);let o={id:e}}),console.log(t,"================================"),this.checkAllInputs()}checkAllInputs(){console.log(this.History,"from radio button"),setTimeout(()=>{this.History.Historys.forEach(t=>{console.log(t.choice_id),document.querySelector(`[for="${t.choice_id}"]`).click()})},1e3)}copy(){let t=document.querySelector("#Questions__Description")?.lastElementChild;navigator.clipboard.writeText(t.innerText),this._ToastrService.success("Assessment Copied")}static{this.\u0275fac=function(e){return new(e||r)(a(L),a(A),a(z),a(W),a(Q))}}static{this.\u0275cmp=C({type:r,selectors:[["app-protocol-history-page"]],viewQuery:function(e,o){if(e&1&&(f(at,5),f(dt,5)),e&2){let i;_(i=y())&&(o.componentB=i.first),_(i=y())&&(o.componentA=i.first)}},standalone:!0,features:[P],decls:14,vars:8,consts:[["componentB",""],["componentA",""],[1,"card","d-none","d-lg-block"],["styleClass","mb-5",3,"panelSizes"],["pTemplate",""],[1,"card",2,"height","100vh","padding-top","120px"],[1,"col","flex","align-items-center","justify-content-center","h-100"],[1,"h-100"],[1,"Questions__Container","p-2","bg-white","h-100","w-100","overflow-hidden","d-flex","flex-column","justify-content-end"],[3,"actionTriggeredA","specificProtocol","currentQuestionArr"],[2,"background-color","#ededed","height","56px"],["id","responsive_copy",1,"btn","btn-main","m-2","rounded-0","d-none",3,"click","disabled"],[1,"pi","pi-copy"],[1,"col","flex","align-items-center","justify-content-center"],[1,"p-2","bg-white","h-100","w-100"],[3,"actionTriggeredB"],["id","copy",1,"btn","btn-main","m-2","rounded-0","d-none",3,"click","disabled"]],template:function(e,o){if(e&1){let i=b();d(0,"div",2)(1,"p-splitter",3),k(2,ut,5,0,"ng-template",4)(3,ht,9,3,"ng-template",4),c()(),d(4,"div",5)(5,"div",6)(6,"div",7)(7,"div",8)(8,"app-protocol-history-radio-button",9,0),g("actionTriggeredA",function(T){return h(i),m(o.handleActionA(T))}),c(),d(10,"div",10)(11,"button",11),g("click",function(){return h(i),m(o.copy())}),p(12,"i",12),x(13," copy Assessment "),c()()()()()()}e&2&&(s(),R(B(6,lt)),l("panelSizes",B(7,pt)),s(7),l("specificProtocol",o.specificProtocol)("currentQuestionArr",o.currentQuestionArr),s(3),l("disabled",o.isDisabled))},dependencies:[K,Z,Y,U,$],styles:[".card[_ngcontent-%COMP%]{padding-top:80px;background-color:#ededed}  .p-splitter-gutter.ng-star-inserted{padding:5px;background-color:#ededed;background-image:url(/assets/sizeable.png);background-position:center center;background-repeat:no-repeat}  .p-splitter-gutter-handle{display:none}  #resizable{min-width:100px;min-height:100px;background-color:#ededed;position:relative}  .resizable-box{width:100%;height:150px;background-color:#ededed;resize:both;overflow:auto;border:1px solid black}[_nghost-%COMP%]   button[_ngcontent-%COMP%]{transition:background-color .3s cubic-bezier(.4,0,.2,1);transition:color .3s cubic-bezier(.4,0,.2,1);transition-delay:0ms;transition-property:color,background-color,border;appearance:none;background-color:#007ac3;border:.0625rem solid transparent;border-radius:0;box-sizing:border-box;color:#fff;display:inline-block;font-size:.875rem;font-weight:400;line-height:1.29;padding:.625rem 1rem;-webkit-tap-highlight-color:transparent;text-align:center;touch-action:manipulation;vertical-align:middle}"]})}}return r})();export{jt as ProtocolHistoryPageComponent};
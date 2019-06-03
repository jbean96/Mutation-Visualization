(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{267:function(e,t){e.exports={CRP:{short_name:"CRP",full_name:"Constant Replacement"},CDL:{short_name:"CDL",full_name:"Constant Deletion"},AOD:{short_name:"AOD",full_name:"Arithmetic Operator Deletion"},AOR:{short_name:"AOR",full_name:"Arithmetic Operator Replacement"},ASR:{short_name:"ASR",full_name:"Assignment Operator Replacement"},BOD:{short_name:"BOD",full_name:"Bitwise Operator Deletion"},BOR:{short_name:"BOR",full_name:"Bitwise Operator Replacement"},COR:{short_name:"COR",full_name:"Comparison Operator Replacement"},EXS:{short_name:"EXS",full_name:"Except Handler"},LOD:{short_name:"LOD",full_name:"Logical Operator Deletion"},LOI:{short_name:"LOI",full_name:"Logical Operator Insertion"},LCR:{short_name:"LCR",full_name:"Logical Connector Replacement"},ROR:{short_name:"ROR",full_name:"Relational Operator Replacement"},BCR:{short_name:"BCR",full_name:" Break Continue Replacement"},SMD:{short_name:"SMD",full_name:"Statement Deletion"},FHD:{short_name:"FHD",full_name:"Finally Handler Deletion"},EXD:{short_name:"EXD",full_name:"Exception Disabling"},OIL:{short_name:"OIL",full_name:"One Iteration Loop"},RIL:{short_name:"RIL",full_name:"Reverse Iteration Loop"},ZIL:{short_name:"ZIL",full_name:"Zero Iteration Loop"},SSID:{short_name:"SSID",full_name:"Slice Start Index Deletion"},SEID:{short_name:"SEID",full_name:"Slice End Index Deletion"},STID:{short_name:"STID",full_name:"Slice Step Index Deletion"},SVD:{short_name:"SVD",full_name:"Self Variable Deletion"}}},279:function(e,t,n){e.exports=n(763)},284:function(e,t,n){},44:function(e,t,n){},69:function(e,t,n){},749:function(e,t,n){},751:function(e,t,n){},752:function(e,t,n){},763:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(20),i=n.n(l),o=(n(284),n(33)),u=n(34),s=n(36),c=n(35),m=n(37),d=(n(44),n(69),n(277)),p=n.n(d),h=n(267),f=n.n(h),v=n(268),E=n.n(v);var g=function(e){if(0===e.mutants.length)return null;var t=e.mutants.map(function(t,n){return{mutant_name:r.a.createElement("span",{className:"mutantName",onClick:function(){return e.mutantClickHandler(n)}},t.mutant_name),mutation_operator:f.a[t.mutation_operator].full_name,killed:String(t.killed),equivalent:String(t.equivalent),productive:String(t.productive)}});return r.a.createElement("div",{style:{maxWidth:"100%"},className:"topLevel"},r.a.createElement(E.a,{columns:[{title:"Mutant Name",field:"mutant_name"},{title:"Mutation Operator",field:"mutation_operator"},{title:"Killed",field:"killed"},{title:"Equivalent",field:"equivalent"},{title:"Productive",field:"productive"}],data:t,title:"Mutants Found"}))},b=n(767),_=n(766),y=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"makeCodePanel",value:function(e,t,n){return r.a.createElement(b.a,{showLineNumbers:!0,language:"python",style:_.a,wrapLines:"true",startingLineNumber:n,lineProps:function(e){if(t.includes(e))return{className:"mutation"}}},e)}},{key:"render",value:function(){var e=this,t=[this.props.mutant.mutated_lineno];return r.a.createElement("div",{style:{maxWidth:"100%"},className:"topLevel"},r.a.createElement("script",null,"hljs.initHighlightingOnLoad();"),r.a.createElement("div",{id:"container"},r.a.createElement("div",{className:"panel",id:"panel1"},r.a.createElement("h3",null,"Original Code"),this.makeCodePanel(this.props.mutant.unmutated_output,t.map(function(t){return t-e.props.mutant.mutated_output_lineno+1}),this.props.mutant.mutated_output_lineno)),r.a.createElement("div",{className:"panel",id:"panel2"},r.a.createElement("h3",null,"Mutant Code"),this.makeCodePanel(this.props.mutant.mutated_output,t.map(function(t){return t-e.props.mutant.unmutated_output_lineno+1}),this.props.mutant.unmutated_output_lineno)),r.a.createElement("div",{id:"clear"})))}}]),t}(r.a.Component),k=n(275),O=n(76),S=n.n(O),w=n(74),R=n.n(w),j=n(75),C=n.n(j),D=n(104),I=n.n(D),M=n(106),N=n.n(M),L=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(c.a)(t).call(this,e))).handleChange=function(e){return function(t){n.setState(Object(k.a)({},e,t.target.checked));var a=JSON.parse(JSON.stringify(n.props.mutant));a[e]=t.target.checked,n.props.updateSwitchHandler(a)}},n.state={productive:n.props.mutant.productive,equivalent:n.props.mutant.equivalent},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"createSwitch",value:function(e,t,n,a){return r.a.createElement(I.a,{control:r.a.createElement(N.a,{checked:e,onChange:this.handleChange(t),value:n}),label:a})}},{key:"render",value:function(){var e=this.props.mutant.killed?null:this.createSwitch(this.state.equivalent,"equivalent","equivalent","Equivalent"),t=this.createSwitch(this.state.productive,"productive","productive","Productive");return r.a.createElement(R.a,{component:"fieldset"},r.a.createElement(S.a,{component:"legend"},"This mutant is:"),r.a.createElement(C.a,null,e,t))}}]),t}(r.a.Component);var T=function(e){if(0===e.killers.length)return null;var t=e.killers.map(function(e,t){return r.a.createElement("li",{key:t},r.a.createElement("strong",null,e[0]),r.a.createElement("ul",null,r.a.createElement("li",null,e[1])))});return r.a.createElement("div",{className:"topLevel"},r.a.createElement("h4",null,"This mutant was killed by the following tests:"),r.a.createElement("ul",null,t))},q=(n(749),n(32)),x=function(e){function t(e){var n;if(Object(o.a)(this,t),(n=Object(s.a)(this,Object(c.a)(t).call(this,e))).pieRadius=50,n.pieMargin=10,n.colors={killed:"green",live:"red",equivalent:"yellow"},!n.props.mutants)throw'"mutants" not passed as a prop';return n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"extractSummaryInfo",value:function(){var e={};return e.killed=this.props.mutants.filter(function(e){return e.killed&&!e.equivalent}).length,e.equivalent=this.props.mutants.filter(function(e){return e.equivalent}).length,e.live=this.props.mutants.filter(function(e){return!e.killed&&!e.equivalent}).length,e.productive=this.props.mutants.filter(function(e){return e.productive}).length,e}},{key:"drawToolTip",value:function(e,t,n,a){q.d("#tooltip").style("left","".concat(e,"px")).style("top","".concat(t,"px")).style("background-color",this.colors[n.data[0]]).html("".concat(n.data[0],"<br/>").concat((100*n.data[1]/a).toFixed(1),"%")).style("display","inline")}},{key:"hideToolTip",value:function(){q.d("#tooltip").style("display","none")}},{key:"drawPieChart",value:function(){var e=this,t=q.d("div#pieChart").append("svg").attr("width",2*this.pieRadius+this.pieMargin).attr("height",2*this.pieRadius+this.pieMargin);q.d("div#pieChart").append("div").attr("id","tooltip");var n=t.append("g").attr("transform","translate(".concat(this.pieRadius+this.pieMargin/2,", ").concat(this.pieRadius+this.pieMargin/2,")")),a=q.c().value(function(e){return e[1]}),r=q.a().innerRadius(0).outerRadius(this.pieRadius),l=q.a().innerRadius(0).outerRadius(this.pieRadius+this.pieMargin/2),i=this.extractSummaryInfo(),o=this.props.mutants.length;delete i.productive,n.selectAll("arc").data(a(Object.entries(i))).enter().append("g").attr("class","arc").on("mouseover",function(e,t,n){q.d(n[t]).select("path").transition().duration(200).attr("d",l)}).on("mousemove",function(t,n,a){e.drawToolTip(q.b.pageX,q.b.pageY,t,o)}).on("mouseout",function(t,n,a){q.d(a[n]).select("path").transition().duration(200).attr("d",r),e.hideToolTip()}).append("path").attr("fill",function(t){return e.colors[t.data[0]]}).attr("d",r)}},{key:"componentDidMount",value:function(){this.drawPieChart()}},{key:"componentDidUpdate",value:function(e){this.props.mutants!==e.mutants&&(q.d("div#pieChart").select("svg").remove(),this.drawPieChart())}},{key:"createTableRows",value:function(e){if(!e.hasOwnProperty("killed")||!e.hasOwnProperty("equivalent")||!e.hasOwnProperty("live"))throw"Missing attributes from summaryInfo";var t=Object.entries(e),n=this.props.mutants.length,a=[];return t.forEach(function(e){var t=[];t.push(r.a.createElement("td",null,r.a.createElement("span",{id:e[0]},e[0]," mutants"))),t.push(r.a.createElement("td",null,e[1])),t.push(r.a.createElement("td",null,"".concat((100*e[1]/n).toFixed(1),"%"))),a.push(r.a.createElement("tr",null,t))}),a}},{key:"render",value:function(){var e=this.extractSummaryInfo();return r.a.createElement("div",{className:"topLevel"},r.a.createElement("div",{className:"sumPanel",id:"sumPanel1"},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null),r.a.createElement("th",null,"count"),r.a.createElement("th",null,"percent"))),r.a.createElement("tbody",null,this.createTableRows(e)))),r.a.createElement("div",{className:"sumPanel",id:"pieChart"}),r.a.createElement("div",{id:"clear"}))}}]),t}(r.a.Component),H=n(276),P=n.n(H),A=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(c.a)(t).call(this,e))).state={currentMutant:null},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"returnToTable",value:function(){this.setState({currentMutant:null})}},{key:"mutantClickHandler",value:function(e){this.setState({currentMutant:e})}},{key:"updateMutantHandler",value:function(e){this.props.updateMutantHandler(this.state.currentMutant,e)}},{key:"render",value:function(){if(null!==this.state.currentMutant){var e=this.props.mutants[this.state.currentMutant];return r.a.createElement("div",{className:"topLevel"},r.a.createElement(p.a,{className:"back-button",onClick:this.returnToTable.bind(this)}),r.a.createElement("br",null),r.a.createElement("h3",null,e.mutant_name),r.a.createElement(y,{mutant:e}),r.a.createElement(L,{mutant:e,updateSwitchHandler:this.updateMutantHandler.bind(this)}),r.a.createElement(T,{killers:e.killers}))}return this.props.mutants.length>0?r.a.createElement("div",{className:"topLevel"},r.a.createElement("div",{id:"save-file"},r.a.createElement("button",null,r.a.createElement(P.a,{file:"mutation_data.json",content:JSON.stringify(this.props.mutants)},"Save Mutation Data"))),r.a.createElement("div",{id:"summary"},r.a.createElement(x,{mutants:this.props.mutants})),r.a.createElement(g,{mutants:this.props.mutants,mutantClickHandler:this.mutantClickHandler.bind(this)})):null}}]),t}(r.a.Component),F=n(67),B=(n(751),'[\n    {\n        "mutated_lineno": <int>,            // The line number of the original code that was mutated\n        "mutated_output": <string>,         // Mutant code snippet\n        "productive": <boolean>,            // Indicates whether or not it was productive\n        "mutation_operator": <string>,      // The applied mutation operator\n        "equivalent": <boolean>,            // Indicates whether or not the mutant is equivalent\n        "mutated_output_lineno": <int>,     // The starting line number for the mutated code snippet\n        "unmutated_output": <string>,       // Original code snipped\n        "killers": [                        // Array of the tests that killed the mutant\n            [\n                <string>,                   // Name of failed test\n                <string>                    // Error message/traceback\n            ],\n            ...\n        ],\n        "unmutated_output_lineno": <int>,   // Starting line number for the original code snippet\n        "mutant_name": <string>,            // Unique name for the mutant\n        "killed": <boolean>,                // Indicates whether or not the mutant was killed\n        "mutated_ast_node": <string>        // Name of the mutated AST Node\n    },\n    ...\n]'),J="Welcome to the Mutation-Visualization tool. This project was created by students in CSE P 590 at the University of Washington in Spring 2019 for their class project.",U='Start by uploading a .json file in the prescribed format below. The tool will display a table consisting of all the mutants described in the input file and allow you to inspect the mutation and mark them as "equivalent" and/or "productive". The main page will also display overall facts about the mutants including how many have been killed, are live and are equivalent. At any time you can download the file with your changes by clicking the "Save Mutation Data" button.';var W=function(){return r.a.createElement("div",null,r.a.createElement("div",{id:"text"},r.a.createElement("p",null,J),r.a.createElement("h2",null,"Usage"),r.a.createElement("p",null,U)),r.a.createElement("h2",null,"Data Format"),r.a.createElement("div",{id:"code"},r.a.createElement("pre",null,r.a.createElement("code",null,B))),r.a.createElement("br",null))},V=(n(752),{type:"object",properties:{mutant_name:{type:"string"},killed:{type:"boolean"},killers:{type:"array",items:{type:"array",items:{type:"string"}}},equivalent:{type:"boolean"},productive:{type:"boolean"},mutated_lineno:{type:"integer"},mutated_output:{type:"string"},mutated_output_lineno:{type:"integer"},unmutated_output:{type:"string"},unmutated_output_lineno:{type:"integer"},mutation_operator:{type:"string"},mutated_ast_node:{type:"string"}},required:["mutant_name","killed","killers","equivalent","productive","mutated_lineno","mutated_output","mutated_output_lineno","unmutated_output","unmutated_output_lineno","mutation_operator","mutated_ast_node"]}),X=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(c.a)(t).call(this,e))).handleUpload=n.handleUpload.bind(Object(F.a)(n)),n.handleFileRead=n.handleFileRead.bind(Object(F.a)(n)),n.setFileInput=n.setFileInput.bind(Object(F.a)(n)),n.fileReader=new FileReader,n.fileReader.onloadend=n.handleFileRead,n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"setFileInput",value:function(e){this.fileInput=e}},{key:"handleFileRead",value:function(){var e;try{e=JSON.parse(this.fileReader.result)}catch(o){return void this.props.logError(o)}if(Array.isArray(e))if(0===e.length)this.props.logError("Uploaded array is empty");else{for(var t=n(753).validate,a=0;a<e.length;a++){var r=e[a];if(t(r,V).errors.length>0)return void this.props.logError("mutant ".concat(a," does not follow JSON format"));if(r.killed&&0==r.killers.length)return void this.props.logError("mutant ".concat(a," marked as killed but has no killers"));if(!r.killed&&r.killers.length>0)return void this.props.logError("mutant ".concat(a," marked as unkilled but has killers"));if(r.killed&&r.equivalent)return void this.props.logError("mutant ".concat(a," marked as killed so cannot be equivalent"));for(var l=0;l<r.killers.length;l++){var i=r.killers[l];if(!i||2!==i.length)return void this.props.logError("mutant ".concat(a," killers array improperly formatted"))}}this.props.setMutantsHandler(e),this.props.clearError()}else this.props.logError("Top level json object must be an array")}},{key:"handleUpload",value:function(e){e.preventDefault(),this.fileInput.files.length>0?this.fileReader.readAsText(this.fileInput.files[0]):this.props.logError("No files selected")}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"file-upload"},r.a.createElement("div",{id:"file-upload-form"},r.a.createElement("form",{onSubmit:this.handleUpload},r.a.createElement("input",{ref:function(t){e.setFileInput(t)},type:"file"}),r.a.createElement("button",null,"Upload"))),r.a.createElement(W,null))}}]),t}(r.a.Component),Z=n(278),z=n.n(Z),K=n(54);n(762);function Y(e){return r.a.createElement("div",{id:"error"},r.a.createElement(z.a,{onClick:e.clearError})," ",e.message)}var $=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(c.a)(t).call(this,e))).state={mutants:[],error:null,tabIndex:0},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"logError",value:function(e){this.setState({error:e})}},{key:"clearError",value:function(){this.setState({error:null})}},{key:"createErrorMessage",value:function(){if(this.state.error)return r.a.createElement("div",null,r.a.createElement(Y,{message:this.state.error.toString(),clearError:this.clearError.bind(this)}))}},{key:"setMutantsHandler",value:function(e){var t=JSON.parse(JSON.stringify(e));this.setState({mutants:t}),this.setState({tabIndex:1})}},{key:"updateMutantHandler",value:function(e,t){var n=JSON.parse(JSON.stringify(this.state.mutants));n[e]=t,this.setState({mutants:n})}},{key:"renderBody",value:function(){var e=this;return r.a.createElement(K.d,{selectedIndex:this.state.tabIndex,onSelect:function(t){return e.setState({tabIndex:t})}},r.a.createElement(K.b,null,r.a.createElement(K.a,null,"Upload Mutation Data"),this.state.mutants.length?r.a.createElement(K.a,null,"Explore Mutation Data"):null),r.a.createElement(K.c,null,r.a.createElement(X,{setMutantsHandler:this.setMutantsHandler.bind(this),logError:this.logError.bind(this),clearError:this.clearError.bind(this)})),this.state.mutants.length?r.a.createElement(K.c,null,r.a.createElement(A,{mutants:this.state.mutants,updateMutantHandler:this.updateMutantHandler.bind(this)})):null)}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{id:"site-header"},r.a.createElement("h1",null,"Mutation Testing Visualization Tool")),this.createErrorMessage(),this.renderBody())}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement($,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[279,1,2]]]);
//# sourceMappingURL=main.83ea2990.chunk.js.map
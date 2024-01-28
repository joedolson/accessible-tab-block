!function(){"use strict";var e,t={234:function(){var e=window.wp.element,t=window.wp.blocks,a=JSON.parse('{"apiVersion":2,"name":"tb/tabs","version":"1.0.0","title":"Accessible Tab Block","category":"tb-block","description":"Display content in accessible tabpanels","supports":{"html":false,"anchor":false,"customClassName":false},"attributes":{"uniqueId":{"type":"string"},"tabLabelsArray":{"type":"array","default":[]},"updateChild":{"type":"boolean","default":false},"anchorId":{"type":"string"},"customClass":{"type":"string"}},"textdomain":"tabs-block","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}'),l=window.wp.i18n,n=window.wp.blockEditor,r=window.wp.components,o=window.wp.data;const{__:__}=wp.i18n,{registerBlockType:s}=wp.blocks;s("tb/tab",{title:__("Tab","tabs-block"),description:__("Holds tabpanel content.","tabs-block"),supports:{html:!1,customClassName:!1},icon:{foreground:"#555",src:"text"},parent:["tb/tabs"],category:"tb-block",keywords:[__("tab","tabs-block"),__("tabs","tabs-block")],attributes:{tabLabel:{type:"string",default:""},blockIndex:{type:"number",default:""}},edit:t=>{let{className:a,attributes:l,setAttributes:r,clientId:s}=t;const{tabLabel:c,blockIndex:b}=l,i=wp.data.select("core/block-editor").getBlockParentsByBlockName(s,["tb/tabs"]),d=b,u=wp.data.select("core/block-editor").getBlockOrder(i).indexOf(s),p=(0,o.subscribe)((()=>{const e=wp.data.select("core/block-editor").getBlockOrder(i).indexOf(s);e!==d&&(p(),r({blockIndex:e}),wp.data.dispatch("core/block-editor").updateBlockAttributes(i,{updateChild:!0}))})),m=[["core/group",{},[["core/heading",{placeholder:__("Tabpanel Content","tabs-block")}],["core/paragraph"]]]];return(0,e.createElement)("div",{className:a},(0,e.createElement)("label",{"aria-hidden":"true"},__("Tab Label","tabs-block")),(0,e.createElement)(n.RichText,{tagName:"p",className:"tb__tab_label",value:c,onChange:e=>{r({tabLabel:e}),r({blockIndex:u}),wp.data.dispatch("core/block-editor").updateBlockAttributes(i,{updateChild:!0})},placeholder:__("Tab Label","tabs-block")}),(0,e.createElement)("div",{className:"tb__inner_blocks "+a+"_inner"},(0,e.createElement)(n.InnerBlocks,{allowedBlocks:!0,template:m})))},save:t=>{let{attributes:a}=t;const{tabLabel:l}=a;return(0,e.createElement)("div",{className:"tb__tab-panel",role:"tabpanel"},(0,e.createElement)(n.InnerBlocks.Content,null))}});const{Fragment:c}=wp.element,b=["tb/tab"];function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},i.apply(this,arguments)}const{RawHTML:d}=wp.element;(0,t.registerBlockType)(a,{icon:{src:(0,e.createElement)("svg",{width:"17px",height:"17px",viewBox:"0 0 17 17",version:"1.1"},(0,e.createElement)("path",{d:"M6 1v1h-6v4h1v4h5v6.018h11v-15.018h-11zM2 6h4v1h-4v-1zM2 9v-1h4v1h-4zM16 15.018h-9v-10.018h-6v-2h6v-1h9v13.018z",fill:"#000"})),foreground:"#000"},edit:function(t){let{attributes:a,setAttributes:s,clientId:i}=t;const{tabLabelsArray:d,updateChild:u,customClass:p,anchorId:m}=a,h=(()=>{const e=i,{innerBlockCount:t}=(0,o.useSelect)((t=>({innerBlockCount:t("core/block-editor").getBlockCount(e)}))),a=[];for(let l=0;l<t;l++){const t=wp.data.select("core/block-editor").getBlocks(e)[l].attributes.tabLabel;a.push(t)}return a})();return(h.length!==d.length||u)&&(s({tabLabelsArray:h}),s({updateChild:!1})),(0,e.createElement)(c,null,(0,e.createElement)(n.InspectorControls,null,(0,e.createElement)(r.TabPanel,{className:"tb__tabs",activeClass:"active_tab",initialTabName:"tb__advanced",tabs:[{name:"tb__advanced",title:(0,l.__)("Settings","tabs-block"),className:"tb__tab"}]},(t=>{if("tb__advanced"===t.name)return(0,e.createElement)(c,null,(0,e.createElement)(r.PanelBody,{title:(0,l.__)("Miscellaneous","tab-blocks"),initialOpen:!0},(0,e.createElement)(r.TextControl,{label:(0,l.__)("HTML Anchor ID","tab-blocks"),value:m,onChange:e=>s({anchorId:e.replace(/[^a-zA-Z0-9_-]/g,"-")}),help:(0,l.__)("Anchor ID lets you link directly to a section on a page.","tab-blocks")}),(0,e.createElement)(r.TextControl,{label:(0,l.__)("Additional Class(es)","tab-block"),value:p,onChange:e=>s({customClass:e}),help:(0,l.__)("Use space to separate multiple classes.","tab-block")})))}))),(0,e.createElement)(n.InnerBlocks,{allowedBlocks:b,template:[["tb/tab"]]}))},save:function(t){let{attributes:a}=t;const{tabLabelsArray:l,customClass:r,anchorId:o}=a,s=n.useBlockProps.save({className:"tb__tabs_accessible_tabs "+r});return(0,e.createElement)("div",i({},s,{id:o||null}),(0,e.createElement)("ul",{className:"tb__tab-labels",role:"tablist"},l.map(((t,a)=>(0,e.createElement)("li",{key:a},(0,e.createElement)("button",{className:0===a?"tb__tab-label active":"tb__tab-label",role:"tab","aria-selected":0===a?"true":"false"},(0,e.createElement)(d,null,t)))))),(0,e.createElement)("div",{className:"tb__tab-content"},(0,e.createElement)(n.InnerBlocks.Content,null)))}})}},a={};function l(e){var n=a[e];if(void 0!==n)return n.exports;var r=a[e]={exports:{}};return t[e](r,r.exports,l),r.exports}l.m=t,e=[],l.O=function(t,a,n,r){if(!a){var o=1/0;for(i=0;i<e.length;i++){a=e[i][0],n=e[i][1],r=e[i][2];for(var s=!0,c=0;c<a.length;c++)(!1&r||o>=r)&&Object.keys(l.O).every((function(e){return l.O[e](a[c])}))?a.splice(c--,1):(s=!1,r<o&&(o=r));if(s){e.splice(i--,1);var b=n();void 0!==b&&(t=b)}}return t}r=r||0;for(var i=e.length;i>0&&e[i-1][2]>r;i--)e[i]=e[i-1];e[i]=[a,n,r]},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={70:0,50:0};l.O.j=function(t){return 0===e[t]};var t=function(t,a){var n,r,o=a[0],s=a[1],c=a[2],b=0;if(o.some((function(t){return 0!==e[t]}))){for(n in s)l.o(s,n)&&(l.m[n]=s[n]);if(c)var i=c(l)}for(t&&t(a);b<o.length;b++)r=o[b],l.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return l.O(i)},a=self.webpackChunkgutenberg_boilerplate=self.webpackChunkgutenberg_boilerplate||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var n=l.O(void 0,[50],(function(){return l(234)}));n=l.O(n)}();
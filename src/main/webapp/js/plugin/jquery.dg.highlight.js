/**
 * jQuery ParkTaeJin highlight V1.0.0
 * based on highlight: JavaScript text higlighting jQuery plugin - 4
*/

$.fn.dg_highlight=function(a){function b(g,d){var l=0;if(g.nodeType==3){var k=g.data.toUpperCase().indexOf(d);if(k>=0){var e=document.createElement("mark");e.className="highlight";var h=g.splitText(k);var c=h.splitText(d.length);var f=h.cloneNode(true);e.appendChild(f);h.parentNode.replaceChild(e,h);l=1}}else{if(g.nodeType==1&&g.childNodes&&!/(script|style)/i.test(g.tagName)){for(var j=0;j<g.childNodes.length;++j){j+=b(g.childNodes[j],d)}}}return l}return this.length&&a&&a.length?this.each(function(){b(this,a.toUpperCase())}):this};$.fn.remove_dg_Highlight=function(){return this.find("mark.highlight").each(function(){this.parentNode.firstChild.nodeName;with(this.parentNode){replaceChild(this.firstChild,this);normalize()}}).end()};

define("ace/mode/xquery",function(a,b,c){var d=a("ace/lib/oop"),e=a("ace/mode/text").Mode,f=a("ace/tokenizer").Tokenizer,g=a("ace/mode/xquery_highlight_rules").XQueryHighlightRules,h=a("ace/mode/behaviour/xquery").XQueryBehaviour,i=a("ace/range").Range,j=function(a){this.$tokenizer=new f((new g).getRules()),this.$behaviour=new h(a)};d.inherits(j,e),function(){this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=b.match(/\s*(?:then|else|return|[{\(]|<\w+>)\s*$/);return e&&(d+=c),d},this.checkOutdent=function(a,b,c){return/^\s+$/.test(b)?/^\s*[\}\)]/.test(c):!1},this.autoOutdent=function(a,b,c){var d=b.getLine(c),e=d.match(/^(\s*[\}\)])/);if(!e)return 0;var f=e[1].length,g=b.findMatchingBracket({row:c,column:f});if(!g||g.row==c)return 0;var h=this.$getIndent(b.getLine(g.row));b.replace(new i(c,0,c,f-1),h)},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""},this.toggleCommentLines=function(a,b,c,d){var e,f,g=!0,h=/^\s*\(:(.*):\)/;for(e=c;e<=d;e++)if(!h.test(b.getLine(e))){g=!1;break}var j=new i(0,0,0,0);for(e=c;e<=d;e++)f=b.getLine(e),j.start.row=e,j.end.row=e,j.end.column=f.length,b.replace(j,g?f.match(h)[1]:"(:"+f+":)")}}.call(j.prototype),b.Mode=j}),define("ace/mode/behaviour/xml",function(a,b,c){var d=a("ace/lib/oop"),e=a("ace/mode/behaviour").Behaviour,f=a("ace/mode/behaviour/cstyle").CstyleBehaviour,g=a("ace/mode/behaviour/xquery").XQueryBehaviour,h=function(a){this.inherit(f,["braces","parens","string_dquotes"]),this.parent=a,this.add("brackets","insertion",function(a,b,c,d,e){if(e=="\n"){var f=c.getCursorPosition(),g=d.doc.getLine(f.row),h=g.substring(f.column,f.column+2);if(h=="</"){var i=this.$getIndent(d.doc.getLine(f.row))+d.getTabString(),j=this.$getIndent(d.doc.getLine(f.row));return{text:"\n"+i+"\n"+j,selection:[1,i.length,1,i.length]}}}return!1}),this.add("slash","insertion",function(b,c,d,e,f){if(f=="/"){var g=d.getCursorPosition(),h=e.doc.getLine(g.row);if(g.column>0&&h.charAt(g.column-1)=="<"){h=h.substring(0,g.column)+"/"+h.substring(g.column);var i=e.doc.getAllLines();i[g.row]=h,a.exec("closeTag",i.join(e.doc.getNewLineCharacter()),g.row)}}return!1})};d.inherits(h,e),b.XMLBehaviour=h}),define("ace/mode/xml",function(a,b,c){var d=a("ace/lib/oop"),e=a("ace/mode/xml").Mode,f=a("ace/tokenizer").Tokenizer,g=a("ace/mode/xml_highlight_rules").XmlHighlightRules,h=a("ace/mode/behaviour/xml").XMLBehaviour,i=a("ace/range").Range,j=function(a){this.$tokenizer=new f((new g).getRules()),this.$behaviour=new h(a)};d.inherits(j,e),function(){this.toggleCommentLines=function(a,b,c,d){var e,f,g=!0,h=/^\s*<!--(.*)-->/;for(e=c;e<=d;e++)if(!h.test(b.getLine(e))){g=!1;break}var j=new i(0,0,0,0);for(e=c;e<=d;e++)f=b.getLine(e),j.start.row=e,j.end.row=e,j.end.column=f.length,b.replace(j,g?f.match(h)[1]:"<!--"+f+"-->")}}.call(j.prototype),b.Mode=j}),define("ace/mode/html",function(a,b,c){var d=a("ace/lib/oop"),e=a("ace/mode/html").Mode,f=a("ace/tokenizer").Tokenizer,g=a("ace/mode/html_highlight_rules").HtmlHighlightRules,h=a("ace/mode/behaviour/xml").XMLBehaviour,i=a("ace/range").Range,j=function(a){this.$tokenizer=new f((new g).getRules()),this.$behaviour=new h(a)};d.inherits(j,e),function(){this.toggleCommentLines=function(a,b,c,d){var e,f,g=!0,h=/^\s*<!--(.*)-->/;for(e=c;e<=d;e++)if(!h.test(b.getLine(e))){g=!1;break}var j=new i(0,0,0,0);for(e=c;e<=d;e++)f=b.getLine(e),j.start.row=e,j.end.row=e,j.end.column=f.length,b.replace(j,g?f.match(h)[1]:"<!--"+f+"-->")}}.call(j.prototype),b.Mode=j}),define("ace/mode/xquery_highlight_rules",function(a,b,c){var d=a("../lib/oop"),e=a("../lib/lang"),f=a("ace/mode/text_highlight_rules").TextHighlightRules,g=function(){var a=e.arrayToMap("return|for|let|where|order|by|declare|function|variable|xquery|version|option|namespace|import|module|when|switch|default|try|catch|group|tumbling|sliding|window|start|end|at|only|using|stemming|while|if|then|else|as|and|or|typeswitch|case|ascending|descending|empty|in|count|updating|insert|delete|replace|value|node|attribute|text|element|into|of|with|contains".split("|"));this.$rules={start:[{token:"text",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:"xml_pe",regex:"<\\?.*?\\?>"},{token:"comment",regex:"<\\!--",next:"comment"},{token:"comment",regex:"\\(:",next:"comment"},{token:"text",regex:"<\\/?",next:"tag"},{token:"constant",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"variable",regex:"\\$[a-zA-Z_][a-zA-Z0-9_\\-:]*\\b"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.*?'"},{token:"text",regex:"\\s+"},{token:"support.function",regex:"\\w[\\w+_\\-:]+(?=\\()"},{token:function(b){return a[b]?"keyword":"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\*|=|<|>|\\-|\\+|and|or|eq|ne|lt|gt"},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"}],tag:[{token:"text",regex:">",next:"start"},{token:"keyword",regex:"[-_a-zA-Z0-9:]+"},{token:"text",regex:"\\s+"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.*?'"}],cdata:[{token:"text",regex:"\\]\\]>",next:"start"},{token:"text",regex:"\\s+"},{token:"text",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment",regex:".*?-->",next:"start"},{token:"comment",regex:".*:\\)",next:"start"},{token:"comment",regex:".+"}]}};d.inherits(g,f),b.XQueryHighlightRules=g}),define("ace/mode/behaviour/xquery",function(a,b,c){var d=a("ace/lib/oop"),e=a("ace/mode/behaviour").Behaviour,f=a("ace/mode/behaviour/cstyle").CstyleBehaviour,g=function(a){this.inherit(f,["braces","parens","string_dquotes"]),this.parent=a,this.add("brackets","insertion",function(a,b,c,d,e){if(e=="\n"){var f=c.getCursorPosition(),g=d.doc.getLine(f.row),h=g.substring(f.column,f.column+2);if(h=="</"){var i=this.$getIndent(d.doc.getLine(f.row))+d.getTabString(),j=this.$getIndent(d.doc.getLine(f.row));return{text:"\n"+i+"\n"+j,selection:[1,i.length,1,i.length]}}}return!1}),this.add("slash","insertion",function(b,c,d,e,f){if(f=="/"){var g=d.getCursorPosition(),h=e.doc.getLine(g.row);if(g.column>0&&h.charAt(g.column-1)=="<"){h=h.substring(0,g.column)+"/"+h.substring(g.column);var i=e.doc.getAllLines();i[g.row]=h,a.exec("closeTag",i.join(e.doc.getNewLineCharacter()),g.row)}}return!1})};d.inherits(g,e),b.XQueryBehaviour=g}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("../behaviour").Behaviour,f=function(){this.add("braces","insertion",function(a,b,c,d,e){if(e=="{"){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"{"+g+"}",selection:!1}:{text:"{}",selection:[1,1]}}if(e=="}"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var k=d.$findOpeningBracket("}",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}else if(e=="\n"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var l=d.findMatchingBracket({row:h.row,column:h.column+1});if(!l)return null;var m=this.getNextLineIndent(a,i.substring(0,i.length-1),d.getTabString()),n=this.$getIndent(d.doc.getLine(l.row));return{text:"\n"+m+"\n"+n,selection:[1,m.length,1,m.length]}}}}),this.add("braces","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="{"){var g=d.doc.getLine(e.start.row),h=g.substring(e.end.column,e.end.column+1);if(h=="}")return e.end.column++,e}}),this.add("parens","insertion",function(a,b,c,d,e){if(e=="("){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"("+g+")",selection:!1}:{text:"()",selection:[1,1]}}if(e==")"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j==")"){var k=d.$findOpeningBracket(")",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="("){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h==")")return e.end.column++,e}}),this.add("string_dquotes","insertion",function(a,b,c,d,e){if(e=='"'){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);if(g!=="")return{text:'"'+g+'"',selection:!1};var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column-1,h.column);if(j=="\\")return null;var k=d.getTokens(f.start.row,f.start.row)[0].tokens,l=0,m,n=-1;for(var o=0;o<k.length;o++){m=k[o],m.type=="string"?n=-1:n<0&&(n=m.value.indexOf('"'));if(m.value.length+l>f.start.column)break;l+=k[o].value.length}if(!m||n<0&&m.type!=="comment"&&(m.type!=="string"||f.start.column!==m.value.length+l-1&&m.value.lastIndexOf('"')===m.value.length-1))return{text:'""',selection:[1,1]};if(m&&m.type==="string"){var p=i.substring(h.column,h.column+1);if(p=='"')return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=='"'){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h=='"')return e.end.column++,e}})};d.inherits(f,e),b.CstyleBehaviour=f}),define("ace/mode/xml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/xml_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/xml"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./xml_highlight_rules").XmlHighlightRules,h=a("./behaviour/xml").XmlBehaviour,i=a("./folding/xml").FoldMode,j=function(){this.$tokenizer=new f((new g).getRules()),this.$behaviour=new h,this.foldingRules=new i};d.inherits(j,e),function(){this.getNextLineIndent=function(a,b,c){return this.$getIndent(b)}}.call(j.prototype),b.Mode=j}),define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/xml_util","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./xml_util"),f=a("./text_highlight_rules").TextHighlightRules,g=function(){this.$rules={start:[{token:"text",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:"xml_pe",regex:"<\\?.*?\\?>"},{token:"comment",merge:!0,regex:"<\\!--",next:"comment"},{token:"meta.tag",regex:"<\\/?",next:"tag"},{token:"text",regex:"\\s+"},{token:"text",regex:"[^<]+"}],cdata:[{token:"text",regex:"\\]\\]>",next:"start"},{token:"text",regex:"\\s+"},{token:"text",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment",regex:".*?-->",next:"start"},{token:"comment",merge:!0,regex:".+"}]},e.tag(this.$rules,"tag","start")};d.inherits(g,f),b.XmlHighlightRules=g}),define("ace/mode/xml_util",["require","exports","module","ace/lib/lang"],function(a,b,c){function g(a){return[{token:"string",regex:'".*?"'},{token:"string",merge:!0,regex:'["].*',next:a+"_qqstring"},{token:"string",regex:"'.*?'"},{token:"string",merge:!0,regex:"['].*",next:a+"_qstring"}]}function h(a,b){return[{token:"string",merge:!0,regex:".*?"+a,next:b},{token:"string",merge:!0,regex:".+"}]}"use strict";var d=a("../lib/lang"),e=d.arrayToMap("button|form|input|label|select|textarea".split("|")),f=d.arrayToMap("table|tbody|td|tfoot|th|tr".split("|"));b.tag=function(a,b,c){a[b]=[{token:"text",regex:"\\s+"},{token:function(a){return a==="a"?"meta.tag.anchor":a==="img"?"meta.tag.image":a==="script"?"meta.tag.script":a==="style"?"meta.tag.style":e.hasOwnProperty(a.toLowerCase())?"meta.tag.form":f.hasOwnProperty(a.toLowerCase())?"meta.tag.table":"meta.tag"},merge:!0,regex:"[-_a-zA-Z0-9:!]+",next:b+"_embed_attribute_list"},{token:"empty",regex:"",next:b+"_embed_attribute_list"}],a[b+"_qstring"]=h("'",b+"_embed_attribute_list"),a[b+"_qqstring"]=h('"',b+"_embed_attribute_list"),a[b+"_embed_attribute_list"]=[{token:"meta.tag",merge:!0,regex:"/?>",next:c},{token:"keyword.operator",regex:"="},{token:"entity.other.attribute-name",regex:"[-_a-zA-Z0-9:]+"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"text",regex:"\\s+"}].concat(g(b))}}),define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("../behaviour").Behaviour,f=a("./cstyle").CstyleBehaviour,g=function(){this.inherit(f,["string_dquotes"]),this.add("brackets","insertion",function(a,b,c,d,e){if(e=="<"){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?!1:{text:"<>",selection:[1,1]}}if(e==">"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j==">")return{text:"",selection:[1,1]}}else if(e=="\n"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),k=i.substring(h.column,h.column+2);if(k=="</"){var l=this.$getIndent(d.doc.getLine(h.row))+d.getTabString(),m=this.$getIndent(d.doc.getLine(h.row));return{text:"\n"+l+"\n"+m,selection:[1,l.length,1,l.length]}}}})};d.inherits(g,e),b.XmlBehaviour=g}),define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/range","ace/mode/folding/fold_mode","ace/token_iterator"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("../../lib/lang"),f=a("../../range").Range,g=a("./fold_mode").FoldMode,h=a("../../token_iterator").TokenIterator,i=b.FoldMode=function(a){g.call(this),this.voidElements=a||{}};d.inherits(i,g),function(){this.getFoldWidget=function(a,b,c){var d=this._getFirstTagInLine(a,c);return d.closing?b=="markbeginend"?"end":"":!d.tagName||this.voidElements[d.tagName.toLowerCase()]?"":d.selfClosing?"":d.value.indexOf("/"+d.tagName)!==-1?"":"start"},this._getFirstTagInLine=function(a,b){var c=a.getTokens(b,b)[0].tokens,d="";for(var f=0;f<c.length;f++){var g=c[f];g.type.indexOf("meta.tag")===0?d+=g.value:d+=e.stringRepeat(" ",g.value.length)}return this._parseTag(d)},this.tagRe=/^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/,this._parseTag=function(a){var b=this.tagRe.exec(a),c=this.tagRe.lastIndex||0;return this.tagRe.lastIndex=0,{value:a,match:b?b[2]:"",closing:b?!!b[3]:!1,selfClosing:b?!!b[5]||b[2]=="/>":!1,tagName:b?b[4]:"",column:b[1]?c+b[1].length:c}},this._readTagForward=function(a){var b=a.getCurrentToken();if(!b)return null;var c="",d;do if(b.type.indexOf("meta.tag")===0){if(!d)var d={row:a.getCurrentTokenRow(),column:a.getCurrentTokenColumn()};c+=b.value;if(c.indexOf(">")!==-1){var e=this._parseTag(c);return e.start=d,e.end={row:a.getCurrentTokenRow(),column:a.getCurrentTokenColumn()+b.value.length},a.stepForward(),e}}while(b=a.stepForward());return null},this._readTagBackward=function(a){var b=a.getCurrentToken();if(!b)return null;var c="",d;do if(b.type.indexOf("meta.tag")===0){d||(d={row:a.getCurrentTokenRow(),column:a.getCurrentTokenColumn()+b.value.length}),c=b.value+c;if(c.indexOf("<")!==-1){var e=this._parseTag(c);return e.end=d,e.start={row:a.getCurrentTokenRow(),column:a.getCurrentTokenColumn()},a.stepBackward(),e}}while(b=a.stepBackward());return null},this._pop=function(a,b){while(a.length){var c=a[a.length-1];if(!b||c.tagName==b.tagName)return a.pop();if(this.voidElements[b.tagName])return;if(this.voidElements[c.tagName]){a.pop();continue}return null}},this.getFoldWidgetRange=function(a,b,c){var d=this._getFirstTagInLine(a,c);if(!d.match)return null;var e=d.closing||d.selfClosing,g=[],i;if(!e){var j=new h(a,c,d.column),k={row:c,column:d.column+d.tagName.length+2};while(i=this._readTagForward(j)){if(i.selfClosing){if(!g.length)return i.start.column+=i.tagName.length+2,i.end.column-=2,f.fromPoints(i.start,i.end);continue}if(i.closing){this._pop(g,i);if(g.length==0)return f.fromPoints(k,i.start)}else g.push(i)}}else{var j=new h(a,c,d.column+d.match.length),l={row:c,column:d.column};while(i=this._readTagBackward(j)){if(i.selfClosing){if(!g.length)return i.start.column+=i.tagName.length+2,i.end.column-=2,f.fromPoints(i.start,i.end);continue}if(!i.closing){this._pop(g,i);if(g.length==0)return i.start.column+=i.tagName.length+2,f.fromPoints(i.start,l)}else g.push(i)}}}}.call(i.prototype)}),define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(a,b,c){"use strict";var d=a("../../range").Range,e=b.FoldMode=function(){};((function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(a,b,c){var d=a.getLine(c);return this.foldingStartMarker.test(d)?"start":b=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(d)?"end":""},this.getFoldWidgetRange=function(a,b,c){return null},this.indentationBlock=function(a,b,c){var e=/^\s*/,f=b,g=b,h=a.getLine(b),i=c||h.length,j=h.match(e)[0].length,k=a.getLength();while(++b<k){h=a.getLine(b);var l=h.match(e)[0].length;if(l==h.length)continue;if(l<=j)break;g=b}if(g>f){var m=a.getLine(g).length;return new d(f,i,g,m)}},this.openingBracketBlock=function(a,b,c,e){var f={row:c,column:e+1},g=a.$findClosingBracket(b,f);if(!g)return;var h=a.foldWidgets[g.row];return h==null&&(h=this.getFoldWidget(a,g.row)),h=="start"&&(g.row--,g.column=a.getLine(g.row).length),d.fromPoints(f,g)}})).call(e.prototype)}),define("ace/mode/html",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript","ace/mode/css","ace/tokenizer","ace/mode/html_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/html"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text").Mode,f=a("./javascript").Mode,g=a("./css").Mode,h=a("../tokenizer").Tokenizer,i=a("./html_highlight_rules").HtmlHighlightRules,j=a("./behaviour/xml").XmlBehaviour,k=a("./folding/html").FoldMode,l=function(){var a=new i;this.$tokenizer=new h(a.getRules()),this.$behaviour=new j,this.$embeds=a.getEmbeds(),this.createModeDelegates({"js-":f,"css-":g}),this.foldingRules=new k};d.inherits(l,e),function(){this.toggleCommentLines=function(a,b,c,d){return 0},this.getNextLineIndent=function(a,b,c){return this.$getIndent(b)},this.checkOutdent=function(a,b,c){return!1}}.call(l.prototype),b.Mode=l}),define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./javascript_highlight_rules").JavaScriptHighlightRules,h=a("./matching_brace_outdent").MatchingBraceOutdent,i=a("../range").Range,j=a("../worker/worker_client").WorkerClient,k=a("./behaviour/cstyle").CstyleBehaviour,l=a("./folding/cstyle").FoldMode,m=function(){this.$tokenizer=new f((new g).getRules()),this.$outdent=new h,this.$behaviour=new k,this.foldingRules=new l};d.inherits(m,e),function(){this.toggleCommentLines=function(a,b,c,d){var e=!0,f=/^(\s*)\/\//;for(var g=c;g<=d;g++)if(!f.test(b.getLine(g))){e=!1;break}if(e){var h=new i(0,0,0,0);for(var g=c;g<=d;g++){var j=b.getLine(g),k=j.match(f);h.start.row=g,h.end.row=g,h.end.column=k[0].length,b.replace(h,k[1])}}else b.indentRows(c,d,"//")},this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a),f=e.tokens,g=e.state;if(f.length&&f[f.length-1].type=="comment")return d;if(a=="start"||a=="regex_allowed"){var h=b.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);h&&(d+=c)}else if(a=="doc-start"){if(g=="start"||a=="regex_allowed")return"";var h=b.match(/^\s*(\/?)\*/);h&&(h[1]&&(d+=" "),d+="* ")}return d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){var b=new j(["ace"],"worker-javascript.js","ace/mode/javascript_worker","JavaScriptWorker");return b.attachToDocument(a.getDocument()),b.on("jslint",function(b){var c=[];for(var d=0;d<b.data.length;d++){var e=b.data[d];e&&c.push({row:e.line-1,column:e.character-1,text:e.reason,type:"warning",lint:e})}a.setAnnotations(c)}),b.on("narcissus",function(b){a.setAnnotations([b.data])}),b.on("terminate",function(){a.clearAnnotations()}),b}}.call(m.prototype),b.Mode=m}),define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/unicode","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("../lib/lang"),f=a("../unicode"),g=a("./doc_comment_highlight_rules").DocCommentHighlightRules,h=a("./text_highlight_rules").TextHighlightRules,i=function(){var a=e.arrayToMap("Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document".split("|")),b=e.arrayToMap("break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|const|yield|import|get|set".split("|")),c="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield",d=e.arrayToMap("__parent__|__count__|escape|unescape|with|__proto__".split("|")),h=e.arrayToMap("const|let|var|function".split("|")),i=e.arrayToMap("null|Infinity|NaN|undefined".split("|")),j=e.arrayToMap("class|enum|extends|super|export|implements|private|public|interface|package|protected|static".split("|")),k="["+f.packages.L+"\\$_]["+f.packages.L+f.packages.Mn+f.packages.Mc+f.packages.Nd+f.packages.Pc+"\\$_]*\\b";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},(new g).getStartRule("doc-start"),{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",merge:!0,regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",merge:!0,regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:["keyword.definition","text","entity.name.function"],regex:"(function)(\\s+)("+k+")"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"keyword",regex:"(?:"+c+")\\b",next:"regex_allowed"},{token:function(c){return a.hasOwnProperty(c)?"variable.language":d.hasOwnProperty(c)?"invalid.deprecated":h.hasOwnProperty(c)?"keyword.definition":b.hasOwnProperty(c)?"keyword":i.hasOwnProperty(c)?"constant.language":j.hasOwnProperty(c)?"invalid.illegal":c=="debugger"?"invalid.deprecated":"identifier"},regex:k},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)",next:"regex_allowed"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\.",next:"regex_allowed"},{token:"paren.lparen",regex:"[[({]",next:"regex_allowed"},{token:"paren.rparen",regex:"[\\])}]"},{token:"keyword.operator",regex:"\\/=?",next:"regex_allowed"},{token:"comment",regex:"^#!.*$"},{token:"text",regex:"\\s+"}],regex_allowed:[{token:"comment",merge:!0,regex:"\\/\\*",next:"comment_regex_allowed"},{token:"comment",regex:"\\/\\/.*$"},{token:"string.regexp",regex:"\\/",next:"regex",merge:!0},{token:"text",regex:"\\s+"},{token:"empty",regex:"",next:"start"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)",next:"regex"},{token:"string.regexp",regex:"/\\w*",next:"start",merge:!0},{token:"string.regexp",regex:"[^\\\\/\\[]+",next:"regex",merge:!0},{token:"string.regexp.charachterclass",regex:"\\[",next:"regex_character_class",merge:!0},{token:"empty",regex:"",next:"start"}],regex_character_class:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)",next:"regex_character_class"},{token:"string.regexp.charachterclass",regex:"]",next:"regex",merge:!0},{token:"string.regexp.charachterclass",regex:"[^\\\\\\]]+",next:"regex_character_class",merge:!0},{token:"empty",regex:"",next:"start"}],comment_regex_allowed:[{token:"comment",regex:".*?\\*\\/",merge:!0,next:"regex_allowed"},{token:"comment",merge:!0,regex:".+"}],comment:[{token:"comment",regex:".*?\\*\\/",merge:!0,next:"start"},{token:"comment",merge:!0,regex:".+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",merge:!0,regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",merge:!0,regex:".+"}]},this.embedRules(g,"doc-",[(new g).getEndRule("start")])};d.inherits(i,h),b.JavaScriptHighlightRules=i}),define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text_highlight_rules").TextHighlightRules,f=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc",merge:!0,regex:"\\s+"},{token:"comment.doc",merge:!0,regex:"TODO"},{token:"comment.doc",merge:!0,regex:"[^@\\*]+"},{token:"comment.doc",merge:!0,regex:"."}]}};d.inherits(f,e),function(){this.getStartRule=function(a){return{token:"comment.doc",merge:!0,regex:"\\/\\*(?=\\*)",next:a}},this.getEndRule=function(a){return{token:"comment.doc",merge:!0,regex:"\\*\\/",next:a}}}.call(f.prototype),b.DocCommentHighlightRules=f}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){"use strict";var d=a("../range").Range,e=function(){};((function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""}})).call(e.prototype),b.MatchingBraceOutdent=e}),define("ace/worker/worker_client",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("../lib/event_emitter").EventEmitter,f=function(b,d,e,f){this.changeListener=this.changeListener.bind(this);if(c.packaged){var g=this.$guessBasePath();this.$worker=new Worker(g+d)}else{var h=this.$normalizePath(a.nameToUrl("ace/worker/worker",null,"_"));this.$worker=new Worker(h);var i={};for(var j=0;j<b.length;j++){var k=b[j],l=this.$normalizePath(a.nameToUrl(k,null,"_").replace(/.js$/,""));i[k]=l}}this.$worker.postMessage({init:!0,tlns:i,module:e,classname:f}),this.callbackId=1,this.callbacks={};var m=this;this.$worker.onerror=function(a){throw window.console&&console.log&&console.log(a),a},this.$worker.onmessage=function(a){var b=a.data;switch(b.type){case"log":window.console&&console.log&&console.log(b.data);break;case"event":m._emit(b.name,{data:b.data});break;case"call":var c=m.callbacks[b.id];c&&(c(b.data),delete m.callbacks[b.id])}}};((function(){d.implement(this,e),this.$normalizePath=function(a){return a=a.replace(/^[a-z]+:\/\/[^\/]+\//,""),a=location.protocol+"//"+location.host+(a.charAt(0)=="/"?"":location.pathname.replace(/\/[^\/]*$/,""))+"/"+a.replace(/^[\/]+/,""),a},this.$guessBasePath=function(){if(a.aceBaseUrl)return a.aceBaseUrl;var b=document.getElementsByTagName("script");for(var c=0;c<b.length;c++){var d=b[c],e=d.getAttribute("data-ace-base");if(e)return e.replace(/\/*$/,"/");var f=d.src||d.getAttribute("src");if(!f)continue;var g=f.match(/^(?:(.*\/)ace\.js|(.*\/)ace(-uncompressed)?(-noconflict)?\.js)(?:\?|$)/);if(g)return g[1]||g[2]}return""},this.terminate=function(){this._emit("terminate",{}),this.$worker.terminate(),this.$worker=null,this.$doc.removeEventListener("change",this.changeListener),this.$doc=null},this.send=function(a,b){this.$worker.postMessage({command:a,args:b})},this.call=function(a,b,c){if(c){var d=this.callbackId++;this.callbacks[d]=c,b.push(d)}this.send(a,b)},this.emit=function(a,b){try{this.$worker.postMessage({event:a,data:{data:b.data}})}catch(c){}},this.attachToDocument=function(a){this.$doc&&this.terminate(),this.$doc=a,this.call("setValue",[a.getValue()]),a.on("change",this.changeListener)},this.changeListener=function(a){a.range={start:a.data.range.start,end:a.data.range.end},this.emit("change",a)}})).call(f.prototype),b.WorkerClient=f}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("../../range").Range,f=a("./fold_mode").FoldMode,g=b.FoldMode=function(){};d.inherits(g,f),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(a,b,c){var d=a.getLine(c),f=d.match(this.foldingStartMarker);if(f){var g=f.index;if(f[1])return this.openingBracketBlock(a,f[1],c,g);var h=a.getCommentFoldRange(c,g+f[0].length);return h.end.column-=2,h}if(b!=="markbeginend")return;var f=d.match(this.foldingStopMarker);if(f){var g=f.index+f[0].length;if(f[2]){var h=a.getCommentFoldRange(c,g);return h.end.column-=2,h}var i={row:c,column:g},j=a.$findOpeningBracket(f[1],i);if(!j)return;return j.column++,i.column--,e.fromPoints(j,i)}}}.call(g.prototype)}),define("ace/mode/css",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/css_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client","ace/mode/folding/cstyle"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./css_highlight_rules").CssHighlightRules,h=a("./matching_brace_outdent").MatchingBraceOutdent,i=a("../worker/worker_client").WorkerClient,j=a("./folding/cstyle").FoldMode,k=function(){this.$tokenizer=new f((new g).getRules(),"i"),this.$outdent=new h,this.foldingRules=new j};d.inherits(k,e),function(){this.foldingRules="cStyle",this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a).tokens;if(e.length&&e[e.length-1].type=="comment")return d;var f=b.match(/^.*\{\s*$/);return f&&(d+=c),d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){var b=new i(["ace"],"worker-css.js","ace/mode/css_worker","Worker");return b.attachToDocument(a.getDocument()),b.on("csslint",function(b){var c=[];b.data.forEach(function(a){c.push({row:a.line-1,column:a.col-1,text:a.message,type:a.type,lint:a})}),a.setAnnotations(c)}),b}}.call(k.prototype),b.Mode=k}),define("ace/mode/css_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("../lib/lang"),f=a("./text_highlight_rules").TextHighlightRules,g=function(){var a=e.arrayToMap("-moz-appearance|-moz-box-sizing|-webkit-box-sizing|-moz-outline-radius|-moz-transform|-webkit-transform|appearance|azimuth|background-attachment|background-color|background-image|background-origin|background-position|background-repeat|background|border-bottom-color|border-bottom-style|border-bottom-width|border-bottom|border-collapse|border-color|border-left-color|border-left-style|border-left-width|border-left|border-right-color|border-right-style|border-right-width|border-right|border-spacing|border-style|border-top-color|border-top-style|border-top-width|border-top|border-width|border|bottom|box-sizing|caption-side|clear|clip|color|content|counter-increment|counter-reset|cue-after|cue-before|cue|cursor|direction|display|elevation|empty-cells|float|font-family|font-size-adjust|font-size|font-stretch|font-style|font-variant|font-weight|font|height|left|letter-spacing|line-height|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|marker-offset|margin|marks|max-height|max-width|min-height|min-width|-moz-border-radius|opacity|orphans|outline-color|outline-offset|outline-radius|outline-style|outline-width|outline|overflow|overflow-x|overflow-y|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page|pause-after|pause-before|pause|pitch-range|pitch|play-during|pointer-events|position|quotes|resize|richness|right|size|speak-header|speak-numeral|speak-punctuation|speech-rate|speak|stress|table-layout|text-align|text-decoration|text-indent|text-shadow|text-transform|top|transform|unicode-bidi|vertical-align|visibility|voice-family|volume|white-space|widows|width|word-spacing|z-index".split("|")),b=e.arrayToMap("rgb|rgba|url|attr|counter|counters".split("|")),c=e.arrayToMap("absolute|all-scroll|always|armenian|auto|baseline|below|bidi-override|block|bold|bolder|border-box|both|bottom|break-all|break-word|capitalize|center|char|circle|cjk-ideographic|col-resize|collapse|content-box|crosshair|dashed|decimal-leading-zero|decimal|default|disabled|disc|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ellipsis|fixed|georgian|groove|hand|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|inactive|inherit|inline-block|inline|inset|inside|inter-ideograph|inter-word|italic|justify|katakana-iroha|katakana|keep-all|left|lighter|line-edge|line-through|line|list-item|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|medium|middle|move|n-resize|ne-resize|newspaper|no-drop|no-repeat|nw-resize|none|normal|not-allowed|nowrap|oblique|outset|outside|overline|pointer|progress|relative|repeat-x|repeat-y|repeat|right|ridge|row-resize|rtl|s-resize|scroll|se-resize|separate|small-caps|solid|square|static|strict|super|sw-resize|table-footer-group|table-header-group|tb-rl|text-bottom|text-top|text|thick|thin|top|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|zero".split("|")),d=e.arrayToMap("aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow".split("|")),f="\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))",g=[{token:"comment",merge:!0,regex:"\\/\\*",next:"ruleset_comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:f+"(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)"},{token:"constant.numeric",regex:"#[a-f0-9]{6}"},{token:"constant.numeric",regex:"#[a-f0-9]{3}"},{token:function(e){return a.hasOwnProperty(e.toLowerCase())?"support.type":b.hasOwnProperty(e.toLowerCase())?"support.function":c.hasOwnProperty(e.toLowerCase())?"support.constant":d.hasOwnProperty(e.toLowerCase())?"support.constant.color":"text"},regex:"\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"}],h=e.copyArray(g);h.unshift({token:"paren.rparen",regex:"\\}",next:"start"});var i=e.copyArray(g);i.unshift({token:"paren.rparen",regex:"\\}",next:"media"});var j=[{token:"comment",merge:!0,regex:".+"}],k=e.copyArray(j);k.unshift({token:"comment",regex:".*?\\*\\/",next:"start"});var l=e.copyArray(j);l.unshift({token:"comment",regex:".*?\\*\\/",next:"media"});var m=e.copyArray(j);m.unshift({token:"comment",regex:".*?\\*\\/",next:"ruleset"}),this.$rules={start:[{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"paren.lparen",regex:"\\{",next:"ruleset"},{token:"string",regex:"@.*?{",next:"media"},{token:"keyword",regex:"#[a-z0-9-_]+"},{token:"variable",regex:"\\.[a-z0-9-_]+"},{token:"string",regex:":[a-z0-9-_]+"},{token:"constant",regex:"[a-z0-9-_]+"}],media:[{token:"comment",merge:!0,regex:"\\/\\*",next:"media_comment"},{token:"paren.lparen",regex:"\\{",next:"media_ruleset"},{token:"string",regex:"\\}",next:"start"},{token:"keyword",regex:"#[a-z0-9-_]+"},{token:"variable",regex:"\\.[a-z0-9-_]+"},{token:"string",regex:":[a-z0-9-_]+"},{token:"constant",regex:"[a-z0-9-_]+"}],comment:k,ruleset:h,ruleset_comment:m,media_ruleset:i,media_comment:l}};d.inherits(g,f),b.CssHighlightRules=g}),define("ace/mode/html_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/css_highlight_rules","ace/mode/javascript_highlight_rules","ace/mode/xml_util","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./css_highlight_rules").CssHighlightRules,f=a("./javascript_highlight_rules").JavaScriptHighlightRules,g=a("./xml_util"),h=a("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{token:"text",merge:!0,regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:"xml_pe",regex:"<\\?.*?\\?>"},{token:"comment",merge:!0,regex:"<\\!--",next:"comment"},{token:"meta.tag",regex:"<(?=s*script\\b)",next:"script"},{token:"meta.tag",regex:"<(?=s*style\\b)",next:"style"},{token:"meta.tag",regex:"<\\/?",next:"tag"},{token:"text",regex:"\\s+"},{token:"text",regex:"[^<]+"}],cdata:[{token:"text",regex:"\\]\\]>",next:"start"},{token:"text",merge:!0,regex:"\\s+"},{token:"text",merge:!0,regex:".+"}],comment:[{token:"comment",regex:".*?-->",next:"start"},{token:"comment",merge:!0,regex:".+"}]},g.tag(this.$rules,"tag","start"),g.tag(this.$rules,"style","css-start"),g.tag(this.$rules,"script","js-start"),this.embedRules(f,"js-",[{token:"comment",regex:"\\/\\/.*(?=<\\/script>)",next:"tag"},{token:"meta.tag",regex:"<\\/(?=script)",next:"tag"}]),this.embedRules(e,"css-",[{token:"meta.tag",regex:"<\\/(?=style)",next:"tag"}])};d.inherits(i,h),b.HtmlHighlightRules=i}),define("ace/mode/folding/html",["require","exports","module","ace/lib/oop","ace/mode/folding/mixed","ace/mode/folding/xml","ace/mode/folding/cstyle"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("./mixed").FoldMode,f=a("./xml").FoldMode,g=a("./cstyle").FoldMode,h=b.FoldMode=function(){e.call(this,new f({area:1,base:1,br:1,col:1,command:1,embed:1,hr:1,img:1,input:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1,li:1,dt:1,dd:1,p:1,rt:1,rp:1,optgroup:1,option:1,colgroup:1,td:1,th:1}),{"js-":new g,"css-":new g})};d.inherits(h,e)}),define("ace/mode/folding/mixed",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("./fold_mode").FoldMode,f=b.FoldMode=function(a,b){this.defaultMode=a,this.subModes=b};d.inherits(f,e),function(){this.$getMode=function(a){for(var b in this.subModes)if(a.indexOf(b)===0)return this.subModes[b];return null},this.$tryMode=function(a,b,c,d){var e=this.$getMode(a);return e?e.getFoldWidget(b,c,d):""},this.getFoldWidget=function(a,b,c){return this.$tryMode(a.getState(c-1),a,b,c)||this.$tryMode(a.getState(c),a,b,c)||this.defaultMode.getFoldWidget(a,b,c)},this.getFoldWidgetRange=function(a,b,c){var d=this.$getMode(a.getState(c-1));if(!d||!d.getFoldWidget(a,b,c))d=this.$getMode(a.getState(c));if(!d||!d.getFoldWidget(a,b,c))d=this.defaultMode;return d.getFoldWidgetRange(a,b,c)}}.call(f.prototype)}),function(){window.require(["ace/ace"],function(a){window.ace||(window.ace={});for(var b in a)a.hasOwnProperty(b)&&(ace[b]=a[b])})}()
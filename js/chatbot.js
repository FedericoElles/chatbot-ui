
/*!
	Autosize 3.0.15
	license: MIT
	http://www.jacklmoore.com/autosize
*/
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);p=t.overflowY,"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),c="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(c)&&(c=0),i()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,p=t,f&&(e.style.overflowY=t),o()}function o(){var t=window.pageYOffset,n=document.body.scrollTop,o=e.style.height;e.style.height="auto";var i=e.scrollHeight+c;return 0===e.scrollHeight?void(e.style.height=o):(e.style.height=i+"px",v=e.clientWidth,document.documentElement.scrollTop=t,void(document.body.scrollTop=n))}function i(){var t=e.style.height;o();var i=window.getComputedStyle(e,null);if(i.height!==e.style.height?"visible"!==p&&n("visible"):"hidden"!==p&&n("hidden"),t!==e.style.height){var r=d("autosize:resized");e.dispatchEvent(r)}}var s=void 0===arguments[1]?{}:arguments[1],a=s.setOverflowX,l=void 0===a?!0:a,u=s.setOverflowY,f=void 0===u?!0:u;if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!r.has(e)){var c=null,p=null,v=e.clientWidth,h=function(){e.clientWidth!==v&&i()},y=function(t){window.removeEventListener("resize",h,!1),e.removeEventListener("input",i,!1),e.removeEventListener("keyup",i,!1),e.removeEventListener("autosize:destroy",y,!1),e.removeEventListener("autosize:update",i,!1),r["delete"](e),Object.keys(t).forEach(function(n){e.style[n]=t[n]})}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",y,!1),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",i,!1),window.addEventListener("resize",h,!1),e.addEventListener("input",i,!1),e.addEventListener("autosize:update",i,!1),r.add(e),l&&(e.style.overflowX="hidden",e.style.wordWrap="break-word"),t()}}function o(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=d("autosize:destroy");e.dispatchEvent(t)}}function i(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=d("autosize:update");e.dispatchEvent(t)}}var r="function"==typeof Set?new Set:function(){var e=[];return{has:function(t){return Boolean(e.indexOf(t)>-1)},add:function(t){e.push(t)},"delete":function(t){e.splice(e.indexOf(t),1)}}}(),d=function(e){return new Event(e)};try{new Event("test")}catch(s){d=function(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!1),t}}var a=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(a=function(e){return e},a.destroy=function(e){return e},a.update=function(e){return e}):(a=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},a.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e},a.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],i),e}),t.exports=a});


/*!
 * EventEmitter v5.1.0 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */
(function(){"use strict";function t(){}function i(t,n){for(var e=t.length;e--;)if(t[e].listener===n)return e;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var e=t.prototype,r=this,s=r.EventEmitter;e.getListeners=function(n){var r,e,t=this._getEvents();if(n instanceof RegExp){r={};for(e in t)t.hasOwnProperty(e)&&n.test(e)&&(r[e]=t[e])}else r=t[n]||(t[n]=[]);return r},e.flattenListeners=function(t){var e,n=[];for(e=0;e<t.length;e+=1)n.push(t[e].listener);return n},e.getListenersAsObject=function(n){var e,t=this.getListeners(n);return t instanceof Array&&(e={},e[n]=t),e||t},e.addListener=function(r,e){var t,n=this.getListenersAsObject(r),s="object"==typeof e;for(t in n)n.hasOwnProperty(t)&&-1===i(n[t],e)&&n[t].push(s?e:{listener:e,once:!1});return this},e.on=n("addListener"),e.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},e.once=n("addOnceListener"),e.defineEvent=function(e){return this.getListeners(e),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(r,s){var n,e,t=this.getListenersAsObject(r);for(e in t)t.hasOwnProperty(e)&&(n=i(t[e],s),-1!==n&&t[e].splice(n,1));return this},e.off=n("removeListener"),e.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},e.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},e.manipulateListeners=function(r,t,i){var e,n,s=r?this.removeListener:this.addListener,o=r?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(e=i.length;e--;)s.call(this,t,i[e]);else for(e in t)t.hasOwnProperty(e)&&(n=t[e])&&("function"==typeof n?s.call(this,e,n):o.call(this,e,n));return this},e.removeEvent=function(e){var t,r=typeof e,n=this._getEvents();if("string"===r)delete n[e];else if(e instanceof RegExp)for(t in n)n.hasOwnProperty(t)&&e.test(t)&&delete n[t];else delete this._events;return this},e.removeAllListeners=n("removeEvent"),e.emitEvent=function(n,u){var r,e,t,i,o,s=this.getListenersAsObject(n);for(i in s)if(s.hasOwnProperty(i))for(r=s[i].slice(0),t=0;t<r.length;t++)e=r[t],e.once===!0&&this.removeListener(n,e.listener),o=e.listener.apply(this,u||[]),o===this._getOnceReturnValue()&&this.removeListener(n,e.listener);return this},e.trigger=n("emitEvent"),e.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},e.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},e._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},e._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return r.EventEmitter=s,t},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:r.EventEmitter=t}).call(this);



/*
 * jQuery appear plugin
 *
 * Copyright (c) 2012 Andrey Sidorov
 * licensed under MIT license.
 *
 * https://github.com/morr/jquery.appear/
 *
 * Version: 0.3.6
 */
!function(e){function r(r){return e(r).filter(function(){return e(this).is(":appeared")})}function t(){a=!1;for(var e=0,t=i.length;t>e;e++){var n=r(i[e]);if(n.trigger("appear",[n]),p[e]){var o=p[e].not(n);o.trigger("disappear",[o])}p[e]=n}}function n(e){i.push(e),p.push()}var i=[],o=!1,a=!1,f={interval:250,force_process:!1},u=e(window),p=[];e.expr[":"].appeared=function(r){var t=e(r);if(!t.is(":visible"))return!1;var n=u.scrollLeft(),i=u.scrollTop(),o=t.offset(),a=o.left,f=o.top;return f+t.height()>=i&&f-(t.data("appear-top-offset")||0)<=i+u.height()&&a+t.width()>=n&&a-(t.data("appear-left-offset")||0)<=n+u.width()?!0:!1},e.fn.extend({appear:function(r){var i=e.extend({},f,r||{}),u=this.selector||this;if(!o){var p=function(){a||(a=!0,setTimeout(t,i.interval))};e(window).scroll(p).resize(p),o=!0}return i.force_process&&setTimeout(t,i.interval),n(u),e(u)}}),e.extend({force_appear:function(){return o?(t(),!0):!1}})}(function(){return"undefined"!=typeof module?require("jquery"):jQuery}());


/**
 * Start the fun
 */

var eeChatbots =  new EventEmitter();


function Chatbot(node){
    this.$node = node;
    var that = this;

    var config = node.data();

    var meta = {
        visible: false, 
        session: Math.round(new Date().getTime()*Math.random()),
        articleId: ($('.hcf-rating').attr('id')+'').substr(6)
    };

    var id = new Date().getTime();

    var expert = '';
    if (config.expert){
        expert = '&expert=' + config.expert;
    }

    function askBot(question, cb){
        return $.getJSON( "//unaite.wiwo.de/ext?session="+meta.session+"&articleId="+meta.articleId+"&msg=" + encodeURIComponent(question) + expert, function( data ) {
        });
    }


    //ask a question
    function ask(text){
        if (text){
            insert('question', text);
            disableFeedback();
            that.$chatLoading.removeClass('is-hidden');
            askBot(text).done(function(answer){
                //console.log('BOT>',answer.text);
                insert('answer', micromarkdown.parse(answer.text));
                insertAttachments(answer.attachments);
                allowFeedback();
                eeChatbots.trigger('answer');
            }).fail(function(xhr, ajaxOptions, thrownError) {
                that.$chatError.removeClass('u-hidden');
                console.log('err', xhr.status, thrownError);
                eeChatbots.trigger('error');
            }).always(function() {
                that.$chatLoading.addClass('is-hidden');
            });
        }
    }


    function insert(type, text){
        //console.log('ask:', text);

        var html = '<div class="c-chatbubble c-chatbubble--'+type+' o-media">'
                    +'    <div class="o-media__item c-chatbubble__avatar">'
                    +'        ' + (type==='question'? 'Q' : 'A')
                    +'    </div>'
                    +'    <div class="o-media__body c-chatbubble__text">'
                    + text
                    +'    </div>'
                    +'</div>';
        $(html).insertBefore(that.$chat).hide().slideDown("slow");
    }

    //window.__say = insert;
    
    function insertHTML(innerHtml){
        var html = '<div class="c-chatbubble c-chatbubble--media o-media">'
                    +'    <div class="o-media__item c-chatbubble__avatar">'
                    +'        &nbsp;' 
                    +'    </div>'
                    +'    <div class="o-media__body c-chatbubble__media">'
                    + innerHtml
                    +'    </div>'
                    +'</div>';        
        $(html).insertBefore(that.$chat).hide().slideDown("slow");
    }


    function insertTeaser(json){
        var headlinesParts = json.title.split(':');
        var overline = json.overline || '';
        var title = json.title;
        var premium = (typeof json.premium !== 'undefined' ? json.premium : (json.url.indexOf('/my/') > -1));
        if (typeof json.overline === 'undefined'){
            if (title.substr(0,2) === ': '){
                title = title.substr(2);
            }
            if (headlinesParts.length >= 2){
                overline = headlinesParts.shift()
                title = headlinesParts.join(':');
            }
        }

        json.url = json.url || json.link;

        json.image = json.image || json.imageUrl;
        if (json.image){
            json.image = json.image.replace('-format2101','-format2106');
            json.image = json.image.replace('?format=format7','');
            json.image = json.image.replace('-format7','-format2106');            
        }

        if (json.url && json.image && title){
            var HTML = '<a href="'+json.url+'" target="_blank">'
                +'<div class="o-media">'
                +'    <div class="o-media__item">'
                + (json.image ? '<img src="'+json.image+'">' : '')       
                +'    </div>'
                +'    <div class="o-media__body">'
                +'        <div class="c-headline">'
                + (premium ? '<span class="c-headline__overline-prefix">Premium</span>' : '')
                + (overline ? '<span class="c-headline__overline">'+overline+'</span>': '')
                +'            <h4 class="c-headline__text u-hover-underline u-inline">'
                +'                ' + title
                +'            </h4>'
                // +'            <p class="c-cmtext">'
                // +'                ' + json.description
                // +'            </p>'
                +'        </div>'
                +'    </div>'
                +'</div>'
                +'</a>';
            insertHTML(HTML);
        }
    }

    /**
     * If a teaser is only a link, fetch meta data and show nice one
     */
    function insertTeaserForLink(url){
        var urlParts = url.split('www.wiwo.de');
        if (urlParts.length === 2){
            var ENDPOINT = '//unaite.wiwo.de/api/wiwo/meta?url=' +
                encodeURIComponent(urlParts[1]);
            $.getJSON(ENDPOINT).done(function(json){
                //insertHTML('<a href="'+url+'">'+url+'</a>');
                insertTeaser(json);
            })
        }

    }

    //provess attachments: 
    function insertAttachments(attachments){
        var attachment;
        var link;
        var json;
        if (attachments && typeof attachments === 'object' && attachments.length){
            for (var i=0,ii=attachments.length;i<ii;i+=1){
                attachment = attachments[i];
                if (typeof attachment === 'object'){
                    if (attachment.contentType){
                        if (attachment.contentType === 'image/png'){
                            insertHTML('<img src=" '+attachment.contentUrl+'">');
                        }
                    }
                    if (attachment.type){
                        
                        if (attachment.type === 'relatedArticles'){
                            if (attachment.data && typeof attachment.data === 'object' && attachment.data.length){
                                for (var j=0,jj=attachment.data.length;j<jj;j+=1){
                                    link = attachment.data[j];
                                    insertTeaserForLink(link);
                                }
                            }
                        }
                        if (attachment.type === 'teaser'){
                            if (attachment.data && typeof attachment.data === 'object' && attachment.data.length){
                                for (var j=0,jj=attachment.data.length;j<jj;j+=1){
                                    json = attachment.data[j];
                                    insertTeaser(json);
                                }
                            }
                        }                        
                    }
                }
            }
        }
    }


    //feedback functions
    function allowFeedback(){
        if (config.feedback){
            that.$feedback__thx.hide();
            that.$feedback__yes.show();
            that.$feedback__no.show();
            that.$feedback__text.show();      
            that.$feedback.slideDown("slow");
        }
    }

    function disableFeedback(){
        if (config.feedback){
            that.$feedback.slideUp("slow");
        }
    }

    function sendFeedback(state){
        if (config.feedback){
            eeChatbots.trigger('feedback_' + state);
            that.$feedback__thx.show();
            that.$feedback__yes.hide();
            that.$feedback__no.hide();
            that.$feedback__text.hide();      
            return $.getJSON( "//unaite.wiwo.de/feedback?session="+meta.session+"&articleId="+meta.articleId+"&state="+state, function( data ) {
            });        
        }
    }

    //anchor for chatbox
    this.$chatbox = $('<div class="c-chatbox"></div>');
    this.$node.append(this.$chatbox);

    this.$chatbox.appear();
    this.$chatbox.on('appear', function() {
      // this element is now inside browser viewport
      if (!meta.visible){
        eeChatbots.trigger('visible');
        meta.visible = true;
        if (config.intro){
            insert('answer', config.intro);
        }
      }
    });


    //optional header
    if (config.header){
       this.$header = $('<div class="c-chatbox__header">'
			 +  '	<span class="c-chatbox__header-text">'
			 +  '		Nachgefragt'
             //+  '       <span class="c-chatbox__header-hint">Was ist das?</span>'
			 +  '	</span>'
			 +  '	<span class="c-chatbox__header-claim u-float-right">'
			 +  '		powered by <strong>UNAITE</strong>'
			 +  '	</span>'
             +  '   <div class="c-chatbox__header-about u-hidden">'
             +  '     <p>Die "Nachgefragt" Box ist ein experimentelles neues Feature auf unserer Webseite.'
             +  '        Wie bei einem Messenger Programm auf Ihrem Smartphone können Sie uns Feedback zum Artikel oder Fragen zum Thema zusenden.'
             +  '        Unser Chatbot versucht Ihre Frage zu beantworten und falls dies nicht möglich ist, leiten wir diese an den Autor weiter.'
             +  '        <br>Probieren Sie eine der vorgeschlagenen Fragen aus oder formulieren Sie Ihre eigene. Wir freuen uns auf Ihr Feedback.'
             +  '     </p>'
             +  '   </div>'
			 +  '</div>');

        this.$chatbox.append(this.$header);

        //Was ist das? -> Zeige About
        this.$header.on('click', '.c-chatbox__header-hint', function(){
            $(this).addClass('u-hidden');
            that.$header.find('.c-chatbox__header-about').removeClass('u-hidden');
            eeChatbots.trigger('about');
        });

    }

    //chat
    this.$chat = $('<div class="c-chatbox__chat"></div>');
    this.$chatbox.append(this.$chat);

    //loading indicator
    this.$chatLoading = $('<div class="c-loading-bar is-hidden">'
            + '    <div class="c-loading-bar__point c-loading-bar__point--1"></div>'
            + '    <div class="c-loading-bar__point c-loading-bar__point--2"></div>'
            + '    <div class="c-loading-bar__point c-loading-bar__point--3"></div>'
            + '    <div class="c-loading-bar__point c-loading-bar__point--4"></div>'
            + '    <div class="c-loading-bar__point c-loading-bar__point--5"></div>'
            + '    <div class="c-loading-bar__point c-loading-bar__point--6"></div>'
            + '    <div class="c-loading-bar__point c-loading-bar__point--7"></div>'
            + '    <div class="c-loading-bar__point c-loading-bar__point--8"></div>'
            + '</div>'); //.hide()
    this.$chatbox.append(this.$chatLoading);

    //feedback
    if (config.feedback){
        this.$feedback = $('<div class="c-chatbox__feedback"></div>').hide();
        this.$feedback__text = $('<span>Antwort hilfreich?</span>');
        this.$feedback__yes = $('<a class="c-chatbox__feedback-btn c-chatbox__feedback-btn__yes" title="Ja"></a>');
        this.$feedback__no  = $('<a class="c-chatbox__feedback-btn c-chatbox__feedback-btn__no" title="Nein"></a>');
        this.$feedback__thx  = $('<span>❤ Danke!</span>').hide();

        this.$feedback.append(this.$feedback__text);
        this.$feedback.append(this.$feedback__yes);
        this.$feedback.append(this.$feedback__no);
        this.$feedback.append(this.$feedback__thx);

        this.$chatbox.append(this.$feedback);
        this.$feedback__yes.on('click', function(){
            sendFeedback(1);
        });
        this.$feedback__no.on('click', function(){
            sendFeedback(0);
        });    
    }

    //error indicator
    this.$chatError = $('<div class="c-chatbox__error u-hidden">Es ist leider ein Fehler aufgetreten. Unsere Techniker wurden benachrichtigt. <span id="chatbox-error-detail"></span></div>');
    this.$chatbox.append(this.$chatError);



    //smartquestions
    this.$smartquestions = $('<div class="c-chatbox__smartanswers"></div>');
    this.$chatbox.append(this.$smartquestions);

    //input field

    this.$input = $('<div class="c-chatinput o-flag o-flag--rev"></div>');
    //testarea
    this.$input__body = $('<div class="o-flag__body c-chatinput-flag__body">');
    this.$input__body__container = $('<div class="c-chatinput__text-container"></div>');
    this.$input__text = $('<textarea class="c-chatinput__text" placeholder="Hier Ihre Frage zum Artikel eingeben..."></textarea>');
    autosize(this.$input__text);
    this.$input__body__container.append(this.$input__text);
    this.$input__body.append(this.$input__body__container);
    this.$input.append(this.$input__body);
    //button
    this.$input__flag = $('<div class="o-flag__item"></div>');
    this.$input__send = $('<div class="c-chatinput__submit">➤&nbsp;Senden</div>');

    this.$input__flag.append(this.$input__send);
    this.$input.append(this.$input__flag);
    this.$chatbox.append(this.$input);


    //this.$input__text
    this.$input__send.on('click',function(){
        ask(that.$input__text.val());
        that.$input__text.val('');
        eeChatbots.trigger('question');
    });

    this.$input__text.on('keydown', function (e) {
        if ((e.keyCode == 10 || e.keyCode == 13)) { //With CTRL: e.ctrlKey &&
            e.preventDefault(); 
            ask(that.$input__text.val());
            that.$input__text.val('');
            eeChatbots.trigger('question'); 
        }
    });


    if (config.smartquestions){
        
        var question = '';
        var aQuestions = config.smartquestions.split(',');
        var tag;
        for (var i=0,ii=aQuestions.length;i<ii;i+=1){
            question = aQuestions[i];
            if (question){
               tag = $('<span class="c-chatbox__smartanswer">'+question+'</span>');
               tag.on('click', function(){
                   ask($(this).html());
                   $(this).hide('slow', function(){ $(this).remove(); });
                   eeChatbots.trigger('smartquestion');
               })
               this.$smartquestions.append(tag);
            }
        }
    }


};


VHBAjaxify.prototype.chatbot = function (node) {
    var chatbot = new Chatbot(node);
};



eeChatbots.on('smartquestion', function(){
    //console.log('EE>CHATBOTS> Smart Question');
});

eeChatbots.on('question', function(){
    //console.log('EE>CHATBOTS> Question');
});

eeChatbots.on('answer', function(){
    //console.log('EE>CHATBOTS> Answer');
});

eeChatbots.on('visible', function(){
    //console.log('EE>CHATBOTS> Visible');
});

eeChatbots.on('about', function(){
    //console.log('EE>CHATBOTS> About displayed');
});

eeChatbots.on('error', function(){
    //console.log('EE>CHATBOTS> Error');
});

eeChatbots.on('feedback_0', function(){
    // console.log('EE>CHATBOTS> feedback_0');
});
eeChatbots.on('feedback_1', function(){
    // console.log('EE>CHATBOTS> feedback_1');
});
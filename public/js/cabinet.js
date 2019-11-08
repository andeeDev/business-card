/*$.widget("ui.dialog", $.ui.dialog, {
    _allowInteraction: function(event) {
        return !!$(event.target).closest(".cke_dialog").length || this._super(event);
    }
});*/

$('.cabinet-scroll #services').mCustomScrollbar({
    theme: "dark-thin",
    setHeight: 253,
    autoHideScrollbar: false
    /*alwaysShowScrollbar: 0,*/
    /*scrollButtons:{ enable: true }*/
});

/*$('#services').slimscroll({
 height: '252px',
 color: '#777',
 alwaysVisible: true,
 touchScrollStep: 400
 });*/

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function filter_input(e,regexp)
{
    e=e || window.event;
    var target=e.target || e.srcElement;
    var isIE=document.all;

    if (target.tagName.toUpperCase()=='INPUT')
    {
        var code=isIE ? e.keyCode : e.which;
        if (code<32 || e.ctrlKey || e.altKey) return true;

        var char=String.fromCharCode(code);
        if (!regexp.test(char)) return false;
    }
    return true;
}

(function($) {
    $.fn.hasScrollBar = function() {
        var hasScrollBar = {},
            e = this.get(0);
        hasScrollBar.vertical = e.scrollHeight > e.clientHeight;
        hasScrollBar.horizontal = e.scrollWidth > e.clientWidth;
        return hasScrollBar;
    }
})(jQuery);

$(function(){
    $(".description").tooltip();

    //$("input[title]").tooltip();

    //Foundation.reInit($("#block").closest("[data-equalizer]"));

    /*function reinitEqualizer () {
        Foundation.reInit($("#block").closest("[data-equalizer]"));
    }
    reinitEqualizer();
    $("#block [data-orbit]").on("slidechange.zf.orbit", function() {
        setTimeout(reinitEqualizer,700);
    });*/


    /*$('form.auth input').on("invalid.zf.abide", function(ev,elem) {
        elem.tooltip("open");
        console.log();
    });

    $('form.auth input').on("valid.zf.abide", function(ev,elem) {
        elem.tooltip("disabled");
        console.log();
    });*/


    $("h5.minimize-padding a, h5.minimize-padding button, h5.minimize-padding input").on("click", function(e) {
        if ( $(this).attr('data-open')) {
            $('#' + $(this).attr('data-open')).foundation('open');
        }
        e.stopPropagation();
    });

    var fontSize = $('html').css('font-size').replace('px','');
    function refreshBlocksHeight() {
        $('.widget-wrap').each(function () {
            if ( !$(this).hasScrollBar().vertical ) {
                $(this).css("height", "auto");
            }
        });
    }
    var timer = false;
    $(window).resize(function () {
        if(timer !== false)
            clearTimeout(timer);
        timer = setTimeout(refreshBlocksHeight, 200);
    });
    $('.resize').resizable({
        minWidth: 75*fontSize - 2*fontSize,
        maxWidth: 75*fontSize - 2*fontSize,
        handles: "s",
        create: function(event,ui) {
          $(event.target).each(function() {
             if( $(this).find('.widget-wrap').hasScrollBar().vertical) {
                $(this).find('.ui-resizable-s').css('margin-left','-16px');
             }
          });
        },
        stop: function (event,ui) {

            //var id_wnd = ui.element.closest('.window').find('.minimize,.expand').attr('id');
            //var height = ui.size.height >= ui.element.find('.widget-content').height() ? 0 : ui.size.height;
            //ui.element.css('height','auto');
            //ui.element.css('width','auto');
            /* $.ajax({
             type: "POST",
             url: '/settings/wndresize',
             data: "jsonData=" + JSON.stringify({id_wnd : id_wnd, wnd_height : height}),
             dataType : "json",
             success : function(msg){
             console.log(msg);
             },
             error: function(req,status,errorThrown){
             alert('Ajax Error! Can\'t find path to file may be. ' + req.status +  ' ' + req.responseText + ' ' + errorThrown.message);
             }
             });*/

        },
        resize: function(event,ui) {
            ui.element.find('.widget-wrap').css('height',ui.size.height);
            ui.element.css('height','auto');
            //ui.element.css('width','auto');
            if (ui.element.find('.widget-wrap').hasScrollBar().vertical) {
                ui.element.find('.ui-resizable-s .ui-icon-grip-solid-horizontal').css('margin-left','-16px');
            } else {
                ui.element.find('.ui-resizable-s .ui-icon-grip-solid-horizontal').css('margin-left','-8px');
                ui.element.find('.widget-wrap').css('height','auto');
            }
            event.stopPropagation();
        }

    });


    $('.min, .max').click( function(e) {
        var that = $(this);
        var parent = $(this).closest('.callout.clearfix');
        var widget = parent.find('.resize, ul.menu, #information');
        if ( widget.is(':hidden')) {
            that.removeClass('max').addClass('min');
            widget.css('display','none').removeClass('show-for-xmedium');
            widget.slideDown(300);

            //$(this).closest('div.top').find('ul.menu').foundation('equalizer', 'reflow');
            Foundation.reInit(parent.find('[data-equalizer]'));
            //var window = $(this).closest('.window');
            /*if( window.find('.widget-wrap').hasScrollBar().vertical) {
             window.find('.ui-resizable-se').css('right','17px');
             }*/
        } else {
            widget.slideUp(300,function() { $(this).addClass('show-for-xmedium').css('display', 'block'); });
            //parent.find(' .fi-minus').removeClass('fi-minus').addClass('fi-plus');
            that.removeClass('min').addClass('max');
        }
        /*$.ajax({
                 type: "POST",
                 url: '/settings/wndclose',
                 data: "jsonData=" + JSON.stringify({
                 id_wnd : $(this).attr('id'),
                 wnd_close : ( $(this).hasClass('minimize') ? 1 : 0 )
             }),
             dataType : "json",
             success : function(msg){
                console.log(msg);
             },
             error: function(req,status,errorThrown){
                alert('Ajax Error! Can\'t find path to file may be. ' + req.status +  ' ' + req.responseText +'' + errorThrown.message);
             }
         });*/
        e.preventDefault();
        return false;
    });



    if (location.pathname == '/www/cabinet/settings.html' ) {
        var cropperOptions = {
            modal: true,
            loaderHtml: '<div class="loader"><img width="47" height="47" src="/public/images/waiting.gif" alt="Waiting"></div>',
            rotateFactor: 90,
            enableMousescroll: true,
            imgEyecandyOpacity: 0.4,
            scaleToFill: true,
            uploadUrl: '/user/uploadPhoto',
            cropUrl: '/user/cropPhoto',
            raiseObjSize: 2,
            onError: function (resp) {
                handlers[resp.status](resp.result);
            },
            onBeforeRemoveCroppedImg : function () {
                $('.remove-dialog .first-paragraph').empty();
                $('.remove-dialog .question').empty();
                $('#remove').attr('href','');

                $('.delete-popup-wrap .ui-dialog-titlebar .ui-dialog-title').text(titleRemove['photo']);
                $('.remove-dialog .first-paragraph').text(photoTextRemove);
                $('.remove-dialog .question').text(photoQuestionRemove);
                $('#remove').attr('href','/user/removephoto');
                $('.remove-dialog').dialog('open');
            }

        };
        cropperRectangle = new Croppic('person-photo', cropperOptions);
        $('#avatar').on({
            'mouseenter': function () {
                $('.cropControlsUpload').slideDown('fast');
            },
            'mouseleave': function () {
                $('.cropControlsUpload').slideUp('fast');
            }
        }, '#person-photo');
        $("#phone").mask("+38 (999) 999-99-99",{placeholder:"_"});
    }

    $("#birthday").mask("99.99.9999",{placeholder:datePlaceholer});
    $('body').on('change.zf.tabs', '.widget-wrap', function() {
        var $temp = $(this).closest('.widget-wrap').find('[data-equalizer]');
        Foundation.reInit( $temp );
        //$(this).parent().remove();
    });

    function UriParser (action) {
        var start = 0;
        var count = 16;


        this.parse = function () {
            var param = action.slice(action.indexOf('?')+1).split('&');
            for(var i = 0; i < param.length;i++) {
                var res = param[i].split('=');
                this[res[0].match(/\[(\w+)]/)[1]] = res[1];
            }
        }
        this.getStart = function() {
            return start;
        }
        this.getCount = function() {
            return count;
        }
    }


    /*if (location.pathname == '/person/search') {
        $('#search input.text-search').focus();
        var countInputLetter = 2;
        var start = 0;
        var count = 16;
        var totalCount = 0;
        var returnedTotalCount = 0;
        var heightSearchResult = $('.content-t').height() + $('.content-c').height();
        var lockSearchRequest = false;


        $('#search').submit(function (e) {
            $('#search input.loop-search').attr('src', '/public/images/ui-anim_basic_16x16.gif');
            var _form = $(this);

            if (heightSearchResult < $(window).height()) {
                count = Math.round(($(window).height() - heightSearchResult) / 41 + 2) * 4;
                count = (count > 16 ? count : 16)
            }
            $.ajax({
                url: '/person/search',
                type: 'POST',
                data: _form.serialize() + '&' + $.param({data: {start: start, count: count}}),
                cache: false,
                success: function (resp) {
                    if (resp.status == 'USERS_FOUND') {
                        if (start == 0) {
                            returnedTotalCount = resp.result.totalCount;
                            $('#wrap-result-search ').html('');
                        }

                        var result = resp.result.users;
                        for (var key in result) {
                            totalCount++;
                            $('<div>').append('<a href="/person/card/' + result[key].value + '" ><img src="' + (result[key].mini_photo ? ('/user/getminiphoto/' + result[key].value ) : '/public/images/mini_user.png') + '" height="32" width="32"/></a><table><tr><td><a href="/person/card/' + result[key].value + '">' + result[key].label + '</a></td></tr></table>')
                                .appendTo($('#wrap-result-search ')).hide().slideToggle(500);
                        }
                    } else if (resp.status == 'USERS_NOT_FOUND' && start == 0) {
                        if (!$('#wrap-result-search p').size()) {
                            $('<p>').text(resp.result.label).appendTo($('#wrap-result-search ').html('')).hide().slideToggle(500);
                        }
                    }
                },
                error: function (req, status, errorThrown) {
                    alert('Ajax Error! Can\'t find path to file may be. ' + req.status + ' ' + errorThrown.message);
                },
                complete: function () {
                    $('#search input.loop-search').attr('src', '/public/images/search.png');
                    setTimeout(function () {
                        lockSearchRequest = false;
                    }, 200);

                }
            });

            return false;
        });

        var idSearchTimeout = null;


        //function for getting symbol
        function getCharPress(event) {
            if (event.which == null) { // IE
                if (event.keyCode < 32) return null; // пїЅпїЅпїЅпїЅ. пїЅпїЅпїЅпїЅпїЅпїЅ
                return String.fromCharCode(event.keyCode)
            }

            if (event.which != 0 && event.charCode != 0) { // пїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅ IE
                if (event.which < 32) return null; // пїЅпїЅпїЅпїЅ. пїЅпїЅпїЅпїЅпїЅпїЅ
                return String.fromCharCode(event.which); // пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
            }
            return null; // пїЅпїЅпїЅпїЅ. пїЅпїЅпїЅпїЅпїЅпїЅ
        }

        function searchSubmit(event) {

            var e = event ? event : window.event;
            var key = event.keyCode || event.which;


            if (e.type == "keypress" && !getCharPress(e)) {
                if (key == 13) return false;
                return;
            } else if (e.type == 'keyup') {
                if (key != 13 && key != 40 && key != 8 && key != 46) return false;
            }
            start = 0;

            var searchRequest = $('#search input').val();
            if (searchRequest.replace(/\*!/g, "").length <= countInputLetter) {
                if (idSearchTimeout) {
                    clearTimeout(idSearchTimeout);
                }
                $('#wrap-result-search ').html('');
                return;
            }
            if (idSearchTimeout) {
                clearTimeout(idSearchTimeout);
            }
            idSearchTimeout = setTimeout(function () {
                $('#search').submit();
            }, 500);
        }

        $('#search input').bind({
            'input': searchSubmit,
            'keypress': searchSubmit,
            'keyup': searchSubmit
        });


        $(window).scroll(function (event) {
            if ($(window).height() + $(window).scrollTop() >= $(document).height() - 75 && !lockSearchRequest) {
                lockSearchRequest = true;
                if (( start != 0 && returnedTotalCount - start <= count ) || $('#search input').val().length <= countInputLetter) {
                    clearTimeout(idSearchTimeout);
                    return;
                }
                start += count;
                $('#search').submit();
            }
        });
    }*/

});

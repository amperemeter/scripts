var stickyCartMenu = function() {
    if (!window.matchMedia('(max-width: 820px)').matches) {
        var topScroll = jQuery(window).scrollTop(),
                holderTop = jQuery('#checkoutSteps').offset().top,
                holderHeight = jQuery('#checkoutSteps').height(),
                blockOffset = jQuery('#column-3').offset(),
                blockOffsetLeft = blockOffset.left,
                blockHeight = jQuery('#column-3').height();
        if (holderHeight > blockHeight) {
            if (topScroll >= holderTop) {
                if (topScroll + blockHeight >= holderTop + holderHeight) {
                    jQuery('#page').addClass('notransf');
                    jQuery('#column-3').removeClass('fixed').addClass('fixed-bottom').removeAttr('style');
                } else {
                    jQuery('#page').addClass('notransf');
                    jQuery('#column-3').removeClass('fixed-bottom').addClass('fixed').css('left', blockOffsetLeft);
                }
            } else {
                jQuery('#column-3').removeClass('fixed fixed-bottom').removeAttr('style');
                jQuery('#page').removeClass('notransf');
            }
        } else {
            jQuery('#column-3').removeClass('fixed fixed-bottom').removeAttr('style');
            jQuery('#page').removeClass('notransf');
        }
    }
};

jQuery(document).ready(function() {
    if (jQuery('#column-3').length) {
        stickyCartMenu();
    }
    
});
jQuery(window).scroll(function() {
    if (jQuery('#column-3').length) {
        stickyCartMenu();
    }
});

function prepareOrder() {
    if (jQuery('#s_method_infinity_infinity').prop("checked")) {
        jQuery('#field-address input').val(jQuery('#crvfr_hiddenaddress').html());
    }
}

var selectUserCity = function(value) {
console.log(value);
if (value === undefined) {
   value = 4400;
   console.log("default");
}
  //  alert(value);
    jQuery.ajax({
        url: '/index.php/location/index/select?region=' + value,
        type: 'POST',
        success: function(json) {
            city = jQuery.parseJSON(json);
            jQuery('.header-middle #cityname').html(city.city);
            jQuery('.header__information_tel').html(city.phone);
            jQuery('.info__tel').html('Телефон: ' + city.phone);
            if (city.email != null) {
                jQuery('p.info__email').html('<a href="mailto:' + city.email + '">E-mail: ' + city.email + '</a></p>');
            } else {
                jQuery('p.info__email').html('');
            }
            jQuery('#tradinghours').html(city.tradinghours);
        }
    })
}








jQuery(document).ready(function() {
    
    function get_firefox() {
        var regexp = /Firefox\/\d+/;
        var ua = navigator.userAgent;
        var found;
        if (regexp.exec(ua)) {
            found = regexp.exec(ua)[0].substr(8);
        }
        if (ua.search(/Firefox/) > 0 && found < 20) {
            return 'Firefox!'
        } else {
            return false
        }
        ;
    }
    if (get_firefox()) {
        jQuery('.sorter select').each(function() {
            jQuery(this).addClass('firefox-padding');
        })
    }
    var isOpera = navigator.appName == "Opera" && parseInt(navigator.appVersion) < 15;
    if (isOpera) {
        jQuery('#shopping-cart-table tbody .add-to-cart__operations').addClass('operaAfter');
        jQuery('#wishlist-table tbody .add-to-cart__operations').addClass('operaAfter');
        jQuery('#shopping-cart-table tfoot .last td:first-child').addClass('operaPriceFirst');
        jQuery('#shopping-cart-table tfoot .last td:last-child').addClass('operaPrice');
        jQuery('.catalog-product-view .toggle-tabs li.current > span').css({'border': '0px'})
        jQuery('.catalog-category-view .products-grid .product-info .product-info__right-side .add-to-cart__operations').addClass('operaAfter');
        jQuery('.header__information_tel').addClass('operaFont');
        jQuery('#slider .more-info').addClass('operaFont');
        jQuery('#column-3 .page-title h1,.speedycheckout-index-index #onepage-billing h1,#onepage-shipping_method h1,#onepage-payment h1').addClass('operaH');
    }


    // if cart is full background is blue 
    if (jQuery('.skip-cart .count').text() > 0) {
        jQuery('.skip-cart .icon').addClass('full-cart');
    }


    //responsive-nav
    jQuery('#responsive-nav > .parent').each(function() {
        var child = jQuery(this).children('.menu-wrp').children('.menu-content').children('.menu-right-wrp').children('.subcategory-menu-wrp').children('li').length;
        if (child == 0) {
            jQuery(this).removeClass('resp-menu-parent-full')
        }
        ;
    });








    //---------прости меня будда за эти костыли, но у меня нет времени искать проблему начало------------//
    if (jQuery('body').hasClass('checkout-cart-index')) {
        jQuery('#shopping-cart-table tfoot tr.last td:nth-child(1)').insertAfter(jQuery('#shopping-cart-table tfoot tr.last td:nth-child(2)'))
    }
    
    //---------а меня за эти------------//
    jQuery('.speedycheckout-comments').insertAfter(jQuery('#register-customer-confirmpassword')); 
    /*   sorter pages   */
    if (jQuery('body').hasClass('uplevel_0')) {
        pages();
    }
    ;
    if (jQuery('body').hasClass('catalogsearch-result-index')) {
        pages();
    }
    ;
    if (jQuery('body').hasClass('clnews-index-item')) {
        pages();
    }
    ;
    function pages() {
        jQuery('#products-list').after(jQuery('.sorter .pages'));
        jQuery('.pages').css({'display': 'block'});
    }

    /*   pseudoselect   */
    jQuery('body').on('click', '.pseudoselect>div', function() {
        if (jQuery(this).index() != 0) {
            jQuery(this).insertBefore(jQuery('.pseudoselect>div:nth-child(1)'));
            setLocation(jQuery(this).attr('data-location'));
        }
    });
    jQuery('body').on('click', '.pseudoselect2>div', function() {
        if (jQuery(this).index() != 0) {
            jQuery(this).insertBefore(jQuery('.pseudoselect2>div:nth-child(1)'));
            setLocation(jQuery(this).attr('data-location'));
        }
    });
    jQuery('body').on('click', '.pseudoselect', function() {
        var height = jQuery(this).height();
        if (height < 100) {
            jQuery(this).animate({
                height: '100px'
            }, 300);
        } else {
            jQuery(this).animate({
                height: '40px'
            }, 300);
        }
    });
    jQuery('body').on('click', '.pseudoselect2', function() {
        var height = jQuery(this).height();
        if (height < 100) {
            jQuery(this).animate({
                height: '100px'
            }, 300);
        } else {
            jQuery(this).animate({
                height: '40px'
            }, 300);
        }
    });
    jQuery(document).mouseup(function(e) {
        var container = jQuery(".skip-active");
        if (container.has(e.target).length === 0 && container.is(":visible") == true) {
            container.removeClass('skip-active');
        }

        var container2 = jQuery(".pseudoselect");
        if (container2.has(e.target).length === 0) {
            container2.animate({
                height: '40px'
            }, 300);
        }
    });
    jQuery(document).mouseup(function(e) {
        var container = jQuery(".skip-active");
        if (container.has(e.target).length === 0 && container.is(":visible") == true) {
            container.removeClass('skip-active');
        }

        var container2 = jQuery(".pseudoselect2");
        if (container2.has(e.target).length === 0) {

            container2.animate({
                height: '40px'
            }, 300);
        }
    });
    var newselect = "<div class='pseudoselect'>"
    jQuery('.sort-by select option').each(function(index) {
        var value = jQuery(this).val()
        var selected = jQuery(this).attr('selected')
        newselect = newselect + '<div data-location=' + value + ' data-selected=' + selected + '>' + jQuery(this).text() + '</div>';
    });
    newselect = newselect + '</div>';
    jQuery('.sort-by').html(newselect + jQuery('.sort-by').html())
    jQuery('.sort-by .pseudoselect').insertAfter(jQuery('.sort-by label'));
    if (jQuery('.sort-by .pseudoselect>div[data-selected=selected]').index() != 0) {
        jQuery('.sort-by .pseudoselect>div[data-selected=selected]').insertBefore(jQuery('.pseudoselect>div:nth-child(1)'));
    }



    var newselect = "<div class='pseudoselect2'>"
    jQuery('.count-container select option').each(function(index) {
        var value = jQuery(this).val()
        var selected = jQuery(this).attr('selected')
        newselect = newselect + '<div data-location=' + value + ' data-selected=' + selected + '>' + jQuery(this).text() + '</div>';
    });
    newselect = newselect + '</div>';
    jQuery('.count-container').html(newselect + jQuery('.count-container').html())
    jQuery('.count-container .pseudoselect2').insertAfter(jQuery('.count-container label'));
    if (jQuery('.count-container .pseudoselect2>div[data-selected=selected]').index() != 0) {
        jQuery('.count-container .pseudoselect2>div[data-selected=selected]').insertBefore(jQuery('.pseudoselect2>div:nth-child(1)'));
    }
    /*   pseudoselect  end */



    if (jQuery('body').hasClass('speedycheckout-index-index')) {
        jQuery('.display-single-price').html("<div class='sostav'>Состав заказа</div><div class='sostavplus'>-</div>" + jQuery('.display-single-price').html())
        jQuery('.sostavplus').on('click', function() {
            jQuery('.list').slideToggle()
            if (jQuery(this).html() == "-") {
                jQuery(this).html("+")
            } else {
                jQuery(this).html("+")
            }
        })
    }

    jQuery('#p_method_cashondelivery').trigger('click')



    jQuery('.orderform__right>div>input').change(function() {
        var name = jQuery(this).val().split('\\').pop()
        if (name == '') {
            jQuery(this).prev('label').text('Выберите файл')
        } else {
            jQuery(this).prev('label').text(name)
        }
    })




    if (jQuery('body').hasClass('customer-account') || jQuery('body').hasClass('clnews-index-articles') || jQuery('body').hasClass('clnews-index-news')) {
        jQuery('.col-left .block-account').click(function(e) {
            //e.preventDefault();
            //e.stopPropagation();
            var c = jQuery(this).children('.block-content')
            if (c.hasClass('showit')) {
                c.removeClass('showit');
                c.css({'display': 'none !important'})
            } else {
                c.addClass('showit');
                c.css({'display': 'block !important', 'border': '0px !important'});
            }
        })
    }



    //services
    if (jQuery('body').hasClass('services-index-index')) {
        jQuery('.service__rtblock').each(function() {
            if (jQuery(this).children('.subgroup-service-item').length > 1) {
                jQuery(this).children('.toggle-show').children('.toshow').removeClass('hidden');
            }
        });
        jQuery('.subgroup-service-item').each(function() {
            if (jQuery(this).index() >= 1) {
                jQuery(this).addClass('hidden');
            }
        });
        jQuery('.toggle-show > div').on('click', function() {
            //toggleClass('hidden');
            jQuery(this).parent().children('div').each(function() {
                jQuery(this).toggleClass('hidden');
            });
            //removeClass('hidden');
            jQuery(this).parent().parent().children('.subgroup-service-item').each(function() {
                if (jQuery(this).index() >= 1) {
                    jQuery(this).toggleClass('hidden');
                }
            });
        });
    }
    
    
    // Первый уровень категорий

    if (jQuery('body').hasClass('frcore-catalog-index')) {
        jQuery('.category__body').each(function() {
            if (jQuery(this).children('ul').children('.subcategory').length > 4) {
                jQuery(this).children('.toggle-show').children('.toshow').removeClass('hidden');
            }
        });
        jQuery('.subcategory').each(function() {
            if (jQuery(this).index() >= 4) {
                jQuery(this).addClass('hidden');
            }
        });
        jQuery('.toggle-show > div').on('click', function() {
            //toggleClass('hidden');
            jQuery(this).parent().children('div').each(function() {
                jQuery(this).toggleClass('hidden');
            });
            //removeClass('hidden');
            jQuery(this).parent().parent().children('ul').children('.subcategory').each(function() {
                if (jQuery(this).index() >= 4) {
                    jQuery(this).toggleClass('hidden');
                }
            })
        })
    }
    

    // Третий уровень категорий
    
    if (!jQuery('body').hasClass('cms-index-index')) {

        jQuery('#narrow-by-list ol li input').on('click', function() {
            jQuery(this).parent().children('a').click();
        });
        function checkInputs() {
            jQuery('#narrow-by-list ol li input').each(function() {
                if (jQuery(this).parent().children('a').hasClass('amshopby-attr-selected')) {
                    jQuery(this).attr('checked', 'checked')
                }
                ;
            });
            jQuery('.block-layered-nav .currently li').each(function() {
                if (jQuery(this).children('.multiselect-child').length < 1) {
                    jQuery(this).addClass('only-child');
                }
            });
        }
        ;
        setTimeout(checkInputs, 200);
    } else {
        var goDown = function() {
            jQuery('.timer').each(function() {
                var sec = parseInt(jQuery(this).find('.timer__numbers_sec-cur').html()) - 1,
                        min = parseInt(jQuery(this).find('.timer__numbers_min-cur').html()),
                        hour = parseInt(jQuery(this).find('.timer__numbers_hour-cur').html()),
                        day = parseInt(jQuery(this).find('.timer__numbers_day-cur').html());
                if (sec == 0) {
                    sec = 59;
                    min = (min - 1);
                    if (min == 0) {
                        min = 59;
                        hour = (hour - 1);
                        if (hour == 0) {
                            hour = 23;
                            day = (day - 1);
                        }
                    }
                }
                jQuery(this).find('.timer__numbers_sec-cur').html(sec);
                jQuery(this).find('.timer__numbers_min-cur').html(min);
                jQuery(this).find('.timer__numbers_hour-cur').html(hour);
                jQuery(this).find('.timer__numbers_day-cur').html(day);
            })
        }
        setInterval(goDown, 1000);
    }



    if (jQuery('div').is('.static-filters')) {
        jQuery('#narrow-by-list li').each(function() {
            if (jQuery(this).attr('data-text')) {
                var dt = jQuery(this).attr('data-text');
                jQuery(this).prepend('<input type="checkbox" name="company-' + dt + '" id="company-' + dt + '" /><label for="company-' + dt + '"></label>');
            }
        })
    }


    /*left menu*/
    jQuery('.item_subcategories').each(function() {
        if (!jQuery(this).children('.subcategories').children().length == 0) {
            jQuery(this).addClass('shown-sub');
        };
    });
    
    jQuery('.item_subcategories').on('mouseover', function() {
        if (jQuery(this).children('.subcategories').children().length >= 1) {
            jQuery(this).children('.item').css({'color': '#51a7da'});
            jQuery(this).children('.item').addClass('shown-sub');
            jQuery(this).children('.subcategories').css({'display': 'block'});
        }
        ;
    });
    jQuery('.item_subcategories').on('mouseout', function() {
        jQuery(this).children('.item').css({'color': '#444'});
        jQuery(this).children('.item').removeClass('shown-sub');
        jQuery(this).children('.subcategories').css({'display': 'none'});
    });
       
    
   /*left submenu*/ 
   jQuery('.subcategories-group').on('mouseover', function() {
        if (jQuery(this).children('.sc3').children().length >= 1) {
            jQuery(this).children('.item').css({'color': '#51a7da', 'border-top-color': '#ccc', 'border-bottom-color': '#ccc'});
            jQuery(this).children('.item').addClass('shown-sub');
            jQuery(this).children('.sc3').css({'display': 'block'}); 
        }
        ;
    });
    
    jQuery('.subcategories-group').on('mouseout', function() {
     if (jQuery(this).children('.sc3').children().length >= 1) {
        jQuery(this).children('.item').css({'color': '#444', 'border-top-color': '#fff', 'border-bottom-color': '#fff'});
        jQuery(this).children('.item').removeClass('shown-sub');
        jQuery(this).children('.sc3').css({'display': 'none'});
      }
    });
    
    jQuery('.sc3').each(function() {
        if (!jQuery(this).children().length == 0) {
            jQuery(this).parent().addClass('shown-sub2');
        };
    });
        
    
    
    
    /*left menu inner pages*/ 
    if (!jQuery('body').hasClass('cms-index-index')) {
        jQuery('.categories__header .plus').on('click', function() {
            jQuery(this).toggleClass('open');
            var menu = jQuery('.header__cyan_categories');
            if (!menu.hasClass('opened')) {
                openIt(menu);
            } else {
                closeIt(menu);
            }
        });
        jQuery('body').on('click', function(e) {
            var menu = jQuery('.header__cyan_categories');
            if (!jQuery(e.target).hasClass('plus') && jQuery(e.target).parents('.header__cyan_categories').length == 0) {
                closeIt(menu);
                jQuery('.categories__header .plus').removeClass('open');
            }
        });
    };
    function closeIt(block) {
        block.removeClass('opened');
        block.animate({opacity: '0'}, 310);
        function fadeOut() {
            block.css({'display': 'none'});
        }
        setTimeout(fadeOut, 310);
    }

    function openIt(block) {
        block.addClass('opened');
        block.css({'display': 'block'});
        block.animate({opacity: '1'}, 310);
        function fadeIn() {
            block.css({'display': 'block'});
        }
        setTimeout(fadeIn, 310);
    }



    /*   responsive menu & responsive filtr   */
    //if (window.matchMedia('(max-width: 1020px)').matches) {
    //jQuery('.wrapper').prepend(jQuery('.static-filters').addClass('responsive-filter'))}
    jQuery('#show-filter').on('click', function() {
        jQuery('.wrapper').prepend(jQuery('.static-filters').addClass('responsive-filter'));
    });
    jQuery('.left-menu').on('click', function() {
        if (jQuery('.static-filters').hasClass('active')) {
            jQuery('.static-filters').removeClass('active');
            jQuery('body').removeClass('active_sidebar');
        }
        jQuery('.responsive-topmenu').toggleClass('active');
        jQuery('body').toggleClass('active_sidebar');
    });

    /*responsive filtr*/
    jQuery('.show-filter').on('click', function() {
        jQuery('html, body').animate({scrollTop: 0}, 'slow');
        //window.scrollTo(0, 0);
        jQuery(this).toggleClass('no-hover');
        if (jQuery('.responsive-topmenu').hasClass('active')) {
            jQuery('.responsive-topmenu').removeClass('active');
            jQuery('body').removeClass('active_sidebar');
        }
        jQuery('.static-filters').toggleClass('active');
        jQuery('body').toggleClass('active_sidebar');
    });
    
    //закоментированно, потому что из-за этого кода по неведанной причине не работает "проверка статуса заказа"
    /*
     jQuery('.page').on('click', function(e) {
     if (!jQuery(e.target).hasClass('left-menu') && !jQuery(e.target).hasClass('show-filter')) {
     jQuery('.responsive-topmenu').removeClass('active');
     jQuery('body').removeClass('active_sidebar');
     jQuery('.static-filters').removeClass('active');
     }
     });
     */


    //first level category
    if (jQuery('body').hasClass('catalog-category-view')) {
        var maxheight = 0;
        //var padTop = jQuery('.categories > a').css('padding-top');
        //var padTop = parseInt(padTop, 10);
        //var padBottom = jQuery('.categories > a').css('padding-bottom');
        //var padBottom = parseInt(padBottom, 10);

        jQuery('.categories > a').each(function() {
            if (jQuery(this).height() > maxheight) {
                maxheight = jQuery(this).height();
            }
        });
        jQuery('.categories > a').each(function() {
            jQuery(this).height(maxheight);
        });
    }




    if (jQuery('body').hasClass('contacts-index-index')) {
        var h = 0;
        jQuery('.stocks .branch').each(function() {
            var t = jQuery(this);
            if (t.height() > h) {
                h = t.height();
            }
        })
        jQuery('.stocks .branch').each(function() {
            jQuery(this).height(h);
        })

    }


    jQuery('.add-to-cart__operations').on('click', function(e) {


        if (jQuery('body').hasClass('checkout-cart-index')) {
            var pin = jQuery(this).parent().children('input');
            var price = jQuery(this).parent().parent().next().find('.price')
            var pricehtml = price.html()
            var pricetoint = parseInt(pricehtml.replace("&nbsp;", ""))
            var totalhtml = jQuery('tfoot .price').html()
            var totalprice = parseInt(totalhtml.replace("&nbsp;", ""))
            if (jQuery(this).hasClass('add-to-cart__plus')) {
                var count = parseInt(pin.val())
                priceone = Math.round(pricetoint / count)
                pin.val(parseInt(pin.val()) + 1);
                price.html(priceone + pricetoint + '&nbsp;руб.')
                jQuery('tfoot .price').html(totalprice + priceone + "&nbsp;руб.")
            } else {
                if (pin.val() > 1) {
                    var count = parseInt(pin.val())
                    priceone = Math.round(pricetoint / count)
                    pin.val(pin.val() - 1);
                    price.html(pricetoint - priceone + '&nbsp;руб.')
                    jQuery('tfoot .price').html(totalprice - priceone + "&nbsp;руб.")
                }
            }
        } else {
            var pin = jQuery(this).parent().children('input');
            if (jQuery(this).hasClass('add-to-cart__plus')) {

                pin.val(parseInt(pin.val()) + 1);
            } else {
                if (pin.val() > 1) {
                    pin.val(pin.val() - 1);
                }
            }
        }
        jQuery(e.target).parents('.product-cart-actions').find('button[name=update_cart_action]').click();
    })

    jQuery('.wishlist-index-index .main').before(jQuery('.my-wishlist .page-title'));
    jQuery('#narrow-by-list dd ol li label').on('click', function() {
        window.location = jQuery(this).next('a').attr('href');
    })
    jQuery('.shipment-methods dt:last-child').click(function() {
        jQuery('.shipment-methods dt:first-child label').each(function() {
            if (jQuery(this).index() != 1) {
                jQuery(this).fadeOut();
            }
        });
    });
    jQuery('.shipment-methods dt:first-child').click(function() {
        jQuery('.shipment-methods dt:first-child label').each(function() {
            if (jQuery(this).index() != 1) {
                jQuery(this).fadeIn();
            }
        });
    }); 
    /*jQuery('#yourname').on('blur', function() {
        var nameString = jQuery('#yourname').val();
        var nameTest = /\S+/;
        var lastnameTest = /\s\S+/;
        var name = nameString.match(nameTest)[0];
        if (nameString.match(lastnameTest)) {
            var surname = nameString.match(lastnameTest)[0].substring(1);
        }
        
       var v = nameString.split(" ");
        if (v.length > 1) {
            surname = v[v.length-1];
            name = "";
            for (var i = 0; i < v.length-1; i++) name = name + v[i] + " ";
       }
       //else {
          // surname = v[0];
          // name = " . ";
     //  }
        
        jQuery('.firecheckout-section input').each(function() {
            if (jQuery(this).attr('id') == 'shipping:firstname' || jQuery(this).attr('id') == 'billing:firstname') {
                jQuery(this).val(name);
            } else if (jQuery(this).attr('id') == 'shipping:lastname' || jQuery(this).attr('id') == 'billing:lastname') {
                var paste = surname ? surname : name;
                jQuery(this).val(paste);
            }
        })
    }); */
    
    
    /*jQuery('#review-btn').on('click', function() {

        if (!jQuery('#yourname').val()) {
            jQuery('#yourname').next('.validation-advice').css({'display': 'block', 'opacity': '1'});
            jQuery('#yourname').next('.validation-advice').addClass('showit');
        }
    })*/

    if (jQuery('body').hasClass('speedycheckout-index-index')) {
        var i = jQuery('#onepage-shipping .form-list .control input');
        if (i.prop('checked') != 'checked') {
            i.click();
        }
    }

    if (jQuery('body').hasClass('speedycheckout-index-index')) {
        jQuery('input').on('focus', function() {
            jQuery(this).parent().children('.validation-advice').fadeOut();
            jQuery(this).parent().children('.validation-advice').removeClass('showit');
        });
        jQuery('input').on('change', function() {
            jQuery(this).parent().parent().children('dt').each(function() {
                jQuery(this).children('.validation-advice').fadeOut();
            });
        })
        jQuery('#s_method_infinity_infinity').on('click', function() {
            jQuery('#if-delivery').fadeOut();
            jQuery('#branchesitems').fadeIn();
        });
        jQuery('#s_method_flatrate_flatrate').on('click', function() {
            jQuery('#if-delivery').fadeIn();
            jQuery('#branchesitems').fadeOut();
        });
        jQuery('.autocomplete li').bind('click', function() {
            jQuery(this).parent().fadeOut();
        })

        jQuery('#s_method_infinity_infinity').click();
    }
    ;
    jQuery('.shipment-methods label').on('click', function() {
        if (jQuery(this).children('#bregion').attr('id')) {
            //jQuery('#field-address input').val(jQuery('#baddress').text());
            jQuery('#crvfr_hiddenaddress').html(jQuery('#baddress').text());
            jQuery('#field-city input').val(jQuery('#bcity').text());
            jQuery('#field-state input').val(jQuery('#bregion').text());
            jQuery('#field-post input').val(jQuery('#bpost').text());
            //jQuery('#field-phone input').val(jQuery('#bphone').text());
        }
    })
    jQuery('.shipment-methods dt label:nth-child(2)').on('click', function() {
        jQuery('.shipment-methods dt label:nth-child(4)').click();
    });
    jQuery('.breadcrumbs .Shopping').remove();


    //readonly price
    jQuery.each(jQuery('.priceTextBox'), function(key, value) {
        jQuery(value).attr("readonly", "readonly");
    });
    //courier list
    jQuery('#if-delivery').insertAfter(jQuery('#shipment-method_flatrate_flatrate label'));
    
    /*tax trigger*/
    if (jQuery('body').hasClass('speedycheckout-index-index')) {
        jQuery('#branchesitems > label:nth-child(2)').trigger("click");
	console.log('clicked');
    }
    /*tax trigger*/
    
    //filter label checked
    jQuery('a.option-selected').parent().children('input').addClass('checked');   
     
    //Электрик-Мастер рекомендует filtr
    jQuery('.atrr_option_242').parent().append(jQuery('<span class="help-block"><img src="https://elektrik-master.ru/skin/frontend/rwd/fr/img/help.png"><span><b>Электрик-Мастер рекомендует.</b><br>Если вам сложно сделать выбор, то доверьтесь опыту наших специалистов. Выбрав этот атрибут, вы увидите самые популярные и оптимальные по соотношению "цена-качество" товары. Мы их поддерживаем на складе и можем быстро отгрузить.</span></span>'));
    
    jQuery.each(jQuery('#narrow-by-list li'), function (k, v) {
      if (jQuery(v).attr("data-text") == "ЕМ рекомендует") {
    }
    }) 

    //news block
    if(jQuery('.right-side').children().length == 0) {
        jQuery('.right-side').hide() & jQuery('.news-main').addClass('justify');
    }    
     
});         



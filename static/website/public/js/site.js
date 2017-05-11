/*
 *
 *   INSPINIA - Responsive Admin Theme
 *   version 2.0
 *
 */
// ======================= Masked Input plugin for jQuery ===============================
/*
 Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
 USAGE
 $("#date").mask("99/99/9999");
 $("#phone").mask("(999) 999-9999");
 $("#phone").mask("(999) 999-9999? x99999"); Phone with ext
 $("#ssn").mask("999-99-9999");
 */
(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;S=x.val(),e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);

$(document).ready(function () {

    /* Form Validation */
    $(".input-mobile").mask("9999999999");
	$(".input-zip").mask("999999");
    /*$('#Zipcode').parsley().on('field:validated', function() {
        window.ParsleyUI.removeError(this, "Zipcode");
        var zip = $(this.$element[0]).val();
        if(zip !== ""){
            window.ParsleyUI.addError(this, "Zipcode", "Valie Zip");
        }
    });*/

    /* closes the Bootstrap modal window from iframe */
    window.closeModal = function() {
        $('.iframe-modal-wrapper').modal('hide');
    };

    /* closes the Bootstrap modal window from iframe and reload parent window*/
    window.closeModalReloadParent = function() {
        $('.iframe-modal-wrapper').modal('hide');
        location.reload();
    };

    window.closeModalRedirect = function(redirectUrl) {
        $('.iframe-modal-wrapper').modal('hide');
        location.href = redirectUrl;
    };

    // MetsiMenu
    //$('#side-menu').metisMenu();

    // Tooltips mrmainstreet
    //$('.tooltip-mrmainstreet').tooltip({
    //    selector: "[data-toggle=tooltip]",
    //    container: "body"
    //});

    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body");

    $("[data-toggle=popover]")
        .popover();
    
    if (jQuery(".only-integer").size() > 0) {
        CFORMS.onlyInteger();
    }

    if (jQuery(".only-float").size() > 0) {
        CFORMS.onlyFloat();
    }

    if (jQuery(".only-alpha").size() > 0) {
        CFORMS.onlyAlpha();
    }

    $('.delete-item').on('click', function(){
        return confirm('Are you sure you want to delete this item?');
    });

    $('.delete-selected').on('click', function(){

        if($('input[name="item_id[]"]:checked').length == 0)
        {
            alert('Please select an item to delete.');
            return false;
        }else{
            return confirm('Are you sure you want to delete selected items?');
        }
    });

    $('.activate-selected').on('click', function(){

        if($('input[name="item_id[]"]:checked').length == 0)
        {
            alert('Please select user to activate.');
            return false;
        }else{
            return confirm('Are you sure you want to activate selected users?');
        }
    });

    //Custom parsley validation to prevent only zero as value
    window.ParsleyValidator
        .addValidator('custom_not_only_zero', function (value) {
            var val = value;
            if (isNaN(val)) {
                return true;
            } else {
                val = parseInt(val);
                if (val < 1) {
                    return false;
                } else {
                    return true;
                }
            }
        }, 32)
        .addMessage('en', 'custom_not_only_zero', 'This value can not contain only 0(zero).');

    //Custom parsley validation to prevent only special characters as value
    window.ParsleyValidator
        .addValidator('custom_not_only_special_chars', function (value) {
            var pattern = /^[!~`/\\{}/:;.'"<>|@#$^&%*+=()\[\],_?-]+$/;
            if (value.search(pattern) != -1) {
                return false;
            }
            return true;
        }, 32)
        .addMessage('en', 'custom_not_only_special_chars', 'Only special characters are not allowed.');
});

var CFORMS = {
    isEmpty: function(val){
        if($.trim(val) == ""){
            return true;
        }
        return false;
    },

    isJSON: function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },

    onlyFloat: function(){
        jQuery('.only-float').keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 59) && charCode != 37 && charCode != 39 && charCode != 46) {
                return false;
            } // prevent if not number/dot

            if (charCode == 46 && $(this).val().indexOf('.') != -1) {
                return false;
            } // prevent if already dot
            return true;
        });
    },

    onlyInteger: function(){
        jQuery('.only-integer').keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 37 && charCode != 39 && charCode != 46) {
                return false;
            }
            return true;
        });
    },

    onlyAlpha: function(){
        jQuery('.only-alpha').keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 8 || charCode == 9 || charCode == 37) {
                return true;
            }
            return false;
        });
    },

    addRow: function(table_id, row_id){
        var num     = $('#'+table_id+' .table-row-clone').length,
            newNum  = new Number(num + 1),
            newElem = $('#'+row_id+'_' + num).clone().attr('id', row_id+'_' + newNum).fadeIn('slow');
        $('#'+row_id+'_'+num).after(newElem);

        if($('#'+row_id+'_'+newNum).find(".custom-type").length == 0) {
            $('#' + row_id + '_' + newNum).find("input").val("");
        }

        $('#'+table_id+' .table-row-clone').each(function(index){
            var num = index+1;
            $(this).attr("id",row_id+"_"+num);
        });

        CFORMS.onlyFloat();

        return false;
    },

    deleteRow: function(table_id, row){
        var num = $('#'+table_id+' .table-row-clone').length;
        if(num > 1) {
            if (confirm("Are you sure you wish to remove this? This cannot be undone.")) {
                $(row).parents("tr").remove();
                $(row).parents("div.table-row-clone").remove();
            }else{
                return false;
            }
        }
    },

    getLawyerNum: function(){
        if($('.select-plan').on('click').length > 0) {
            $('.select-plan').on('click', function () {
                var maxLawyers = $(this).data('max-lawyer');
                var minLawyers = $(this).data('min-lawyer');
                var isTrial    = $(this).data('is-trial');
                var planPeriod = $(this).data('plan-period');
                var planAmount = $(this).data('plan-amount');

                $('#plan_amount').val(planAmount);

                if (minLawyers >= 1 && minLawyers != maxLawyers) {
                    $('#num_lawyer').val('');
                    $('#total_lawyer_area').removeClass('hidden');
                    $('#num_lawyer').attr({'data-parsley-required' : 'true', 'data-parsley-type' : 'integer', 'data-parsley-min' : 0});
                }else {
                    $('#num_lawyer').val(minLawyers);
                    $('#num_lawyer').removeAttr('data-parsley-required data-parsley-type');
                    $('#total_lawyer_area').addClass('hidden');
                }
            });
        }
    },

    upgradeSubscription: function(){
        if($('.upgrade-action').on('click').length > 0) {
            $('.upgrade-action').on('click', function () {
                var optionId = $(this).attr('id');

                if (optionId == 'upgrade_plan') {
                    $('#paid_plans').removeClass('hidden');
                    $('#add_lawyer_area').addClass('hidden');
                    $('#total_lawyer').removeAttr('data-parsley-required data-parsley-type');
                }else if(optionId == 'add_lawyer'){
                    $('#paid_plans').addClass('hidden');
                    $('#add_lawyer_area').removeClass('hidden');
                    $('#num_lawyer').removeAttr('data-parsley-required data-parsley-type');
                    $('#total_lawyer').attr({'data-parsley-required' : 'true', 'data-parsley-type' : 'integer', 'data-parsley-min' : 0});
                }
            });
        }
    },

    enableRelatedPermission: function(){
        if($('.role-permission').on('change').length > 0){
            $('.role-permission').on('change', function () {
                var elm = $(this);
                if (elm.prop('checked')) {
                    var permissionType = elm.data('permission-type');
                    var permissionAction = elm.data('permission-action');

                    if (permissionAction == 'add' || permissionAction == 'edit' || permissionAction == 'delete') {
                        $('#permission_id_' + permissionType + '_view').prop('checked', true);
                        $('#permission_id_' + permissionType + '_show').prop('checked', true);
                    }
                }
            });
        }
    },

    firmTimesheetAnalyticsByCase: function(url){
        if($('#timesheet_totals_drop_down').on('change').length > 0){
            $('#timesheet_totals_drop_down').on('change', function () {
                var caseId = $(this).val();
                $.ajax({
                    url: url + '/' + caseId,
                    context: document.body
                }).done(function (data) {
                    var timesheetTotals = data.timesheetTotals;
                    var pie_cols = [];
                    if(timesheetTotals.length > 0){
                        for(index in timesheetTotals){
                            var pie_val = timesheetTotals[index]['value'];
                            pie_val = pie_val.split(":");
                            pie_cols.push([timesheetTotals[index]['type'], pie_val[0]]);
                        }
                        $('#timesheet_totals').html(LYCharts.pie(pie_cols, "timesheet_totals"));
                    }else{
                        $('#timesheet_totals').html('No Records Found!');
                    }
                });
            });
        }
    },

    firmExpenseAnalyticsByCase: function(url){
        if($('#expense_totals_drop_down').on('change').length > 0){
            $('#expense_totals_drop_down').on('change', function () {
                var caseId = $(this).val();
                $.ajax({
                    url: url + '/' + caseId,
                    context: document.body
                }).done(function (data) {
                    var expenseTotals = data.expenseTotals;
                    var pie_cols = [];
                    if(expenseTotals.length > 0){
                        for(index in expenseTotals){
                            pie_cols.push([expenseTotals[index]['status'], expenseTotals[index]['value']]);
                        }
                        $('#expense_totals').html(LYCharts.pie(pie_cols, "expense_totals"));
                    }else{
                        $('#expense_totals').html('No Records Found!');
                    }
                });
            });
        }
    }
}

//Show textbox to get total number of lawyer's while selecting a Subscription plan
CFORMS.getLawyerNum();

//Show form to upgrade Subscription plan or to add new lawyer
CFORMS.upgradeSubscription();

//Tick the checkbox of related permissions automatically
CFORMS.enableRelatedPermission();

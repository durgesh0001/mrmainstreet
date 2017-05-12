/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    /* Login form validation */
    if ($('#loginForm').length) {
        $('#loginForm').parsley();
    }
    /*Signup form validation */
    if ($('#signup-form').length) {
        $('#signup-form').parsley();
    }
    /* Forget password form */
    if ($("#forgot-password-form").length) {
        $("#forgot-password-form").parsley();
    }
    /* Reset password form */
    if ($("#reset-password-form").length) {
        $("#reset-password-form").parsley();
    }
    /* Check phone number validation */
    window.Parsley
            .addValidator('phone', {
        validateString: function(value) {
            if (value != null && value != '' && value.charAt(0) != '0') {
                return false;
            } else {
                return true;
            }
        },
        messages: {
            en: 'The phone number should be start with 0.'
        }
    });

});

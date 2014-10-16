---
layout: post
title: validator.unobtrusive
date: 2012-08-14 09:41
author: evilz
comments: true
tags: [draft]
---
<a href="http://jquery.bassistance.de/validate/demo/radio-checkbox-select-demo.html">http://jquery.bassistance.de/validate/demo/radio-checkbox-select-demo.html</a>

<a href="http://thewayofcode.wordpress.com/tag/unobtrusive-jquery-validation/">http://thewayofcode.wordpress.com/tag/unobtrusive-jquery-validation/</a>

ca prend le dernier !

&nbsp;

<a href="http://www.devtrends.co.uk/blog/the-complete-guide-to-validation-in-asp.net-mvc-3-part-2">http://www.devtrends.co.uk/blog/the-complete-guide-to-validation-in-asp.net-mvc-3-part-2</a>

&nbsp;

<a href="http://bradwilson.typepad.com/blog/2010/10/mvc3-unobtrusive-validation.html">http://bradwilson.typepad.com/blog/2010/10/mvc3-unobtrusive-validation.html</a>

&nbsp;

&nbsp;

&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
&lt;title&gt;&lt;/title&gt;
&lt;script src="Scripts/jquery-1.7.2.min.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="Scripts/jquery.metadata.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="Scripts/jquery.validate.min.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="Scripts/jquery.validate.unobtrusive.min.js" type="text/javascript"&gt;&lt;/script&gt;

&lt;script type="text/javascript"&gt;
// only for demo purposes
$.validator.setDefaults({
submitHandler: function () {
alert("submitted!");
}
});

// $.metadata.setType("attr", "validate");

$(document).ready(function () {
$("#form1").validate();
$("#selecttest").validate();

&nbsp;

});

(function ($) {
$.validator.unobtrusive.adapters.add("ckbrequired", function (options) {
options.rules["required"] = true;
if (options.message) {
options.messages["required"] = options.message;
}
});
} (jQuery));
&lt;/script&gt;

&lt;style type="text/css"&gt;
.block { display: block; }
form.cmxform label.error { display: none; }
/* Styles for validation helpers
-----------------------------------------------------------*/
.field-validation-error
{
color: #ff0000;
}

.field-validation-valid
{
display: none;
}

.input-validation-error
{
border: 1px solid #ff0000 !important;
background-color: #ffeeee !important;
}

.validation-summary-errors
{
font-weight: bold;
color: #ff0000;
}

.validation-summary-valid
{
display: none;
}

/**//*/ form.cmxform legend { display: inline-block; } /* IE Mac legend fix */
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;form class="cmxform" id="form1" method="get" action="" novalidate="novalidate"&gt;
&lt;fieldset&gt;
&lt;legend&gt;Validating a form with a radio and checkbox buttons&lt;/legend&gt;

&lt;fieldset&gt;
&lt;legend&gt;Spam&lt;/legend&gt;
&lt;label for="spam_email"&gt;
&lt;input type="checkbox" class="checkbox" id="spam_email" value="email" name="spam" data-val="true" data-val-ckbrequired="pls !" data-val-length="encore !!!!" data-val-length-min="2" &gt;
Spam via E-Mail
&lt;/label&gt;
&lt;label for="spam_phone"&gt;
&lt;input type="checkbox" class="checkbox" id="spam_phone" value="phone" name="spam" data-val="true" data-val-ckbrequired="Needed !" data-val-length="encore 1" data-val-length-min="2"&gt;
Spam via Phone
&lt;/label&gt;
&lt;label for="spam_mail"&gt;
&lt;input type="checkbox" class="checkbox" id="spam_mail" value="mail" name="spam" data-val="true" data-val-ckbrequired="last !" data-val-length="last 1" data-val-length-min="2"&gt;
Spam via Mail
&lt;/label&gt;

&lt;span class="field-validation-valid" data-valmsg-for="spam" data-valmsg-replace="true"&gt;&lt;/span&gt;
&lt;/fieldset&gt;

&lt;hr/&gt;

&lt;fieldset&gt;
&lt;legend&gt;Spam&lt;/legend&gt;
&lt;label for="spam_email"&gt;
&lt;input type="checkbox" class="checkbox error" id="Checkbox1" value="email" name="spam[]" validate="required:true, minlength:2"&gt;
Spam via E-Mail
&lt;/label&gt;
&lt;label for="spam_phone"&gt;
&lt;input type="checkbox" class="checkbox" id="Checkbox2" value="phone" name="spam[]"&gt;
Spam via Phone
&lt;/label&gt;
&lt;label for="spam_mail"&gt;
&lt;input type="checkbox" class="checkbox" id="Checkbox3" value="mail" name="spam[]"&gt;
Spam via Mail
&lt;/label&gt;
&lt;label for="spam[]" class="error" style="display: inline; "&gt;Please select at least two types of spam.&lt;/label&gt;
&lt;/fieldset&gt;

&lt;p&gt;
&lt;input class="submit" type="submit" value="Submit"&gt;
&lt;/p&gt;
&lt;/fieldset&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;

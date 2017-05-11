from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User

class Ficooptions(models.Model):
    range_start = models.IntegerField(_('Start Range'), blank=True)
    range_stop = models.IntegerField(_('Start Stop'), blank=True)
    range_type = models.CharField(_('Range Type'), blank=False, unique=False, max_length=45)
    is_active = models.BooleanField(_('Is Active'), default=True)
    class Meta:
        verbose_name = _('Ficooption')
        verbose_name_plural = _('Ficooptions')
    def __unicode__(self):
        return self.id

class Businessinmonths(models.Model):
    time_start = models.IntegerField(_('Start Range'), blank=True)
    time_stop = models.IntegerField(_('Start Stop'), blank=True)
    is_active = models.BooleanField(_('Is Active'), default=True)
    class Meta:
        verbose_name = _('Businessinmonth')
        verbose_name_plural = _('Businessinmonths')
    def __unicode__(self):
        return self.id


class Loantype(models.Model):
    typename = models.CharField(_('Loan Type'), blank=False, unique=False, max_length=45)
    is_active = models.BooleanField(_('Is Active'), default=True)
    class Meta:
        verbose_name = _('Loantype')
        verbose_name_plural = _('Loantypes')
    def __unicode__(self):
        return self.typename

class Loanpurpose(models.Model):
    purpose_name =  models.CharField(_('Loan Name'), blank=False, unique=False, max_length=45)
    is_active = models.BooleanField(_('Is Active'), default=True)
    class Meta:
        verbose_name = _('Loanpurpose')
        verbose_name_plural = _('Loanpurposes')
    def __unicode__(self):
        return self.purpose_name

class Userfacingcategory(models.Model):
    category_name = models.CharField(_('Category Name'), blank=False, unique=False, max_length=45)
    is_active = models.BooleanField(_('Is Active'), default=True)
    class Meta:
        verbose_name = _('UserCategory')
        verbose_name_plural = _('UserCategories')
    def __unicode__(self):
        return self.category_name



class Businesscategory(models.Model):
    category_name = models.CharField(_('Category Name'), blank=False, unique=False, max_length=45)
    is_active = models.BooleanField(_('Is Active'), default=True)
    class Meta:
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')
    def __unicode__(self):
        return self.category_name


class Questions(models.Model):
    question_text = models.CharField(_('Question Text'), blank=False, unique=False, max_length=250)
    typechoice = (('1', 'is_text'), ('2', 'is_yesno'), ('3', 'is_dropdown'))
    question_type = models.CharField(_('Question Type'), max_length=1, choices=typechoice, default=1)
    question_order = models.IntegerField(_('Question Order'), blank=True, )
    response = models.TextField(_('Response'), blank=True, unique=False)
    created_date = models.DateTimeField(_("Created Date"), auto_now_add=True)
    modify_date = models.DateTimeField(_("Modify Date"))
    is_active = models.BooleanField(_('Is Active'), default=True)
    display_text = models.CharField(_('Display Text'), blank=False, unique=False, max_length=150)
    categorychoice = (('1', 'non-startup'), ('2', 'category-product'))
    categorytype = models.CharField(_('Category'), max_length=1, choices=categorychoice, default=1)
    class Meta:
        verbose_name = _('Question')
        verbose_name_plural = _('Questions')
    def __unicode__(self):
        return self.question_text


class Lender(models.Model):
    fk_loantype = models.ForeignKey(Loantype, null=False, blank=False, verbose_name=_("LoanType"))
    fk_category = models.ForeignKey(Businesscategory, null=False, blank=False, verbose_name=_("Business Category"))
    fk_loan_purpose = models.ForeignKey(Loanpurpose, null=False, blank=False, verbose_name=_("Loan Purpose"))
    fk_usercategory = models.ForeignKey(Userfacingcategory, null=False, blank=False, verbose_name=_("User Category"))

    lender_name = models.CharField(_('Lender Name'), blank=False, unique=False, max_length=200)
    min_business_time_month = models.IntegerField(_('Min Business Month'), blank=True)
    max_business_time_month = models.IntegerField(_('Max Business Month'), blank=True)
    min_fico = models.IntegerField(_('Min FICO'), blank=True)
    max_fico = models.IntegerField(_('Max FICO'), blank=True)
    min_revenue = models.IntegerField(_('Min Revenue'), blank=True)
    max_revenue = models.IntegerField(_('Max Revenue'), blank=True)
    min_loan_amount = models.IntegerField(_('Min Loan Amount'), blank=True)
    max_loan_amount = models.IntegerField(_('Max Loan Amount'), blank=True)
    min_apr = models.IntegerField(_('Min Apr'), blank=True)
    max_apr = models.IntegerField(_('Max Apr'), blank=True)
    min_simpleintrest = models.IntegerField(_('Min Simple Interest'), blank=True)
    max_simpleintrest = models.IntegerField(_('Max Simple Interest'), blank=True)
    invoicechoice = (('0', 'NO'), ('1', 'YES'), ('2', 'ANY'))
    invoice = models.CharField(_('Invoice'), max_length=3, default=0, choices=invoicechoice)

    is_active = models.BooleanField(_('Is Active'), default=True)
    created_date = models.DateTimeField(_("Created Date"), auto_now_add=True)
    class Meta:
        verbose_name = _('Lender')
        verbose_name_plural = _('Lenders')
    def __unicode__(self):
        return self.lender_name


class LenderContactInfo(models.Model):
    fk_lender = models.OneToOneField(Lender, on_delete=models.CASCADE)
    rep_firstname = models.CharField(_('First Name'), blank=False, unique=False, max_length=200)
    rep_lastname = models.CharField(_('Last Name'), blank=False, unique=False, max_length=200)
    rep_email = models.CharField(_('Email'), blank=False, unique=False, max_length=200)
    rep_phone = models.CharField(_('Phone'), blank=False, unique=False, max_length=200)
    rep_title = models.CharField(_('Title'), blank=False, unique=False, max_length=200)
    class Meta:
        verbose_name = _('LenderContact')
        verbose_name_plural = _('LenderContacts')
    def __unicode__(self):
        return self.rep_firstname


class LenderDisplayOption(models.Model):
    fk_lender = models.OneToOneField(Lender, on_delete=models.CASCADE)
    logo = models.ImageField(upload_to='media', max_length=255, blank=True)
    description = models.CharField(_('Description'), blank=False, unique=False, max_length=255)
    refferal_link = models.CharField(_('Refferal Link'), blank=False, unique=False, max_length=255)
    class Meta:
        verbose_name = _('LenderContact')
        verbose_name_plural = _('LenderContacts')
    def __unicode__(self):
        return self.description
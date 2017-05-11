from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from mainstreetadmin.models import Lender,Questions


class UserRefferalClick(models.Model):
    fk_user = models.ForeignKey(User, null=False, blank=False, verbose_name=_("User"))
    fk_lender = models.ForeignKey(Lender, null=False, blank=False, verbose_name=_("Lender"))
    created_date = models.DateTimeField(_("Created Date"), auto_now_add=True)
    class Meta:
        verbose_name = _('Click')
        verbose_name_plural = _('Clicks')

    def __unicode__(self):
        return self.fk_lender

class UserAnswers(models.Model):
    fk_user = models.ForeignKey(User, null=False, blank=False, verbose_name=_("User"))
    fk_question = models.ForeignKey(Questions, null=False, blank=False, verbose_name=_("User"))
    answer = models.CharField(_('Answer Text'), blank=False, unique=False, max_length=255)
    created_date = models.DateTimeField(_("Created Date"), auto_now_add=True)
    class Meta:
        verbose_name = _('Answer')
        verbose_name_plural = _('Answers')

    def __unicode__(self):
        return self.answer


class UserAnswersOption(models.Model):
    fk_user = models.ForeignKey(User, null=False, blank=False, verbose_name=_("User"))
    fk_lender = models.ForeignKey(Lender, null=False, blank=False, verbose_name=_("Lender"))
    fk_answer = models.ForeignKey(UserAnswers, null=False, blank=False, verbose_name=_("User Answer"))
    answer = models.CharField(_('Answer Text'), blank=False, unique=False, max_length=255)
    created_date = models.DateTimeField(_("Created Date"), auto_now_add=True)
    class Meta:
        verbose_name = _('Answer')
        verbose_name_plural = _('Answers')

    def __unicode__(self):
        return self.answer

class Userprofile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mobile = models.TextField(max_length=12, blank=True)
    class Meta:
        verbose_name = _('Profile')
        verbose_name_plural = _('Profiles')

    def __unicode__(self):
        return self.mobile
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainstreetadmin', '0004_auto_20170509_1102'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lender',
            name='fk_loantype',
            field=models.ForeignKey(verbose_name='LoanType', to='mainstreetadmin.Loantype'),
        ),
    ]

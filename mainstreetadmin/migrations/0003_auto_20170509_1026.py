# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('mainstreetadmin', '0002_auto_20170426_1021'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lender',
            name='fk_business',
        ),
        migrations.AddField(
            model_name='lender',
            name='fk_loantype',
            field=models.ForeignKey(default=datetime.datetime(2017, 5, 9, 10, 26, 20, 607959, tzinfo=utc), verbose_name='Loan Type', to='mainstreetadmin.Loantype'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='lender',
            name='fk_category',
            field=models.ForeignKey(verbose_name='Business Category', to='mainstreetadmin.Businesscategory'),
        ),
        migrations.AlterField(
            model_name='lender',
            name='invoice',
            field=models.CharField(default=0, max_length=3, verbose_name='Invoice', choices=[(b'0', b'NO'), (b'1', b'YES'), (b'2', b'ANY')]),
        ),
    ]

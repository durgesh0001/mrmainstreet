# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainstreetadmin', '0003_auto_20170509_1026'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='questions',
            name='option_table',
        ),
        migrations.AddField(
            model_name='questions',
            name='display_text',
            field=models.CharField(default='', max_length=150, verbose_name='Display Text'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='questions',
            name='response',
            field=models.TextField(verbose_name='Response', blank=True),
        ),
    ]

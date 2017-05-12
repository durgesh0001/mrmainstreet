# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainstreetadmin', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questions',
            name='question_text',
            field=models.CharField(max_length=250, verbose_name='Question Text'),
        ),
    ]

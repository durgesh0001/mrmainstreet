# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainstreetadmin', '0006_auto_20170509_1129'),
    ]

    operations = [
        migrations.RenameField(
            model_name='questions',
            old_name='response_text',
            new_name='response',
        ),
        migrations.AddField(
            model_name='questions',
            name='categorytype',
            field=models.CharField(default=1, max_length=1, verbose_name='Category', choices=[(b'1', b'non-startup'), (b'2', b'category-product')]),
        ),
    ]

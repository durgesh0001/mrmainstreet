# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainstreetadmin', '0005_auto_20170509_1125'),
    ]

    operations = [
        migrations.RenameField(
            model_name='questions',
            old_name='response',
            new_name='response_text',
        ),
    ]

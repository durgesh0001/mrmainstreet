# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mainstreetadmin', '0002_auto_20170426_1021'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAnswers',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('answer', models.CharField(max_length=255, verbose_name='Answer Text')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Created Date')),
                ('fk_question', models.ForeignKey(verbose_name='User', to='mainstreetadmin.Questions')),
                ('fk_user', models.ForeignKey(verbose_name='User', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Answer',
                'verbose_name_plural': 'Answers',
            },
        ),
        migrations.CreateModel(
            name='UserAnswersOption',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('answer', models.CharField(max_length=255, verbose_name='Answer Text')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Created Date')),
                ('fk_answer', models.ForeignKey(verbose_name='User Answer', to='mainstreetuser.UserAnswers')),
                ('fk_lender', models.ForeignKey(verbose_name='Lender', to='mainstreetadmin.Lender')),
                ('fk_user', models.ForeignKey(verbose_name='User', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Answer',
                'verbose_name_plural': 'Answers',
            },
        ),
        migrations.CreateModel(
            name='UserRefferalClick',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Created Date')),
                ('fk_lender', models.ForeignKey(verbose_name='Lender', to='mainstreetadmin.Lender')),
                ('fk_user', models.ForeignKey(verbose_name='User', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Click',
                'verbose_name_plural': 'Clicks',
            },
        ),
    ]

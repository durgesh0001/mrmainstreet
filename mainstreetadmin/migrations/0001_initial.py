# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Businesscategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('category_name', models.CharField(max_length=45, verbose_name='Category Name')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Businessinmonths',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time_start', models.IntegerField(verbose_name='Start Range', blank=True)),
                ('time_stop', models.IntegerField(verbose_name='Start Stop', blank=True)),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
            ],
            options={
                'verbose_name': 'Businessinmonth',
                'verbose_name_plural': 'Businessinmonths',
            },
        ),
        migrations.CreateModel(
            name='Ficooptions',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('range_start', models.IntegerField(verbose_name='Start Range', blank=True)),
                ('range_stop', models.IntegerField(verbose_name='Start Stop', blank=True)),
                ('range_type', models.CharField(max_length=45, verbose_name='Range Type')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
            ],
            options={
                'verbose_name': 'Ficooption',
                'verbose_name_plural': 'Ficooptions',
            },
        ),
        migrations.CreateModel(
            name='Lender',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('lender_name', models.CharField(max_length=200, verbose_name='Lender Name')),
                ('min_business_time_month', models.IntegerField(verbose_name='Min Business Month', blank=True)),
                ('max_business_time_month', models.IntegerField(verbose_name='Max Business Month', blank=True)),
                ('min_fico', models.IntegerField(verbose_name='Min FICO', blank=True)),
                ('max_fico', models.IntegerField(verbose_name='Max FICO', blank=True)),
                ('min_revenue', models.IntegerField(verbose_name='Min Revenue', blank=True)),
                ('max_revenue', models.IntegerField(verbose_name='Max Revenue', blank=True)),
                ('min_loan_amount', models.IntegerField(verbose_name='Min Loan Amount', blank=True)),
                ('max_loan_amount', models.IntegerField(verbose_name='Max Loan Amount', blank=True)),
                ('min_apr', models.IntegerField(verbose_name='Min Apr', blank=True)),
                ('max_apr', models.IntegerField(verbose_name='Max Apr', blank=True)),
                ('min_simpleintrest', models.IntegerField(verbose_name='Min Simple Interest', blank=True)),
                ('max_simpleintrest', models.IntegerField(verbose_name='Max Simple Interest', blank=True)),
                ('invoice', models.CharField(default=0, max_length=3, verbose_name='Invoice', choices=[(b'0', b'NO'), (b'1', b'YES')])),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Created Date')),
            ],
            options={
                'verbose_name': 'Lender',
                'verbose_name_plural': 'Lenders',
            },
        ),
        migrations.CreateModel(
            name='LenderContactInfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('rep_firstname', models.CharField(max_length=200, verbose_name='First Name')),
                ('rep_lastname', models.CharField(max_length=200, verbose_name='Last Name')),
                ('rep_email', models.CharField(max_length=200, verbose_name='Email')),
                ('rep_phone', models.CharField(max_length=200, verbose_name='Phone')),
                ('rep_title', models.CharField(max_length=200, verbose_name='Title')),
                ('fk_lender', models.OneToOneField(to='mainstreetadmin.Lender')),
            ],
            options={
                'verbose_name': 'LenderContact',
                'verbose_name_plural': 'LenderContacts',
            },
        ),
        migrations.CreateModel(
            name='LenderDisplayOption',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('logo', models.ImageField(max_length=255, upload_to=b'media', blank=True)),
                ('description', models.CharField(max_length=255, verbose_name='Description')),
                ('refferal_link', models.CharField(max_length=255, verbose_name='Refferal Link')),
                ('fk_lender', models.OneToOneField(to='mainstreetadmin.Lender')),
            ],
            options={
                'verbose_name': 'LenderContact',
                'verbose_name_plural': 'LenderContacts',
            },
        ),
        migrations.CreateModel(
            name='Loanpurpose',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('purpose_name', models.CharField(max_length=45, verbose_name='Loan Name')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
            ],
            options={
                'verbose_name': 'Loanpurpose',
                'verbose_name_plural': 'Loanpurposes',
            },
        ),
        migrations.CreateModel(
            name='Loantype',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('typename', models.CharField(max_length=45, verbose_name='Loan Type')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
            ],
            options={
                'verbose_name': 'Loantype',
                'verbose_name_plural': 'Loantypes',
            },
        ),
        migrations.CreateModel(
            name='Questions',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('question_text', models.CharField(max_length=200, verbose_name='Question Text')),
                ('question_type', models.CharField(default=1, max_length=1, verbose_name='Question Type', choices=[(b'1', b'is_text'), (b'2', b'is_yesno'), (b'3', b'is_dropdown')])),
                ('question_order', models.IntegerField(verbose_name='Question Order', blank=True)),
                ('option_table', models.CharField(max_length=40, verbose_name='Table name', blank=True)),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Created Date')),
                ('modify_date', models.DateTimeField(verbose_name='Modify Date')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
            ],
            options={
                'verbose_name': 'Question',
                'verbose_name_plural': 'Questions',
            },
        ),
        migrations.CreateModel(
            name='Userfacingcategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('category_name', models.CharField(max_length=45, verbose_name='Category Name')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
            ],
            options={
                'verbose_name': 'UserCategory',
                'verbose_name_plural': 'UserCategories',
            },
        ),
        migrations.AddField(
            model_name='lender',
            name='fk_business',
            field=models.ForeignKey(verbose_name='Business', to='mainstreetadmin.Loantype'),
        ),
        migrations.AddField(
            model_name='lender',
            name='fk_category',
            field=models.ForeignKey(verbose_name='Category', to='mainstreetadmin.Businesscategory'),
        ),
        migrations.AddField(
            model_name='lender',
            name='fk_loan_purpose',
            field=models.ForeignKey(verbose_name='Loan Purpose', to='mainstreetadmin.Loanpurpose'),
        ),
        migrations.AddField(
            model_name='lender',
            name='fk_usercategory',
            field=models.ForeignKey(verbose_name='User Category', to='mainstreetadmin.Userfacingcategory'),
        ),
    ]

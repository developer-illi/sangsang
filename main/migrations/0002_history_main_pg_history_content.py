# Generated by Django 5.1.2 on 2025-01-14 18:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='History',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('years', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Main_pg',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ceo_name', models.CharField(blank=True, max_length=100, null=True)),
                ('main_title', models.CharField(blank=True, max_length=100, null=True)),
                ('sub_script', models.CharField(blank=True, max_length=100, null=True)),
                ('main_img', models.ImageField(blank=True, null=True, upload_to='main_pg/main_img')),
                ('history_title', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='History_content',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('months', models.CharField(blank=True, max_length=100, null=True)),
                ('content', models.CharField(blank=True, max_length=100, null=True)),
                ('history', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.history')),
            ],
        ),
    ]

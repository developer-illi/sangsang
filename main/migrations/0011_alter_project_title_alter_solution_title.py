# Generated by Django 5.1.2 on 2025-01-15 00:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_alter_project_contentop_img_project_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='title',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='solution',
            name='title',
            field=models.TextField(blank=True, null=True),
        ),
    ]

# Generated by Django 5.1.2 on 2025-01-14 23:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_project_project_title_project_option_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project_contentop',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to='project/sub_img/'),
        ),
        migrations.CreateModel(
            name='Project_img',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(blank=True, null=True, upload_to='project/sub_img_item/')),
                ('project_title', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='proj_content_img', to='main.project_title')),
            ],
        ),
    ]

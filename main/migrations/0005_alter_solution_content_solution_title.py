# Generated by Django 5.1.2 on 2025-01-14 20:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_solution_solution_title_solution_option_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='solution_content',
            name='solution_title',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='sol_details', to='main.solution_title'),
        ),
    ]

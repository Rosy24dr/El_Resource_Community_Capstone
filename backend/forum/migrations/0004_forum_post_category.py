# Generated by Django 4.0.4 on 2022-05-20 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0003_rename_content_forum_post_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='forum_post',
            name='category',
            field=models.CharField(blank=True, max_length=1000),
        ),
    ]

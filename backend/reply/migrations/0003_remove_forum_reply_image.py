# Generated by Django 4.0.4 on 2022-05-20 00:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reply', '0002_forum_reply_forumcomment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='forum_reply',
            name='image',
        ),
    ]

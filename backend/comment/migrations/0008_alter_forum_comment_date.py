# Generated by Django 4.0.4 on 2022-05-23 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0007_alter_forum_comment_forumpost'),
    ]

    operations = [
        migrations.AlterField(
            model_name='forum_comment',
            name='date',
            field=models.DateField(null=True),
        ),
    ]

import pathlib
from django.db import models

def image_file_upload_handler(instance, filepath):
    instance_id = instance.id
    if not instance.id:
        instance_id = "0"
    filepath = pathlib.Path(filepath).resolve()
    print(instance, filepath)
    return f"test/{instance_id}/{filepath.name}"

class Taps(models.Model):
    title = models.CharField(max_length=100, default='')
    type = models.IntegerField(default=1) #1 = 솔루션 #2 = 적용분야

    def __str__(self):
        return self.title

class Items(models.Model):
    title_ex = models.CharField(max_length=300, default='')
    main_cp =  models.TextField(default='')
    main_text = models.TextField(default='')
    taps = models.ForeignKey(Taps, on_delete=models.CASCADE)

    def __str__(self):
        return self.pk

class Content(models.Model):
    title = models.CharField(max_length=100, default='')
    content_text = models.TextField(default='')
    content_img = models.ImageField(upload_to='content/')
    items = models.ForeignKey(Items, on_delete=models.CASCADE)

class Solutions(models.Model):
    title = models.CharField(max_length=100, unique=True)
    title_ex = models.CharField(max_length=300, default='')
    main_cp = models.TextField(default='')
    main_text = models.TextField(default='')
    content_img = models.ImageField(upload_to='solutions/main_img/', null=True, blank=True)

    def __str__(self):
        return self.pk

class Sol_content(models.Model):
    title = models.CharField(max_length=100, default='')
    content_text = models.TextField(default='')
    content_img = models.ImageField(upload_to='solutions/content/')
    type = models.IntegerField(default=1) #이미지기준 1 = 오른쪽 2 = 왼쪽
    solutions = models.ForeignKey(Solutions, on_delete=models.CASCADE)

    def __str__(self):
        return self.pk


class Apply(models.Model):
    title = models.CharField(max_length=100, unique=True)
    title_ex = models.CharField(max_length=300, default='')
    main_cp = models.TextField(default='')
    main_text = models.TextField(default='')
    content_img = models.ImageField(upload_to='apply/main_img/', null=True, blank=True)

    def __str__(self):
        return self.pk

class Apply_content(models.Model):
    title = models.CharField(max_length=100, default='')
    content_text = models.TextField(default='')
    content_img = models.ImageField(upload_to='apply/content/')
    type = models.IntegerField(default=1) #이미지기준 1 = 오른쪽 2 = 왼쪽
    apply = models.ForeignKey(Apply, on_delete=models.CASCADE, default='')

    def __str__(self):
        return self.pk


class Admin(models.Model):
    user = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100, default='1235gg')

    def set_password(self, raw_password):
        from django.contrib.auth.hashers import make_password
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        from django.contrib.auth.hashers import check_password
        return check_password(raw_password, self.password)
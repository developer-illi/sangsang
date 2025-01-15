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

    # 여기부터 추가
class Main_pg(models.Model):
    ceo_name = models.CharField(max_length=100, null=True, blank=True)
    main_title = models.CharField(max_length=100, null=True, blank=True)
    sub_script = models.CharField(max_length=100, null=True, blank=True)
    main_img = models.ImageField(upload_to='main_pg/main_img', null=True, blank=True)
    history_title = models.CharField(max_length=100, null=True, blank=True)


    def __str__(self):
        return self.pk

class History(models.Model):
    years = models.CharField(max_length=100, null=True, blank=True)

class History_content(models.Model):
    months = models.CharField(max_length=100, null=True, blank=True)
    content = models.CharField(max_length=100, null=True, blank=True)
    history = models.ForeignKey(History, related_name='his_content', on_delete=models.CASCADE)

    def __str__(self):
        return self.pk

class Solution(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.pk

class Solution_title(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    img = models.ImageField(upload_to='solutions/main_img/', null=True, blank=True)
    solution = models.ForeignKey(Solution, on_delete=models.CASCADE, related_name='sol_title')

    def __str__(self):
        return self.pk

class Solution_content(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    eg_title = models.CharField(max_length=100, null=True, blank=True)
    content = models.CharField(max_length=100, null=True, blank=True)
    details = models.CharField(max_length=100, null=True, blank=True)
    solution_title = models.OneToOneField(Solution_title, on_delete=models.CASCADE, related_name='sol_details')

    def __str__(self):
        return self.pk

class Solution_option(models.Model):
    content =  models.CharField(max_length=100, null=True, blank=True)
    solution_title = models.ForeignKey(Solution_title, on_delete=models.CASCADE, related_name='sol_option')

    def __str__(self):
        return self.pk

class Solution_contentop(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    content = models.CharField(max_length=100, null=True, blank=True)
    img = models.ImageField(upload_to='solutions/sub_img/', null=True, blank=True)
    Solution_title = models.ForeignKey(Solution_title, on_delete=models.CASCADE, related_name='sol_content_op' ,null=True)

    def __str__(self):
        return self.pk




class Project(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.pk

class Project_title(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    img = models.ImageField(upload_to='solutions/main_img/', null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='proj_title')

    def __str__(self):
        return self.pk

class Project_content(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    eg_title = models.CharField(max_length=100, null=True, blank=True)
    content = models.CharField(max_length=100, null=True, blank=True)
    details = models.CharField(max_length=100, null=True, blank=True)
    project_title = models.OneToOneField(Project_title, on_delete=models.CASCADE, related_name='proj_details')

    def __str__(self):
        return self.pk

class Project_option(models.Model):
    content =  models.CharField(max_length=100, null=True, blank=True)
    project_title = models.ForeignKey(Project_title, on_delete=models.CASCADE, related_name='proj_option')

    def __str__(self):
        return self.pk

class Project_contentop(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    content = models.CharField(max_length=100, null=True, blank=True)
    img = models.ImageField(upload_to='project/sub_img/', null=True, blank=True)
    project_title = models.ForeignKey(Project_title, on_delete=models.CASCADE, related_name='proj_content_op' ,null=True)

    def __str__(self):
        return self.pk

class Project_img(models.Model):
    img = models.ImageField(upload_to='project/sub_img_item/', null=True, blank=True)
    project_title = models.ForeignKey(Project_title, on_delete=models.CASCADE, related_name='proj_content_img',
                                      null=True)

    def __str__(self):
        return self.pk
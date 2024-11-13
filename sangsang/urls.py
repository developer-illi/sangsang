"""
URL configuration for sangsang project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from main import views as mainvw
urlpatterns = [
    path('',mainvw.main_page, name='main'),
    path('admin', mainvw.admin_pg, name='admin'),
    path('login_ck', mainvw.admin_login, name='admin_login'),
    path('admin_pg', mainvw.admin, name='admin_pg'),
    path('tapp_adds', mainvw.tapp_adds, name='tapp_adds'),
    path('test', mainvw.test, name='test'),
    path('회사소개', mainvw.intro, name='cop'),
    path('솔루션', mainvw.sol_intro, name='sol_intro'),
    path('솔루션/<int:id>', mainvw.sol_page, name='sol_page'),
    path('적용분야/<int:id>', mainvw.app_page, name='app_page'),
    path('적용분야', mainvw.app_intro, name='app_intro'),
    path('적용분야/<int:id>', mainvw.app_page, name='app_page'),
    path('문의사항', mainvw.inquiry, name='inquiry'),
    path('send_email/', mainvw.send_email, name='send_email'),
    path('sol_item_add', mainvw.sol_item_add, name='sol_item_add'),
    path('app_item_add', mainvw.app_item_add, name='app_item_add'),
    path('get_val_items/', mainvw.get_val_items, name='get_val_items'),
    path('get_app_items/', mainvw.get_app_items, name='get_app_items'),
    path('delete_sol_item/<int:item_id>/', mainvw.delete_sol_item, name='delete_sol_item'),
    path('delete_app_item/<int:item_id>/', mainvw.delete_app_item, name='delete_app_item'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
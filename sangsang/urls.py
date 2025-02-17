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
    path('about', mainvw.about_pg, name='about'),
    path('contact', mainvw.contact_pg, name='contact'),
    path('project', mainvw.project_pg, name='project'),
    path('solution', mainvw.solution_pg, name='solution'),
    path('admin', mainvw.admin_pg, name='admin'),
    path('add_history', mainvw.add_history, name='add_history'),
    path('delete_history', mainvw.delete_history, name='delete_history'),
    path('save_history_item', mainvw.save_history_item, name='save_history_item'),
    path('delete_history_item/<int:item_id>/', mainvw.delete_history_item, name='delete_history_item'),
    path('admin_pg', mainvw.about_admin, name='about_admin'),
    path('admin_login', mainvw.admin_login, name='admin_login'),
    path('admin_pg/solution', mainvw.sol_admin, name='sol_admin'),
    path('admin_pg/project', mainvw.pro_admin, name='pro_admin'),
    path('project_main_update', mainvw.project_main_update, name='project_main_update'),
    path('project_detail_edit', mainvw.project_detail_edit, name='project_detail_edit'),
    path('project_content_edit', mainvw.project_content_edit, name='project_content_edit'),
    path('project_content_delete/<int:item_id>/', mainvw.project_content_delete, name='project_content_delete'),
    path('project_content_create', mainvw.project_content_create, name='project_content_create'),
    path('app_item_add', mainvw.app_item_add, name='app_item_add'),
    path('get_val_items/', mainvw.get_val_items, name='get_val_items'),
    path('get_app_items/', mainvw.get_app_items, name='get_app_items'),
    path('get_tap_items/', mainvw.get_tap_items, name='get_tap_items'),
    path('edit_soltitle', mainvw.edit_sol_title, name='edit_soltitle'),
    path('edit_title_img', mainvw.edit_title_img, name='edit_title_img'),
    path('edit_soldetail', mainvw.edit_soldetail, name='edit_soldetail'),
    path('sol_item_add', mainvw.sol_item_add, name='sol_item_add'),
    path('delete_solution', mainvw.delete_sol_item, name='delete_sol_item'),
    path('delete_app_item/<int:item_id>/', mainvw.delete_app_item, name='delete_app_item'),
    path('delete_tap_item/<item_id>/', mainvw.delete_tap_item, name='delete_tap_item'),
    path('abpg_saver_main_text', mainvw.alter_about_text, name='alter_about_text'),
    path('alter_history', mainvw.alter_history, name='alter_history'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
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
from tkinter.font import names

from django.contrib import admin
from django.urls import path
from main import views as mainvw
urlpatterns = [
    path('',mainvw.main_page, name='main'),
    path('header_test',mainvw.header_test, name='header_test'),
    path('footer_test',mainvw.footer_test, name='footer_test'),
    path('회사소개', mainvw.intro, name='cop'),
    path('솔루션', mainvw.sol_intro, name='sol_intro'),
    path('자율비행드론', mainvw.dron, name='dron'),
    path('건설포렌식기술', mainvw.bild, name='bild'),
    path('3D-모델-시각화-시스템', mainvw.threedmodel, name='3dmodel'),
    path('고해상도-영상데이터-추출', mainvw.confessor, name='confessor'),
    path('적용분야', mainvw.app_intro, name='app_intro'),
    path('교량안전-점검', mainvw.bride, name='bride'),
    path('사회기반시설-안전점검', mainvw.social, name='social'),
    path('건설시공현장-공정관리', mainvw.erection, name='erection'),
    path('드론-솔루션', mainvw.dron_sol, name='dron_sol'),
    path('문의사항', mainvw.inquiry, name='inquiry'),
]

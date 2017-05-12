from django.conf.urls import include, url
from django.contrib import admin
from webservices.views import *
from rest_framework import routers, serializers, viewsets

from webservices import views
from rest_framework.authtoken import views as vt

router = routers.DefaultRouter()
router.register(r'v1/users', views.UserViewSet)
router.register(r'v1/loanpurpose', views.LoanpurposeViewSet)
router.register(r'v1/questions', views.QuestionViewSet,"myobject")
router.register(r'v1/lenders', views.LenderViewSet,"lender")


admin.autodiscover()

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-token-auth/', vt.obtain_auth_token),  # login for webservices
    url(r'v1/userregistration/$', userregistration),
    url(r'v1/login/$', login),
    url(r'v1/adminlogin/$', adminlogin),
    url(r'v1/logintestcase/$', logintestcase),# login test case




]
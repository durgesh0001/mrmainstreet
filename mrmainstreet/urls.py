from django.conf.urls import include, url
from django.contrib import admin
# from charityapp.views import *
from django.conf import settings
from django.views.generic import RedirectView, TemplateView
from django.conf.urls.static import static

urlpatterns = [
    # Examples:
    # url(r'^$', 'mrmainstreet.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),#default admin url not change
    url(r'^administrator/', TemplateView.as_view(template_name='admin.html')),  # add app urls file
    url(r'^webservices/', include('webservices.urls')),  # add app urls file
    url(r'^$', TemplateView.as_view(template_name='index.html'))
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
from django.contrib import admin
from django.urls import path
from restaurant import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),
    path("order/", views.order_page, name="order"),
    path("api/menu/", views.menu_api, name="menu_api"),
    path("api/orders/", views.create_order, name="create_order"),
    path("track/", views.track_order, name="track_order"),
]

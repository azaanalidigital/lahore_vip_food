from django.contrib import admin
from .models import Category, MenuItem, Order, OrderItem

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "sort_order")
    search_fields = ("name",)

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "available", "featured")
    list_filter = ("category", "available", "featured")
    search_fields = ("name",)
    list_editable = ("price", "available", "featured")

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("menu_item", "item_name", "unit_price", "quantity", "line_total")
    can_delete = False

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("reference", "customer_name", "phone", "total", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("reference", "customer_name", "phone")
    list_editable = ("status",)
    readonly_fields = ("reference", "subtotal", "delivery_fee", "total", "created_at")
    inlines = [OrderItemInline]

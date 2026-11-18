from django.db import models
from django.utils import timezone
import uuid

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    sort_order = models.PositiveIntegerField(default=0)
    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name_plural = "categories"
    def __str__(self): return self.name

class MenuItem(models.Model):
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="items")
    name = models.CharField(max_length=160)
    description = models.CharField(max_length=240, blank=True)
    price = models.PositiveIntegerField(help_text="Price in PKR")
    available = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    class Meta:
        ordering = ["category__sort_order", "name"]
        unique_together = [("category", "name")]
    def __str__(self): return f"{self.name} (PKR {self.price})"

class Order(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"), ("confirmed", "Confirmed"),
        ("preparing", "Preparing"), ("out_for_delivery", "Out for delivery"),
        ("completed", "Completed"), ("cancelled", "Cancelled"),
    ]
    reference = models.CharField(max_length=12, unique=True, editable=False)
    customer_name = models.CharField(max_length=120)
    phone = models.CharField(max_length=30)
    address = models.TextField()
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=24, choices=STATUS_CHOICES, default="pending")
    subtotal = models.PositiveIntegerField(default=0)
    delivery_fee = models.PositiveIntegerField(default=0)
    total = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    class Meta: ordering = ["-created_at"]
    def save(self, *args, **kwargs):
        if not self.reference:
            self.reference = uuid.uuid4().hex[:10].upper()
        super().save(*args, **kwargs)
    def __str__(self): return f"{self.reference} — {self.customer_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    menu_item = models.ForeignKey(MenuItem, on_delete=models.PROTECT)
    item_name = models.CharField(max_length=160)
    unit_price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    line_total = models.PositiveIntegerField()
    def __str__(self): return f"{self.quantity} × {self.item_name}"

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid

class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(name="Category", fields=[
            ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
            ("name", models.CharField(max_length=100, unique=True)),
            ("sort_order", models.PositiveIntegerField(default=0)),
        ], options={"ordering": ["sort_order", "name"], "verbose_name_plural": "categories"}),
        migrations.CreateModel(name="MenuItem", fields=[
            ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
            ("name", models.CharField(max_length=160)),
            ("description", models.CharField(blank=True, max_length=240)),
            ("price", models.PositiveIntegerField(help_text="Price in PKR")),
            ("available", models.BooleanField(default=True)),
            ("featured", models.BooleanField(default=False)),
            ("category", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="items", to="restaurant.category")),
        ], options={"ordering": ["category__sort_order", "name"], "unique_together": {("category", "name")}}),
        migrations.CreateModel(name="Order", fields=[
            ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
            ("reference", models.CharField(editable=False, max_length=12, unique=True)),
            ("customer_name", models.CharField(max_length=120)),
            ("phone", models.CharField(max_length=30)),
            ("address", models.TextField()),
            ("notes", models.TextField(blank=True)),
            ("status", models.CharField(choices=[("pending","Pending"),("confirmed","Confirmed"),("preparing","Preparing"),("out_for_delivery","Out for delivery"),("completed","Completed"),("cancelled","Cancelled")], default="pending", max_length=24)),
            ("subtotal", models.PositiveIntegerField(default=0)),
            ("delivery_fee", models.PositiveIntegerField(default=0)),
            ("total", models.PositiveIntegerField(default=0)),
            ("created_at", models.DateTimeField(default=django.utils.timezone.now)),
        ], options={"ordering": ["-created_at"]}),
        migrations.CreateModel(name="OrderItem", fields=[
            ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
            ("item_name", models.CharField(max_length=160)),
            ("unit_price", models.PositiveIntegerField()),
            ("quantity", models.PositiveIntegerField()),
            ("line_total", models.PositiveIntegerField()),
            ("menu_item", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to="restaurant.menuitem")),
            ("order", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="items", to="restaurant.order")),
        ]),
    ]

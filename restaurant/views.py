import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET, require_POST
from django.db import transaction
from django.db.models import Prefetch
from .models import Category, MenuItem, Order, OrderItem

def home(request):
    return render(request, "restaurant/home.html")

def order_page(request):
    return render(request, "restaurant/order.html")

@require_GET
def menu_api(request):
    categories = Category.objects.prefetch_related(Prefetch("items", queryset=MenuItem.objects.filter(available=True)))
    data = [{"id": c.id, "name": c.name, "items": [
        {"id": i.id, "name": i.name, "description": i.description, "price": i.price}
        for i in c.items.all()
    ]} for c in categories]
    return JsonResponse({"categories": data})

@require_POST
def create_order(request):
    try:
        payload = json.loads(request.body.decode("utf-8"))
        name = str(payload.get("customer_name", "")).strip()
        phone = str(payload.get("phone", "")).strip()
        address = str(payload.get("address", "")).strip()
        notes = str(payload.get("notes", "")).strip()
        cart = payload.get("items", [])
        if not name or not phone or not address:
            return JsonResponse({"error": "Name, phone and delivery address are required."}, status=400)
        if len(name) > 120 or len(phone) > 30 or len(address) > 1500:
            return JsonResponse({"error": "Please check the length of your details."}, status=400)
        if not isinstance(cart, list) or not cart or len(cart) > 60:
            return JsonResponse({"error": "Your cart is empty or contains too many items."}, status=400)
        quantities = {}
        for row in cart:
            item_id = int(row.get("id"))
            qty = int(row.get("quantity"))
            if qty < 1 or qty > 50: raise ValueError()
            quantities[item_id] = quantities.get(item_id, 0) + qty
        menu_items = {i.id: i for i in MenuItem.objects.filter(id__in=quantities, available=True)}
        if len(menu_items) != len(quantities):
            return JsonResponse({"error": "One or more selected items are no longer available."}, status=400)
        subtotal = sum(menu_items[i].price * q for i, q in quantities.items())
        delivery_fee = 0
        with transaction.atomic():
            order = Order.objects.create(
                customer_name=name, phone=phone, address=address, notes=notes,
                subtotal=subtotal, delivery_fee=delivery_fee, total=subtotal
            )
            OrderItem.objects.bulk_create([
                OrderItem(order=order, menu_item=menu_items[i], item_name=menu_items[i].name,
                          unit_price=menu_items[i].price, quantity=q,
                          line_total=menu_items[i].price*q)
                for i, q in quantities.items()
            ])
        return JsonResponse({"success": True, "reference": order.reference, "total": order.total,
                             "message": "Your order has been saved. The restaurant will contact you to confirm it."}, status=201)
    except (ValueError, TypeError, KeyError, json.JSONDecodeError):
        return JsonResponse({"error": "Invalid order details. Please refresh and try again."}, status=400)

@require_GET
def track_order(request):
    ref = request.GET.get("ref", "").strip().upper()
    if not ref:
        return render(request, "restaurant/track.html")
    order = Order.objects.filter(reference=ref).first()
    return render(request, "restaurant/track.html", {"order": order, "searched": True})

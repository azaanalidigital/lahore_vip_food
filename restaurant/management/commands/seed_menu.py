import json
from django.core.management.base import BaseCommand
from restaurant.models import Category, MenuItem

MENU = [
  {
    "category": "Starters",
    "name": "Spicy Honey Wings",
    "price": 790
  },
  {
    "category": "Starters",
    "name": "Chicken Chili Wings",
    "price": 790
  },
  {
    "category": "Starters",
    "name": "Chicken Drumsticks",
    "price": 750
  },
  {
    "category": "Starters",
    "name": "Prawn Tempura",
    "price": 990
  },
  {
    "category": "Starters",
    "name": "Dynamite Prawns",
    "price": 1090
  },
  {
    "category": "Starters",
    "name": "Chicken Tempura",
    "price": 850
  },
  {
    "category": "Burgers & Sandwiches",
    "name": "Big Mouth Chicken Burger",
    "price": 650
  },
  {
    "category": "Burgers & Sandwiches",
    "name": "House Special Cheese Burger",
    "price": 750
  },
  {
    "category": "Burgers & Sandwiches",
    "name": "Chef Special Zinger Burger",
    "price": 700
  },
  {
    "category": "Burgers & Sandwiches",
    "name": "Fish Burger",
    "price": 600
  },
  {
    "category": "Burgers & Sandwiches",
    "name": "Grilled Chicken Club Sandwich",
    "price": 750
  },
  {
    "category": "Burgers & Sandwiches",
    "name": "Chicken Club Sandwich",
    "price": 690
  },
  {
    "category": "Burgers & Sandwiches",
    "name": "Grilled Chicken Sandwich",
    "price": 600
  },
  {
    "category": "Broast & Roast",
    "name": "Chicken Broast",
    "price": 620
  },
  {
    "category": "Broast & Roast",
    "name": "Chicken Degi Roast / Steamed Roast",
    "price": 950
  },
  {
    "category": "Broast & Roast",
    "name": "Chicken Breast Piece",
    "price": 600
  },
  {
    "category": "Broast & Roast",
    "name": "Special Spicy Broast",
    "price": 650
  },
  {
    "category": "Broast & Roast",
    "name": "Finger Fish",
    "price": 590
  },
  {
    "category": "Sajji",
    "name": "Chicken Sajji",
    "price": 1250
  },
  {
    "category": "Sajji",
    "name": "Chicken Balochi Sajji with Rice",
    "price": 1450
  },
  {
    "category": "Sajji",
    "name": "Sajji Rice",
    "price": 850
  },
  {
    "category": "Pakistani Specialities",
    "name": "Chicken Karahi",
    "price": 950
  },
  {
    "category": "Pakistani Specialities",
    "name": "Chicken White Karahi",
    "price": 1050
  },
  {
    "category": "Pakistani Specialities",
    "name": "Mutton Karahi",
    "price": 1450
  },
  {
    "category": "Pakistani Specialities",
    "name": "Mutton Kunna",
    "price": 1550
  },
  {
    "category": "Pakistani Specialities",
    "name": "Chicken Biryani",
    "price": 850
  },
  {
    "category": "Pakistani Specialities",
    "name": "Mutton Biryani",
    "price": 1250
  },
  {
    "category": "Chicken Handi",
    "name": "Chicken Handi",
    "price": 950
  },
  {
    "category": "Chicken Handi",
    "name": "Chicken Achari Handi",
    "price": 1050
  },
  {
    "category": "Chicken Handi",
    "name": "Chicken Badami Handi",
    "price": 1150
  },
  {
    "category": "BBQ",
    "name": "Chicken Kabab",
    "price": 650
  },
  {
    "category": "BBQ",
    "name": "Chicken Cheese Kabab",
    "price": 750
  },
  {
    "category": "BBQ",
    "name": "Chicken Reshmi Kabab",
    "price": 720
  },
  {
    "category": "BBQ",
    "name": "Chicken Hara Bhara Kabab",
    "price": 690
  },
  {
    "category": "BBQ",
    "name": "Chicken Boti",
    "price": 700
  },
  {
    "category": "BBQ",
    "name": "Chicken Herb Boti",
    "price": 750
  },
  {
    "category": "Chinese",
    "name": "Chicken Chili Dry",
    "price": 850
  },
  {
    "category": "Chinese",
    "name": "Chicken Black Pepper",
    "price": 850
  },
  {
    "category": "Chinese",
    "name": "Chicken Chow Mein",
    "price": 780
  },
  {
    "category": "Chinese",
    "name": "Chicken Manchurian with Rice",
    "price": 850
  },
  {
    "category": "Chinese",
    "name": "Chicken Shashlik with Rice",
    "price": 890
  },
  {
    "category": "Chinese",
    "name": "Crispy Chicken",
    "price": 820
  },
  {
    "category": "Chinese",
    "name": "Mongolian Chicken",
    "price": 850
  },
  {
    "category": "Chinese",
    "name": "Chicken Cashew Nuts",
    "price": 850
  },
  {
    "category": "Chinese",
    "name": "Sesame Chicken",
    "price": 850
  },
  {
    "category": "Chinese",
    "name": "Szechuan Chicken",
    "price": 850
  },
  {
    "category": "Chinese",
    "name": "Chicken with Almond & Vegetable",
    "price": 890
  },
  {
    "category": "Rice",
    "name": "Chicken Biryani",
    "price": 850
  },
  {
    "category": "Rice",
    "name": "Mutton Biryani",
    "price": 1250
  },
  {
    "category": "Rice",
    "name": "Masala Fried Rice",
    "price": 750
  },
  {
    "category": "Rice",
    "name": "Steamed Rice",
    "price": 350
  },
  {
    "category": "Rice",
    "name": "Sajji Rice",
    "price": 850
  },
  {
    "category": "Salads & Raita",
    "name": "Yasir Salad",
    "price": 350
  },
  {
    "category": "Salads & Raita",
    "name": "Russian Salad",
    "price": 400
  },
  {
    "category": "Salads & Raita",
    "name": "Raita",
    "price": 250
  },
  {
    "category": "Fast Food",
    "name": "Zinger Burger",
    "price": 620
  },
  {
    "category": "Fast Food",
    "name": "Grilled Chicken Burger",
    "price": 580
  },
  {
    "category": "Fast Food",
    "name": "Chicken Crunch Sandwich",
    "price": 550
  },
  {
    "category": "Fast Food",
    "name": "Malai Chicken Wrap",
    "price": 540
  },
  {
    "category": "Fast Food",
    "name": "Chicken Tikka Wrap",
    "price": 560
  },
  {
    "category": "Fast Food",
    "name": "Vegetable Paratha Roll",
    "price": 450
  },
  {
    "category": "Fast Food",
    "name": "Fries",
    "price": 350
  },
  {
    "category": "Beverages",
    "name": "Soft Drinks",
    "price": 150
  },
  {
    "category": "Beverages",
    "name": "Fresh Lime",
    "price": 180
  },
  {
    "category": "Beverages",
    "name": "Mineral Water",
    "price": 100
  },
  {
    "category": "Beverages",
    "name": "Juices / Shakes",
    "price": 250
  }
]

class Command(BaseCommand):
    help = "Import the menu recovered from the supplied Lahore VIP Food website ZIP."
    def handle(self, *args, **options):
        for position, row in enumerate(MENU):
            category, _ = Category.objects.get_or_create(
                name=row["category"], defaults={"sort_order": position}
            )
            MenuItem.objects.update_or_create(
                category=category, name=row["name"],
                defaults={"price": row["price"], "available": True}
            )
        self.stdout.write(self.style.SUCCESS(f"Menu imported: {len(MENU)} items processed."))

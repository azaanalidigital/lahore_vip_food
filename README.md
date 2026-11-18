# Lahore VIP Food — Django Full-Stack Starter

This project keeps a copy of the original uploaded website in `original_frontend/` and provides a Django-powered restaurant site with a database-backed menu and ordering workflow.

## Included
- Responsive restaurant homepage and online ordering page
- Menu and category management in Django Admin
- Cart with server-side price calculation (the browser cannot choose its own prices)
- Orders saved to the database with unique reference codes
- Order status management and customer order lookup
- SQLite for local development; PostgreSQL supported using `DATABASE_URL`
- Original uploaded HTML/CSS/JS retained for reference

## Windows setup (recommended: no terminal activation needed)
1. Extract this ZIP into a normal folder, for example `D:\\pythonProjects\\lahorevipfood`.
2. Open the extracted `lahorevipfood` folder.
3. Double-click `SETUP_AND_RUN.bat`. It creates a local `.venv`, installs packages into that environment, prepares the database, imports the menu, and starts the site.
4. Open `http://127.0.0.1:8000/` in your browser.
5. To create an admin login, double-click `CREATE_ADMIN.bat`. Then open `http://127.0.0.1:8000/admin/`.
6. Later, use `RUN_WEBSITE.bat` to start the site again.

The batch files call `.venv\\Scripts\\python.exe` directly. You do not need to activate the environment manually, and pip packages will not be installed into your global Python.

The project uses Django 6.1.3 or newer in the 6.1 series because Django 6.1.3 added official Python 3.15 compatibility.

## Important before public launch
1. Confirm the restaurant's real phone/WhatsApp number, address, opening hours, delivery areas and delivery fee. These were not reliably provided in the source ZIP, so the new build avoids hard-coding the old sample phone/email.
2. Set a strong `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, and `DJANGO_ALLOWED_HOSTS` in the hosting provider.
3. Set `DATABASE_URL` to a managed PostgreSQL database for production. SQLite is intended for local testing.
4. Configure HTTPS and review backup, privacy, retention and spam protection policies.
5. Test order notifications with the restaurant before accepting real customer orders. This starter saves orders in Admin but does not yet send SMS, WhatsApp or email notifications and does not process online payments.
6. The included seed menu imports item names and PKR prices found in the supplied JavaScript. Confirm every price and availability with the restaurant before going live.

## Hosting
The Django app cannot run as a static Netlify-only site. Deploy this Django project to a Python-capable host (for example a managed app platform), connect PostgreSQL, then point a domain/subdomain to it. Netlify can still host a separate static frontend if you later split frontend and API.

## Security notes
- Orders are validated on the server and prices are read from the database.
- Django CSRF protection is enabled.
- Do not publish the development secret key or run with DEBUG enabled in production.

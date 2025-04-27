# Airsoft Marketplace

Egy webes alkalmazás, ahol felhasználók airsoft fegyvereket és kiegészítőket tudnak eladni és vásárolni.

---

## Tartalom
- [Projekt Leírás](#projekt-leírás)
- [Funkciók](#funkciók)
- [Telepítés](#telepítés)
- [Fejlesztők](#fejlesztők)

---

## Projekt Leírás
Az Airsoft Marketplace egy teljes stack webalkalmazás (Angular frontend + Laravel backend), amely lehetővé teszi:
- Fegyverek és kiegészítők feltöltését
- Termékek közötti böngészést
- Regisztrációt, bejelentkezést
- Rendelések leadását kiszállítási opcióval
- Profil kezelést (profilkép feltöltés, adatok megjelenítése)

**Backend:** Laravel 10  
**Frontend:** Angular 17

---

## Funkciók
- 👤 Felhasználói regisztráció és bejelentkezés
- 🏢 Saját termékek feltöltése
- 🛒 Rendelés leadás kiszállítással
- 🔍 Termékek szűrése és keresése
- 📤 Profilkép feltöltés
- 🔄 Termék eladás utáni automatikus törlés vagy eladottá állítás

---

## Telepítés

### Backend (Laravel)
```bash
cd backend_airsoft_marketplace
composer install
php artisan migrate --seed
php artisan serve
```
A backend most elérhető lesz a `http://127.0.0.1:8000` címen.

### Frontend (Angular)
```bash
cd frontend
npm install
ng serve
```
A frontend most fut a `http://localhost:4200` alatt.

---

## Fejlesztők
- **Kovács Ákos**
- **Kovács Martin**

---

## Megjegyzés
Ez a projekt oktatási célokból készült. A rendszer egyszerűsített modelleket tartalmaz.

> Köszönjük, hogy megnézted a projektet! 🚀

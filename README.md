# Wrocławskie Kawiarnie

Aplikacja pozwalająca użytkownikom na przeglądanie, ocenianie i komentowanie kawiarni we Wrocławiu. System obsługuje role użytkownika i administratora, umożliwiając różne poziomy dostępu.

---

## Funkcjonalności

- Przeglądanie listy kawiarni.
- Wyświetlanie szczegółów kawiarni (opis, lokalizacja, komentarze).
- Dodawanie komentarzy do kawiarni.
- Panel administratora umożliwiający zarządzanie kawiarniami (dodawanie, edycja, usuwanie).

---

## Wymagania systemowe

- **Node.js** (wersja 16 lub nowsza)
- **npm** lub **yarn**
- **MongoDB** (lokalna lub zdalna baza danych)
- Opcjonalnie: **Docker** (jeśli chcesz uruchomić aplikację w kontenerach)

---

## Instalacja

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/<twoje-konto>/wroclawskie-kawiarnie.git
cd wroclawskie-kawiarnie
2. Instalacja zależności
Backend
bash
Skopiuj kod
cd backend
npm install
Frontend
bash
Skopiuj kod
cd ../frontend
npm install
Konfiguracja
1. Backend
W katalogu backend utwórz plik .env:

cd backend
touch .env
Dodaj do pliku .env poniższe zmienne środowiskowe:

MONGODB_URI=<link-do-twojej-bazy-mongo>
JWT_SECRET=<twoj-tajny-klucz>
PORT=5000
2. Frontend
W katalogu frontend utwórz plik .env.local:

cd ../frontend
touch .env.local
Dodaj poniższe zmienne:

NEXT_PUBLIC_API_URL=http://localhost:5000/api
Uruchamianie aplikacji
1. Uruchomienie backendu
Przejdź do katalogu backend i uruchom serwer:

cd backend
npm run dev
2. Uruchomienie frontendu
Przejdź do katalogu frontend i uruchom aplikację:

cd ../frontend
npm run dev
3. Otwórz aplikację w przeglądarce
Frontend aplikacji będzie dostępny pod adresem:

http://localhost:3000

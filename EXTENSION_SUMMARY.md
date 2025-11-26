# VS Code Ferdek Extension - Summary

## 📦 Co zostało utworzone

Kompletna wtyczka VS Code dla języka Ferdek z wszystkimi niezbędnymi funkcjonalościami.

### Struktura projektu

```
vscode-ferdek/
├── src/
│   └── extension.ts                    # Główna logika wtyczki (run, compile, hover, completion)
├── syntaxes/
│   └── ferdek.tmLanguage.json         # Kolorowanie składni dla wszystkich słów kluczowych
├── snippets/
│   └── ferdek.json                    # 30+ szablonów kodu (snippets)
├── images/
│   └── icon.svg                       # Ikona wtyczki
├── language-configuration.json        # Konfiguracja języka (komentarze, nawiasy)
├── package.json                       # Manifest wtyczki
├── tsconfig.json                      # Konfiguracja TypeScript
├── .eslintrc.json                     # ESLint konfiguracja
├── .gitignore                         # Git ignore
├── .vscodeignore                      # VS Code ignore
├── README.md                          # Dokumentacja użytkownika
├── CHANGELOG.md                       # Historia zmian
├── DEVELOPMENT.md                     # Instrukcja developmentu
└── install.sh                         # Skrypt instalacji
```

## ✨ Główne funkcje

### 1. Syntax Highlighting
- Kolorowanie wszystkich słów kluczowych Ferdeka
- Rozróżnianie między:
  - Słowami kluczowymi kontroli przepływu
  - Deklaracjami
  - Operatorami arytmetycznymi i logicznymi
  - Funkcjami z bibliotek standardowych (KANAPA, KIBEL, SKRZYNKA, KLATKA)

### 2. Code Snippets (30+ szablonów)
- Struktura programu
- Deklaracje zmiennych i tablic
- Instrukcje warunkowe (if/else)
- Pętle (while)
- Deklaracje funkcji
- Operacje na stringach (KANAPA)
- Operacje na plikach (KIBEL)
- Obsługa błędów (try/catch)
- Importowanie modułów

### 3. Commands (Komendy)
- **Ctrl+Shift+F5** - Uruchomienie programu Ferdek
- **Ctrl+Shift+C** - Kompilacja do C

### 4. IntelliSense
- Hover information - podpowiedzi przy najechaniu myszą
- Code completion - auto-complete dla słów kluczowych

### 5. Konfiguracja języka
- Rozpoznawanie komentarzy (`RYM CYM CYM`)
- Dopasowywanie nawiasów
- Code folding dla funkcji i bloków

## 📋 Zawarte biblioteki

### KANAPA (String functions)
```ferdek
USIĄDŹ NA KANAPIE         - Konkatenacja
ROZCIĄGNIJ KANAPĘ        - Padding
POTNIJ KANAPĘ            - Substring
ILE MIEJSCA NA KANAPIE   - Długość
WYTRZEP KANAPĘ           - Trim
ZAMIEŃ NA KANAPIE        - Replace
PRZESUŃ NA KANAPIE       - Split
```

### KIBEL (File I/O)
```ferdek
OTWÓRZ KIBEL             - Otwarcie do odczytu
OTWÓRZ KIBEL DO ZAPISU   - Otwarcie do zapisu
ZAMKNIJ KIBEL            - Zamknięcie
SPUŚĆ WODĘ               - Zapis
WYPOMPUJ                 - Odczyt
CZY KIBEL ZAJĘTY         - Sprawdzenie istnienia
```

### SKRZYNKA (Math functions)
```ferdek
ILE W SKRZYNCE           - Wartość absolutna
POLICZ SKRZYNKI          - Floor
ZAOKRĄGLIJ DO SKRZYNKI   - Ceiling
PODZIEL SKRZYNKI         - Dzielenie
RESZTA ZE SKRZYNKI       - Modulo
LOSUJ ZE SKRZYNKI        - Liczba losowa
```

### KLATKA (Networking)
```ferdek
WYJDŹ NA KLATKĘ          - Połączenie
ZAPUKAJ DO SĄSIADA       - Wysłanie wiadomości
CZY SĄSIAD W DOMU        - Status połączenia
```

## 🚀 Instalacja i uruchomienie

### Wymagania
- Node.js 14+
- npm 6+
- VS Code 1.84+

### Szybka instalacja
```bash
cd vscode-ferdek
chmod +x install.sh
./install.sh
```

### Alternatywnie ręcznie
```bash
cd vscode-ferdek
npm install
npm run compile
```

### Development
```bash
npm run watch          # Auto-compilation
# Press F5 in VS Code to start Extension Development Host
```

## 🎯 Konfiguracja VS Code

Dodaj do `settings.json`:
```json
{
  "ferdek.executable": "/path/to/ferdek",
  "ferdek.compilerExecutable": "/path/to/ferdecc",
  "ferdek.showOutputChannel": true
}
```

## 📚 Dokumentacja

- **README.md** - Dla użytkowników (instalacja, snippets, syntax overview)
- **DEVELOPMENT.md** - Dla developerów (budowanie, testy, publikacja)
- **CHANGELOG.md** - Historia zmian

## 🔧 Funkcje do rozszerzenia

- [ ] Language Server Protocol (LSP)
- [ ] Debugging support
- [ ] Integrated REPL
- [ ] Lepsze error reporting
- [ ] Project templates
- [ ] Online documentation links
- [ ] Linting na żywo
- [ ] Refactoring suggestions

## 📦 Publikacja

Aby opublikować w VS Code Marketplace:
```bash
npm install -g vsce
vsce publish
```

## 📄 Licencja

MIT

---

**Stworzono:** 26 listopada 2025
**Dla:** Projektu Ferdek
**Autor:** kupolak

# Instalacja rozszerzenia Ferdek z pliku VSIX

## Plik rozszerzenia

Plik rozszerzenia: `vscode-ferdek-0.1.0.vsix`

Rozmiar: 452 KB

## Instalacja w VS Code

### Metoda 1: Z menu VS Code

1. Otwórz VS Code
2. Idź do **Extensions** (Ctrl+Shift+X / Cmd+Shift+X)
3. Kliknij na ikonę "..." (More Actions)
4. Wybierz "Install from VSIX..."
5. Wybierz plik `vscode-ferdek-0.1.0.vsix`
6. Kliknij "Open"

### Metoda 2: Z wiersza poleceń

```bash
code --install-extension vscode-ferdek-0.1.0.vsix
```

### Metoda 3: Drag & Drop

1. Otwórz VS Code
2. Otwórz Extensions (Ctrl+Shift+X)
3. Przeciągnij i upuść plik `.vsix` na okno Extensions

## Weryfikacja instalacji

Po instalacji:

1. Utwórz nowy plik z rozszerzeniem `.ferdek`
2. Powinieneś zobaczyć:
   - Kolorowanie składni
   - Sugestie snippetów
   - Hover info

## Testowanie funkcji

### Test 1: Syntax Highlighting
```ferdek
CO JEST KURDE
PANIE SENSACJA REWELACJA "Cześć!"
MOJA NOGA JUŻ TUTAJ NIE POSTANIE
```

Powinieneś zobaczyć kolorowe słowa kluczowe.

### Test 2: Snippets
Wpisz `ferdek` i naciśnij Tab - powinieneś zobaczyć template programu.

### Test 3: Commands

1. Utwórz plik `test.ferdek` z zawartością powyżej
2. Naciśnij **Ctrl+Shift+F5** aby uruchomić program
   (jeśli masz zainstalowany interpreter Ferdek)

## Konfiguracja

Jeśli masz zainstalowany Ferdek, skonfiguruj ścieżkę w settings:

```json
{
  "ferdek.executable": "/path/to/ferdek",
  "ferdek.compilerExecutable": "/path/to/ferdecc"
}
```

## Troubleshooting

### Rozszerzenie nie pojawia się

- Sprawdź czy VS Code widzi plik `.vsix` (452 KB)
- Spróbuj odświeżyć VS Code (Ctrl+Shift+P → Developer: Reload Window)

### Brak syntax highlighting

- Utwórz nowy plik z rozszerzeniem `.ferdek`
- Jeśli i tak nie działa, usuń i zainstaluj ponownie

### Snippety nie działają

- Sprawdź czy język jest rozpoznawany jako "Ferdek"
- Spróbuj wpisać snippet prefix z listy

## Snippety dostępne

- `ferdek` - Program template
- `print` - Print statement
- `var` - Variable
- `if` - If statement
- `while` - While loop
- `func` - Function
- `concat` - String concat
- `fopen` - File operations
- ...i 20+ więcej!

## Potrzebna pomoc?

Sprawdź README.md dla pełnej dokumentacji.

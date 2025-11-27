# Ferdek Language Support for VS Code

Language support for the **Ferdek** programming language - a Polish meme language with humorous and absurd syntax inspired by the classic Polish comedy.

## Features

- **Syntax Highlighting** - Color-coded syntax highlighting for all Ferdek language constructs
- **Code Snippets** - Quick snippets for common patterns (variables, functions, loops, file operations, etc.)
- **Language Configuration** - Comment and bracket pair matching
- **Run & Compile** - Commands to run and compile Ferdek programs
- **Hover Information** - Get quick information about language keywords
- **Code Completion** - Auto-complete for language keywords and functions

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Ferdek Language Support"
4. Click Install

Or manually install the extension by cloning this repository into your VS Code extensions folder.

## Quick Start

### Create a new Ferdek file

1. Create a file with `.ferdek` extension
2. Start typing - use snippet `ferdek` to generate a basic program template

### Basic Program Structure

```ferdek
CO JEST KURDE

RYM CYM CYM This is a comment
PANIE SENSACJA REWELACJA "Hello, World!"

MOJA NOGA JUŻ TUTAJ NIE POSTANIE
```

### Running Programs

- **Ctrl+Shift+F5** - Run the current Ferdek file
- **Ctrl+Shift+C** - Compile the current Ferdek file to C

### Available Snippets

| Prefix | Description |
|--------|-------------|
| `ferdek` | Basic program template |
| `print` | Print statement |
| `var` | Variable declaration |
| `array` | Array declaration |
| `if` | If statement |
| `ifelse` | If-else statement |
| `while` | While loop |
| `func` | Function declaration |
| `call` | Function call |
| `concat` | String concatenation (KANAPA) |
| `fopen` | Open file for reading (KIBEL) |
| `fwrite` | Write to file (KIBEL) |
| `fread` | Read from file (KIBEL) |
| `mkdir` | Create directory (KIBEL) |
| `ls` | List directory (KIBEL) |
| `cp` | Copy file (KIBEL) |
| `mv` | Move/rename file (KIBEL) |
| `hashmap` | Create HashMap (SZAFKA) |
| `hmput` | Put into HashMap (SZAFKA) |
| `hmget` | Get from HashMap (SZAFKA) |
| `listlen` | Get list length (WERSALKA) |
| `listadd` | Append to list (WERSALKA) |
| `try` | Try-catch block |

## Language Overview

### Keywords

**Program Structure:**
- `CO JEST KURDE` - Program start
- `MOJA NOGA JUŻ TUTAJ NIE POSTANIE` - Program end

**Variables:**
- `CYCU PRZYNIEŚ NO` - Variable declaration
- `TO NIE SĄ TANIE RZECZY` - Variable initialization
- `O KURDE MAM POMYSŁA` - Assignment start

**Control Flow:**
- `NO JAK NIE JAK TAK` - If statement
- `A DUPA TAM` - Else statement
- `CHLUŚNIEM BO UŚNIEM` - While loop
- `A POCAŁUJCIE MNIE WSZYSCY W DUPĘ` - Break

**Functions:**
- `ALE WIE PAN JA ZASADNICZO` - Function declaration
- `NA TAKIE TEMATY NIE ROZMAWIAM NA SUCHO` - Function parameters
- `DO WIDZENIA PANU` - Function end
- `W MORDĘ JEŻA` - Function call
- `AFERA JEST` - Assign function result
- `I JA INFORMUJĘ ŻE WYCHODZĘ` - Return statement

### Standard Library Modules

**KANAPA** - String functions:
- `USIĄDŹ NA KANAPIE` - Concatenate strings
- `ROZCIĄGNIJ KANAPĘ` - Pad string
- `POTNIJ KANAPĘ` - Substring
- `ILE MIEJSCA NA KANAPIE` - String length
- `WYTRZEP KANAPĘ` - Trim whitespace
- `ZAMIEŃ NA KANAPIE` - Replace substring
- `PRZESUŃ NA KANAPIE` - Split string

**KIBEL** - File & Directory I/O:
- `OTWÓRZ KIBEL` - Open file for reading
- `OTWÓRZ KIBEL DO ZAPISU` - Open file for writing
- `ZAMKNIJ KIBEL` - Close file
- `SPUŚĆ WODĘ` - Write to file
- `WYPOMPUJ` - Read from file
- `CZY KIBEL ZAJĘTY` - Check if file exists
- `ZRÓB KIBEL` - Create directory (mkdir)
- `WYWAL KIBEL` - Remove directory (rmdir)
- `CO W KIBLU` - List directory contents (ls)
- `CZY TO KIBEL` - Check if path is directory
- `PRZEKOPIUJ KIBEL` - Copy file (cp)
- `PRZENIEŚ KIBEL` - Move/rename file (mv)
- `WYKOP WSZYSTKIE KIBLE` - Recursive delete (rm -rf)

**SKRZYNKA** - Math functions:
- `ILE W SKRZYNCE` - Absolute value
- `POLICZ SKRZYNKI` - Floor
- `ZAOKRĄGLIJ DO SKRZYNKI` - Ceiling
- `PODZIEL SKRZYNKI` - Integer division
- `RESZTA ZE SKRZYNKI` - Modulo
- `LOSUJ ZE SKRZYNKI` - Random number

**KLATKA** - Networking:
- `WYJDŹ NA KLATKĘ` - HTTP GET
- `ZAPUKAJ DO SĄSIADA` - HTTP POST
- `KTO NA KLATCE` - Get public IP
- `CZY SĄSIAD W DOMU` - Ping/check host

**SZAFKA** - HashMap/Dictionary:
- `OTWÓRZ SZAFKĘ` - Create empty HashMap
- `WŁÓŻ DO SZAFKI` - Put key-value pair
- `WYJMIJ Z SZAFKI` - Get value by key
- `WYRZUĆ ZE SZAFKI` - Remove key-value pair
- `CZY W SZAFCE` - Check if key exists
- `WSZYSTKIE SZUFLADKI` - Get all keys
- `ILE W SZAFCE` - Get HashMap size

**WERSALKA** - List/Array operations:
- `ILE NA WERSALCE` - Get list length
- `POŁÓŻ NA WERSALCE` - Append element to list
- `ZDEJMIJ Z WERSALKI` - Pop last element from list
- `CZY LEŻY NA WERSALCE` - Check if element in list

## Settings

Configure Ferdek extension in VS Code settings:

```json
{
  "ferdek.executable": "ferdek",           // Path to Ferdek interpreter
  "ferdek.compilerExecutable": "ferdecc",  // Path to Ferdek compiler
  "ferdek.showOutputChannel": true         // Show output when running/compiling
}
```

## Example Program

```ferdek
CO JEST KURDE

RYM CYM CYM Calculate factorial
ALE WIE PAN JA ZASADNICZO silnia
NA TAKIE TEMATY NIE ROZMAWIAM NA SUCHO n
  NO JAK NIE JAK TAK BABKA DAWAJ RENTĘ n BABKA DAWAJ RENTĘ 1
    I JA INFORMUJĘ ŻE WYCHODZĘ 1
  DO CHAŁUPY ALE JUŻ
  
  CYCU PRZYNIEŚ NO wynik
  TO NIE SĄ TANIE RZECZY ROZDUPCĘ BANK n W MORDĘ JEŻA silnia(PASZOŁ WON n BABKA DAWAJ RENTĘ 1)
  I JA INFORMUJĘ ŻE WYCHODZĘ wynik
DO WIDZENIA PANU

CYCU PRZYNIEŚ NO x
TO NIE SĄ TANIE RZECZY 5
AFERA JEST result W MORDĘ JEŻA silnia(x)
PANIE SENSACJA REWELACJA result

MOJA NOGA JUŻ TUTAJ NIE POSTANIE
```

## Requirements

- VS Code 1.84.0 or higher
- Ferdek compiler/interpreter installed on your system

## Links

- [Ferdek Repository](https://github.com/kupolak/ferdek)
- [Report Issues](https://github.com/kupolak/ferdek/issues)

## License

MIT

## Author

Created for the Ferdek programming language project by kupolak

# Pokedex

* [Informacje ogólne](#informacje-ogólne)
* [Technologie](#technologie)
* [Instalacja i uruchomienie](#instalacja-i-uruchomienie)
* [Informacje szczegółowe](#informacje-szczegółowe)

## Informacje ogólne

Pokedex to prosta aplikacja webowa umożliwiająca przeglądanie pokemonów pochodzących z API (https://pokeapi.co/). Strona pozwala na dodawanie pokemnów do ulubionych, walki w arenie, sortowanie pokemonów w rankingu, edycje pokemonów pochodzących z API oraz dodawanie nowych pokemonów do całej kolekcji. 

Aplikacja Pokedex porównuje dane pobrane z API z danymi pokemonów pochodzących z JSON Server. Porównywane dane są na bieżąco aktualizowane na stronie.  

## Technologie

Srtona została utworzona przy pomocy: 
  * vite ^5.4.10
  * react ^18.3.1 
  * react-dom ^18.3.1 
  * react-hook-form ^7.53.2 
  * react-router-dom ^6.28.0 
  * @hookform/resolvers ^3.9.1 
  * zod ^3.23.8 
  * notistack ^3.0.1 
  * json-server ^0.17.4 
  * postcss ^8.4.48 
  * tailwindcss ^3.4.14 
  * flowbite ^2.5.2 
  * flowbite-react ^0.10.2 
  * clsx ^2.1.1 
  * eslint ^9.13.0 
  * eslint-plugin-react ^7.37.2 
  * eslint-plugin-react-hooks ^5.0.0 
  * eslint-plugin-react-refresh ^0.4.14 
  * globals ^15.11.0 
  * @eslint/js ^9.13.0 
  * @types/react ^18.3.12 
  * @types/react-dom ^18.3.1 


## Instalacja i uruchomienie

Repozytorium zawiera plik package.json, który zawiera niezbęde informacje do instalacji wszytskich paczek koniecznych do prawidłowego działnia strony.

Skopiuj repozytorium używając:  ```git clone https://github.com/krzysztofmisiejuk/Pokedex``` 
    
Pobierz aktualną wersję plików: ```git pull``` 
    
Przejdź pliku właściwego pokedex, użyj komendy w terminalu ```cd /pokedex```
    
Jeżeli znajdujesz się w prawidłowym pliku wpisz komndę w terminalu ```npm install``` 
    
Powinny zostać zainstalowane wszytskie paczki będące konieczne do odpowiedniego działania strony.
    
Strona korzysta z adresu http://localhost:5173, do uruchomienia strony wpisz w terminalu ```npm run dev``` 
    
Dane strony są zapisywane w lokalnej bazie danych, dlatego uruchom JSON server wpisujać komendę ```npm run db``` 
    
Strona Pokedex powinna działać poprawnie na porcie localhost:5173.


## Informacje szczegółowe

### Logowanie 
Do pokedex można się zalogować bez konieczności rejrestracji używając domyślnych danych lub po rejerstracji, wprowadzając nowe użytkownika do lokalnej bazy danych.

Dane do logowania: 

**Nazwa użytkownia: user**

**Hasło: Password123!**

**Z wyjątkiem funkcji wyszukiwania na stronie głównej, wszytskie pozostałe funkcjonalności są dostępne dopiero po zalogowaniu.**

### Rejerstracja

Podczas procesu Rrejerstacji należy uzupełnić formularz składający się z nastepujących pól:
* Imię
* Nazwa użytkownia - **używana do logowania**
* Email
* Hasło - **używane do logowania**
* Potwierdzenie Hasła

Domyślne dane do logowania oraz dane wprowadzone podczas procesu rejerstracji użytkownika są zapisane w bazie danych na JSON server - https://localhost:3000/users.

### Wyszukiwarka

Na stronie głownej dostępna jest wyszukiwarka, dzięki której można wyszukać pokemony znajdujące się na aktualnej stronie. Wyszukiwarka aktualizuje wyniki wyszukiwania po każdym wprowadzonym lub usuniętym znaku. 

Pokemony w wyszukiwarce są wyświetlone w formie kart. Na każdej kracie znajduje się zdjęcie pokemona, imię, parametry pokemona tj. wysokość, waga, doświadczenie oraz jego zdolność.

Kliknięcie w kartę przenosi do strony (http:localhost/name), na której są przedstawonie dane tylko jednego pokemona takie jak na karcie na stronie głównej.

Ponadto każda karta zawiera dwie ikony, które domyślnie są wyszarzone:

* **serce** - klikniecie w serce zapisuje pokemona w kolekcji ulubionych oraz w lokalnej bazie danych (http://localhost:3000/favourites). Po dodaniu pokemona do kolekcji ulubionych ikona serca staje się intensywnie czerwona. 
* **miecz** - kliknięcie w ikonę miecza zapisuje pokemona w arenie oraz w lokalnej bazie danych (http://localhost:3000/arena).  Jeżeli dany pokemon został dodany do areny ikona miecza staje sie granatowa. Obok znajduje się licznik pokazujący ile pokemonów znajduję sie obecnie w arenie.

Kiedy dany pokemon stoczył już jakieś walki w arenie w prawym górnym rogu jego karty pojawiają się statystyki pokazujące wygrane oraz przegrane w arenie. 

### Ulubione

Sekcja ulubione zawiera kolekcje pokemonów znajdujących sie w bazie danych w favourites (http:localhost:3000/favourites). 
Pokemony są przedstawione są na takich samych kartach jak na stronie głównej oraz posiadają takie same funkcjonalności. 


### Arena
W sekcji arena znajdują się miejsca na dwie karty pokemonów, które mają brać udział w bitwie. Pokemony do areny można dodać na stronie głównej lub na podstronie ulubione, klikajac ikone miecza.  
W przypadku kiedy do areny są dodane dwa pokemony, przycisk pomiędzy nimi staje się aktywny. Kliknięcie na przycisk "Walcz" rozpoczyną walkę. Wygrywa ten pokemon, którego iloczyn doświadczenia i wagi jest wyższy.  
Wygrany pokemon otrzymuje 10 punktów doświadczenia. Po skończonej bitwie pojawia się komunikat z informacją o tym kto jest zwycięzcą oraz przycisk "Opuść arene", który usuwa pokemony z areny.  

Statystyki dotyczące wyników pokemonów w arenie oraz nabytego doswidczenia są przechowywane w lokalnej bazie daych - http://localhost:3000/stats.

### Ranking

Sekcja Ranking zawera dane wszytskich pokemonów oraz pozwala sortować pokemony według:

* Liczby porządkowej
* Imienia - alfabetycznie
* Wzrostu pokemona
* Wagi pokemona
* Doświadczenia
* Wygranych walk w arenie
* Przegranych walk w arenie

Aby sortować pokemony według wybranej cechy należy kliknąć na nią w nagłówku tabeli - najechanie na daną cechę powoduje pojawienie się pod nią strzałek.  
Pierwsze kliknięcie sortuje pokemonów rosnąco, drugie kliknięcie w tą sama cechę sortuje malejąco. 

### Edycja

Podstrona Edycja daje możliwość stworzenia nowego pokemona lub edycji pokemonów już dostęnych - pobranych z API.  

#### Tworzenie nowego pokemona 
Na górze strony widoczny jest przycisk "Stwórz nowego pokemona", którego kliknięcie przekierowuje do formularza tworzenia nowego pokemona. 
Żeby utworzyć nowego pokemona należy podać niezbędne jego cechy:

* Nazwę
* Wagę
* Wzrost
* Doświadcznie
* Wybrać zdjęcie nowego pokemona.  Kiedy zdjęcie zostało już wcześniej wybrane do tworzenia nowego pokemona zostaje ono wyszarzone, a próba do zatwierdzenia formularza z takim zdjęciem powoduje pojawienie sie komunikatu, że zdjęcie zostało użyte już wcześniej. 

Żeby zatwierdzić nowego pokemona trzeba kliknąć w przycisk "Dodaj nowego pokemona", który dodaje nowego pokemona do lokalnej bazy danych.

#### Edycja pokemnów
Poniżej przycisku do tworzenia nowych pokemonów znajduje się lista wszystkich już istniejącyh pokemonów.  Każdy element listy zawiera liczbę porządkową, zdjęcie pokemona, jego nazwę oraz przycisk "Edytuj".  
Kliknięcie w ten przycisk przenosi do formularza edycji pokemonów. Formularz zawiera pola wypełnione dotychczaswowymi wartościami cech, które można edytować.  
Są to odpowiednio:

* Wagę
* Wzrost
* Doświadcznie

Niżej jest zdjęcie edytowanego pokemona, a także przycisk "Zaktualizuj dane pokemona", który zapisuje zmianę danych oraz przenosi do strony edycji.

Dane nowych i edytowanych pokemonów są zapisywane w http://localhost:3000/newPokemons

**Procesy tworzenia nowego pokemona i edycji można anulować w każdej chwili klikając przycisk "Anuluj". Wówczas żadne zaminy na stronie nie zostają wprowadzone.**

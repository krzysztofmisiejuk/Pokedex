# Pokedex

* [Informacje ogólne](#informacje)
* [Technoloigie](#technologie)
* [Instalacja i uruchomienie](#instalacja-i-uruchomienie)
* [informacje szczególowe](#informacje-szczegółowe)

## Informacje

PokedeX to prosta aplikacja webowa umożliwiająca przeglądanie pokemonów pochodzących z API (https://pokeapi.co/). Strona pozwala na dodawanie pokemnów do ulubionych, walki w arenie, sortowanie pokemonów w rankingu, edycje pokemonów pochodzących z API oraz dodawanie nowych pokemonów do całej kolekcji. 

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

Repozytorium zawiera plik package.json, kóry zawiera niezbęde informacje do instalaji wszytskich paczek koniecznych do prawidłowego działnia strony.

Skopiuj repozytorium używając:  ```git clone https://github.com/krzysztofmisiejuk/Pokedex``` 
    
Pobierz aktualną wersję plików: ```git pull``` 
    
Przejdź pliku pokedex, użyj komendy w terminalu ```cd /pokedex```
    
Jeżeli znajdujesz się w prawidłowym pliku wpisz komndę w terminalu ```npm install``` 
    
Powinny zostać zainstalowane wszytskie paczki będące konieczne do odpowiedniego działania strony 
    
Strona korzysa z adresu http://localhost:5173, do uruchomienia strony wpisz w terminalu ```npm run dev``` 
    
Dane strony są zapisywane w lokalnej bazie danych, dlatego uruchom JSON server wpisujać komendę ```npm run db``` 
    
Strona Pokedex powinna działać poprawnie na porcie localhost:5173.


## Informacje szczegółowe

### Logowanie 
Do logownia bez konieczności rejrestracji można użyć domyślnych danych lub po rejerstracji danych wprowadzonych przez uzytkownia.

Dane do logowania: 

**Nazwa użytkownia: user**

**Hasło: Password123!**

**Z wyjątkiem funkcji wyszukiwania na stronie głównej, wszytskie pozostałe funkcjonalności są dostępne dopiero po zalogowaniu.**

### Rejerstracja

Podczas procesu Rejerstacji należy uzupełnić formularz rejerstacji składający się z nastepujących pól:
* Imię
* Nazwa użytkownia - **używana do logowania**
* Email
* Hasło - **używane do logowania**
* Potwierdzenie Hasła

Domyślne dane do logowania oraz dane wprowadzone podczas procesu rejerstracji użytkownika są zapisane w bazie danych na JSON server - https://localhost:3000/users.

### Wyszukiwarka

Na stronie głownej dostępna jest wyszukiwarka, dzieki której można wyszukać pokemony znajdujące sie na aktualnej stronie. Wyszukiwarna aktualizuje wynika wyszukiwania po każdym wprowadzonyl lub usuniętym znaku. 

Pokemony w wyszukiwarce są wyświetlone w formie kart. Na kazdej kracie znajduje się zdjęcie pokemona, imię, parametry pokemonąm tj wysokość, waga, doświadczenie oraz jego zdolność.

Kliknięcie w kartę przenosi do strony (http:localhost/name), na której sa przedstawonie dane tylko jednego pokemona (http://localhost/name) takie jak na karcie na stronie głownej.

Ponadto kązda karta zawiera dwie ikony, które domyślnie są wyszarzone:
* **serce** - klikniecie w serce zapisuje pokemona w kolekcji ulubionych oraz w lokalnej bazie danych (http://localhost:3000/favourites). Po dodaniu pokemona do kolekcji ulubionych ikona serca staje się intensywnie czerwona. 
* **miecz** - kliknięcie w ikonę miecza zapisuje pokemona w arenie oraz  w lokalnej bazie danych (http://localhost:3000/arena).  Jeżeli dany pokemona zdostał dodany do areny ikona miecza staje sie granatowa. Obok znajduje się licznik pokazujący ile pokemonów znajduję sie obecnie w arenie.

Kiedy dany pokemon stoczył już jakieś walki w arenie w prawym górnym rogu jego karty pojawiąja się statystyki pokazujące wygrane oraz przegrane w arenie. 

### Ulubione

Sekcja ulubione zawiera kolekcje pokemonów znajdujących sie w bazie danych w kolekcjoi favourites (http:localhost:3000/favourites). 
Pokemony są przedstawione są na takich samych kartach jak an stronie głównej oraz posiadają takie same funkcjonalności. 


### Arena
W sekcji arena znajdują sie miejsca na dwie karty pokemonów, które będą brać udział w bitwie.  Pokemony do areny można dodać na stronie głównej lub na podstronie ulubione, klikajac ikone miecza.  
W przypadku kiedy do areny są dodane dwa pokemony, przycisk pomiędzy nimi staje się aktywny. Kliknięcie na przycisk "Walcz" rozpoczyną walkę. Wygrywa ten pokemon, którego iloczyn doswiadczenia i wagi jest wyższy.  
Wygrany pokemon otrzymuje 10 punktów doświadczenia. Po skonczonej bitwie pojawia się komunikat z informacją o tym kto jest zwyciezcą oraz przycisk "Opuść arene", który usuwa pokemony z areny.  

Statystyki dotyczące wyników pokemonów w arenie oraz nabytego doswidczenia są przechowywane w lokalnej bazie daych - http://localhost:3000/stats.

### Ranking

Sekcja Ranking zawera dane wszytskich pokemonów oraz pozwala sortować pokemony według:

* Liczby porządkowej
* Imienia - alfabetycznie
* Wzrostu pokemona
* Wagi pokemona
* Doświadczenia
* Wygranych w arenie
* Pezegranych w arenie

Aby sortować pokemony według wybranej cechy należy kliknać na nią w nagłówku tabeli - najechanie na daną cechę powoduje pojawienie się pod nią strzałek.  
Pierwsze kliknięcie sortuje pokemonów rosnąco, drugie kliknięcie w tą sama cechę sortuje malejąco. 

### Edycja

Podstrona Edycja daje możliwość stworzenia nowego pokemona lub edycji pokemonów już dostęnych - pobranych z API.  

#### Tworzenie nowego pokemona 
Na górze strony widoczny jest przycisk "Stwórz nowego pokemona", którego kliknięcie przekierowuje od formularza tworzenia nowego pokemona. 
Zeby utworzyć noego pokemona należy podać niezbędne cechy pokemona:

* Nazwę
* Wagę
* Wzrost
* Doświadcznie
* Wybrać zdjęcie nowego pokemona.  Kiedy zdjecie zostało już wcześniej wybrane do tworzenia nwego pokemona zostaje ono wyszarzona, a próba do zatwierzenia formularza z takim zdjęciem powoduje pojawienie sie komunikatu, że zdjęcie zostało użyte już wcześniej. 

Żeby zatwierdzić nowego pokemona trzeba kliknąć w przycisk "Dodaj nowego pokemona", który dodaje nowego pokemona

#### Edycja pokemnów
Poniżej przycisku do tworzenia nowych pokemonów znajduje sie lista wszystkich już istniejącyh pokemonów.  Każdy element listy zawiera liczbe porządkową, zdjęcie pokemona, jego nazwę oraz przycisk "Edytuj".  
Kliknięcie w ten przycisk przenosi do formularza edycji pokemonów. Formularz zawiera pola wypełnione dotychczaswowymi wartościami cech, odpowiednio:

* Wagę
* Wzrost
* Doświadcznie

Niżej jest zdjęcie edytowanego pokemona, a także przycisk "Zaktualizuj dane pokemona", który zatwierdza zmianę danych oraz przenosi do strony edycji.

Dane nowych i edytowanych pokemonów są zapisywane w http://localhost:3000/newPokemons

**Procesy tworzenia nowego pokemona i edycji można anulowac w każdej chwili klikając przycisk "Anuluj". Wówczas żadne zaminy na stronie nie zostają wprowadzone. **

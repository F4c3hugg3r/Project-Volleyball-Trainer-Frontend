# Volleyballtrainer-Frontend
Dies ist das **Frontend** für das Projekt des Moduls Webtechnologien von *Lennard Dubhorn*

> URL: https://volleyball-trainer-frontend.onrender.com

## Funktionsweise der Anwendung

Die Anwendung ist im Kern eine **Quiz App**, mit welcher man das 5:1 Volleyball Läufersystem üben und festigen kann. Das System ist mit Abstand das gängigste im professionelleren Bereich des Sportes, muss aber geübt werden, um die Abläufe möglichst reibungslos zu verinnerlichen und abrufen zu können.

Auf dem **Begrüßungs/Home-Screen** oder in der **Navbar** kann man zum Quiz oder zum Profil navigieren. In der Quiz Ansicht kann man zwischen unterschiedlichen Spielmodi wählen.


### Quiz
> **Positionen**  -  wähle zwischen den Positionen, die im System festgelegt sind, um je nach Stärken des Spielers die Aufgaben gezielt zuzuteilen.

> **Ablauf**  -  du kannst die Fragen unterteilen, wenn du lieber nur die Annahme- oder Aufschlagssituation üben möchtest

> **Rotation**  -  wähle den Reihenfolge/Rotation, in dem die Fragen gestellt werden sollen


Es werden anschließend jeweils eine Frage zur Aktuellen Position in der Rotation (Läufer 6-1) und eine zur entsprechenden Grundaufstellung gestellt. Bei der kleinstmöglichen Einschränkung sind es insgesamt 12 Fragen (6x Aufschlag + 6x Annahme) a jeweils 2 Unterfragen, also 24 Fragen pro Fragenblock. Diese werden anschließend ausgewertet und nach Anzahl der versuche bewertet.


### Profile
Im **Profile** gibt es für jede Position eine Ansicht mit Statistiken zur erfolgreichen Beantwortung unterteilt nach:

* Alle Fragen der Position
* Alle Fragen der Position beschränkt auf die Annahme
* Alle Fragen der Position beschränkt auf den Aufschlag
* Alle Fragen der Position aufgeteilt nach Rankings

Das **Rating** einer Frage (bestehend aus 2 Unterfragen) ist so aufgebaut
* Beginner > 6 Versuche
* Amateur > 4 Versuche
* Pro > 2
* Perfect 2 Versuche

Werden Alle Fragen einer Position in einem bestimmten Rating beantwortet erscheint entsprechend des Ratings ein Symbol an der Statistik. Sollten die selben Fragen mehrmals vollständig mit gleichem Rating abgeschlossen sein, wird dies durch eine Zahl am Symbol gekennzeichnet.

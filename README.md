# Clean architecture training

![Clean architecture](./images/CleanArchitecture.jpg)

## FR

### à savoir

- Les dépendances pointent vers l'extérieur.
  - ex : la couche framework dépend de la couche adapter mais pas l'inverse.
- Chaque couche communique à l'aide de data structures simples.
- Focalisé business (le centre). Plus on s'éloigne du centre plus ça devient anecdotique pour le comportement de l'application.
- Interactor = use case.
- Chaque couche est indépendament testable.

### les couches

Du centre vers l'extérieur.
D'autres couches peuvent être ajoutées, il faut juste appliquer les principes ci-dessus.

--- business (CORE)

- Entités
- Application

--- implémentation (séparé par ce qu'on appelle une boundary/frontière)

- Adapteurs
  - Primaires:
    - Une route
    - Une commande shell
    - Un cron
  - Secondaires : Points de sortie de l'application
    - Repository
    - Client Mail, SMS
- Frameworks

on ne retourne pas d'objet métier depuis les use-cases !

### CQRS

Séparation des opérations READ/WRITE.

Représentation différente des opérations read et write.

Utilisation de commandes pour écrire des données et de queries pour lire les données.

- Les queries
  - Ne modifient pas l'état du système.
  - Retourne un DTO
- Les commandes .
  - Elles sont task-based, et non model centric.
  - Changement d'état du système.

Dans ce cas un use case ne pourra pas read/write en même temps.

## Use cases

### Create TodoList

### Add Todo to TodoList

### Complete Todo From TodoList

### Delete Todo From TodoList

### List TodoLists

### Get TodoList and their Todos

## Using DDD

### Concepts

#### AggregateRoots

Entités gérants plusieurs entités qui ne savent exister sans celles-ci.

La validation doit se trouver le plus proche de l'entité. Pour ne pas que l'entité devienne.

La majeure partie de la logique domaine doit se trouver dans les entités. Pour ne pas que ceux-ci deviennent anémiques.

#### Value Objects

Représente un type et encapsule la logique de validation d'un type.

## Using functionnal programming
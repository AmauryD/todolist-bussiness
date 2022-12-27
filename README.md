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

*Pas mis en application car un peu trop overkill, mais Good To Know*.

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

User can create a todoList for itself

### Add Todo to TodoList

User can create a todo only in his todos

### Complete Todo From TodoList

Use can complete it's own todos

### Delete Todo From TodoList

User can delete it's own todos

### List TodoLists

User can list it's own todo-lists

### Get TodoList and their Todos

Use can view his todolists and their todos

## Data Structures

### Todo

- name
- isDone

### Todo-list

- name
- isDone (from all todos)
- owner

## Using DDD

### Concepts

#### Ubiquitous Language

Langage commun entre les gens du métier et le developpeur.

#### Bounded Context

![Bounded Context example](https://martinfowler.com/bliki/images/boundedContext/sketch.png)

#### AggregateRoots

Entités gérants plusieurs entités qui ne savent exister sans celles-ci.

La validation doit se trouver le plus proche de l'entité. Pour ne pas que l'entité devienne.

La majeure partie de la logique domaine doit se trouver dans les entités. Pour ne pas que ceux-ci deviennent anémiques.

#### Value Objects

Représente un type et encapsule la logique de validation d'un type.

## Using functionnal programming

Dans ce projet, j'ai commencé à utiliser un peu de programmation fonctionnelle via la librairie `true-myth`. Permettant de gérer les erreurs/undefined/null de manière efficace et Typescript-Aware.

## FAQ

### Où placer la validation ?

Celà dépend grandement du cas, si votre validation touche à une règle métier alors elle doit être dans les couches du domaine.
Si vous validez par exemple un format JSON ou autre chose qui ne touche pas au métier ou n'est pas une règle absolue pour votre métier alors elle doit se trouver dans les couches application.

### Où placer la logique d'Authorization ?

La logique d'authorization dépend également si votre logique est absolue au domaine ou pas. Si un utilisateur ne peut créer un todo que dans une todolist qui lui appartient la logique doit être côté domaine.

### Où placer la logique d'Authentification ?

L'authentication doit être agnostique du métier, que l'on se connecte avec du JWT, Session, Facebook, ... Celà est égal pour le domaine. Le domaine veut juste savoir `qui` et pas `comment`.

(Les paroles ci-dessus ne sont pas absolues)

### Sources

<https://martinfowler.com>
<https://github.com/VaughnVernon/IDDD_Samples/tree/master/iddd_identityaccess/src/main/java/com/saasovation/identityaccess>
<https://www.schneier.com/blog/archives/2011/04/schneiers_law.html>

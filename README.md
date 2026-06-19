# Chess Coach — Entraîneur d'ouvertures

Application web pour s'entraîner aux **ouvertures d'échecs**, à partir de la
**Défense sicilienne**. On joue les coups, l'app affiche les **meilleurs coups
recommandés** en réaction à ce que joue l'adversaire, et propose un **arbre des
variantes** pour réviser et rejouer les lignes mentalement.

Les coups conseillés proviennent d'un **répertoire de théorie curé** (pas de
moteur type Stockfish) : exactement ce qu'il faut pour mémoriser un répertoire.

## Fonctionnalités

- **Entraînement** — l'adversaire (les Blancs) joue, l'app surligne et explique
  les meilleures réponses des Noirs. Un coup hors-répertoire est signalé sans
  faire avancer la partie.
- **Explorer** — l'arbre complet des variantes (Najdorf, Moscou, Alapin,
  Sicilienne fermée, Smith-Morra, Bowdler), annoté, avec la ligne principale
  mise en avant.

## Stack

Vite · React 19 · TypeScript · [chess.js](https://github.com/jhlywa/chess.js) ·
[react-chessboard](https://github.com/Clariity/react-chessboard) · Tailwind CSS
v4 · Vitest + Testing Library · pnpm.

Le cœur métier (`chess`, `repertoire`, `trainer`) est constitué de **données
sérialisables** et de **fonctions pures**, isolées de la présentation et
couvertes par des tests.

## Démarrer

```bash
pnpm install
pnpm dev          # serveur de dev (http://localhost:5173)
```

Autres scripts :

```bash
pnpm test         # suite de tests (Vitest)
pnpm typecheck    # vérification de types (tsc)
pnpm lint         # ESLint
pnpm build        # build de production
```

## Structure

```
src/
  features/
    chess/         # helpers purs au-dessus de chess.js (FEN, légalité, SAN…)
    repertoire/    # modèle de données + arbre Sicilien + navigation
    trainer/       # logique de session + hook useTrainer + écran
    board/         # échiquier thémé (react-chessboard) + couleurs/surbrillances
    tree-view/     # aplatissement de l'arbre + vue Explorer
  components/      # composants présentationnels (panneau, notation)
```

## Étendre le répertoire

Un répertoire est un simple arbre de données ([types.ts](src/features/repertoire/types.ts)).
Chaque nœud est un coup et ses suites ; les `children` alternent les camps
(coup adverse, puis le nôtre, etc.) :

```ts
{
  san: 'Be3',          // coup en notation algébrique (anglaise)
  quality: 'best',     // 'best' | 'good' | 'sideline'
  comment: 'Attaque anglaise : O-O-O puis tempête de pions.',
  children: [/* réponses */],
}
```

Pour ajouter une ligne, édite [sicilian.ts](src/features/repertoire/sicilian.ts).
Un test garde-fou ([sicilian.test.ts](src/features/repertoire/sicilian.test.ts))
**rejoue chaque ligne de l'arbre et échoue si un coup est illégal** — lance
`pnpm test` après toute modification.

Pour un nouveau répertoire (autre ouverture, ou côté Blancs), crée un fichier
exportant un `Repertoire` sur le même modèle (`trainee: 'white' | 'black'`) et
branche-le dans [App.tsx](src/App.tsx).

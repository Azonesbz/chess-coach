/**
 * Répertoire Sicilien pour les Noirs (Najdorf comme arme principale).
 *
 * Fichier de DONNÉES — exception documentée à la limite ~100 lignes
 * (arbre de théorie d'ouverture, sans logique). Chaque ligne racine→feuille
 * est une séquence légale, vérifiée par `sicilian.test.ts`.
 *
 * Profondeur paire (racine = 0) = coup des Blancs ; impaire = coup des Noirs
 * (le camp entraîné).
 */
import type { Repertoire } from './types'

export const sicilianRepertoire: Repertoire = {
  id: 'sicilian-najdorf',
  name: 'Défense Sicilienne',
  description:
    "Réponse des Noirs à 1.e4 par 1...c5 — Najdorf en ligne principale, plus les anti-siciliennes courantes.",
  trainee: 'black',
  root: [
    {
      san: 'e4',
      quality: 'best',
      comment: "On entraîne la réponse des Noirs à 1.e4.",
      children: [
        {
          san: 'c5',
          quality: 'best',
          comment: 'La Sicilienne : on conteste le centre de façon asymétrique.',
          children: [
            {
              san: 'Nf3',
              quality: 'best',
              comment: 'Développement naturel, prépare d4.',
              children: [
                {
                  san: 'd6',
                  quality: 'best',
                  comment: 'Ordre de coups Najdorf ; soutient ...Nf6 et ...e5.',
                  children: [
                    {
                      san: 'd4',
                      quality: 'best',
                      comment: 'Sicilienne ouverte : ouvre le jeu.',
                      children: [
                        {
                          san: 'cxd4',
                          quality: 'best',
                          comment: 'On prend au centre.',
                          children: [
                            {
                              san: 'Nxd4',
                              quality: 'best',
                              comment: 'Reprise standard.',
                              children: [
                                {
                                  san: 'Nf6',
                                  quality: 'best',
                                  comment: 'Attaque e4 et force Nc3.',
                                  children: [
                                    {
                                      san: 'Nc3',
                                      quality: 'best',
                                      comment: 'Défend e4.',
                                      children: [
                                        {
                                          san: 'a6',
                                          quality: 'best',
                                          comment:
                                            'La Najdorf ! Contrôle b5, prépare ...e5 et ...b5.',
                                          children: [
                                            {
                                              san: 'Be3',
                                              quality: 'best',
                                              comment:
                                                'Attaque anglaise : O-O-O puis tempête de pions.',
                                              children: [
                                                {
                                                  san: 'e5',
                                                  quality: 'best',
                                                  comment:
                                                    "Gagne de l'espace et chasse le cavalier.",
                                                  children: [],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'Be2',
                                              quality: 'good',
                                              comment: 'Najdorf classique, jeu positionnel.',
                                              children: [
                                                {
                                                  san: 'e5',
                                                  quality: 'best',
                                                  comment: 'Plan ...Be7, ...O-O, ...Be6.',
                                                  children: [],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'Bg5',
                                              quality: 'good',
                                              comment: 'La ligne la plus tranchante.',
                                              children: [
                                                {
                                                  san: 'e6',
                                                  quality: 'best',
                                                  comment:
                                                    'Soutient le centre avant ...Be7 / ...Nbd7.',
                                                  children: [],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'Bc4',
                                              quality: 'good',
                                              comment: 'Fischer–Sozin : vise f7.',
                                              children: [
                                                {
                                                  san: 'e6',
                                                  quality: 'best',
                                                  comment: 'Ferme la diagonale du fou.',
                                                  children: [],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'f3',
                                              quality: 'sideline',
                                              comment: "Prépare aussi l'attaque anglaise.",
                                              children: [
                                                {
                                                  san: 'e5',
                                                  quality: 'best',
                                                  comment: 'Profite du retard de développement.',
                                                  children: [],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      san: 'Bb5+',
                      quality: 'good',
                      comment: 'Variante de Moscou : évite la Najdorf.',
                      children: [
                        {
                          san: 'Bd7',
                          quality: 'best',
                          comment: 'Échange simplificateur et sain.',
                          children: [
                            {
                              san: 'Bxd7+',
                              quality: 'good',
                              children: [
                                {
                                  san: 'Qxd7',
                                  quality: 'best',
                                  comment: 'Reprise de dame, position solide.',
                                  children: [],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          san: 'Nd7',
                          quality: 'good',
                          comment: 'Garde les fous, jeu plus complexe.',
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              san: 'c3',
              quality: 'good',
              comment: 'Alapin : prépare d4 avec un grand centre.',
              children: [
                {
                  san: 'Nf6',
                  quality: 'best',
                  comment: 'Attaque e4 immédiatement.',
                  children: [
                    {
                      san: 'e5',
                      quality: 'best',
                      comment: 'Pousse, mais le pion deviendra une cible.',
                      children: [
                        {
                          san: 'Nd5',
                          quality: 'best',
                          comment: 'Cavalier idéalement placé.',
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              san: 'Nc3',
              quality: 'good',
              comment: 'Sicilienne fermée : jeu de manœuvre.',
              children: [
                {
                  san: 'Nc6',
                  quality: 'best',
                  comment: 'Développe et contrôle d4/e5.',
                  children: [
                    {
                      san: 'g3',
                      quality: 'good',
                      comment: 'Fianchetto roi typique.',
                      children: [
                        {
                          san: 'g6',
                          quality: 'best',
                          comment: 'On répond par un fianchetto symétrique.',
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              san: 'd4',
              quality: 'sideline',
              comment: 'Gambit Smith–Morra : sacrifie un pion pour le développement.',
              children: [
                {
                  san: 'cxd4',
                  quality: 'best',
                  comment: 'On accepte le centre.',
                  children: [
                    {
                      san: 'c3',
                      quality: 'good',
                      comment: 'Offre le gambit.',
                      children: [
                        {
                          san: 'Nf6',
                          quality: 'best',
                          comment: 'Refus solide : on attaque e4 plutôt que prendre.',
                          children: [],
                        },
                        {
                          san: 'dxc3',
                          quality: 'good',
                          comment: 'Acceptation : un pion de plus mais du retard.',
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              san: 'Bc4',
              quality: 'sideline',
              comment: 'Attaque Bowdler : sort le fou tôt.',
              children: [
                {
                  san: 'e6',
                  quality: 'best',
                  comment: 'Prépare ...d5 et neutralise le fou.',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

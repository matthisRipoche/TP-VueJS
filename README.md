# 🎫 Ticket Manager PWA - Projet TP Vue.js 3

Voici mon projet réalisé dans le cadre du TP Vue.js. L'objectif était de créer une application pour débuter l'utilisation d'un framework JS en l'occurence vue.js. 

J'ai poussé le projet au-delà d'une simple liste en intégrant des concepts avancés comme les modales à étapes, une architecture API propre et une transformation complète en PWA.

## 🚀 Le Stack Technique

Pour ce projet, j'ai choisi des outils modernes pour avoir la meilleure expérience de dev possible :
- **Framework :** [Vue.js 3](https://vuejs.org/) (avec la Composition API).
- **Build Tool :** [Vite](https://vitejs.dev/) (ultra rapide).
- **Design :** [Tailwind CSS](https://tailwindcss.com/) pour un style "Neo-brutalist" propre et responsive.
- **Icônes :** [Lucide Vue](https://lucide.dev/).
- **Tests :** [Vitest](https://vitest.dev/) et Vue Test Utils.

## ✨ Fonctionnalités Clés

- **Dashboard Single-Page :** Tout se passe sur une seule page pour une fluidité maximale. L'ajout et l'édition se font via des popups (modales).
- **Formulaire à Étapes (Stepper) :** Pour ne pas surcharger l'utilisateur, la création de ticket se fait en 3 étapes (Identité -> Détails -> Validation).
- **Gestion Complète (CRUD) :** Connexion à une API REST pour créer, lire, modifier et supprimer des tickets.
- **PWA (Progressive Web App) :** L'app est installable sur téléphone ou PC. J'ai configuré le `manifest.json` et un `service-worker.js` pour le cache offline.
- **Totalement Responsive :** Menu burger sur mobile et grille adaptative.

## 🛠 Structure du Projet

```text
src/
├── api/
│   ├── client.js          # Config Axios (URL via .env)
│   └── services/
│       └── ticketService.js # Fonctions pour appeler l'API (/todos)
├── components/
│   ├── ui/                # Mes composants de base (boutons, inputs, etc.)
│   ├── TicketForm.vue     # La logique du formulaire à étapes
│   └── Navbar.vue         # Navigation responsive
├── views/
│   ├── HomeView.vue       # Page d'accueil stylisée
│   ├── TicketsView.vue    # Le dashboard de gestion
│   └── AboutView.vue      # Infos sur le projet
public/
├── manifest.json          # Config pour l'installation PWA
└── service-worker.js      # Logique de mise en cache pour le mode hors-ligne
```

## 🚥 Installation et Lancement

### 1. Installation des dépendances
Comme on utilise Vite 8, il faut forcer un peu les dépendances pour les plugins :
```bash
npm install --legacy-peer-deps
```

### 2. Lancement en dev
```bash
npm run dev
```

### 3. Lancer les tests
```bash
npm run test:unit
```

## 🐳 CI/CD et Déploiement

J'ai mis en place un pipeline **GitHub Actions** qui :
1. Installe les dépendances.
2. Lance les tests unitaires automatiquement à chaque push.
3. Si les tests passent, déploie l'app sur mon VPS via **Docker**.

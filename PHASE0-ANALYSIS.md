# HRnet - Analyse Phase 0 : Préparation à la Migration jQuery → React

**Date d'analyse :** 08/01/2026  
**Plugin choisi pour conversion :** jQuery DateTimePicker

---

## 1. Structure des Pages

### 1.1 Page d'Accueil - Création d'Employé ([`index.html`](index.html))

**Fichiers associés :**
- [`index.html`](index.html) - Structure HTML
- [`app.js`](app.js) - Logique JavaScript
- [`app.css`](app.css) - Styles

**Description :**
Page principale permettant de créer un nouvel employé via un formulaire.

**Éléments du formulaire :**
| Champ | ID | Type | Plugin jQuery |
|-------|-----|------|---------------|
| Prénom | `first-name` | text | - |
| Nom | `last-name` | text | - |
| Date de naissance | `date-of-birth` | text | DateTimePicker |
| Date de début | `start-date` | text | DateTimePicker |
| Rue | `street` | text | - |
| Ville | `city` | text | - |
| État | `state` | select | jQuery UI Selectmenu |
| Code postal | `zip-code` | number | - |
| Département | `department` | select | jQuery UI Selectmenu |

**Actions :**
- Bouton "Save" : Appelle [`saveEmployee()`](app.js:23) pour sauvegarder l'employé
- Lien vers la liste des employés : [`employee-list.html`](employee-list.html)
- Modal de confirmation après création

---

### 1.2 Page Liste des Employés ([`employee-list.html`](employee-list.html))

**Fichiers associés :**
- [`employee-list.html`](employee-list.html) - Structure HTML
- [`employee-list.js`](employee-list.js) - Logique JavaScript
- [`app.css`](app.css) - Styles partagés

**Description :**
Page affichant la liste de tous les employés avec fonctionnalités de tri, recherche et pagination.

**Colonnes du tableau :**
| Colonne | Clé de données |
|---------|----------------|
| First Name | `firstName` |
| Last Name | `lastName` |
| Start Date | `startDate` |
| Department | `department` |
| Date of Birth | `dateOfBirth` |
| Street | `street` |
| City | `city` |
| State | `state` |
| Zip Code | `zipCode` |

**Actions :**
- Lien retour vers l'accueil : [`index.html`](index.html)

---

## 2. Flux de Données

### 2.1 Création d'un Employé

```
[Formulaire index.html]
        │
        ▼
[saveEmployee() - app.js:23]
        │
        ├── Récupère les valeurs des champs DOM
        │
        ├── Crée un objet employee
        │
        ├── Récupère employees[] du localStorage
        │
        ├── Ajoute le nouvel employé au tableau
        │
        ├── Sauvegarde dans localStorage
        │
        └── Affiche modal de confirmation
```

### 2.2 Affichage de la Liste

```
[employee-list.html charge]
        │
        ▼
[employee-list.js - $(function())]
        │
        ├── Récupère employees[] du localStorage
        │
        └── Initialise DataTable avec les données
                │
                └── Tri, recherche, pagination automatiques
```

---

## 3. Usage du localStorage

### 3.1 Structure des Données

**Clé :** `employees`

**Type :** `Array<Employee>`

**Schéma d'un Employee :**
```json
{
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "string (format: m/d/Y)",
  "startDate": "string (format: m/d/Y)",
  "department": "string (Sales|Marketing|Engineering|Human Resources|Legal)",
  "street": "string",
  "city": "string",
  "state": "string (code état US, ex: CA)",
  "zipCode": "string"
}
```

### 3.2 Opérations

| Opération | Fichier | Ligne | Code |
|-----------|---------|-------|------|
| Lecture | [`app.js`](app.js:34) | 34 | `JSON.parse(localStorage.getItem('employees')) \|\| []` |
| Écriture | [`app.js`](app.js:47) | 47 | `localStorage.setItem('employees', JSON.stringify(employees))` |
| Lecture | [`employee-list.js`](employee-list.js:2) | 2 | `JSON.parse(localStorage.getItem('employees'))` |

---

## 4. Plugins jQuery Utilisés

### 4.1 Vue d'Ensemble

| Plugin | Version | Usage | Fichier source |
|--------|---------|-------|----------------|
| **jQuery** | 3.5.1 | Base | CDN |
| **jQuery DateTimePicker** | - | Sélecteur de date | [`jquery.datetimepicker.full.min.js`](jquery.datetimepicker.full.min.js) |
| **jQuery Modal** | 0.9.1 | Modal de confirmation | CDN |
| **jQuery UI** | 1.12.1 | Selectmenu (dropdowns) | CDN |
| **DataTables** | 1.10.21 | Tableau interactif | CDN |

### 4.2 Détail - jQuery DateTimePicker (Plugin à convertir)

**Fichiers :**
- [`jquery.datetimepicker.full.min.js`](jquery.datetimepicker.full.min.js) - Script minifié
- [`jquery.datetimepicker.css`](jquery.datetimepicker.css) - Styles

**Configuration actuelle dans [`app.js`](app.js:13-20) :**
```javascript
$('#date-of-birth').datetimepicker({
    timepicker: false,
    format: 'm/d/Y'
});
$('#start-date').datetimepicker({
    timepicker: false,
    format: 'm/d/Y'
});
```

**Options utilisées :**
| Option | Valeur | Description |
|--------|--------|-------------|
| `timepicker` | `false` | Désactive la sélection de l'heure |
| `format` | `'m/d/Y'` | Format de date américain (MM/DD/YYYY) |

**Fonctionnalités à reproduire dans React :**
- Affichage d'un calendrier au clic sur l'input
- Navigation entre les mois/années
- Sélection d'une date
- Formatage de la date sélectionnée
- Fermeture du calendrier après sélection
- Support clavier (accessibilité)

### 4.3 Détail - jQuery Modal

**Source :** CDN cloudflare (`jquery.modal.min.js`, `jquery.modal.min.css`)

**Usage dans [`app.js`](app.js:48) :**
```javascript
$('#confirmation').modal();
```

**Fonctionnalité :** Affiche une modal de confirmation "Employee Created!"

### 4.4 Détail - jQuery UI Selectmenu

**Source :** CDN jQuery (`jquery-ui.js`, `jquery-ui.css`)

**Usage dans [`app.js`](app.js:10-11) :**
```javascript
$( "#department" ).selectmenu();
$( "#state" ).selectmenu();
```

**Fonctionnalité :** Stylise les éléments `<select>` avec un design personnalisé

### 4.5 Détail - DataTables

**Source :** CDN datatables.net

**Usage dans [`employee-list.js`](employee-list.js:4-17) :**
```javascript
$('#employee-table').DataTable({
    data: employees,
    columns: [...]
});
```

**Fonctionnalités :**
- Affichage tabulaire des données
- Tri par colonne
- Recherche globale
- Pagination

---

## 5. Plugin Choisi : DateTimePicker

### 5.1 Raison du Choix

Le plugin jQuery DateTimePicker est choisi pour la conversion en React car :

1. **Complexité modérée** - Suffisamment complexe pour démontrer une vraie conversion
2. **Usage critique** - Utilisé pour 2 champs essentiels (date de naissance, date de début)
3. **Fonctionnalités isolées** - Composant autonome sans dépendances métier
4. **Potentiel de réutilisation** - Composant générique utilisable dans d'autres projets
5. **Documentation disponible** - Le plugin original est bien documenté

### 5.2 Fonctionnalités à Implémenter

| Priorité | Fonctionnalité | Description |
|----------|----------------|-------------|
| P0 | Affichage calendrier | Afficher un calendrier popup au clic |
| P0 | Sélection de date | Cliquer sur un jour pour le sélectionner |
| P0 | Format de date | Supporter le format configurable (m/d/Y) |
| P1 | Navigation mois | Boutons précédent/suivant pour les mois |
| P1 | Navigation année | Sélecteur d'année |
| P1 | Fermeture auto | Fermer le calendrier après sélection |
| P2 | Accessibilité clavier | Navigation au clavier (Tab, Enter, Escape) |
| P2 | Accessibilité ARIA | Labels et rôles ARIA appropriés |
| P3 | Validation min/max | Dates minimum et maximum configurables |
| P3 | Localisation | Support des langues/formats régionaux |

---

## 6. Critères de Succès

### 6.1 Performance

| Critère | Métrique | Objectif | Méthode de mesure |
|---------|----------|----------|-------------------|
| **Temps de chargement** | First Contentful Paint | < 1.5s | Lighthouse |
| **Temps interactif** | Time to Interactive | < 3s | Lighthouse |
| **Taille du bundle** | JavaScript total | < 100KB gzippé | Build stats |
| **Score Performance** | Lighthouse Performance | > 90 | Lighthouse |
| **Rendu initial** | Largest Contentful Paint | < 2.5s | Lighthouse |

### 6.2 Expérience Utilisateur (UX)

| Critère | Description | Objectif |
|---------|-------------|----------|
| **Réactivité** | Réponse aux interactions | < 100ms |
| **Cohérence visuelle** | Apparence similaire à l'original | Design identique ou amélioré |
| **Fluidité** | Animations et transitions | 60fps sans saccade |
| **Feedback utilisateur** | États visuels clairs | Hover, focus, active, disabled |
| **Mobile-friendly** | Support tactile | Touch events fonctionnels |

### 6.3 Stabilité

| Critère | Description | Objectif |
|---------|-------------|----------|
| **Zéro erreur console** | Pas d'erreurs JavaScript | 0 erreur en production |
| **Gestion des cas limites** | Dates invalides, null, undefined | Comportement prévisible |
| **Tests unitaires** | Couverture du composant | > 80% de couverture |
| **Compatibilité navigateurs** | Chrome, Firefox, Safari, Edge | Dernières 2 versions |
| **Pas de régression** | Fonctionnalités existantes préservées | 100% des features originales |

### 6.4 Qualité du Code

| Critère | Description | Objectif |
|---------|-------------|----------|
| **TypeScript** | Typage statique | Types complets, pas de `any` |
| **Props documentées** | Documentation des props | JSDoc ou PropTypes |
| **Composant contrôlé** | État géré par le parent | Props value/onChange |
| **Pas de manipulation DOM** | Paradigme React respecté | Zéro `document.querySelector` |
| **ESLint** | Règles de linting | 0 erreur, 0 warning |

### 6.5 Accessibilité

| Critère | Standard | Objectif |
|---------|----------|----------|
| **Score Accessibilité** | Lighthouse Accessibility | > 90 |
| **Navigation clavier** | WCAG 2.1 | Tous les éléments atteignables |
| **Attributs ARIA** | WAI-ARIA | Labels et rôles appropriés |
| **Contraste** | WCAG AA | Ratio > 4.5:1 |
| **Focus visible** | WCAG 2.4.7 | Indicateur focus visible |

### 6.6 Critères de Publication npm

| Critère | Description | Objectif |
|---------|-------------|----------|
| **Package.json complet** | Métadonnées npm | name, version, description, keywords |
| **README exhaustif** | Documentation | Installation, usage, props, exemples |
| **Licence** | Licence open source | MIT ou similaire |
| **Versioning** | Semantic versioning | vX.Y.Z |
| **Build fonctionnel** | Package installable | `npm install` sans erreur |

---

## 7. Récapitulatif des Livrables Phase 0

- [x] Analyse du code HRnet existant
- [x] Identification de la structure des pages (2 pages)
- [x] Cartographie des flux de données (localStorage)
- [x] Inventaire des plugins jQuery (4 plugins)
- [x] Choix du plugin à convertir : **DateTimePicker**
- [x] Définition des critères de succès (6 catégories)

---

## 8. Prochaines Étapes (Phase 1)

1. Créer le repository GitHub `hrnet-react`
2. Créer le repository GitHub pour le plugin React DatePicker
3. Initialiser les projets avec Vite
4. Configurer l'architecture des dossiers
5. Commencer le développement du composant DatePicker React

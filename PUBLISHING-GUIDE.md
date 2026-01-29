# Guide de Publication - React DatePicker Plugin

## Option 1: Publier sur npm (Recommandé)

### Prérequis
1. Compte npm: https://www.npmjs.com/signup
2. npm CLI installé

### Étapes

#### 1. Finaliser le package.json

```bash
cd react-datepicker-plugin
```

Mettre à jour `package.json`:
```json
{
  "name": "@votre-username/react-datepicker-plugin",
  "author": "Votre Nom",
  "repository": {
    "type": "git",
    "url": "https://github.com/votre-username/react-datepicker-plugin"
  }
}
```

#### 2. Builder le package

```bash
npm run build
```

Génère `dist/` avec:
- `react-datepicker-plugin.es.js`
- `react-datepicker-plugin.umd.js`
- `style.css`

#### 3. Se connecter à npm

```bash
npm login
```

#### 4. Publier

```bash
npm publish --access public
```

#### 5. Utiliser dans HRnet

```bash
cd ../hrnet-react
npm install @votre-username/react-datepicker-plugin
```

```jsx
import { DatePicker } from '@votre-username/react-datepicker-plugin'
import '@votre-username/react-datepicker-plugin/dist/style.css'
```

---

## Option 2: Utiliser depuis GitHub

### Étapes

#### 1. Créer un repo GitHub

```bash
cd react-datepicker-plugin
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/react-datepicker-plugin.git
git push -u origin main
```

#### 2. Builder et commiter dist/

```bash
npm run build
git add dist/
git commit -m "Add built files"
git push
```

⚠️ **Retirer `dist` du `.gitignore`**

#### 3. Installer dans HRnet

```bash
cd ../hrnet-react
npm install username/react-datepicker-plugin
```

#### 4. Utiliser

```jsx
import { DatePicker } from 'DatePickerReact'
import 'DatePickerReact/dist/style.css'
```

---

## Après Publication

### Supprimer du projet local

```bash
cd ..
rm -rf react-datepicker-plugin
```

---

## Checklist

- [ ] `package.json` complété
- [ ] `npm run build` exécuté
- [ ] Publié sur npm ou GitHub
- [ ] Installé dans `hrnet-react`
- [ ] Application testée
- [ ] Dossier local supprimé
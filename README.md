# AZ Conciergerie — Site vitrine

Site premium de la marque **AZ Conciergerie** : conciergerie privée, transport, hospitality & accès VIP, billets d'exception. Bilingue FR/EN, 100% statique, optimisé SEO + GEO (moteurs IA).

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # vérifier avant déploiement
```

## Les 3 fichiers à connaître (aucun code requis)

| Quoi | Où |
|---|---|
| **WhatsApp, email, adresse, domaine** | `src/lib/site.ts` |
| **Ajouter / modifier un événement** | `src/data/events.ts` (copier un bloc existant) |
| **Tous les textes du site (FR/EN)** | `src/i18n/fr.ts` et `src/i18n/en.ts` |

### Activer WhatsApp
Dans `src/lib/site.ts`, remplacer `whatsapp: null` par le numéro au format international sans `+` (ex: `"33612345678"`). Tous les boutons WhatsApp s'activent automatiquement.

### Ajouter une photo à un événement
Déposer l'image dans `public/events/` puis renseigner `image: "/events/mon-fichier.jpg"` dans l'événement concerné (`src/data/events.ts`). Sans photo, un visuel abstrait élégant est généré.

### Activer l'envoi du formulaire de contact
1. Créer un compte sur [resend.com](https://resend.com) (gratuit)
2. Créer `.env.local` avec `RESEND_API_KEY=re_xxxx`
3. Une fois le domaine vérifié chez Resend, remplacer `onboarding@resend.dev` dans `src/app/actions/contact.ts`

## Déploiement (Vercel)

1. Pousser ce repo sur GitHub
2. Importer sur [vercel.com](https://vercel.com) — aucun réglage nécessaire
3. Brancher le nom de domaine, puis mettre à jour `baseUrl` dans `src/lib/site.ts`
4. Ajouter `RESEND_API_KEY` dans les variables d'environnement Vercel

## SEO / GEO intégrés

- Balises meta + hreflang FR/EN sur chaque page
- `sitemap.xml` et `robots.txt` générés automatiquement (nouveaux événements inclus)
- Données structurées Schema.org : Organization/LocalBusiness, Event (par événement), FAQPage
- `public/llms.txt` : fiche d'identité lisible par ChatGPT, Claude, Gemini, Perplexity
- Site 100% statique : performances maximales

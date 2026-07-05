// ============================================================
// SEN VAISSELLE — Catégories
// ------------------------------------------------------------
// Les catégories sont une liste fixe (18 univers de la boutique),
// définie une seule fois dans utils.js (CATEGORIES) pour éviter
// toute duplication. Ce fichier expose les mêmes catégories sous
// forme de fonctions, pour rester compatible avec products.js,
// categories.html et l'espace admin.
//
// Si un jour vous voulez que les catégories soient gérables
// depuis l'admin (ajout/suppression dynamique), il suffira de
// remplacer le contenu de ces deux fonctions par une lecture
// Firestore (collection "categories"), sans rien changer ailleurs
// puisque tout le site passe déjà par fetchCategories() /
// getCategorySync().
// ============================================================
import { CATEGORIES } from "./utils.js";

const FALLBACK = { id: "", name: "Non classé", icon: "fa-solid fa-tag" };

/** Retourne la liste complète des catégories (Promise, pour compatibilité avec un futur Firestore) */
export async function fetchCategories() {
  return CATEGORIES;
}

/** Retourne la liste complète de façon synchrone (utile dans l'admin) */
export function fetchCategoriesSync() {
  return CATEGORIES;
}

/** Retourne une catégorie par son id, ou une valeur de repli si introuvable */
export function getCategorySync(categoryId) {
  if (!categoryId) return FALLBACK;
  return CATEGORIES.find(c => c.id === categoryId) || FALLBACK;
}

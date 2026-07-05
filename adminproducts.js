// ============================================================
// SEN VAISSELLE — CRUD produits (réservé à l'espace admin)
// Toutes ces fonctions nécessitent un utilisateur Firebase Auth
// connecté ; la sécurité réelle est appliquée par les règles
// Firestore (voir la note en bas de ce fichier).
// ============================================================
import { db } from "./firebase-config.js";
import {
  collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc,
  orderBy, query, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const PRODUCTS_COL = "products";

/** Récupère tous les produits (sans filtre), triés du plus récent au plus ancien. Pour les listes admin. */
export async function fetchAllProductsAdmin() {
  const q = query(collection(db, PRODUCTS_COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Récupère un produit par id, pour pré-remplir le formulaire d'édition */
export async function fetchProductByIdAdmin(id) {
  const snap = await getDoc(doc(db, PRODUCTS_COL, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/** Crée un nouveau produit */
export async function createProduct(data) {
  const payload = normalizeProduct(data);
  payload.createdAt = serverTimestamp();
  const ref = await addDoc(collection(db, PRODUCTS_COL), payload);
  return ref.id;
}

/** Met à jour un produit existant (createdAt n'est jamais modifié) */
export async function updateProduct(id, data) {
  const payload = normalizeProduct(data);
  await updateDoc(doc(db, PRODUCTS_COL, id), payload);
}

/** Supprime définitivement un produit */
export async function deleteProduct(id) {
  await deleteDoc(doc(db, PRODUCTS_COL, id));
}

/** Bascule rapidement la disponibilité d'un produit (depuis la liste, sans ouvrir le formulaire) */
export async function setAvailability(id, availability) {
  await updateDoc(doc(db, PRODUCTS_COL, id), { availability });
}

/** Nettoie / type les champs avant écriture en base */
function normalizeProduct(data) {
  return {
    name: String(data.name || "").trim(),
    reference: String(data.reference || "").trim(),
    categoryId: data.categoryId || "",
    price: Number(data.price) || 0,
    oldPrice: data.oldPrice ? Number(data.oldPrice) : null,
    color: String(data.color || "").trim(),
    stock: Number.isFinite(Number(data.stock)) ? Number(data.stock) : 0,
    availability: data.availability !== false,
    featured: !!data.featured,
    promo: !!data.promo,
    isNew: !!data.isNew,
    images: Array.isArray(data.images) ? data.images.filter(i => i && i.url) : []
  };
}

// ------------------------------------------------------------
// Règles Firestore recommandées (à placer dans firebase/firestore.rules) :
//
// match /products/{productId} {
//   allow read: if true;
//   allow write: if request.auth != null;
// }
//
// Cela autorise tout le monde à lire le catalogue (boutique publique)
// mais réserve la création/modification/suppression aux utilisateurs
// connectés via Firebase Auth (donc à vos comptes admin).
// ------------------------------------------------------------

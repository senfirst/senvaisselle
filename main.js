// ============================================================
// SEN VAISSELLE — Logique de la page d'accueil
// ============================================================
import { fetchProducts, renderProductCard, renderSkeletonCards, renderEmptyState, renderErrorState } from "./products.js";
import { fetchCategories } from "./categories.js";

async function renderCategoryGrid() {
  const mount = document.getElementById("home-categories");
  if (!mount) return;
  const categories = await fetchCategories();
  mount.innerHTML = categories.slice(0, 12).map(c => `
    <div class="col-6 col-md-3 col-lg-2" data-aos="fade-up">
      <a href="pages/boutique.html?categorie=${c.id}" class="cat-card d-block">
        <div class="cat-icon"><i class="${c.icon}"></i></div>
        <h3>${c.name}</h3>
      </a>
    </div>`).join("");
}

async function renderRow(mountId, params, emptyMsg) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = renderSkeletonCards(4);
  const products = await fetchProducts(params);
  if (products === null) { mount.innerHTML = renderErrorState(); return; }
  if (!products.length) { mount.innerHTML = renderEmptyState(emptyMsg); return; }
  mount.innerHTML = products.map(renderProductCard).join("");
}

renderCategoryGrid();
renderRow("home-featured", { featured: true, max: 8 }, "Aucun produit vedette pour le moment. Ajoutez-en depuis le tableau de bord administrateur.");
renderRow("home-new", { isNew: true, max: 4 }, "Aucune nouveauté pour le moment.");
renderRow("home-promo", { promo: true, max: 4 }, "Aucune promotion active pour le moment.");

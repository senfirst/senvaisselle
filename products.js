<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Produits | Admin Sen Vaisselle</title>
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="../images/favicon.svg" type="image/svg+xml">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" rel="stylesheet">
<link href="../css/style.css" rel="stylesheet">
</head>
<body>

<div class="admin-shell">
  <aside class="admin-sidebar" id="adminSidebar">
    <div class="brand"><span class="plate-mark"></span> Sen Vaisselle</div>
    <a href="dashboard.html" class="nav-item"><i class="fa-solid fa-gauge"></i> Tableau de bord</a>
    <a href="produits.html" class="nav-item active"><i class="fa-solid fa-box"></i> Produits</a>
    <a href="../index.html" class="nav-item" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> Voir la boutique</a>
    <a href="#" id="logoutLink" class="nav-item"><i class="fa-solid fa-right-from-bracket"></i> Déconnexion</a>
  </aside>

  <main class="admin-main">
    <div class="admin-topbar">
      <div>
        <button class="btn d-lg-none mb-2" id="sidebarToggle" style="border:1px solid var(--line);border-radius:10px;">
          <i class="fa-solid fa-bars"></i>
        </button>
        <h1 class="font-display" style="font-size:1.7rem;color:var(--navy);margin:0;">Produits</h1>
        <p class="text-muted small mb-0" id="countMsg">Chargement...</p>
      </div>
      <a href="produit-form.html" class="btn-sv-primary"><i class="fa-solid fa-plus me-1"></i> Ajouter un produit</a>
    </div>

    <div class="admin-card mb-4">
      <div class="row g-3">
        <div class="col-md-6">
          <div class="position-relative">
            <i class="fa-solid fa-magnifying-glass position-absolute" style="left:14px;top:50%;transform:translateY(-50%);color:var(--ink-soft)"></i>
            <input type="text" id="searchInput" class="form-control form-control-sv ps-5" placeholder="Rechercher un produit par nom ou référence...">
          </div>
        </div>
        <div class="col-6 col-md-3">
          <select id="filterCategory" class="form-select form-select-sv"></select>
        </div>
        <div class="col-6 col-md-3">
          <select id="filterStatus" class="form-select form-select-sv">
            <option value="">Tous les statuts</option>
            <option value="on">En stock</option>
            <option value="off">Rupture</option>
          </select>
        </div>
      </div>
    </div>

    <div class="admin-card">
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead>
            <tr class="small text-muted">
              <th>Produit</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Statut</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody id="productsBody">
            <tr><td colspan="6" class="text-center text-muted py-4">Chargement des produits...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<script type="module">
import { requireAuth, logoutAdmin } from "../js/admin-auth.js";
import { fetchAllProductsAdmin, deleteProduct, setAvailability } from "../js/admin-products.js";
import { fetchCategoriesSync } from "../js/categories.js";
import { formatPrice, escapeText, toast, confirmAction, debounce } from "../js/utils.js";
import { categoryName } from "../js/products.js";

document.getElementById("logoutLink").addEventListener("click", (e) => { e.preventDefault(); logoutAdmin(); });
document.getElementById("sidebarToggle")?.addEventListener("click", () => {
  document.getElementById("adminSidebar").classList.toggle("open");
});

const catSelect = document.getElementById("filterCategory");
catSelect.innerHTML = '<option value="">Toutes les catégories</option>' +
  fetchCategoriesSync().map(c => `<option value="${c.id}">${c.name}</option>`).join("");

const searchInput = document.getElementById("searchInput");
const statusSelect = document.getElementById("filterStatus");
const body = document.getElementById("productsBody");
const countMsg = document.getElementById("countMsg");

let allProducts = [];

requireAuth(async () => {
  allProducts = await fetchAllProductsAdmin();
  render();
});

function render() {
  let list = [...allProducts];
  const term = searchInput.value.trim().toLowerCase();
  if (term) {
    list = list.filter(p => (p.name || "").toLowerCase().includes(term) || (p.reference || "").toLowerCase().includes(term));
  }
  if (catSelect.value) list = list.filter(p => p.categoryId === catSelect.value);
  if (statusSelect.value === "on") list = list.filter(p => p.availability !== false && p.stock > 0);
  if (statusSelect.value === "off") list = list.filter(p => p.availability === false || p.stock === 0);

  countMsg.textContent = `${list.length} produit${list.length > 1 ? "s" : ""}`;

  body.innerHTML = list.length ? list.map(p => {
    const inStock = p.availability !== false && p.stock > 0;
    const img = (p.images && p.images[0]) ? p.images[0].url : null;
    return `
    <tr data-id="${p.id}">
      <td>
        <div class="d-flex align-items-center gap-2">
          <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;background:var(--navy-tint);flex-shrink:0;">
            ${img ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;">` : ""}
          </div>
          <div>
            <div class="fw-semibold small">${escapeText(p.name)}</div>
            <div class="text-muted" style="font-size:.72rem;">Réf. ${escapeText(p.reference || "")}</div>
          </div>
        </div>
      </td>
      <td class="small text-muted">${escapeText(categoryName(p.categoryId))}</td>
      <td class="small">${formatPrice(p.price)}</td>
      <td class="small">${Number(p.stock) || 0}</td>
      <td>
        <button class="btn btn-sm p-0 border-0 bg-transparent toggle-status" title="Cliquer pour changer le statut">
          ${inStock ? '<span class="badge-status-on">En stock</span>' : '<span class="badge-status-off">Rupture</span>'}
        </button>
      </td>
      <td class="text-end">
        <a href="produit-form.html?id=${p.id}" class="btn btn-sm btn-sv-outline py-1 px-2 me-1" title="Modifier"><i class="fa-solid fa-pen"></i></a>
        <button class="btn btn-sm py-1 px-2 delete-btn" style="border:1.5px solid var(--danger);color:var(--danger);border-radius:999px;" title="Supprimer"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>`;
  }).join("") : `<tr><td colspan="6" class="text-center text-muted py-4">Aucun produit ne correspond à votre recherche.</td></tr>`;

  body.querySelectorAll(".toggle-status").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.closest("tr").dataset.id;
      const p = allProducts.find(x => x.id === id);
      const next = !(p.availability !== false && p.stock > 0);
      try {
        await setAvailability(id, next);
        p.availability = next;
        toast(next ? "Produit marqué en stock." : "Produit marqué en rupture.", "success");
        render();
      } catch (err) {
        toast("Impossible de changer le statut.", "error");
      }
    });
  });

  body.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.closest("tr").dataset.id;
      const p = allProducts.find(x => x.id === id);
      const ok = await confirmAction("Supprimer ce produit ?", `« ${p.name} » sera définitivement supprimé.`, "Supprimer");
      if (!ok) return;
      try {
        await deleteProduct(id);
        allProducts = allProducts.filter(x => x.id !== id);
        toast("Produit supprimé.", "success");
        render();
      } catch (err) {
        toast("Erreur lors de la suppression.", "error");
      }
    });
  });
}

searchInput.addEventListener("input", debounce(render, 200));
catSelect.addEventListener("change", render);
statusSelect.addEventListener("change", render);
</script>
</body>
</html>

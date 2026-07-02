import React, { useState, useMemo, useRef } from "react";
import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  Settings,
  Grid,
  TrendingUp,
  Package,
  CheckCircle,
  AlertTriangle,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Percent,
  Check,
  X,
  Upload,
  Image as ImageIcon,
  MoveUp,
  MoveDown,
  Info,
  Phone,
  MapPin,
  Calendar,
  Layers,
  Crop
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product, Category, ShopInfo } from "../types";

interface AdminDashboardProps {
  products: Product[];
  categories: Category[];
  shopInfo: ShopInfo;
  onUpdateProducts: (newProducts: Product[]) => void;
  onUpdateCategories: (newCategories: Category[]) => void;
  onUpdateShopInfo: (newShopInfo: ShopInfo) => void;
}

export default function AdminDashboard({
  products,
  categories,
  shopInfo,
  onUpdateProducts,
  onUpdateCategories,
  onUpdateShopInfo,
}: AdminDashboardProps) {
  // Navigation inside admin dashboard
  const [activeTab, setActiveTab] = useState<"stats" | "products" | "categories" | "config">("stats");

  // Filter and search state for products table
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("");
  const [productStockFilter, setProductStockFilter] = useState<"all" | "inStock" | "outOfStock">("all");

  // Notifications state
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // --- STATISTICS CALCULATIONS ---
  const stats = useMemo(() => {
    const totalCount = products.length;
    const inStockCount = products.filter((p) => p.isAvailable && p.stock > 0).length;
    const outOfStockCount = totalCount - inStockCount;
    const promoCount = products.filter((p) => p.isPromo).length;
    const avgPrice = totalCount > 0 ? Math.round(products.reduce((acc, p) => acc + p.price, 0) / totalCount) : 0;

    // Count products per category for SVG chart
    const categoryDistribution = categories.map((cat) => {
      const count = products.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;
      return { name: cat.name, count };
    });

    return {
      totalCount,
      inStockCount,
      outOfStockCount,
      promoCount,
      avgPrice,
      categoryDistribution,
    };
  }, [products, categories]);

  // --- CONFIGURATION TAB FORM ---
  const [configForm, setConfigForm] = useState<ShopInfo>({ ...shopInfo });
  const handleConfigSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateShopInfo(configForm);
    showNotification("success", "Les informations de la boutique ont été mises à jour avec succès !");
  };

  // --- CATEGORIES MANAGEMENT ---
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState<{ name: string; description: string; image: string }>({
    name: "",
    description: "",
    image: "",
  });

  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: "", description: "", image: "" });
    setShowCategoryForm(true);
  };

  const handleOpenEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name,
      description: cat.description || "",
      image: cat.image || "",
    });
    setShowCategoryForm(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) return;

    if (editingCategory) {
      // Edit
      const updated = categories.map((c) =>
        c.id === editingCategory.id
          ? {
              ...c,
              name: categoryForm.name.trim(),
              slug: categoryForm.name.toLowerCase().replace(/\s+/g, "-"),
              description: categoryForm.description.trim(),
              image: categoryForm.image.trim() || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
            }
          : c
      );
      onUpdateCategories(updated);
      showNotification("success", `Catégorie "${categoryForm.name}" modifiée !`);
    } else {
      // Add
      const newCat: Category = {
        id: "cat_" + Date.now(),
        name: categoryForm.name.trim(),
        slug: categoryForm.name.toLowerCase().replace(/\s+/g, "-"),
        description: categoryForm.description.trim(),
        image: categoryForm.image.trim() || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
      };
      onUpdateCategories([...categories, newCat]);
      showNotification("success", `Catégorie "${categoryForm.name}" ajoutée !`);
    }

    setShowCategoryForm(false);
  };

  const handleDeleteCategory = (catId: string, catName: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${catName}" ?`)) {
      onUpdateCategories(categories.filter((c) => c.id !== catId));
      showNotification("success", `Catégorie "${catName}" supprimée.`);
    }
  };

  // --- PRODUCTS MANAGEMENT & FORM ---
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  // Core product form state
  const [prodForm, setProdForm] = useState({
    name: "",
    ref: "",
    category: categories[0]?.name || "",
    price: 0,
    oldPrice: 0,
    shortDescription: "",
    detailedDescription: "",
    material: "",
    color: "",
    dimensions: "",
    stock: 10,
    isAvailable: true,
    isFeatured: false,
    isPromo: false,
    isNew: true,
  });

  // Images state during editing
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [imageCroppingIndex, setImageCroppingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto reference calculation
  const generateNextRef = () => {
    const refs = products.map((p) => p.ref);
    let maxNum = 0;
    refs.forEach((r) => {
      const match = r.match(/SV-(\d+)/);
      if (match) {
        const num = parseInt(match[1]);
        if (num > maxNum) maxNum = num;
      }
    });
    return `SV-${String(maxNum + 1).padStart(3, "0")}`;
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setUploadedImages([]);
    setProdForm({
      name: "",
      ref: generateNextRef(),
      category: categories[0]?.name || "",
      price: 0,
      oldPrice: 0,
      shortDescription: "",
      detailedDescription: "",
      material: "",
      color: "",
      dimensions: "",
      stock: 10,
      isAvailable: true,
      isFeatured: false,
      isPromo: false,
      isNew: true,
    });
    setShowProductForm(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setUploadedImages([...prod.images]);
    setProdForm({
      name: prod.name,
      ref: prod.ref,
      category: prod.category,
      price: prod.price,
      oldPrice: prod.oldPrice || 0,
      shortDescription: prod.shortDescription,
      detailedDescription: prod.detailedDescription || "",
      material: prod.material,
      color: prod.color,
      dimensions: prod.dimensions,
      stock: prod.stock,
      isAvailable: prod.isAvailable,
      isFeatured: prod.isFeatured,
      isPromo: prod.isPromo,
      isNew: prod.isNew,
    });
    setShowProductForm(true);
  };

  // Drag and Drop & Multiple Images selection with compression
  const compressAndLoadImage = (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // HTML5 canvas dynamic compression
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Downscale if image is huge
          const MAX_SIZE = 800;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Compression quality 0.7 for high performance
            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
            resolve(compressedBase64);
          } else {
            resolve(event.target?.result as string);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const remainingSlots = 20 - uploadedImages.length;

      if (remainingSlots <= 0) {
        showNotification("error", "Limite de 20 images par produit atteinte !");
        return;
      }

      const filesToProcess = filesArray.slice(0, remainingSlots);
      const loadingAlert = showNotification("success", "Compression des images en cours...");

      const compressedBase64s = await Promise.all(filesToProcess.map((file: any) => compressAndLoadImage(file)));
      setUploadedImages((prev) => [...prev, ...compressedBase64s]);
      showNotification("success", `${compressedBase64s.length} image(s) ajoutée(s) et compressée(s) !`);
    }
  };

  // Reorder images
  const moveImage = (index: number, direction: "up" | "down") => {
    const newImages = [...uploadedImages];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newImages.length) {
      const temp = newImages[index];
      newImages[index] = newImages[targetIndex];
      newImages[targetIndex] = temp;
      setUploadedImages(newImages);
    }
  };

  // Make Main Image
  const makeMainImage = (index: number) => {
    const newImages = [...uploadedImages];
    const item = newImages.splice(index, 1)[0];
    newImages.unshift(item);
    setUploadedImages(newImages);
    showNotification("success", "Image principale sélectionnée !");
  };

  // Delete Image
  const deleteImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Simulate Crop of an Image via Canvas Filter
  const simulateCropImage = (index: number) => {
    setImageCroppingIndex(index);
  };

  const applyCrop = (aspect: "square" | "landscape" | "portrait") => {
    if (imageCroppingIndex === null) return;

    const base64 = uploadedImages[imageCroppingIndex];
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let w = img.width;
      let h = img.height;

      if (aspect === "square") {
        const size = Math.min(w, h);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, (w - size) / 2, (h - size) / 2, size, size, 0, 0, size, size);
      } else if (aspect === "landscape") {
        // 4:3
        const targetW = w;
        const targetH = (w * 3) / 4;
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, (h - targetH) / 2, targetW, targetH, 0, 0, targetW, targetH);
      } else {
        // 3:4 portrait
        const targetH = h;
        const targetW = (h * 3) / 4;
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, (w - targetW) / 2, 0, targetW, targetH, 0, 0, targetW, targetH);
      }

      const croppedData = canvas.toDataURL("image/jpeg", 0.85);
      const updated = [...uploadedImages];
      updated[imageCroppingIndex] = croppedData;
      setUploadedImages(updated);
      setImageCroppingIndex(null);
      showNotification("success", "Image recadrée avec succès !");
    };
    img.src = base64;
  };

  // Save product (Add or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prodForm.name.trim()) {
      showNotification("error", "Veuillez entrer le nom du produit.");
      return;
    }

    const discountPercentage =
      prodForm.isPromo && prodForm.oldPrice > prodForm.price
        ? Math.round(((prodForm.oldPrice - prodForm.price) / prodForm.oldPrice) * 100)
        : undefined;

    // Use default fallback image if none uploaded
    const finalImages =
      uploadedImages.length > 0
        ? uploadedImages
        : ["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"];

    if (editingProduct) {
      // Edit mode
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: prodForm.name.trim(),
              ref: prodForm.ref.trim(),
              category: prodForm.category,
              price: Number(prodForm.price),
              oldPrice: prodForm.isPromo ? Number(prodForm.oldPrice) : undefined,
              discountPercentage,
              shortDescription: prodForm.shortDescription.trim(),
              detailedDescription: prodForm.detailedDescription.trim(),
              material: prodForm.material.trim(),
              color: prodForm.color.trim(),
              dimensions: prodForm.dimensions.trim(),
              stock: Number(prodForm.stock),
              isAvailable: prodForm.isAvailable && Number(prodForm.stock) > 0,
              isFeatured: prodForm.isFeatured,
              isPromo: prodForm.isPromo,
              isNew: prodForm.isNew,
              images: finalImages,
            }
          : p
      );
      onUpdateProducts(updated);
      showNotification("success", `Produit "${prodForm.name}" mis à jour !`);
    } else {
      // Add mode
      const newProd: Product = {
        id: "prod_" + Date.now(),
        name: prodForm.name.trim(),
        ref: prodForm.ref.trim(),
        category: prodForm.category,
        price: Number(prodForm.price),
        oldPrice: prodForm.isPromo ? Number(prodForm.oldPrice) : undefined,
        discountPercentage,
        shortDescription: prodForm.shortDescription.trim(),
        detailedDescription: prodForm.detailedDescription.trim(),
        material: prodForm.material.trim(),
        color: prodForm.color.trim(),
        dimensions: prodForm.dimensions.trim(),
        stock: Number(prodForm.stock),
        isAvailable: prodForm.isAvailable && Number(prodForm.stock) > 0,
        isFeatured: prodForm.isFeatured,
        isPromo: prodForm.isPromo,
        isNew: prodForm.isNew,
        dateAdded: new Date().toISOString().split("T")[0],
        images: finalImages,
      };
      onUpdateProducts([newProd, ...products]);
      showNotification("success", `Produit "${prodForm.name}" enregistré avec succès !`);
    }

    setShowProductForm(false);
  };

  const handleDeleteProduct = (prodId: string, prodName: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement le produit "${prodName}" ?`)) {
      onUpdateProducts(products.filter((p) => p.id !== prodId));
      showNotification("success", `Produit "${prodName}" supprimé.`);
    }
  };

  const handleToggleProductStock = (prodId: string) => {
    const updated = products.map((p) => {
      if (p.id === prodId) {
        const isCurrentlyAvailable = p.isAvailable && p.stock > 0;
        const nextStock = isCurrentlyAvailable ? 0 : 10;
        return {
          ...p,
          stock: nextStock,
          isAvailable: !isCurrentlyAvailable,
        };
      }
      return p;
    });
    onUpdateProducts(updated);
    showNotification("success", "Quantité en stock basculée !");
  };

  // --- FILTERED PRODUCTS IN TABLE ---
  const filteredProductsTable = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.ref.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(productSearch.toLowerCase());

      const matchCategory = productCategoryFilter ? p.category === productCategoryFilter : true;

      const matchStock =
        productStockFilter === "all"
          ? true
          : productStockFilter === "inStock"
          ? p.stock > 0 && p.isAvailable
          : p.stock <= 0 || !p.isAvailable;

      return matchSearch && matchCategory && matchStock;
    });
  }, [products, productSearch, productCategoryFilter, productStockFilter]);

  return (
    <div className="bg-gray-50 min-h-screen py-8 text-left" id="admin-dashboard-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A3D91] font-mono uppercase tracking-wider">
              <Shield size={14} className="stroke-[2.5]" /> Panel de Contrôle Sécurisé
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
              Tableau de bord de Sen Vaisselle
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleOpenAddProduct}
              className="bg-[#0A3D91] text-white hover:bg-[#F7941D] font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-blue-900/10"
            >
              <Plus size={16} /> Ajouter un produit
            </button>
            <button
              onClick={handleOpenAddCategory}
              className="bg-white border border-[#0A3D91] text-[#0A3D91] hover:bg-gray-50 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all"
            >
              <Layers size={16} /> Ajouter une catégorie
            </button>
          </div>
        </div>

        {/* Status notification toast inside dashboard */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-xl text-xs font-bold shadow-lg border mb-6 flex items-center gap-3 ${
                notification.type === "success"
                  ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                  : "bg-red-50 border-red-100 text-red-800"
              }`}
            >
              {notification.type === "success" ? (
                <CheckCircle size={16} className="text-emerald-500 shrink-0" />
              ) : (
                <AlertTriangle size={16} className="text-red-500 shrink-0" />
              )}
              <span>{notification.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto scrollbar-none gap-2">
          {[
            { id: "stats", label: "Statistiques & Activité", icon: TrendingUp },
            { id: "products", label: `Catalogue Produits (${products.length})`, icon: Package },
            { id: "categories", label: `Catégories (${categories.length})`, icon: Grid },
            { id: "config", label: "Configuration Boutique", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-bold text-xs whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "border-[#F7941D] text-[#0A3D91] bg-white rounded-t-xl"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active tab rendered component */}
        <div>
          {/* STATS TAB */}
          {activeTab === "stats" && (
            <div className="space-y-8 animate-fadeIn" id="admin-stats-tab">
              {/* Quick stats grid cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider">Total Produits</span>
                    <h3 className="text-2xl font-black text-[#0A3D91] mt-1">{stats.totalCount}</h3>
                  </div>
                  <div className="bg-[#0A3D91]/10 text-[#0A3D91] p-3.5 rounded-xl">
                    <Package size={22} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider">En Stock</span>
                    <h3 className="text-2xl font-black text-emerald-600 mt-1">{stats.inStockCount}</h3>
                  </div>
                  <div className="bg-emerald-50 text-emerald-600 p-3.5 rounded-xl">
                    <CheckCircle size={22} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider">Ruptures Stock</span>
                    <h3 className="text-2xl font-black text-red-600 mt-1">{stats.outOfStockCount}</h3>
                  </div>
                  <div className="bg-red-50 text-red-500 p-3.5 rounded-xl">
                    <AlertTriangle size={22} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider">Prix Moyen</span>
                    <h3 className="text-2xl font-black text-gray-900 mt-1">
                      {new Intl.NumberFormat("fr-FR").format(stats.avgPrice)} F
                    </h3>
                  </div>
                  <div className="bg-orange-50 text-orange-600 p-3.5 rounded-xl">
                    <TrendingUp size={22} />
                  </div>
                </div>
              </div>

              {/* Graphical Chart layout using simple, gorgeous pure SVG Bars for Category Distribution */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="mb-6">
                  <h3 className="font-black text-sm text-[#0A3D91] uppercase tracking-wider">Répartition des articles par rayons</h3>
                  <p className="text-xs text-gray-400">Nombre de produits enregistrés dans chaque rayon de la boutique.</p>
                </div>

                {/* SVG Category bar charts */}
                <div className="space-y-4">
                  {stats.categoryDistribution.map((item, idx) => {
                    const maxVal = Math.max(...stats.categoryDistribution.map((i) => i.count), 1);
                    const percentage = (item.count / maxVal) * 100;

                    return (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="flex justify-between font-semibold text-gray-700">
                          <span>{item.name}</span>
                          <span className="font-mono text-gray-400">{item.count} article(s)</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.05 }}
                            className="bg-gradient-to-r from-[#0A3D91] to-[#F7941D] h-full rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS CATALOG TAB */}
          {activeTab === "products" && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6 animate-fadeIn" id="admin-products-tab">
              {/* Dynamic search & categories filter in admin table */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-50 pb-6">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Filtrer par nom, référence ou rayon..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#0A3D91]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="">Tous les rayons</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={productStockFilter}
                    onChange={(e) => setProductStockFilter(e.target.value as any)}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="all">Tous les stocks</option>
                    <option value="inStock">En stock</option>
                    <option value="outOfStock">En rupture</option>
                  </select>
                </div>
              </div>

              {/* Table listing */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-mono font-bold">
                      <th className="py-4 px-3">Produit</th>
                      <th className="py-4 px-3">Référence</th>
                      <th className="py-4 px-3">Rayon</th>
                      <th className="py-4 px-3 text-right">Prix</th>
                      <th className="py-4 px-3 text-center">Stock</th>
                      <th className="py-4 px-3 text-center">Badges</th>
                      <th className="py-4 px-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredProductsTable.map((prod) => (
                      <tr key={prod.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5 px-3 flex items-center gap-3">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-10 h-10 object-cover rounded-lg bg-gray-100"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-bold text-gray-900 block line-clamp-1">{prod.name}</span>
                            <span className="text-[10px] text-gray-400 block mt-0.5">{prod.material}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-gray-500">{prod.ref}</td>
                        <td className="py-3.5 px-3">
                          <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-semibold">
                            {prod.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right font-bold text-[#0A3D91]">
                          {new Intl.NumberFormat("fr-FR").format(prod.price)} F
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <button
                            onClick={() => handleToggleProductStock(prod.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-colors ${
                              prod.stock > 0 && prod.isAvailable
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : "bg-red-50 text-red-600 hover:bg-red-100"
                            }`}
                            title="Cliquez pour vider ou réapprovisionner"
                          >
                            {prod.stock > 0 && prod.isAvailable ? `Disponible (${prod.stock})` : "Rupture de Stock"}
                          </button>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {prod.isFeatured && (
                              <span className="bg-blue-100 text-[#0A3D91] p-1 rounded-md" title="Vedette">
                                ⭐
                              </span>
                            )}
                            {prod.isPromo && (
                              <span className="bg-orange-100 text-[#F7941D] p-1 rounded-md" title="Promotion">
                                🏷️
                              </span>
                            )}
                            {prod.isNew && (
                              <span className="bg-emerald-100 text-emerald-800 p-1 rounded-md" title="Nouveau">
                                ✨
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-2 text-[#0A3D91] hover:bg-blue-50 rounded-lg transition-colors"
                              title="Modifier"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id, prod.name)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CATEGORIES TAB */}
          {activeTab === "categories" && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6 animate-fadeIn" id="admin-categories-tab">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-mono font-bold">
                      <th className="py-4 px-3">Catégorie</th>
                      <th className="py-4 px-3">Description</th>
                      <th className="py-4 px-3 text-center">Nombre d'articles</th>
                      <th className="py-4 px-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {categories.map((cat) => {
                      const count = products.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;
                      return (
                        <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-3.5 px-3 flex items-center gap-3">
                            <img
                              src={cat.image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"}
                              alt={cat.name}
                              className="w-12 h-12 object-cover rounded-xl bg-gray-100"
                              referrerPolicy="no-referrer"
                            />
                            <span className="font-bold text-gray-900 block">{cat.name}</span>
                          </td>
                          <td className="py-3.5 px-3 text-gray-500 max-w-sm truncate">{cat.description || "Aucune description"}</td>
                          <td className="py-3.5 px-3 text-center font-bold text-gray-600 font-mono">{count}</td>
                          <td className="py-3.5 px-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleOpenEditCategory(cat)}
                                className="p-2 text-[#0A3D91] hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(cat.id, cat.name)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SHOP CONFIG TAB */}
          {activeTab === "config" && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 animate-fadeIn" id="admin-config-tab">
              <form onSubmit={handleConfigSave} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Nom de l'établissement</label>
                    <input
                      type="text"
                      required
                      value={configForm.name}
                      onChange={(e) => setConfigForm({ ...configForm, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Numéro Téléphone Fixe/Showroom</label>
                    <input
                      type="text"
                      required
                      value={configForm.phone}
                      onChange={(e) => setConfigForm({ ...configForm, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Numéro WhatsApp (Format avec code pays sans +)</label>
                    <input
                      type="text"
                      required
                      value={configForm.whatsapp}
                      onChange={(e) => setConfigForm({ ...configForm, whatsapp: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Adresse Email de contact</label>
                    <input
                      type="email"
                      required
                      value={configForm.email}
                      onChange={(e) => setConfigForm({ ...configForm, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Adresse physique Showroom</label>
                  <input
                    type="text"
                    required
                    value={configForm.address}
                    onChange={(e) => setConfigForm({ ...configForm, address: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Message d'alerte bandeau d'accueil</label>
                  <input
                    type="text"
                    required
                    value={configForm.bannerMessage}
                    onChange={(e) => setConfigForm({ ...configForm, bannerMessage: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Description À Propos (Showroom, histoire, etc.)</label>
                  <textarea
                    required
                    rows={5}
                    value={configForm.aboutText}
                    onChange={(e) => setConfigForm({ ...configForm, aboutText: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91]"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-[#0A3D91] hover:bg-[#F7941D] text-white px-8 py-3.5 rounded-xl text-xs font-bold transition-colors shadow-md"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: ADD / EDIT CATEGORY */}
      <AnimatePresence>
        {showCategoryForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto" id="category-form-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 text-left relative"
            >
              <button
                onClick={() => setShowCategoryForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-black text-[#0A3D91] border-b border-gray-100 pb-3 mb-5">
                {editingCategory ? "Modifier la catégorie" : "Ajouter une catégorie"}
              </h3>

              <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Nom de la catégorie</label>
                  <input
                    type="text"
                    required
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A3D91]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Description courte</label>
                  <input
                    type="text"
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A3D91]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">URL Image d'illustration</label>
                  <input
                    type="text"
                    value={categoryForm.image}
                    onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A3D91]"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCategoryForm(false)}
                    className="flex-1 bg-gray-50 text-gray-700 py-3 rounded-xl font-bold text-center"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#0A3D91] text-white py-3 rounded-xl font-bold text-center hover:bg-[#F7941D]"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT PRODUCT */}
      <AnimatePresence>
        {showProductForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto" id="product-form-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full p-8 text-left relative my-10 overflow-hidden shadow-2xl"
            >
              {/* Image cropping filter simulated */}
              <AnimatePresence>
                {imageCroppingIndex !== null && (
                  <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xs z-40 flex flex-col items-center justify-center p-6 text-white">
                    <div className="max-w-md w-full text-center space-y-6">
                      <div className="bg-orange-500/10 text-[#F7941D] w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                        <Crop size={24} />
                      </div>
                      <h4 className="font-black text-lg">Recadrage Intelligent de l'image</h4>
                      <p className="text-xs text-slate-400">
                        Choisissez le format de découpe souhaité. L'image sera automatiquement recadrée et compressée au pixel près.
                      </p>

                      <div className="aspect-square w-48 rounded-lg overflow-hidden border border-slate-700 mx-auto">
                        <img src={uploadedImages[imageCroppingIndex]} alt="Recadrage" className="w-full h-full object-cover" />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <button
                          onClick={() => applyCrop("square")}
                          className="bg-white/10 hover:bg-white text-white hover:text-gray-900 py-3 rounded-xl text-xs font-bold border border-slate-700"
                        >
                          Carré (1:1)
                        </button>
                        <button
                          onClick={() => applyCrop("landscape")}
                          className="bg-white/10 hover:bg-white text-white hover:text-gray-900 py-3 rounded-xl text-xs font-bold border border-slate-700"
                        >
                          Paysage (4:3)
                        </button>
                        <button
                          onClick={() => applyCrop("portrait")}
                          className="bg-white/10 hover:bg-white text-white hover:text-gray-900 py-3 rounded-xl text-xs font-bold border border-slate-700"
                        >
                          Portrait (3:4)
                        </button>
                      </div>

                      <button
                        onClick={() => setImageCroppingIndex(null)}
                        className="text-slate-500 hover:text-white text-xs font-bold"
                      >
                        Annuler le recadrage
                      </button>
                    </div>
                  </div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setShowProductForm(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-black text-[#0A3D91] border-b border-gray-100 pb-4 mb-6">
                {editingProduct ? "Modifier le produit" : "Ajouter un produit au catalogue"}
              </h3>

              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
                {/* Left side: basic details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Référence produit</label>
                      <input
                        type="text"
                        required
                        value={prodForm.ref}
                        onChange={(e) => setProdForm({ ...prodForm, ref: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono font-bold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Nom du produit</label>
                      <input
                        type="text"
                        required
                        value={prodForm.name}
                        onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                        placeholder="Ex: Assiette d'or porcelaine"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Rayon (Catégorie)</label>
                      <select
                        value={prodForm.category}
                        onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 font-semibold focus:outline-none cursor-pointer"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Quantité en stock</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={prodForm.stock}
                        onChange={(e) => setProdForm({ ...prodForm, stock: Number(e.target.value) })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Prix de vente (FCFA)</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={prodForm.price}
                        onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Ancien Prix (Si Promo)</label>
                      <input
                        type="number"
                        min="0"
                        value={prodForm.oldPrice}
                        onChange={(e) => setProdForm({ ...prodForm, oldPrice: Number(e.target.value) })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Matière</label>
                      <input
                        type="text"
                        value={prodForm.material}
                        onChange={(e) => setProdForm({ ...prodForm, material: e.target.value })}
                        placeholder="Porcelaine fine, Inox, Fonte..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Couleur</label>
                      <input
                        type="text"
                        value={prodForm.color}
                        onChange={(e) => setProdForm({ ...prodForm, color: e.target.value })}
                        placeholder="Ex: Blanc/Doré, Noir mat"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Dimensions</label>
                      <input
                        type="text"
                        value={prodForm.dimensions}
                        onChange={(e) => setProdForm({ ...prodForm, dimensions: e.target.value })}
                        placeholder="Ex: H: 20cm, Vol: 3L"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Description courte d'accroche</label>
                    <input
                      type="text"
                      required
                      value={prodForm.shortDescription}
                      onChange={(e) => setProdForm({ ...prodForm, shortDescription: e.target.value })}
                      placeholder="Une phrase courte pour présenter l'article."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Description détaillée</label>
                    <textarea
                      rows={4}
                      value={prodForm.detailedDescription}
                      onChange={(e) => setProdForm({ ...prodForm, detailedDescription: e.target.value })}
                      placeholder="Détaillez ici les caractéristiques, l'usage, les conseils d'entretien..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Right side: images gallery and triggers */}
                <div className="space-y-6">
                  {/* Image upload container (up to 20 images, multiple select, drag-drop) */}
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono block">
                      Photos du Produit ({uploadedImages.length}/20)
                    </label>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-[#0A3D91] hover:bg-slate-50 transition-all cursor-pointer space-y-2"
                    >
                      <div className="bg-[#0A3D91]/10 text-[#0A3D91] w-10 h-10 rounded-full flex items-center justify-center mx-auto">
                        <Upload size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-xs">Sélectionner plusieurs photos</p>
                        <p className="text-[10px] text-gray-400 mt-1">Glissez-déposez vos fichiers ici (Jusqu'à 20 photos)</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Thumbnail gallery previews before publication */}
                  {uploadedImages.length > 0 && (
                    <div className="space-y-2 text-left">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono block">
                        Aperçu et réorganisation des images (La première est l'image principale)
                      </span>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-56 overflow-y-auto p-2 border border-gray-100 rounded-2xl bg-gray-50">
                        {uploadedImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-xl border border-gray-200 p-1.5 flex flex-col justify-between gap-2 shadow-xs group/item relative"
                          >
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 relative">
                              <img src={img} alt={`Aperçu ${idx + 1}`} className="w-full h-full object-cover" />

                              {idx === 0 && (
                                <span className="absolute top-1 left-1 bg-[#0A3D91] text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                                  Principal
                                </span>
                              )}
                            </div>

                            {/* Image Controls toolbar */}
                            <div className="flex items-center justify-between gap-1 mt-1 text-[9px] text-gray-400 pt-1.5 border-t border-gray-100">
                              <button
                                type="button"
                                onClick={() => makeMainImage(idx)}
                                disabled={idx === 0}
                                className={`font-bold hover:text-[#0A3D91] ${idx === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                                title="Définir comme principale"
                              >
                                Définir ppal
                              </button>

                              <div className="flex gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => simulateCropImage(idx)}
                                  className="hover:text-orange-500"
                                  title="Recadrer"
                                >
                                  <Crop size={11} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveImage(idx, "up")}
                                  disabled={idx === 0}
                                  className="hover:text-[#0A3D91]"
                                >
                                  <MoveUp size={11} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveImage(idx, "down")}
                                  disabled={idx === uploadedImages.length - 1}
                                  className="hover:text-[#0A3D91]"
                                >
                                  <MoveDown size={11} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteImage(idx)}
                                  className="hover:text-red-500"
                                  title="Supprimer l'image"
                                >
                                  <Trash2 size={11} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Triggers (Promo, featured, isNew) */}
                  <div className="space-y-3 pt-3 border-t border-gray-100 text-xs text-slate-700">
                    <h4 className="font-bold uppercase tracking-wider text-gray-400">Options de publication</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center gap-2 cursor-pointer py-1">
                        <input
                          type="checkbox"
                          checked={prodForm.isAvailable}
                          onChange={(e) => setProdForm({ ...prodForm, isAvailable: e.target.checked })}
                          className="accent-[#0A3D91]"
                        />
                        <span>Produit Disponible</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer py-1">
                        <input
                          type="checkbox"
                          checked={prodForm.isFeatured}
                          onChange={(e) => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                          className="accent-[#0A3D91]"
                        />
                        <span>Mettre en Vedette (⭐)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer py-1">
                        <input
                          type="checkbox"
                          checked={prodForm.isPromo}
                          onChange={(e) => setProdForm({ ...prodForm, isPromo: e.target.checked })}
                          className="accent-[#0A3D91]"
                        />
                        <span>En Promotion (🏷️)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer py-1">
                        <input
                          type="checkbox"
                          checked={prodForm.isNew}
                          onChange={(e) => setProdForm({ ...prodForm, isNew: e.target.checked })}
                          className="accent-[#0A3D91]"
                        />
                        <span>Nouveau Produit (✨)</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowProductForm(false)}
                      className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold text-center"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#0A3D91] text-white py-3.5 rounded-xl font-bold text-center hover:bg-[#F7941D]"
                    >
                      Enregistrer le produit
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

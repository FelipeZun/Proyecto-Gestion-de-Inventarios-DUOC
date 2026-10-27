const inventory = [
  {
    id: 1,
    name: 'Dell Latitude 7440',
    category: 'Electronics',
    stock: 14,
    reorderLevel: 8,
    price: 1299,
    supplier: 'Northpeak Tech',
    code: 'DL7440'
  },
  {
    id: 2,
    name: 'Office Chair Pro',
    category: 'Furniture',
    stock: 6,
    reorderLevel: 10,
    price: 249,
    supplier: 'Urban Form',
    code: 'OC-PRO'
  },
  {
    id: 3,
    name: 'A4 Copy Paper',
    category: 'Office',
    stock: 42,
    reorderLevel: 20,
    price: 12.5,
    supplier: 'Paperline Ltd',
    code: 'A4-500'
  },
  {
    id: 4,
    name: 'USB-C Cable',
    category: 'Accessories',
    stock: 28,
    reorderLevel: 12,
    price: 18,
    supplier: 'Connective',
    code: 'USB-C01'
  },
  {
    id: 5,
    name: 'Packing Boxes',
    category: 'Packaging',
    stock: 19,
    reorderLevel: 15,
    price: 8.4,
    supplier: 'CartonHub',
    code: 'PBX-9'
  }
];

const inventoryTableBody = document.getElementById('inventoryTableBody');
const totalItemsValue = document.getElementById('totalItemsValue');
const lowStockValue = document.getElementById('lowStockValue');
const inventoryValue = document.getElementById('inventoryValue');
const lowStockList = document.getElementById('lowStockList');
const searchInput = document.getElementById('searchInput');
const stockForm = document.getElementById('stockForm');

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

function getStatus(item) {
  return item.stock <= item.reorderLevel ? 'low' : 'good';
}

function renderSummary(items) {
  const totalItems = items.reduce((sum, item) => sum + item.stock, 0);
  const lowStockCount = items.filter((item) => item.stock <= item.reorderLevel).length;
  const totalValue = items.reduce((sum, item) => sum + item.stock * item.price, 0);

  totalItemsValue.textContent = String(totalItems);
  lowStockValue.textContent = String(lowStockCount);
  inventoryValue.textContent = formatCurrency(totalValue);
}

function renderLowStock(items) {
  const lowItems = items.filter((item) => item.stock <= item.reorderLevel);

  lowStockList.innerHTML = lowItems.length
    ? lowItems
        .slice(0, 4)
        .map(
          (item) => `
            <div class="watch-item">
              <div>
                <strong>${item.name}</strong>
                <small>${item.stock} units left</small>
              </div>
              <span class="warning-pill">Reorder</span>
            </div>
          `
        )
        .join('')
    : '<div class="watch-item"><div><strong>All items healthy</strong><small>No action needed</small></div><span class="warning-pill" style="background:rgba(31,157,114,0.12);color:var(--success);">Stable</span></div>';
}

function renderTable(items) {
  inventoryTableBody.innerHTML = items
    .map((item) => {
      const status = getStatus(item);
      const initials = item.name
        .split(' ')
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase();

      return `
        <tr>
          <td>
            <div class="product-cell">
              <span class="product-icon">${initials}</span>
              <div>
                <div>${item.name}</div>
                <small>${item.code}</small>
              </div>
            </div>
          </td>
          <td>${item.category}</td>
          <td>${item.stock}</td>
          <td>${formatCurrency(item.price)}</td>
          <td>
            <span class="status-badge ${status === 'low' ? 'low' : 'good'}">
              ${status === 'low' ? 'Low stock' : 'Healthy'}
            </span>
          </td>
          <td>${item.supplier}</td>
        </tr>
      `;
    })
    .join('');
}

function renderInventory(items) {
  renderSummary(items);
  renderTable(items);
  renderLowStock(items);
}

function refreshInventory(term = '') {
  const normalizedTerm = term.trim().toLowerCase();
  const filtered = inventory.filter((item) => {
    if (!normalizedTerm) return true;

    return (
      item.name.toLowerCase().includes(normalizedTerm) ||
      item.category.toLowerCase().includes(normalizedTerm) ||
      item.code.toLowerCase().includes(normalizedTerm)
    );
  });

  renderInventory(filtered);
}

searchInput.addEventListener('input', (event) => {
  refreshInventory(event.target.value);
});

stockForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('productName').value.trim();
  const category = document.getElementById('productCategory').value;
  const stock = Number(document.getElementById('productStock').value);
  const reorderLevel = Number(document.getElementById('productReorder').value);
  const price = Number(document.getElementById('productPrice').value);
  const supplier = document.getElementById('productSupplier').value.trim();

  if (!name || !category || !supplier) return;

  inventory.push({
    id: Date.now(),
    name,
    category,
    stock,
    reorderLevel,
    price,
    supplier,
    code: `NEW-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  });

  stockForm.reset();
  document.getElementById('productStock').value = 0;
  document.getElementById('productReorder').value = 10;
  document.getElementById('productPrice').value = 0;
  refreshInventory(searchInput.value);
});

renderInventory(inventory);

const cart = [];
const productCards = document.querySelectorAll(".product-card");
const checkoutList = document.getElementById("checkoutList");
const checkoutTotal = document.getElementById("checkoutTotal");
const clearCartBtn = document.getElementById("clear-cart-btn");
const cartIcon = document.querySelector('.icon-cart');
const checkoutFooter = document.getElementById("checkoutFooter");

productCards.forEach((card) => {
  const btn = card.querySelector(".add-product-btn");
  btn.addEventListener("click", () => {
    const title = card.querySelector(".product-title").innerText;
    const priceText = card.querySelector(".product-price").innerText;
    const price = parseInt(priceText.replace(/[^0-9]/g, ""));

    cart.push({ title, price });
    updateCheckout();

    // Tampilkan modal
    const checkoutModal = new bootstrap.Modal(
      document.getElementById("checkoutModal")
    );
    checkoutModal.show();
  });
});

function updateCheckout() {
    checkoutList.innerHTML = "";  // Bersihkan list
    let total = 0;

    if (cart.length === 0) {
        const li = document.createElement("li");
        li.className = "list-group-item text-center";
        li.textContent = "Kamu belum memasukkan apapun ke keranjang.";
        checkoutList.appendChild(li);
    
        // sembunyikan footer (total + tombol)
        checkoutFooter.style.display = "none";
        return;
    }

    checkoutFooter.style.display = "flex"; 

    // Tampilkan produk di cart
    cart.forEach((item, index) => {
        total += item.price;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <span>${item.title} - Rp ${item.price.toLocaleString('id-ID')}</span>
            <button class="btn btn-danger btn-sm">Hapus</button>
        `;

        // Event listener tombol hapus item
        li.querySelector("button").addEventListener("click", () => {
            cart.splice(index, 1);  // Hapus item
            updateCheckout();       // Update tampilan
        });

        checkoutList.appendChild(li);
    });

    // Tampilkan total & tombol
    checkoutTotal.parentElement.style.display = "block";
    clearCartBtn.style.display = "inline-block";

    // Format total harga
    checkoutTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

clearCartBtn.addEventListener("click", () => {
    cart.length = 0;      // kosongkan array cart
    updateCheckout();     // update modal
  });


// membuka cart melalui icon
cartIcon.addEventListener('click', () => {
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    checkoutModal.show();
});
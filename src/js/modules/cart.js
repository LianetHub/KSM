export class Cart {
    constructor(options = {}) {
        this.cartItems = document.querySelectorAll('.header__menu-cart');
        this.openMenu = options.openMenu || function () { };
        this.hideMenu = options.hideMenu || function () { };
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            const target = e.target;

            if (target.matches('.products__card-btn') || target.matches('.product__delete-btn')) {
                this.updateCart(target);
            }
        });
    }

    updateCart(target) {
        const productId = target.closest('[data-id]').getAttribute('data-id');
        const command = target.classList.contains('active') ? 'remove' : 'add';

        this.fetchCart(command, productId)
            .then((data) => {
                const { amount } = data;

                target.classList.toggle('active');

                if (target.matches('.product__delete-btn')) {
                    target.textContent = target.classList.contains('active') ? "УДАЛИТЬ" : "Выбрать";
                }

                this.updateCartUI(amount);
            })
            .catch((error) => console.error('Ошибка при обновлении корзины:', error));
    }

    updateCartUI(amount) {
        this.cartItems.forEach(cartItem => {
            cartItem.textContent = amount;
            cartItem.classList.toggle('active', amount > 0);
        });

        this.openMenu();
        setTimeout(() => this.hideMenu(), 2000);
    }

    async fetchCart(command, productId) {
        try {
            const response = await fetch(`${BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    command: command,
                    id: productId
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }

            return response.json();
        } catch (error) {
            console.error('Ошибка при запросе к серверу:', error);
            throw error;
        }
    }
}

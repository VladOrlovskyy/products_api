document.addEventListener("DOMContentLoaded", () => {
    const API_URL = 'https://tsodykteststore.myshopify.com/api/2023-01/graphql.json';
    const API_TOKEN = '7e174585a317d187255660745da44cc7';

    const query = `
    {
        products(first: 10) {
            edges {
                node {
                    title
                    description
                    variants(first: 1) {
                        edges {
                            node {
                                price {
                                    amount
                                    currencyCode
                                }
                                compareAtPrice {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                    images(first: 1) {
                        edges {
                            node {
                                url
                                altText
                            }
                        }
                    }
                }
            }
        }
    }
    `;

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': API_TOKEN
        },
        body: JSON.stringify({ query })
    })
    .then(response => response.json())
    .then(data => {
        const products = data.data.products.edges;

        const productsContainer = document.getElementById('products-container');

        products.forEach((product, index) => {
            const productNode = product.node;
            const productElement = document.createElement('div');
            productElement.classList.add('product-card');

            const image ='./img/img1.png';
            productElement.innerHTML = `
           <img src="${image}" alt="${productNode.title}">

                <h3>${productNode.title}</h3>
                <p>${productNode.description}</p>
                <div class="price">
                    <span class="compare-price">$${productNode.variants.edges[0].node.compareAtPrice.amount}</span>
                    <span class="current-price">$${productNode.variants.edges[0].node.price.amount}</span>
                </div>
            `;

            setTimeout(() => {
                productElement.classList.add('active');
            }, index * 100);

            productsContainer.appendChild(productElement);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
});

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

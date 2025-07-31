window.addEventListener("load", () => {

    let articles = document.querySelector(".layout__articles");

    let posts = [
        {
            title: "Articulo de prueba 1",
            date: "1 de enero de 2023",
            body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel atque cum ipsam id eaque beatae repellat minima quidem voluptate sed, accusantium dolorem aliquid unde animi sequi quas laudantium. Aut, est.",
            link: "#"
        },
        {
            title: "Articulo de prueba 2",
            date: "2 de enero de 2023",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptatum! Quisquam, asperiores. Doloribus, voluptatum! Quisquam, asperiores.",
            link: "#"
        },
        {
            title: "Articulo de prueba 3",
            date: "3 de enero de 2023",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptatum! Quisquam, asperiores.",
            link: "#"
        },
        {
            title: "Articulo de prueba 4",
            date: "30 de junio de 2023",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptatum! Quisquam, asperiores.",
            link: "#"
        }
    ];

    //Recorrer los articulos
    posts.forEach(article => {

        articles.innerHTML += `
            <article class="articles_article">
                <h3 class="article__title">${article.title}</h3>
                <span class="article__date">Fecha de publicación: ${article.date}</span>
                <p class="article__text">${article.body}</p>
                <a href="${article.link}" class="article__btn">Leer más</a>
            </article>
        `;

    });

});
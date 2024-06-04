import routerProduto from "./produtos.routes.js";
import routerUsuario from "./usuarios.routes.js";


export const routes = (app) => {
    app.use('/api/produto', routerProduto);
    app.use('/api/usuario', routerUsuario);
}
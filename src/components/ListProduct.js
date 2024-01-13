import Product from "./Product"
import FormProduct from "./FormProduct";
import { useState } from 'react'

const ListProduct = ({products, onInsert, onDelete, onUpdate, onFindById}) => {

    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleEditProductClick = (productId) => {
      setSelectedProductId(productId);
    };

    return(
        <main className='container'>
            <FormProduct onInsert={onInsert} onUpdate={onUpdate} onFindById={onFindById} selectedProductId={selectedProductId} setSelectedProductId={setSelectedProductId}/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Description</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Catégorie</th>
                        <th scope="col">
                        </th>
                    </tr>
                </thead>
                {products.length > 0 ?( 
                    products.map((product)=>(
                        <Product product={product} key={product.id} onDelete={onDelete} onEdit={() => handleEditProductClick(product.id)}/>
                    ))
                ):(
                    <tbody>
                    <tr>
                      <th scope="row" colSpan="6" className="text-center">Liste vide</th>                  
                    </tr>
                  </tbody>
                )}

            </table>
        </main>
    )
}
export default ListProduct
import { FaPen, FaMinusSquare } from 'react-icons/fa'

const Produit = ({product, onDelete, onEdit}) =>{

  const handleEditProductClick = () => {
    onEdit(product.id);  
  };

  const handleDeleteProductClick = () => {
    onDelete(product.id);
  };

  return(
    <tbody>
      <tr>
        <th scope="row">{product.id}</th>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.category}</td>
        <td className=''>
          <button type="button" className="btn btn-warning mx-1" onClick={handleEditProductClick}>
              <FaPen/>
          </button>
          <button type="button" className="btn btn-danger mx-1" onClick={handleDeleteProductClick}>
              <FaMinusSquare/>
          </button>
        </td>                    
      </tr>
    </tbody>
  )  
}
export default Produit
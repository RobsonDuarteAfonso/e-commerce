import { useState, useEffect } from 'react';

const FormProduct = ({ onInsert, onUpdate, onFindById, selectedProductId, setSelectedProductId }) => {

    const [formMode, setFormMode] = useState('Ajouter');

    const [name, setName] = useState('')
    const [description, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            if (selectedProductId !== null) {
                const foundProduct = await onFindById(selectedProductId);
                if (foundProduct) {
                    setName(foundProduct.name);
                    setDesc(foundProduct.description);
                    setPrice(foundProduct.price);
                    setCategory(foundProduct.category);
                    setFormMode('Modifier');
                }
            }
        };
        fetchData();
    }, [selectedProductId, onFindById]);

    useEffect(() => {
        // Este useEffect lida com a limpeza dos inputs
        if (!document.hidden) { // Verifica se o documento ainda está visível
            setFormMode('Ajouter');
            setName('');
            setDesc('');
            setPrice('');
            setCategory('');
        }
    }, [selectedProductId]);    

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!name) {
            alert('Veuillez insérer un Nom')
            return
        } else if (!description) {
            alert('Veuillez insérer une Description')
            return
        } else if (!price) {
            alert('Veuillez insérer un Prix')
            return
        } else if (!category) {
            alert('Veuillez insérer une Catégorie')
            return
        }

        try {
            if (selectedProductId === null) {
                await onInsert({ name, description, price, category });
                setName('');
                setDesc('');
                setPrice('');
                setCategory('');
            } else {
                await onUpdate(selectedProductId, { name, description, price, category });
                setSelectedProductId(null);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className='container'>
            <h1>{formMode} un Produit</h1>
            <form className="add-form" onSubmit={onSubmit}>
                <div>
                    <label className='form-label'>Nom</label>
                    <input type="text" className="form-control" value={name} onChange ={(e) =>setName(e.target.value)}/>
                </div>
                <div>
                    <label className='form-label'>Description</label>
                    <input type="text" className="form-control" value={description}  onChange ={(e) =>setDesc(e.target.value)}/>
                </div>
                <div>
                    <label className='form-label'>Prix</label>
                    <input type="text" className="form-control" value={price} onChange = {(e) => setPrice(e.target.value)}/>
                </div>
                <div>
                    <label className='form-label'>Catégorie</label>
                    <input type="text" className="form-control" value={category} onChange = {(e) => setCategory(e.target.value)}/>
                </div>
                <div className='py-4'>
                    <input type="submit" className="btn btn-success px-3" value="Save"/>
                </div>
                
            </form>
        </div>
    )
}
export default FormProduct
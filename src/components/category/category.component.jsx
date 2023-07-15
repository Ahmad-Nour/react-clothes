import ProductCard from '../product-card/product-card.component';
import { Fragment, useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import { useParams } from 'react-router-dom';
import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, SetProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        SetProducts(categoriesMap[category]);
    }, [category, categoriesMap])


    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    products && products.map(product => (<ProductCard key={product.id} product={product} />))
                }
            </div>
        </Fragment>
    );
}

export default Category;
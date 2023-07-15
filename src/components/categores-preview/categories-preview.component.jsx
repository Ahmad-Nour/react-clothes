import { Fragment } from "react";
import { useContext } from "react";
import {CategoriesContext} from "../../contexts/categories.context" 
import CategoryPreview from "../category-preview/category-preview.component";

const CategoriesPreview = ({ title, products }) => {
    const { categoriesMap } = useContext(CategoriesContext);
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title];
                    return (<CategoryPreview key={title} title={title} products={products} />);
                })
            }
        </Fragment>
    );
}

export default CategoriesPreview;

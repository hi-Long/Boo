import clsx from "clsx"
import classes from './ProductCardLoading.module.css'

const ProductCardLoading = () => {
    return <div className={clsx(classes.card, classes.loading)}>
        <div className={classes.image} />
        <div className={classes.content}>
            <span className={classes.header}></span>
            <div className={classes.description} />
        </div>
    </div>
}

export default ProductCardLoading
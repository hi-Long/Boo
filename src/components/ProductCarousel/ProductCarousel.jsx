import { makeStyles } from "@material-ui/core";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

const useStyles = makeStyles({
    root: {
        width: props => {
            return props.width ? props.width : "100%"
        }
    }
})


const ProductCarousel = props => {
    const { slidesToShow, slidesToScroll, autoplay } = props
    const classes = useStyles(props)

    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow ? slidesToShow : 4,
        slidesToScroll: slidesToScroll ? slidesToScroll : 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    infinite: true
                }
            },
            {
                breakpoint: 786,
                settings: {
                    slidesToShow: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    initialSlide: 1
                }
            }
        ],
        arrows: true,
        autoplay: autoplay ? autoplay : false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return <Slider className={classes.root} {...settings}>
        {props.children}
    </Slider >
}

export default ProductCarousel
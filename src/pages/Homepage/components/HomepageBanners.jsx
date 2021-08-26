import { Box, makeStyles } from "@material-ui/core"
import Slider from "react-slick";
import { HOMEPAGE_IMAGES_SRC } from "../../../constants";

const useStyles = makeStyles({
    root: {
    },
    carousel: {
        "& .slick-list": {
            height: "100vh",
            width: "auto"
        },
        "& .slick-dots": {
            bottom: "2rem"
        }
    },
    banner: {
        width: "100%",
        height: "auto",
        objectFit: "cover"
    }
})

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true
};

const HomepageBanners = props => {
    const classes = useStyles()

    return <Box className={classes.root}>
        <Slider className={classes.carousel} {...settings}>
            {[1, 2, 3].map(i => (
                <Box key={i}>
                    <img className={classes.banner}
                        src={`${HOMEPAGE_IMAGES_SRC}/banner-${i}.jpg`}
                        alt="Banner"></img>
                </Box>
            ))}
        </Slider>
    </Box >
}

export default HomepageBanners
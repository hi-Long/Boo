import { Box, Button, makeStyles, Typography } from "@material-ui/core"
import Aos from 'aos'
import "aos/dist/aos.css"
import { useEffect } from "react"
import { HOMEPAGE_IMAGES_SRC } from "../../../constants"
import capitalizeFirstLetter from "../../../helpers/capitalizeFirstLetter"

const categories = ['ÁO THUN NAM', 'SƠ MI NAM', 'QUẦN NAM', "PHỤ KIỆN"]

const aosSettings = [
    {
        'data-aos': 'fade-right',
        'data-aos-offset': '100',
        'data-aos-easing': 'ease-in-sine',
        'data-aos-duration': '300'
    },
    {
        'data-aos': 'fade-left',
        'data-aos-offset': '100',
        'data-aos-easing': 'ease-in-sine',
        'data-aos-duration': '300'
    },
    {
        'data-aos': 'fade-up',
        'data-aos-offset': '200',
        'data-aos-easing': 'ease-in-sine',
        'data-aos-duration': '300'
    }
]

const useStyles = makeStyles({
    cateTextRight: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-start",

        "& button": {
            float: "right"
        }
    },
    textSliding: {
        display: "flex",
        justifyContent: "space-evenly",
        paddingBlock: ".5rem",
        background: "black",
        color: "white"
    }
})

const HomepageCategories = props => {
    const classes = useStyles()

    useEffect(() => {
        Aos.init()
        Aos.refresh();
    }, [])

    return <Box>
        <Box width="100%" className={classes.textSliding}>
            {[1, 2, 3, 4].map(i => (
                <Typography key={i} component="span">MADE IN THE STREET</Typography>
            ))}
        </Box>
        {categories.map((category, i) => {
            const left = i % 2,
                right = Math.abs(i % 2 - 1)
            return (
                <Box display="flex" key={i}>
                    <Box width="50%" order={left} {...aosSettings[left]}>
                        <img width="100%" src={`${HOMEPAGE_IMAGES_SRC}/category-${category}.jpg`} alt="Category"></img>
                    </Box>
                    <Box
                        className={i % 2 === 1 ? classes.cateTextRight : ''}
                        width="50%"
                        order={right}
                        {...aosSettings[right]}>
                        <Box m={3}>
                            <Typography variant="h1" component="h2">{category}</Typography>
                            <Button
                                variant="outlined" size="large"
                                style={{ float: i % 2 === 1 && "right" }}
                                href={`/products?subcategories=${capitalizeFirstLetter(category.toLowerCase())}`}>MUA NGAY</Button>
                        </Box>
                    </Box>
                </Box>
            )
        })}
        <Box width="100%" mt={-1} {...aosSettings[2]}>
            <img width="100%" src={`${HOMEPAGE_IMAGES_SRC}/category-HÀNG MỚI.jpg`} alt="Category"></img>
        </Box>
    </Box >
}

export default HomepageCategories
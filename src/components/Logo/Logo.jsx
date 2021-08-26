import { makeStyles } from "@material-ui/core"
import clsx from "clsx"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
    root: {
        height: 40,
        width: "auto"
    },
    "logo--admin": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
})

const Logo = props => {
    const { adminPage } = props
    const classes = useStyles()

    return <Link to="/" style={{ display: "block", width: "100%", textAlign: "center" }}>
        <img className={clsx(classes.root, adminPage && classes["logo--admin"])} src={process.env.PUBLIC_URL + '/images/Logo.svg'} alt="Logo" />
    </Link>
}

export default Logo
import Header from "./header";
import Footer from "./footer";

const template = (props) => {

    return (
        <>
            <Header></Header>
            {props.content}
            <Footer></Footer>
        </>
    )

}

export default template
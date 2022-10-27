

export function HomePage (){
    return<div className="d-flex justify-content-center flex-column align-items-center">
        <section className="HomePageInfo w-100 mt-1 mb-5 d-flex flex-column align-content-center"
        style={{backgroundColor:"#666"}}>
            <h2 className="text-center pt-3">Become an expert in Linux</h2>
            <h3 className="text-center pt-3">November Release</h3>
            <h3 className="text-center pt-3">ArcoLinux CORE ISOS + ALL ARCOLINUXB ISO</h3>
            <h3 className="text-center pt-3">33 isos have been released</h3>
            <a  className="link-info text-center pt-3 " href="https://www.arcolinux.info/arcolinux-v22-11/" style={{fontSize: 31}} rel="noopener noreferrer">Read what is new in this article</a>
        </section>
        <section className="HomePageZenLinux vh-100 d-flex flex-column align-content-center">
            <h2 className="text-center pt-3">
                Let us be zen
                arcolinuxs-zen
                linux-zen kernel
            </h2>
            <img className="" src="https://www.arcolinux.info/wp-content/uploads/2022/10/arcolinuxs-zen.jpg"/>
        </section>
    </div>
}
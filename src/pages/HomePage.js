

export function HomePage (){
    return<div className="d-flex justify-content-center flex-column align-items-center">
        <section className="HomePageInfo w-100 mt-1 pb-3 d-flex flex-column align-content-center"
        style={{backgroundColor:"#666",color:"rgba(255,255,255,0.6)"}}>
            <h2 className="text-center pt-3">Become an expert in Linux</h2>
            <h3 className="text-center pt-3">November Release</h3>
            <h3 className="text-center pt-3">ArcoLinux CORE ISOS + ALL ARCOLINUXB ISO</h3>
            <h3 className="text-center pt-3">33 isos have been released</h3>
            <a  className="link-info text-center pt-3 " href="https://www.arcolinux.info/arcolinux-v22-11/" style={{fontSize: 31}} rel="noopener noreferrer">Read what is new in this article</a>
        </section>
        <section className="HomePageZenLinux mb-3 d-flex flex-column align-items-center">
            <h2 className="text-center pt-3" style={{lineHeight:"1.4em",fontWeight:"800",textTransform:"uppercase",color:"#666",fontFamily:"Open Sans,Arial,sans-serif"}}>
                Let us be zen
                <br/>
                arcolinuxs-zen
                <br/>
                linux-zen kernel
            </h2>
            <img alt="ZenModLinux" className="w-75 text-center" src="https://www.arcolinux.info/wp-content/uploads/2022/10/arcolinuxs-zen.jpg"/>
        </section>
        <section className="HomePageXanLinux mb-3 d-flex flex-column align-items-center">
            <h2 className="text-center pt-3" style={{lineHeight:"1.4em",fontWeight:"800",textTransform:"uppercase",color:"#666",fontFamily:"Open Sans,Arial,sans-serif"}}>
                Let us xanmod
                <br/>
                arcolinuxs-xanmod
                <br/>
                linux-xanmod kernel
            </h2>
            <img alt="XanModLinux" className="w-75 text-center" src="https://www.arcolinux.info/wp-content/uploads/2022/10/xanmod.jpg"/>
        </section>
    </div>
}